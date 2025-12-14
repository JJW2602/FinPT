"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BottomNav } from "@/components/bottom-nav";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthCheck } from "@/components/auth-check";
import { AIMentorButton } from "@/components/ai-mentor-button";


const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AuthCheck>
                <div className="flex h-screen overlay-scroll flex-col min-h-screen bg-background">
                  <main className="flex-1 bg-layout-cream container z-0 mx-auto px-6 pt-10 pb-6 mb-16">
                    {children}
                  </main>
                  <BottomNav />
                  <AIMentorButton />
                </div>
              </AuthCheck>
            </ThemeProvider>
          </RecoilRoot>
        </QueryClientProvider>
      </body>
    </html>
  );
}

