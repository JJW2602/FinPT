"use client";

import { useRouter } from "next/navigation";
import { categories } from "@/atoms/learning";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export function LearningSection() {
  const router = useRouter();
  const [selectedCategory1, setSelectedCategory1] = useState<string>("");
  const [selectedCategory2, setSelectedCategory2] = useState<string>("");

  useEffect(() => {
    const saved1 = localStorage.getItem("selectedCategory1");
    const saved2 = localStorage.getItem("selectedCategory2");
    if (saved1) setSelectedCategory1(saved1);
    if (saved2) setSelectedCategory2(saved2);
  }, []);

  const handleCategory1Change = (value: string) => {
    setSelectedCategory1(value);
    localStorage.setItem("selectedCategory1", value);
  };

  const handleCategory2Change = (value: string) => {
    setSelectedCategory2(value);
    localStorage.setItem("selectedCategory2", value);
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/learn?category=${encodeURIComponent(category)}`);
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Select onValueChange={handleCategory1Change} value={selectedCategory1}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={handleCategory2Change} value={selectedCategory2}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {(selectedCategory1 || selectedCategory2) && (
        <div className="grid gap-4">
          {selectedCategory1 && (
            <Card 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleCategoryClick(selectedCategory1)}
            >
              <CardHeader>
                <CardTitle className="text-xl">{selectedCategory1}</CardTitle>
                <CardDescription>
                  {selectedCategory1} 시장과 {selectedCategory1} 상품의 기본 개념 학습
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  클릭하여 학습 시작하기
                </p>
              </CardContent>
            </Card>
          )}

          {selectedCategory2 && (
            <Card 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleCategoryClick(selectedCategory2)}
            >
              <CardHeader>
                <CardTitle className="text-xl">{selectedCategory2}</CardTitle>
                <CardDescription>
                  {selectedCategory2}과 관련된 주요 개념 학습
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  클릭하여 학습 시작하기
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}