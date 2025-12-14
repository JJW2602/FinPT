import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractBoldWords(input: string) {
  // 정규식을 사용하여 **{단어}** 형식의 단어 추출
  const matches = input.match(/\*\*(.*?)\*\*/g);
  if (matches) {
      // **을 제거하고 단어만 반환
      return matches.map(word => word.replace(/\*\*/g, ""));
  }
  return []; // 매칭되는 단어가 없으면 빈 배열 반환
}