import { content } from '@/lib/constants';
import { generateToc } from '@/lib/utils';
import Image from 'next/image';
import BlogPost from './blog-post';
import RenderToc from './render-toc';
import { UserCircle } from 'lucide-react';
import SocialShare from './social-share';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top Frontend Best Practices in 2025',
  description:
    'Learn the top 10 frontend best practices for changing the sector and tactics companies could apply to stay ahead.',
  keywords: 'frontend, best practices, b2b, ecommerce, digital marketing',
  openGraph: {
    images: ['/blog.webp'],
  },
};

export default function Home() {
  const tocItems = generateToc(content);

  return (
    <div className="px-4 md:px-8 lg:px-12 flex">
      <div className="container mx-auto flex">
        <aside className="hidden xl:block w-64 relative">
          <div className="sticky top-20">
            <RenderToc tocItems={tocItems} />
          </div>
        </aside>
        <div className="container mx-auto max-w-3xl">
          <SocialShare
            url="https://blog-toc.vercel.app/"
            title="Top Frontend Best Practices in 2025"
          />
          <div>
            <h1>Top Frontend Best Practices in 2025</h1>
            <Image
              src={'https://placehold.co/1000x600'}
              alt={'top 10'}
              width={0}
              height={0}
              sizes="100vw"
              className="mt-4 h-auto w-full rounded-lg"
            />
            <div className="mt-10 flex items-start gap-4">
              <div className="flex gap-4">
                <UserCircle size={40} />
                <div className="flex gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="font-bold sm:text-2xl">John Doe</p>
                    <p>15 Feb 2025</p>
                  </div>
                  <div className="mt-1">
                    <span className="rounded-full bg-accent/40 px-5 py-2 font-semibold">
                      e-commerce
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BlogPost blogContent={content} />
        </div>
      </div>
    </div>
  );
}
