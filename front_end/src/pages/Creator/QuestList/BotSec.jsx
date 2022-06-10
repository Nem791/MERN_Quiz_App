import { FaCaretDown, FaClock } from "react-icons/fa";
import { Box } from "../../../styledComponents/Layout";

export default function BotSec({ timeLimit }) {
  return (
    <div className="flex">
      <Box className="ml-auto mr-2 py-2 pos-relative" width="8rem">
        <button className="full-w flex align-center fs-075">
          <FaClock className="mr-1" />
          <span size="0.875rem">
            {timeLimit < 60
              ? timeLimit + " seconds"
              : timeLimit / 60 + " minutes"}
          </span>
          <FaCaretDown className="ml-auto" size="1rem" />
        </button>
      </Box>
    </div>
  );
}
