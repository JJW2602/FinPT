import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Newspaper, Brain, Trophy } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Newspaper className="h-6 w-6" />
            <span className="font-bold">EcoLearn</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/ai-mentor" className="flex items-center">
              <Brain className="mr-2 h-4 w-4" />
              AI 멘토
            </Link>
            <Link href="/league" className="flex items-center">
              <Trophy className="mr-2 h-4 w-4" />
              리그/챌린지
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="secondary">로그인</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}