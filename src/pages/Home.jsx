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
      <div className="w-full py-8 mt-4 text-center font-[Verdana] text-gray-900">
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
          <div className="bg-gray-200 
            text-gray-900 
            py-12 px-6 
            border-2 border-gray-400 
            shadow-[4px_4px_0px_#808080] 
            font-[Verdana] 
            text-center 
            uppercase 
            tracking-wide 
            outline outline-1 outline-gray-500 
            hover:shadow-[5px_5px_0px_#606060] 
            hover:scale-[1.02] 
            transition-all duration-200">

            <h1 className="text-4xl font-extrabold drop-shadow-sm">
              🚀 Welcome to the Unofficial MIT Manipal Blog
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto font-medium text-gray-700">
              The ultimate space for MITians to rant, flex, and vibe. 
              From midsem grinds to Revels madness, this blog covers it all.
            </p>
            <p className="mt-4 text-gray-600 font-semibold">
              🛠️ Tech | 🎭 Events | 🏠 Hostel Life | 🎓 Placements | 🎬 Drama
            </p>

          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 font-[Verdana] text-gray-900">
      <Container>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 drop-shadow-md">
          Latest Posts ✍️
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.$id} className="transform transition duration-300 hover:scale-[1.02]">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
