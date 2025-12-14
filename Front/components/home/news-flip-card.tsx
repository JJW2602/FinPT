import { ArrowLeft, ArrowRight, CheckCircle, MessageCircleQuestion } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { useRecoilState } from "recoil";
import newsStates from "@/src/recoil/atoms/newAtom";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Card } from "../ui/card";

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

export function NewsFlipCard() {
  // const [isFlipped, setIsFlipped] = useState(false)
  // const [newsData, setNewsData] = useState<NewsType[]>([])
  const [news, setNews] = useRecoilState(newsStates)
  
  useEffect(() => {
    fetch('http://localhost:8000/news')
      .then((res) => res.json())  // JSON 데이터로 변환
      .then((data) => {
        console.log(data)  // 실제 데이터 확인

        // Recoil에 데이터 세팅
        setNews((prev) => ({ 
          ...prev, 
          data: data 
        }))
      })
      .catch((error) => {
        console.error('데이터 가져오기 실패:', error)
      })
  }, [])
  
  const formattedDate = useMemo(() => {
    const today = new Date();
    return `${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, '0')}월 ${String(today.getDate()).padStart(2, '0')}일`;
  }, []);

  const isFlipped = news.selectedIndex && news.selectedIndex >= 0
  const currentNews = useMemo(() => {
    if (news?.data && news.selectedIndex !== undefined) {
      return news?.data?.[news.selectedIndex]
    }
    return undefined
  }, [news])

  return (
    <div className="perspective">
      <div
        className={`relative h-[500px] cursor-pointer [transform-style:preserve-3d] transition-transform duration-700 ${
          news.selectedIndex !== undefined ? "[transform:rotateY(180deg)]" : ""
        }`}
        // onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* 앞면 */}
        <div className="absolute w-full h-full rounded-xl flex flex-col items-center p-8 [backface-visibility:hidden] bg-gradient-to-br from-gray-50 via-gray-50/80 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-800/50 border-2 border-gray-200 dark:border-gray-800">
          <div className="w-full w-9/10 space-y-4">
            <div className="flex items-center justify-center gap-2 flex-col">
              <h3 className="text-xl font-bold text-gray-900/90 dark:text-gray-100/90 text-center">
                오늘의 이슈 요약
              </h3>
              <Badge variant="outline" className="cursor-default bg-gray-50 border-gray-300 font-medium text-gray-600/50">{formattedDate}</Badge>
            </div>
            <div className="space-y-3 font-medium ">
              {/* TODO: 뉴스 요약 데이터 list로 받아오기 */}
              {news.data?.map((news, index) => (
                // { news?.data?.map((news, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 rounded-lg bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all hover:bg-gray-50 dark:hover:bg-gray-900/80"
                  onClick={(e) => {
                    e.stopPropagation()
                    setNews((prev) => ({ ...prev, selectedIndex: index }))
                  }}
                >
                  <CheckCircle className="h-3.5 w-3.5 shrink-0 mt-1 text-gray-500 dark:text-gray-400" />
                  <span className="ml-3 text-sm break-words text-gray-900 dark:text-gray-200">
                    {news.content}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 right-4 text-sm text-gray-500 dark:text-gray-400">
            Click to flip →
          </div>
        </div>

        {/* 뒷면 */}
        <div onClick={() => {
          setNews((prev) => ({...prev, selectedIndex: undefined}))
        }} className="absolute w-full h-full rounded-xl p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center bg-gradient-to-br from-gray-100/50 via-gray-50/30 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-800/50 border border-gray-200 dark:border-gray-800">
          <h3 className="flex items-start p-4 text-lg font-bold rounded-lg bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 shadow-sm  transition-all w-full">
            <CheckCircle className="h-3.5 w-3.5 shrink-0 mt-1 text-gray-500 dark:text-gray-400" />
            <span className="ml-3 text-sm break-words text-gray-900 dark:text-gray-200">
             {
               news.selectedIndex == undefined
                ? ''
                 : currentNews?.content
              }
              </span>
          </h3>
          <div className ="inline-block flex items-start p-4 text-lg font-bold rounded-lg bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 shadow-sm  transition-all  mt-4">
            <div className="mb-6">
              <p className="text-center">🤔용어설명</p>
              <p className="text-base flex-grow font-medium mb-4 text-gray-800 dark:text-gray-100 text-center border border-gray-200 dark:border-gray-700/50 shadow-sm  transition-all  mt-4">
                {
                  news.selectedIndex == undefined || !currentNews?.word_dictionary
                  ? ''
                  : highlightText(currentNews.word_dictionary)
                }
              </p>
            </div>
           
          </div>
          <div className="w-full flex flex-row place-content-between mt-6">
            {/* <Link href={currentNews?.url ?? ""} onClick={(e) => e.stopPropagation()}> */}
            <NewsQuestionButton/>
            {/* </Link> */}
            <Link href={currentNews?.url ?? ""} onClick={(e) => e.stopPropagation()}>
              <Button variant="outline" className="bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700">
                전체 뉴스 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {/* <div className="absolute bottom-4 right-4 text-sm text-gray-500 dark:text-gray-400">
            ← Click to flip back
          </div> */}
        </div>
      </div>
    </div>
  );
}


function NewsQuestionButton() {
  const [news, setNews] = useRecoilState(newsStates)
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined);
  const [sendAnswer, setSendAnswer] = useState<boolean>(false);

  const currentNews = useMemo(() => {
    if (news?.data && news.selectedIndex !== undefined) {
      return news?.data?.[news.selectedIndex]
    }
    return undefined
  }, [news])


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={(e) => e.stopPropagation()} variant="outline" className="bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          퀴즈 풀기
        </Button>
      </DialogTrigger>
      <DialogContent onClick={(e)=> e.stopPropagation()} className="max-w-[90%] rounded-lg">
        <Card className="mt-4 bg-white px-3 py-5 space-y-3">
            {/* <p className="text-muted-foreground">문제</p> */}
            <div>
              <MessageCircleQuestion size={18} className="inline mr-1 mb-0.5"/>
              <h2 className="text-md font-semibold inline">{currentNews?.test_question}</h2>
            </div>
            <div className="mt-2">
              {[
                currentNews?.test_option1,
                currentNews?.test_option2,
                currentNews?.test_option3,
                currentNews?.test_option4,
              ].map((sample, index) => (
                <div
                  key={index}
                  className={`w-full mt-2  cursor-pointer py-2 rounded border text-center text-sm 
                    ${selectedAnswer === sample 
                      ? 'font-bold '
                      : ' '}

                    ${selectedAnswer === sample && sendAnswer && (selectedAnswer === currentNews?.test_answer 
                      ? ' bg-green-600/30 border-green-900 font-bold' 
                      : ' bg-red-600/30 border-red-900 font-bold'
                    )}
                    `}
                  onClick={() => !sendAnswer && setSelectedAnswer(sample)}
                >
                  {sample}
                </div>
              ))}
            </div>

            <Button className="w-full mt-3" onClick={() => setSendAnswer(true)}>
              제출하기
            </Button>
          </Card>
      </DialogContent>
    </Dialog>
  )
}