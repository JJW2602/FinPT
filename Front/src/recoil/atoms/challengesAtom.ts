import { atom } from "recoil";
import { Challenge } from "../types"; // 타입 import
import { Calendar, Target, Trophy } from "lucide-react";

const challengesState = atom<Challenge[]>({
  key: 'challengesState',
  default: [
    {
      id: 1,
      title: "7일 연속 출석",
      description: "매일 로그인하고 뉴스를 읽어보세요",
      progress: 5,
      total: 7,
      icon: Calendar,
    },
    {
      id: 2,
      title: "리그 누적정답수 100 달성",
      description: "리그에서 높은 정답수에 도전하세요",
      progress: 75,
      total: 100,
      icon: Target,
    },
    {
      id: 3,
      title: "골드 리그 승급",
      description: "더 높은 리그에 도전하세요",
      progress: 60,
      total: 100,
      icon: Trophy,
    },
  ],
});

export default challengesState; // 아톰 export 