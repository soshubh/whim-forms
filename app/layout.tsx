import type { Metadata } from "next";
import "./globals.css";
import "./form.css";
import { Roboto, Inter } from "next/font/google";

const interHeading = Inter({subsets:['latin'],variable:'--font-heading'});

const roboto = Roboto({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={`${roboto.variable} ${interHeading.variable}`}>
      <body>{children}</body>
    </html>
  );
}
