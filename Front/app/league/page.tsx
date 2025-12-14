"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeagueSection } from "@/components/league-section";
import { ChallengeSection } from "@/components/challenge-section";

export default function LeaguePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">리그 & 챌린지</h1>
      <Tabs defaultValue="league" className="space-y-4">
        <TabsList>
          <TabsTrigger value="league">리그</TabsTrigger>
          <TabsTrigger value="challenge">챌린지</TabsTrigger>
        </TabsList>
        <TabsContent value="league" className="space-y-4">
          <LeagueSection />
        </TabsContent>
        <TabsContent value="challenge" className="space-y-4">
          <ChallengeSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}