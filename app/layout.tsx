import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),

  title: "PranavDabhi",
  description: "A polished portfolio experience built with modern web technologies.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "PranavDabhi",
    description: "A polished portfolio experience built with modern web technologies.",
    url: "/",
    siteName: "Portfolio",
    images: [
      {
        url: "/icon.png",
        width: 192,
        height: 192,
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