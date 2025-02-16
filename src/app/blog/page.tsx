import Image from 'next/image';
import { UserCircle } from 'lucide-react';
import BlogMainContent from '@/components/blog-main-content';

export default function BlogDetail() {
  return (
    <div className="relative px-4 md:px-8 lg:px-12">
      {/* Unified Container */}
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto">
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
            <UserCircle size={40} />
            <div className="flex gap-2">
              <div className="flex flex-col items-start gap-1">
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

        {/* Main Content Area */}
        <BlogMainContent />
      </div>
    </div>
  );
}
