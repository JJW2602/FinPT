"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { VocabularyCard } from "@/components/vocabulary-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Word {
  word: string;
  explanation: string;
}

export default function LearnPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/learn?category=${category}`);
        const data = await response.json();
        setWords(data);
      } catch (error) {
        console.error("단어 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (category) {
      fetchWords();
    }
  }, [category]);

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{category}</h1>
      </div>

      {isLoading ? (
        <div className="text-center">로딩 중...</div>
      ) : words.length > 0 ? (
        <VocabularyCard words={words} />
      ) : (
        <div className="text-center">단어를 불러올 수 없습니다.</div>
      )}
    </div>
  );
}