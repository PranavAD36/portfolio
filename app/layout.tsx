import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://my-portfolio-opal-tau-85.vercel.app"),

  title: "Pranav Dabhi | Full Stack Developer",
  description: "Portfolio of Pranav Dabhi, a B.Tech Computer Engineering student and software developer.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Pranav Dabhi | The Portfolio",
    description: "Portfolio of Pranav Dabhi, Full Stack Developer.",
    url: "/",
    siteName: "Pranav Dabhi Portfolio",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Pranav Dabhi",
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