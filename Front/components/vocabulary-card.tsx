"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Word {
  word: string;
  explanation: string;
}

interface VocabularyCardProps {
  words: Word[];
}

function highlightText(text: string) {
  // 정규식으로 **단어** 패턴 탐지
  const parts = text.split(/(\*\*.*?\*\*)/);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      // ** 제거 후 굵게 표시
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part; // 일반 텍스트는 그대로 반환
  });
}

export function VocabularyCard({ words }: VocabularyCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < words.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="pt-12 pb-12 px-8 bg-white rounded-xl shadow relative">
    <div className="absolute top-3 left-0 right-0 flex justify-center space-x-4 -mt-2">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="w-4 h-4 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full
          before:absolute before:w-6 before:h-1.5 before:bg-slate-300 before:-rotate-45 before:rounded-full"
        />
      ))}
    </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-center">
              {words[currentIndex].word}
            </h2>
            <p className="text-gray-600 text-center leading-relaxed whitespace-break-spaces">
              {highlightText(words[currentIndex].explanation)}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* 이전/다음 버튼 */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="bg-white shadow-md hover:bg-gray-100"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex === words.length - 1}
            className="bg-white shadow-md hover:bg-gray-100"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* 하단 페이지 표시 */}
        <div className="flex justify-center gap-2 mt-8">
          {words.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx === currentIndex 
                  ? "bg-blue-500" 
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
  );
}