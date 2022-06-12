import { AiOutlineEdit } from "react-icons/ai";
import { BiEdit, BiUser } from "react-icons/bi";
import {
  FaRegHeart,
  FaMapMarkedAlt,
  FaRegCheckSquare,
  // FaRegFolder,
  FaRegUserCircle,
  FaTrashAlt,
} from "react-icons/fa";
import { GiBackwardTime } from "react-icons/gi";
// import { HiOutlineCog } from "react-icons/hi";
import { VscLibrary } from "react-icons/vsc";
import { mausac } from "./theme";

// export const _SERVER = "http://localhost:3000";
export const _SERVER = "https://quiz-app-791.herokuapp.com";

export const _USER_NAME_MIN_LEN = 4;
export const _PASSWORD_MIN_LEN = 6;

export const _SIDEBAR_LINKS = [
  { Icon: FaMapMarkedAlt, label: "Explore", path: "/" },
  { Icon: VscLibrary, label: "My library", path: "private" },
  // { Icon: HiOutlineCog, label: "Settings", path: "settings" },
  // { Icon: FaRegFolder, label: "Collections", path: "profile/collections" },
  { Icon: FaRegUserCircle, label: "Profile", path: "profile" },
];

export const _EXPLORE_FIELDS = [
  {
    label: "BTS",
    img: "bts_templates",
    path: "Ice-breakers and Bell Ringers",
  },
  // {
  //   label: "Math",
  //   img: "2%20-%20Mathematics",
  //   path: "Mathematics",
  // },
  {
    label: "English",
    img: "1%20-%20English%20and%20Language%20Arts",
    path: "English and Language Arts",
  },
  {
    // label: "Social Studies",
    label: "History",
    img: "3%20-%20Social%20Studies",
    path: "Social Studies",
  },
  {
    // label: "Languages",
    label: "Grammar",
    img: "5-%20World%20Languages",
    path: "World Languages",
  },
  { label: "Science", img: "4%20-%20Science", path: "Science" },
  {
    label: "Computer",
    img: "8%20-%20Computer%20Science",
    path: "Computer Science and Skills",
  },
  {
    label: "Career Ed",
    img: "lifeskills_s",
    path: "Career and Technical Education",
  },
  {
    label: "Creative Arts",
    img: "6%20-%20Creative%20Arts",
    path: "Creative Arts",
  },
  {
    label: "Health & PE",
    img: "7-%20PE%26Health",
    path: "Health and Physical Education",
  },
];

export const _LIBRARY_NAMES = [
  // "allMyContent",
  "createdByMe",
  "previouslyUsed",
  "likedQuizzes",
  "draftQuizzes",
  "get-deleted-quiz-set",
];

export const _LIBRARY_INFOS = {
  // [_LIBRARY_NAMES[0]]: {
  //   text: "All my content",
  //   Icon: BiBox,
  // },
  [_LIBRARY_NAMES[0]]: {
    text: "Created by me",
    Icon: BiUser,
  },
  [_LIBRARY_NAMES[1]]: {
    text: "Previously played",
    Icon: GiBackwardTime,
  },
  [_LIBRARY_NAMES[2]]: {
    text: "Liked by me",
    Icon: FaRegHeart,
  },
  [_LIBRARY_NAMES[3]]: {
    text: "Draft",
    Icon: BiEdit,
  },
  [_LIBRARY_NAMES[4]]: {
    text: "Deleted",
    Icon: FaTrashAlt,
  },
};

export const _TAGS = [
  "Mathematics",
  "English",
  "World Languages",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
  "Social Studies",
  "Geography",
  "History",
  "Arts",
  "Computers",
  "Physical Ed",
  "Fun",
  "Professional Development",
  "Architecture",
  "Business",
  "Design",
  "Education",
  "Instructional Technology",
  "Journalism",
  "Life Skills",
  "Moral Science",
  "Philosophy",
  "Performing Arts",
  "Religious Studies",
  "Special Education",
  "Specialty",
  "Other",
];

export const _QUEST_SET_TYPES = {
  sliders: "lesson",
  questions: "quiz",
};

export const _QUEST_TYPES = {
  multipleChoice: "Multiple-choice",
  fillInTheBlank: "Fill-in-the-blank",
};

export const _QUEST_TYPE_RENDER_INFOS = [
  {
    Icon: FaRegCheckSquare,
    text: _QUEST_TYPES.multipleChoice,
    bgColor: mausac.xanhngoc,
  },
  {
    Icon: AiOutlineEdit,
    text: _QUEST_TYPES.fillInTheBlank,
    bgColor: mausac.vang,
  },
];

export const _ANSWER_COLORS = [
  mausac.xanhbien,
  mausac.xanhngoc,
  mausac.vang,
  mausac.dohong,
  mausac.timnhat,
];
