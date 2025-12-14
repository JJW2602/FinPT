import { atom } from "recoil";

export interface Question {
  question: string;
  samples: string[];
  answer: string;
  correct: string;
}

const leagueQuestionsState = atom<Question[]>({
  key: 'leagueQuestionsState',
  default: [
    {
      question: "금리가 상승하면 어떤 일이 발생할까요?",
      samples: ["대출이 증가한다", "저축이 증가한다", "투자가 감소한다", "소비가 증가한다"],
      answer: "대출이 증가한다",
      correct: "대출이 증가한다",
    },
    {
      question: "인플레이션이란 무엇인가요?",
      samples: ["물가 상승", "물가 하락", "경제 성장", "실업률 증가"],
      answer: "물가 상승",
      correct: "물가 상승",
    },
    {
      question: "주식 시장의 상승을 무엇이라고 하나요?",
      samples: ["베어 마켓", "불 마켓", "리세션", "디플레이션"],
      answer: "불 마켓",
      correct: "불 마켓",
    },
    {
      question: "금융 자산의 안전성을 높이는 방법은?",
      samples: ["다양한 자산에 투자", "모든 자산을 한 곳에 투자", "단기 투자", "고위험 자산에 투자"],
      answer: "다양한 자산에 투자",
      correct: "다양한 자산에 투자",
    },
    {
      question: "채권의 수익률이 상승하면 어떤 일이 발생하나요?",
      samples: ["채권 가격이 상승한다", "채권 가격이 하락한다", "금리가 하락한다", "투자가 증가한다"],
      answer: "채권 가격이 하락한다",
      correct: "채권 가격이 하락한다",
    },
  ],
});

export default leagueQuestionsState; 