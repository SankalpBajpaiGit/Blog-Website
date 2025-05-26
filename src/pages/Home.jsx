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
      <div className="w-full py-8 mt-4 text-center">
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
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-14 px-6 rounded-xl shadow-xl">
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-md">
              Login to start Blogging
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto font-medium">
              The ultimate space for blogs.
            </p>
            <p className="mt-4 text-gray-200 font-semibold">
              Tech | Events | Hostel Life | Placements | Drama
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
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
