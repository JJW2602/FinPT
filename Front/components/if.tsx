interface IfProps {
  condition: any;
  children: React.ReactNode;
}

export function If({ condition, children }: IfProps) {
  if (condition === undefined || condition === null || condition === false) {
    return null;
  }

  return <>{children}</>;
} 