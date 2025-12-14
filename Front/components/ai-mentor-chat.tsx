"use client";
import "@/app/globals.css";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { Loader } from "@/components/ui/loader";

enum MessageRole {
  user = "user",
  assistant = "assistant"
}

type Message = {
  role: MessageRole;
  isLoading?: boolean;
  content: string;
}

const firstMessage: Message = {
  role: MessageRole.assistant,
  content: "안녕하세요! 경제와 금융에 대해 궁금한 점을 물어보세요.",
}

async function sendMessage(message: string, callback: (message: string) => void) {
  fetch(`http://localhost:8000/chatbot?input_value=${message}`)
    .then((res) => res.json())  // JSON 데이터로 변환
    .then((data) => {
      console.log(data)  // 실제 데이터 확인
      callback(data.result)
    })
    .catch((error) => {
      console.error('데이터 가져오기 실패:', error)
    })
}

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

export function AIMentorChat() {
  const [messages, setMessages] = useState<Message[]>([firstMessage]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // 메시지가 추가될 때마다 스크롤 맨 아래로 이동
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

const Loader = () => {
  return (
    <span
      style={{
        display: "inline-block",
        width: "1rem",
        height: "1rem",
        border: "2px solid #ccc",
        borderTop: "2px solid transparent", // 투명한 상단
        borderRadius: "50%", // 동그라미 형태
        animation: "spin 1s linear infinite", // 애니메이션 이름과 속성
        marginLeft: "0.5rem", // 텍스트와 간격
      }}
    ></span>
  );
};


    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      setTimeout(() => {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        });
      }, 100); // 약간의 딜레이를 주어 DOM 업데이트 보장
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const newMessages: Message[] = [
      ...messages,
      { role: MessageRole.user, content: input },
      { role: MessageRole.assistant, content: "답변을 생성중입니다", isLoading: true },
    ]
    setMessages(newMessages)

    
    // FIXME: 진짜 message 보내는 코드
    sendMessage(input, (message: string) => {
      setMessages([
        ...newMessages.slice(0, -1),
        {
          role: MessageRole.assistant,
          content: message,
        },
      ])
    })
  
    setInput("");
  }

  return (
    <div className="h-full flex flex-col px-4">
      <div className="flex-1 space-y-2 flex flex-col">
        <div className="flex flex-row gap-4 items-center">
          <h1 className="text-2xl font-bold whitespace-nowrap">AI 멘토</h1>
          <span className="text-sm text-muted-foreground">
            💁🏻‍♀️ 궁금한 점은 AI 멘토에게 물어보세요
          </span>
        </div>

        <ScrollArea ref={scrollRef} className="flex-grow bg-white shadow rounded-lg p-4 " style={{ flex: "1 1 100px"}}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] text-sm rounded-lg p-3 whitespace-break-spaces ${
                    message.role === "user"
                      ? "bg-customGreen text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <span>
                  {highlightText(message.content)}
                  {message.isLoading && <Loader />}
                  </span>

                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex gap-2 py-4">
        <Input
          autoFocus
          placeholder="질문을 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button className="w-10 h-10" onClick={handleSend}>
          <Send className="h-4 w-4 shrink-0" />
        </Button>
      </div>
    </div>
  );
} 