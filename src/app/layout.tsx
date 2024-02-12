"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import SideNavbar from "@/components/SideNavbar";
import {NextUIProvider} from "@nextui-org/react";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextUIProvider>
      <body
        className={cn(
          "min-h-screen w-full bg-white text-black flex ",
          inter.className,
          {
            "debug-screens": process.env.NODE_ENV === "development"
          }
        )}
      >
       
        <SideNavbar />
        
        <div className="p-8 w-full">{children}</div>
      

      </body>
      </NextUIProvider>
    </html>
  );
}
