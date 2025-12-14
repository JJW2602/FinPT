import { atom } from "recoil";

export interface UserState {
  studentId: string;
  name: string;
  nickname: string;
}

export const userState = atom<UserState | null>({
  key: "userState",
  default: null,
}); 