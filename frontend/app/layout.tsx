import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ChatWidget } from "@/components/ChatWidget";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Alevate Spaces | House of Brands",
  description: "A premier collection of D2C brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(outfit.variable, "font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground")}
        suppressHydrationWarning
      >
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
