"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FinishedPage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3); // 카운트다운 초기값 설정

  useEffect(() => {
    // confetti({
    //   spread: 50,
    //   gravity: 0.8,
    //   shapes: [confetti.shapeFromText({ text: '💰', scalar: 2 })],
    //   scalar: 2,
    //   particleCount: 30,
    // });

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          router.push('/league'); // 3초 후 리그 페이지로 이동
          return prev;
        }
        return prev - 1; // 카운트다운 감소
      });
    }, 1000); // 1초마다 감소

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-full flex-grow p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">결과가 제출되었습니다.</h1>
        <p className="text-base text-muted-foreground mb-4">3초 후에 리그 결과 화면으로 이동합니다.</p>
        <h2 className="text-4xl animate-pulse font-bold ">{countdown}</h2>
      </div>
    </div>
  )
}

export default FinishedPage;
