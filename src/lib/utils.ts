// utils/generateTOC.ts
import { unified } from 'unified';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
// import remarkParse from 'remark-parse';
import rehypeParse from 'rehype-parse';
import slugify from 'slugify';
import { Root, Element, Text, RootContent } from 'hast';
import React from 'react';
// import remarkGfm from 'remark-gfm';

export interface TocItem {
  text: string;
  id: string;
  level: number;
}

const extractHeadings = (tree: Root): TocItem[] => {
  const tocItems: TocItem[] = [];

  const extract = (node: Element | Text | RootContent) => {
    if (node.type === 'element' && /^h[2-6]$/.test(node.tagName)) {
      const level = parseInt(node.tagName.charAt(1), 10);

      // Recursively extract text content
      const getTextContent = (node: Element | Text | RootContent): string => {
        if (node.type === 'text') return node.value;
        if (node.type === 'element' && node.children) {
          return node.children.map(getTextContent).join('');
        }
        return '';
      };

      const text = getTextContent(node);

      const id = slugify(text, {
        lower: true,
        strict: true,
      });

      tocItems.push({ id, text, level });
    }

    // Recursively check child nodes
    if ('children' in node) {
      node.children.forEach((child) =>
        extract(child as Element | Text | RootContent)
      );
    }
  };

  // Start by processing the children of the Root node
  tree.children.forEach((child) =>
    extract(child as Element | Text | RootContent)
  );
  return tocItems;
};

export const generateToc = (content: string): TocItem[] => {
  const tree = unified().use(rehypeParse, { fragment: true }).parse(content);
  const tocItems = extractHeadings(tree);
  return tocItems;
};

export const getStrapiData = async (path: string) => {
  const res = await fetch(process.env.STRAPI_URL + path);
  return await res.json();
};

// Helper function to recursively extract text
// @ts-expect-error need to add type
export const extractText = (children) => {
  return (
    children
      // @ts-expect-error need to add type
      .map((child) => {
        if (typeof child === 'string') return child;
        if (typeof child === 'object' && child.props?.children) {
          return extractText(React.Children.toArray(child.props.children));
        }
        return '';
      })
      .join('')
  );
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
