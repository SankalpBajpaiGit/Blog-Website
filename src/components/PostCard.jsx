import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredimage }) {

  return (
    <Link to={`/post/${$id}`} className="block transform transition duration-300 hover:scale-105">
      <div className="w-full bg-gradient-to-r from-blue-400 to-blue-600 border-4 border-yellow-300 rounded-xl p-4 shadow-lg font-[Comic Sans MS]">
        <div className="w-full justify-center mb-4">
          {featuredimage && (
            <img 
              src={appwriteService.getFilePreview(featuredimage)} 
              alt={title}
              className="rounded-xl border-2 border-yellow-300 shadow-md" 
            />
          )}
        </div>
        <h2 className="text-xl font-bold text-yellow-100 drop-shadow-md">{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard;
