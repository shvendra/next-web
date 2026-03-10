"use client";

import React, { useState } from "react";
import { likeBlogById } from "@/lib/blog";

type Props = {
  blogId: string;
  initialLikes?: number;
};

const BlogLikeButton = ({ blogId, initialLikes = 0 }: Props) => {
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLike = async () => {
    if (!blogId || loading) return;

    setLoading(true);
    setError("");

    try {
      const previousLikes = likes;

      setLikes((prev) => prev + 1);

      const response = await likeBlogById(blogId);

      setLikes(response.likes ?? previousLikes + 1);
    } catch (err: any) {
      setLikes((prev) => Math.max(prev - 1, 0));
      setError(err?.message || "Failed to like blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleLike}
        disabled={loading}
        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition ${
          loading
            ? "cursor-not-allowed bg-gray-400"
            : "bg-primary hover:opacity-90"
        }`}
      >
        <span>👍</span>
        <span>{likes} Likes</span>
      </button>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
};

export default BlogLikeButton;