import { TAGS } from "./configs";

interface SignupInfo {
  name: string;
  email: string;
  password: string;
  gender: "male" | "female" | "other";
  birthday: string; // ?
}

type LoginInfo = Pick<SignupInfo, "email" | "password">;

type SetType = "lesson" | "quiz";

interface SetInfoOnExplore {
  title: string;
  img: string;
  type: SetType;
  plays: number;
  quests: number;
}

interface SetCreateInfo {
  name: string;
  type: SetType;
  tags: typeof TAGS[number];
}
