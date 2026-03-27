import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Framer Form Builder",
  description: "Build and export production-ready Framer forms with live preview and code generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
