import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  title: string;
  summary: string;
  category: string;
  date: string;
}

export function NewsCard({ title, summary, category, date }: NewsCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-center">
          <Badge>{category}</Badge>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-3">{summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end">
          <Badge variant="outline" className="cursor-pointer">
            자세히 보기
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}