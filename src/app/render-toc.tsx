'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { TocItem } from '@/lib/utils';

const RenderToc = ({ tocItems }: { tocItems: TocItem[] }) => {
  const [activeId, setActiveId] = useState('');
  const tocRef = useRef<HTMLUListElement | null>(null);
  const scrollingRef = useRef(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (scrollingRef.current) return;

      const sections = tocItems.map((item) => document.getElementById(item.id));
      let newActiveId = '';

      // Find the first section that's in view
      for (const section of sections) {
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 0) {
          newActiveId = section.id;
          break;
        }
      }

      if (newActiveId && newActiveId !== activeId) {
        setActiveId(newActiveId);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems, activeId]);

  // Separate useEffect for auto-scrolling the TOC
  useEffect(() => {
    if (!activeId || !tocRef.current) return;

    const activeElement = tocRef.current.querySelector(
      `a[href="#${activeId}"]`
    );
    if (!activeElement) return;

    const tocContainer = tocRef.current.parentElement;
    if (!tocContainer) return;

    const containerRect = tocContainer.getBoundingClientRect();
    const activeRect = activeElement.getBoundingClientRect();

    // Calculate if the active element is outside the visible area
    const isOutOfView =
      activeRect.top < containerRect.top ||
      activeRect.bottom > containerRect.bottom;

    if (isOutOfView) {
      tocContainer.scrollTo({
        top:
          tocContainer.scrollTop +
          (activeRect.top - containerRect.top) -
          containerRect.height / 2,
        behavior: 'smooth',
      });
    }
  }, [activeId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollingRef.current = true;

    const target = document.getElementById(id);
    if (target) {
      const offset = 80; // Adjust this value based on your header height
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

      // Set active ID after scroll
      setTimeout(() => {
        setActiveId(id);
        scrollingRef.current = false;
      }, 500); // Increased timeout to ensure scroll completes
    }
  };

  return (
    <nav className="hidden lg:block sticky top-8 max-h-[80vh] overflow-y-auto no-scrollbar ps-4 pe-2 pb-4 border-l border-gray-200">
      {/* <h2 className="text-xl font-semibold mb-2">Table of Contents</h2> */}
      <ul className="space-y-1.5" ref={tocRef}>
        {tocItems.map((item) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: item.level * 0.05 }}
            style={{ marginLeft: `${(item.level - 2) * 20}px` }}
          >
            <a
              href={`#${item.id}`}
              className={`block py-1 hover:text-primary transition-colors text-sm duration-200 ${
                activeId === item.id ? 'text-primary font-semibold' : ''
              }`}
              onClick={(e) => handleClick(e, item.id)}
            >
              {item.text}
            </a>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default RenderToc;
