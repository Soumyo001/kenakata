import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import AppThemeProvider from "@/components/providers/app-theme-provider";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets:['latin'],
  variable:'--font-sans'
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: { default: "Kenakata", template: "%s | Kenakata" },
    description: "Your one and only place to buy everything",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <AppThemeProvider>
          <div className="flex-1 min-w-0 w-full flex flex-col">
            {children}
          </div>
          <Toaster richColors position="top-right"/>
        </AppThemeProvider>
      </body>
    </html>
  );
}
