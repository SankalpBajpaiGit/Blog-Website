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
      <div className="w-full py-8 mt-4 text-center font-[Comic Sans MS] text-yellow-100">
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
          <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-yellow-100 py-14 px-6 rounded-xl border-4 border-yellow-300 shadow-[5px_5px_0px_#ffcc00] font-[Comic Sans MS]">
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-md text-yellow-300">
              🚀 Welcome to the Unofficial MIT Manipal Students Blog
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto font-medium text-blue-100">
              The ultimate space for MITians to rant, flex, and vibe. 
              From midsem grinds to Revels madness, this blog covers it all.
            </p>
            <p className="mt-4 text-yellow-200 font-semibold">
              Tech | Events | Hostel Life | Placements | Drama
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 font-[Comic Sans MS] text-yellow-100">
      <Container>
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-300 drop-shadow-md">
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
