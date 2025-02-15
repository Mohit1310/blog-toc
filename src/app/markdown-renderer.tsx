'use client';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy } from 'lucide-react';
import '@/app/markdown.css';
import {
  extractText,
  // generateToc
} from '@/lib/utils';
import slugify from 'slugify';
// import RenderToc from './render-toc';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
}) => {
  const [copied, setCopied] = useState<string | null>(null);
  // const tocItems = generateToc(content);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);

    setTimeout(() => {
      setCopied(null);
    }, 2000); // Reset after 2 seconds
  };
  return (
    <div className="flex gap-8 mt-4">
      {/* {renderToc(tocItems)} */}
      {/* <aside className="xl:w-1/4 hidden xl:block">
        <RenderToc tocItems={tocItems} />
      </aside> */}
      <div className=" blog-markdown-content">
        <ReactMarkdown
          className={className}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeRaw,
            [
              rehypeSanitize,
              {
                // Customize allowed tags and attributes if needed
                attributes: {
                  // Specify allowed attributes for each tag
                  '*': ['className', 'style'],
                  a: ['href', 'target'],
                  img: ['src', 'alt', 'width', 'height'],
                  code: ['className', 'language'],
                },
              },
            ],
          ]}
          components={{
            // eslint-disable-next-line
            h2: ({ node, children, ...props }) => {
              const textContent = extractText(React.Children.toArray(children));
              const id = slugify(textContent, {
                lower: true,
                strict: true,
              });
              return (
                <h2 id={id} {...props}>
                  {children}
                </h2>
              );
            },
            // eslint-disable-next-line
            h3: ({ node, children, ...props }) => {
              const textContent = extractText(React.Children.toArray(children));
              const id = slugify(textContent, {
                lower: true,
                strict: true,
              });
              return (
                <h3 id={id} {...props}>
                  {children}
                </h3>
              );
            },
            // eslint-disable-next-line
            h4: ({ node, children, ...props }) => {
              const id = slugify(String(children), {
                lower: true,
                strict: true,
              });
              return (
                <h3 id={id} {...props}>
                  {children}
                </h3>
              );
            },
            // eslint-disable-next-line
            h5: ({ node, children, ...props }) => {
              const id = slugify(String(children), {
                lower: true,
                strict: true,
              });
              return (
                <h3 id={id} {...props}>
                  {children}
                </h3>
              );
            },
            // eslint-disable-next-line
            h6: ({ node, children, ...props }) => {
              const id = slugify(String(children), {
                lower: true,
                strict: true,
              });
              return (
                <h3 id={id} {...props}>
                  {children}
                </h3>
              );
            },
            // @ts-expect-error testing error
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              const codeString = String(children).replace(/\n$/, '');

              // Check if the node is actually an inline code block
              const isInlineCode = node?.tagName === 'code' && !language;

              if (!inline && language) {
                return (
                  <div className="relative">
                    <SyntaxHighlighter
                      //   @ts-expect-error testing error
                      style={coldarkDark}
                      language={language}
                      PreTag="div"
                      showLineNumbers
                      wrapLongLines
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                    {/* Copy Button */}
                    <button
                      className="group absolute right-2 top-2 flex items-center gap-1 rounded p-1 text-white"
                      onClick={() => handleCopy(codeString)}
                    >
                      <div className="group/button relative">
                        <Copy size={16} />
                        {copied === codeString ? (
                          <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-100 transition-opacity">
                            Copied!
                          </span>
                        ) : (
                          <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                            Copy
                          </span>
                        )}
                      </div>
                    </button>
                  </div>
                );
              }

              // For directory structure or inline code
              if (isInlineCode) {
                return (
                  <code
                    className="rounded-sm bg-primary px-1 py-0.5 text-white"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }

              // For code blocks without language specification
              return (
                <pre className="whitespace-pre-wrap break-all rounded-sm bg-primary p-4 text-white">
                  <code {...props}>{children}</code>
                </pre>
              );
            },
            // eslint-disable-next-line
            p: ({ node, ...props }) => <p className="mb-4" {...props} />,
            // eslint-disable-next-line
            a: ({ node, ...props }) => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              />
            ),
            // eslint-disable-next-line
            img: ({ node, ...props }) => (
              // eslint-disable-next-line
              <img {...props} className="h-auto max-w-full rounded-lg" />
            ),
            // eslint-disable-next-line
            button: ({ node, ...props }) => (
              <button
                {...props}
                className="hover:bg-primary-gradient-hover buttonElement rounded-md bg-primary-gradient px-4 py-2 font-semibold text-white"
              />
            ),
            // eslint-disable-next-line
            blockquote: ({ node, ...props }) => (
              <blockquote
                {...props}
                className="border-l-4 border-primary pl-4"
              />
            ),
            // eslint-disable-next-line
            ul: ({ node, ...props }) => (
              <ul {...props} className="ms-4 list-disc" />
            ),
            // eslint-disable-next-line
            ol: ({ node, ...props }) => (
              <ol {...props} className="ms-4 list-decimal" />
            ),
            // eslint-disable-next-line
            li: ({ node, ...props }) => <li {...props} className="mb-2" />,
            // eslint-disable-next-line
            table: ({ node, ...props }) => (
              <table
                {...props}
                className="my-4 border-collapse border border-black"
              />
            ),
            // eslint-disable-next-line
            thead: ({ node, ...props }) => (
              <thead {...props} className="bg-accent" />
            ),
            // eslint-disable-next-line
            tbody: ({ node, ...props }) => <tbody {...props} />,
            // eslint-disable-next-line
            tr: ({ node, ...props }) => (
              <tr {...props} className="border-b border-black" />
            ),
            // eslint-disable-next-line
            th: ({ node, ...props }) => (
              <th
                {...props}
                className="border border-black px-4 py-2 text-left font-medium"
              />
            ),
            // eslint-disable-next-line
            td: ({ node, ...props }) => (
              <td {...props} className="border border-black px-4 py-2" />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownRenderer;

// const renderToc = (tocItems: TocItem[]) => {
//   return (
//     <nav className="mb-4">
//       <h2 className="text-lg font-semibold">Table of Contents</h2>
//       <ul>
//         {tocItems.map((item) => (
//           <li
//             key={item.id}
//             style={{ marginLeft: `${(item.level - 1) * 20}px` }}
//           >
//             <a href={`#${item.id}`}>{item.text}</a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };
