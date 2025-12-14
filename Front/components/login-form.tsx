"use client";

import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userState, type UserState } from "@/atoms/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Newspaper } from "lucide-react";

export function LoginForm() {
  const setUser = useSetRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    nickname: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const userData: UserState = {
      studentId: formData.studentId,
      name: formData.name,
      nickname: formData.nickname,
    };
    
    // Fake loading
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">로그인 중...</p>
          </div>
        </div>
      )}
      
      <Card className="w-[400px] ">
        <CardHeader className="space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-6">
              <Newspaper className="h-12 w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            {/* TODO: 서비스 이름, 로고 이미지 추가 */}
            {/* X에 오신 것을 환영합니다 */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">학번</Label>
              <Input
                id="studentId"
                required
                placeholder="학번을 입력하세요"
                value={formData.studentId}
                onChange={(e) =>
                  setFormData({ ...formData, studentId: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                required
                placeholder="이름을 입력하세요"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nickname">닉네임</Label>
              <Input
                id="nickname"
                required
                placeholder="닉네임을 입력하세요"
                value={formData.nickname}
                onChange={(e) =>
                  setFormData({ ...formData, nickname: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full mt-6" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  로그인 중...
                </>
              ) : (
                "시작하기"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}