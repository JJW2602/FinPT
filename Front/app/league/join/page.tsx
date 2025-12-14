"use client"

import { useRouter } from "next/navigation"; // Next.js의 useRouter import
import { Button } from "@/components/ui/button"; // Button 컴포넌트 import
import { ArrowLeft, MessageCircleQuestion } from "lucide-react"; // 뒤로가기 아이콘 import
import { useRecoilValue } from "recoil";

import { useState } from "react";
import leagueQuestionsState from "@/src/recoil/atoms/leagueAtom";
import { Card } from "@/components/ui/card";

const LeagueJoinPage = () => {
  const router = useRouter(); // useRouter 훅 사용
  const questions = useRecoilValue(leagueQuestionsState); // Recoil 상태에서 질문 가져오기
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null); // 다음 문제로 넘어갈 때 선택된 답변 초기화
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null); // 이전 문제로 돌아갈 때 선택된 답변 초기화
    }
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">리그</h1>
      </div>
      <main>
        <div className="p-4">
          {/* <div className="flex items-center place-content-between flex-row gap-2">
            <h1 className="text-lg font-bold">리그 문제</h1>
          </div> */}
            
          <Card className="mt-8 bg-white px-6 py-10 space-y-3">
            <p className="text-muted-foreground">{currentQuestionIndex + 1} / {questions.length} 문제</p>
            <div>
              <MessageCircleQuestion size={18} className="inline mr-1 mb-0.5"/>
              <h2 className="text-md font-semibold inline">{questions[currentQuestionIndex].question}</h2>
            </div>
            <div className="mt-2">
              {questions[currentQuestionIndex].samples.map((sample, index) => (
                <Button
                  key={index}
                  variant={'outline'}
                  className={`w-full mt-2 ${selectedAnswer === sample ? 'bg-blue-800/10 hover:bg-blue-800/10 border-blue-900/20 font-bold' : ''}`}
                  onClick={() => handleAnswerSelect(sample)}
                >
                  {sample}
                </Button>
              ))}
            </div>
          </Card>
          <div className="mt-4 flex flex-row place-content-between">
            <Button variant={'outline'} onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              이전 문제
            </Button>
            {isLastQuestion ? (
              <Button 
              onClick={() => {
                // TODO: 리그 결과 제출
                router.push('/league/finished')}
              } 
              className="ml-2">
                제출하기
              </Button>
            ) : (
              <Button 
                variant={'outline'} 
                onClick={handleNextQuestion} 
                className="ml-2" 
                disabled={!selectedAnswer}>
                다음 문제
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeagueJoinPage; 