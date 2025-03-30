import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetching posts failed:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8 mt-4 text-center font-[Comic Sans MS] text-white">
        <Container>
          <h1 className="text-xl font-bold animate-pulse">Loading...</h1>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-12 mt-4 text-center">
        <Container>
          {/* 🎭🔥 MIT Manipal Blog Intro */}
          <div className="bg-[radial-gradient(circle,_#007bff,_#ff00ff,_#ffcc00)] 
            text-white 
            py-14 px-6 
            border-4 border-[#ff00ff] 
            shadow-[6px_6px_0px_#00ffcc] 
            font-[Comic Sans MS] 
            text-center 
            uppercase 
            tracking-widest 
            outline outline-2 outline-[#ffcc00] 
            hover:shadow-[8px_8px_0px_#ff3300] 
            hover:scale-105 
            transition-all duration-200">

            <h1 className="text-5xl font-extrabold drop-shadow-lg text-white">
              🚀 Welcome to the Unofficial MIT Manipal Students Blog
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto font-medium text-gray-100">
              The ultimate space for MITians to rant, flex, and vibe. 
              From midsem grinds to Revels madness, this blog covers it all.
            </p>
            <p className="mt-4 text-gray-200 font-semibold">
              🛠️ Tech | 🎭 Events | 🏠 Hostel Life | 🎓 Placements | 🎬 Drama
            </p>

          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 font-[Comic Sans MS] text-white">
      <Container>
        <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-md">
          Latest Posts ✍️
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.$id} className="transform transition duration-300 hover:scale-105">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
