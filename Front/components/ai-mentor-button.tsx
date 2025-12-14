"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { AIMentorChat } from "./ai-mentor-chat";

export function AIMentorButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-5 h-12 w-12 rounded-full shadow-lg bg-blue-950 hover:bg-blue-900 z-40"
        aria-label="AI 멘토 열기"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AIMentorChat />
      </BottomSheet>
    </>
  );
} 