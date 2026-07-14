import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),

  title: "Portfolio | Full Stack Developer",
  description: "A polished portfolio experience built with modern web technologies.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Portfolio | Full Stack Developer",
    description: "A polished portfolio experience built with modern web technologies.",
    url: "/",
    siteName: "Portfolio",
    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: "Portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}