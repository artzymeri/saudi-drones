import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interceptor Drone | Saudi Ministry of Defence — Production Storyboard",
  description: "End-to-End Manufacturing Process — Software & Hardware Designed, Built & Owned by Saudi Arabia",
  icons: {
    icon: "/saudi_emblem.png",
    apple: "/saudi_emblem.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-[#060608] text-white min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
