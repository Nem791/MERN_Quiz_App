import { _TAGS, _ANSWER_COLORS } from "./configs";

interface SignupInfo {
  name: string;
  email: string;
  password: string;
  gender: "male" | "female" | "other";
  birthday: string; // ?
}

type LoginInfo = Pick<SignupInfo, "email" | "password">;

type SetType = "questions" | "sliders";

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
  tags: typeof _TAGS[number];
}

interface QuestAnswerBeingCreated {
  id: number;
  color: typeof _ANSWER_COLORS[number];
  text: string;
  correct: boolean;
  warnNoText: boolean;
  animation: "deleting" | "adding" | null;
}
