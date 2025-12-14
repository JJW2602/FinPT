'use client';

import { useTheme } from "next-themes";
import { useRecoilState } from "recoil";
import { userState } from "@/atoms/auth";
import { useRouter } from "next/navigation";
import { Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  const handleLogout = () => {
    // 로컬 스토리지 초기화
    localStorage.removeItem("user");
    // Recoil 상태 초기화
    setUser(null);
    // 홈으로 리다이렉트
    router.push("/");
  };

  // 사용자 이름의 첫 글자를 가져오는 함수
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-6">프로필</h1>
      
      {/* 프로필 카드 */}
      <Card className="">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg bg-primary/10 text-primary">
              {user && getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle>{user?.name}</CardTitle>
            <CardDescription>@{user?.nickname}</CardDescription>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[80%]">
              <AlertDialogHeader>
                <AlertDialogTitle>로그아웃 하시겠습니까?</AlertDialogTitle>
                <AlertDialogDescription>
                  로그아웃 시 다시 로그인이 필요합니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>로그아웃</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            학번: {user?.studentId}
          </div>
        </CardContent>
      </Card>

      {/* 설정 카드 */}
      <Card className="">
        <CardHeader>
          <CardTitle>설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between bg-card rounded-lg">
            <span className="font-medium">테마 설정</span>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="flex items-center space-x-2"
            >
              {theme === "light" ? (
                <>
                  <Moon className="h-5 w-5" />
                  <span>다크 모드로 전환</span>
                </>
              ) : (
                <>
                  <Sun className="h-5 w-5" />
                  <span>라이트 모드로 전환</span>
                </>
              )}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 