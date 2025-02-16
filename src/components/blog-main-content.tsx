'use client';
import RenderToc from '@/app/render-toc';
import React from 'react';
import { motion } from 'motion/react';
import { content } from '@/lib/constants';
import { generateToc } from '@/lib/utils';
import BlogPost from '@/app/blog-post';
import SocialShare from '@/app/social-share';

const BlogMainContent = () => {
  const tocItems = generateToc(content);
  return (
    <div className="flex mt-4">
      {/* RenderToc - Left Sidebar */}
      <div className="hidden xl:flex w-[300px] -ms-12 flex-shrink-0">
        <motion.div
          className=""
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <RenderToc tocItems={tocItems} />
        </motion.div>
      </div>

      {/* BlogPost - Main Content */}
      <div className="max-w-3xl w-full">
        <BlogPost blogContent={content} />
      </div>

      {/* SocialShare - Right Sidebar */}
      <div className="hidden xl:block">
        <motion.div
          className="sticky top-8 ms-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
        >
          <SocialShare
            url="https://blog-toc.vercel.app/"
            title="Top Frontend Best Practices in 2025"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default BlogMainContent;
