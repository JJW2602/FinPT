import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Users } from "lucide-react";

export function LeagueSection() {
  const router = useRouter();

  const leagueData = {
    currentRank: 42,
    totalParticipants: 156,
    correctRate: 75,
    currentLeague: "실버",
  };

  return (
    <div className="space-y-6">
      <Card className="">
        <CardHeader>
          <CardTitle>Yonsei university 리그 현황</CardTitle>
          <CardDescription>실시간 업데이트되는 리그 순위입니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">현재 순위</p>
              <p className="text-2xl font-bold">
                {leagueData.currentRank}/{leagueData.totalParticipants}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">누적 정답수</p>
              <p className="text-2xl font-bold">{leagueData.correctRate}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">현재 리그</p>
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <p className="text-2xl font-bold">{leagueData.currentLeague}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">참가자 수</p>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <p className="text-2xl font-bold">
                  {leagueData.totalParticipants}명
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="">
        <CardHeader>
          <CardTitle>새로운 리그</CardTitle>
          <CardDescription>
            매주 월요일 새로운 리그가 시작됩니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => router.push('/league/join')}>
            리그 참여하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}