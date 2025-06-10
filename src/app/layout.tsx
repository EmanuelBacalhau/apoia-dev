import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { QueryClientContext } from "@/providers/query-client";

const font = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Donart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${font.variable} antialiased`}>
        <SessionProvider>
          <QueryClientContext>
            {children}
            <Toaster duration={3000} />
          </QueryClientContext>
        </SessionProvider>
      </body>
    </html>
  );
}
