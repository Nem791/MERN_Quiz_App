import { useSelector } from "react-redux";

export default function QuestList() {
  const questIds = useSelector((state) => state.creator.savedQuests.allIds);
  console.log(questIds);
  return <div></div>;
}
