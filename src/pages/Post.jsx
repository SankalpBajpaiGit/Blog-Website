import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const isAuthor = post && userData ? post.userid === userData.$id : false;

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };


    return post ? (
        <div className="py-8 bg-gradient-to-b from-blue-400 to-blue-600 min-h-screen">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border-4 border-blue-700 rounded-xl p-4 shadow-2xl bg-white">
          {post.featuredimage && (
            <img
              src={appwriteService.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="rounded-xl w-full md:max-w-md h-auto border-2 border-blue-700 shadow-lg"
            />
          )}

          {userData && post.userid === userData.$id && (
            <div className="absolute right-6 top-6 flex space-x-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500 border-2 border-green-700 shadow-md hover:bg-green-600">
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500 border-2 border-red-700 shadow-md hover:bg-red-600"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-blue-900 drop-shadow-lg font-[Comic Sans MS]">
            {post.title}
          </h1>
        </div>
        <div className="browser-css bg-white p-6 border-4 border-blue-700 rounded-lg shadow-lg text-blue-900">
          {parse(post.content)}
        </div>
      </Container>
    </div>
    ) : null;
}
