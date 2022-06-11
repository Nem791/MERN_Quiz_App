import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CHOOSE_ANSWER_CORRECT,
  EDIT_ANSWER,
  EDIT_QUESTION,
  OPEN_CREATOR,
  OPEN_EDITOR,
} from "./app/creatorSlice/actions";
import { SAVE_QUEST } from "./app/creatorSlice/thunks";
import { _QUEST_TYPES } from "./configs";

export function useDevActions() {
  const userName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userName) {
      dispatch(
        OPEN_CREATOR({ type: "questions", name: "Demo", tags: ["English"] })
      );
      dispatch(OPEN_EDITOR(_QUEST_TYPES.multipleChoice));
      setTimeout(() => {
        dispatch(EDIT_QUESTION("Question content"));
        dispatch(EDIT_ANSWER({ id: 1, text: "A" }));
        dispatch(EDIT_ANSWER({ id: 2, text: "B" }));
        dispatch(EDIT_ANSWER({ id: 3, text: "C" }));
        dispatch(EDIT_ANSWER({ id: 4, text: "D" }));
      }, 200);
      setTimeout(() => {
        dispatch(CHOOSE_ANSWER_CORRECT(2));
        dispatch(SAVE_QUEST());
        navigate("/creator");
      }, 400);
    }
  }, [userName]);
}

export function useGetHeight() {
  const ref = useRef();
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentBoxSize) {
          const contentBoxSize = Array.isArray(entry.contentBoxSize)
            ? entry.contentBoxSize[0]
            : entry.contentBoxSize;
          setHeight(contentBoxSize.blockSize);
        } else {
          setHeight(entry.contentRect.height);
        }
      }
    });
    const elmt = ref.current;
    resizeObserver.observe(elmt);
    return () => resizeObserver.unobserve(elmt);
  }, []);
  return [ref, Math.ceil(height)];
}

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export function useCollapseCtrl() {
  const [collapsed, setCollapsed] = useState(false);
  const ctrlRef = useRef();
  const collapseRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (collapseRef.current && !collapseRef.current.contains(e.target)) {
        if (!ctrlRef.current) return;
        if (ctrlRef.current.contains(e.target)) {
          setCollapsed((prev) => !prev);
        } else {
          setCollapsed(false);
        }
      }
    };
    window.addEventListener("click", handleClick, true);
    return () => window.removeEventListener("click", handleClick, true);
  }, [setCollapsed]);

  return [collapsed, setCollapsed, ctrlRef, collapseRef];
}
