"use client";

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/atoms/auth";
import { LoginForm } from "@/components/login-form";

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [setUser]);

  if (!user) {
    return (
      <div className="min-h-screen flex p-4 items-center justify-center">
        <LoginForm />
      </div>
    );
  }

  return <>{children}</>;
} 