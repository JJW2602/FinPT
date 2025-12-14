"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Trophy, User } from "lucide-react";
import { useTheme } from "next-themes";

export function BottomNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const navigation = [
    // { name: "AI 멘토", href: "/ai-mentor", icon: Brain },
    { name: "리그", href: "/league", icon: Trophy },
    { name: "홈", href: "/", icon: Home },
    { name: "프로필", href: "/profile", icon: User }, 
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="container mx-auto">
        <div className="flex justify-around items-center h-16">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col w-12 items-center justify-center flex-1 h-full",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}