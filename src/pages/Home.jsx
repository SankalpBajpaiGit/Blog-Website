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
      <div className="w-full py-8 bg-gradient-to-b from-blue-300 to-blue-500 border-t-4 border-blue-700 shadow-xl">
      <Container>
        <h2 className="text-4xl font-extrabold mb-6 text-center text-white drop-shadow-lg font-[Comic Sans MS]">
          Latest Posts ✍️
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="transform transition duration-300 hover:scale-105 bg-white border-2 border-blue-700 rounded-lg shadow-2xl p-4 hover:bg-blue-100"
            >
              <PostCard {...post} />
            </div>
          ))}
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
