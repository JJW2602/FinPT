"use client";

import { NewsFlipCard } from "@/components/home/news-flip-card";
import { If } from "@/components/if";
import { LearningSection } from "@/components/learning-section";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { ArrowRight, Bolt } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const shortsId = "ec_paPqu2Jw?si=r4rczV-j2vWcsaBW"
export default function Home() {
  // NOTE: 챌린지 중이면 Home 최상단에 챌린지 중이라는 벳지 보여줌
  // TODO: 챌린지 중 상태 트래킹하기
  const [isChallenge, setIsChallenge] = useState(true)
  const router = useRouter()

  return (
    <div className="space-y-6 ">
      <section className="space-y-6">
        <If condition={isChallenge}>
          <div
            onClick={() => router.push("/league")}  
            className="fixed border-b-2 border-blue-200/50 px-6 top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-400/20 via-blue-500/20 to-blue-400/20 backdrop-blur-sm py-2.5 flex items-center justify-center gap-1.5"
          >
            <Bolt className="h-4 w-4 animate-pulse text-blue-900/80" strokeWidth={2.5} />
            <p className="text-sm font-medium text-blue-900/80 flex-grow">
              현재 챌린지 진행중
            </p>

            <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/20">
              <ArrowRight className="h-4 w-4 text-blue-700" />
              <p className="text-center text-sm font-medium text-blue-700">
                리그로 이동하기
              </p>
            </div>
          </div>
        </If>

        <div className={cn(isChallenge ? 'pt-8' : 'pt-4', "pb-4 w-full")}>
          <NewsFlipCard />
        </div>


        <div className="flex flex-col gap-6 py-10">
          <div className="flex flex-row gap-2">
          <h2 className="text-2xl font-bold tracking-tight flex-grow">영상 학습</h2>
          <Link href={'/shorts'}>
          <Button variant={'link'} size={'sm'}>
            뉴스 관련 쇼츠 보러가기
          </Button>
          </Link>
          </div>
          <iframe 
          src={`https://www.youtube.com/embed/${shortsId}?&autoplay=1&mute=1`}
          title="YouTube video player"
          className="w-full max-h-screen min-h-[70vh]" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen></iframe>
        </div>
      </section>
      
      <section className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight flex-grow">맞춤 학습</h2>
        <LearningSection />
      </section>
    </div>
  );
}