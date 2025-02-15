'use client';
import React from 'react';
import MarkdownRenderer from './markdown-renderer';

interface BlogPostProps {
  blogContent: string;
}

const BlogPost = ({ blogContent }: BlogPostProps) => {
  return <MarkdownRenderer content={blogContent} />;
};

export default BlogPost;
