export interface Challenge {
  id: number;
  title: string;
  description: string;
  progress: number;
  total: number;
  icon: React.ElementType; // 아이콘 컴포넌트 타입
} 