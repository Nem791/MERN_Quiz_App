import {
  FaMapMarkedAlt,
  FaRegFolder,
  FaRegUserCircle,
  FaRegCheckSquare,
} from "react-icons/fa";
import { HiOutlineCog } from "react-icons/hi";
import { VscLibrary } from "react-icons/vsc";
import { AiOutlineEdit } from "react-icons/ai";
import { mausac } from "./theme";

export const USER_NAME_MIN_LEN = 4;
export const PASSWORD_MIN_LEN = 6;

export const SIDEBAR_LINKS = [
  { Icon: FaMapMarkedAlt, label: "Explore", path: "/" },
  { Icon: VscLibrary, label: "My library", path: "private" },
  { Icon: HiOutlineCog, label: "Settings", path: "settings" },
  { Icon: FaRegFolder, label: "Collections", path: "profile/collections" },
  { Icon: FaRegUserCircle, label: "Profile", path: "profile" },
];

export const EXPLORE_FIELDS = [
  {
    label: "BTS",
    img: "bts_templates",
    path: "Ice-breakers and Bell Ringers",
  },
  {
    label: "Math",
    img: "2%20-%20Mathematics",
    path: "Mathematics",
  },
  {
    label: "English",
    img: "1%20-%20English%20and%20Language%20Arts",
    path: "English and Language Arts",
  },
  {
    label: "Social Studies",
    img: "3%20-%20Social%20Studies",
    path: "Social Studies",
  },
  {
    label: "Languages",
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

export const TAGS = [
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

export const QUIZ_TYPES = [
  { Icon: FaRegCheckSquare, text: "Multiple-choice", bgColor: mausac.xanhngoc },
  { Icon: AiOutlineEdit, text: "Fill-in-the-blank", bgColor: "#EFA929" },
];
