import { useRecoilState } from "recoil";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import challengesState from "@/src/recoil/atoms/challengesAtom";

export function ChallengeSection() {
  const [challenges] = useRecoilState(challengesState);

  return (
    <div className="grid gap-4">
      {challenges.map((challenge) => (
        <Card key={challenge.id}>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <challenge.icon className="h-5 w-5" />
              <CardTitle>{challenge.title}</CardTitle>
            </div>
            <CardDescription>{challenge.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress
                value={(challenge.progress / challenge.total) * 100}
              />
              <p className="text-sm text-muted-foreground text-right">
                {challenge.progress}/{challenge.total}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}