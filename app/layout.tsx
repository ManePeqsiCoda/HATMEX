import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://hatmex.com'),
};

// The root layout delegates all rendering to [locale]/layout.tsx.
// This file is required by Next.js App Router.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
