'use client';
import React, { useState } from 'react';
import { FacebookIcon, TwitterIcon, LinkedinIcon, Link } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const SocialShare = ({ url, title }: { url: string; title: string }) => {
  const shareText = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(url);
  const [copied, setCopied] = useState<string | null>(null);

  const socialLinks = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      icon: <FacebookIcon className="w-6 h-6 text-primary" />,
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
      icon: <TwitterIcon className="w-6 h-6 text-primary" />,
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      icon: <LinkedinIcon className="w-6 h-6 text-primary" />,
    },
  ];

  const copyLink = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);

    setTimeout(() => {
      setCopied(null);
    }, 2000); // Reset after 2 seconds
  };

  return (
    <div className="flex items-center space-x-4 mt-4">
      {socialLinks.map((item) => (
        <TooltipProvider key={item.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent p-3 rounded-full hover:scale-110 transition-all duration-200 ease-in-out"
              >
                {item.icon}
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <span>Share on {item.name}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => copyLink(url)}
              className="p-3 rounded-full bg-accent hover:scale-110 transition-all duration-200 ease-in-out"
            >
              <Link className="w-6 h-6 text-primary" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <span>{copied === url ? 'Copied!' : 'Copy Link'}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SocialShare;
