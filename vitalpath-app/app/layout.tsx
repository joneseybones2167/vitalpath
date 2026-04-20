import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "VitalPath Member Portal",
  description:
    "Your health data, finally understood. Labs, wearables, and physician insights in one longitudinal view.",
};

// Next.js 14: themeColor and viewport go in a separate export
export const viewport: Viewport = {
  themeColor: "#0F0F0E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
          Load the exact same fonts the pitch site uses so design feels consistent.
          Using <link> rather than next/font keeps the Cloudflare build simple.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
