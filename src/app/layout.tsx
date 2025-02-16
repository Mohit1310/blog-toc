import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const poppins = Poppins({
  weight: '400',
  variable: '--font-poppins',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins`}>
        <nav className="container mx-auto px-4 md:px-8 lg:px-12">
          <ul className="flex gap-2">
            <li>
              <Link href={'/'}>Home</Link>
            </li>
            <li>
              <Link href={'/blog'}>Blog</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
