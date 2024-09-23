"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/redux/Provider";
// import { NavBarComponent } from "@/components/Navbar";
import MainComponent from "@/components/Navbar/Main";
import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <html lang="en">
      <body>
        <Providers>
          {pathName == "/" ? (
            children
          ) : (
            <MainComponent>{children}</MainComponent>
          )}
        </Providers>
      </body>
      {/* <Toaster richColors closeButton position="top-right" /> */}
    </html>
  );
}
