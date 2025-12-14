import { atom, selector } from "recoil";

export type Category = "금융" | "증권" | "산업" | "벤처" | "부동산" | "글로벌경제" | "생활경제";

export interface WordItem {
  id: string;
  word: string;
  explanation: string;
}

export interface LearningState {
  selectedCategory: Category | null;
  currentIndex: number;
  words: WordItem[];
  completed: boolean;
}

export const learningState = atom<LearningState>({
  key: 'learningState',
  default: {
    selectedCategory: null,
    currentIndex: 0,
    words: [],
    completed: false
  }
});

export const categories: Category[] = ["금융", "증권", "산업", "벤처", "부동산", "글로벌경제", "생활경제"];