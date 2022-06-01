import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import { imgLink } from "../../../helpers/misc";
import StyledCarousel from "./Carousel.styles";

const comments = [
  "Quizizz has been such an incredible resource for me during this remote learning period. THANK YOU to the Quizizz team for being so responsive to teacher needs!",
  "One of our math teachers started using Quizizz this week and it was a game changer for her and her students.",
  "I have use Quizizz for a few years now and it never dissappoints. The excitement in their faces is everything! 😊 ",
];

const picUrls = [
  "mkt/2-SOCIAL_PROOF-User_Image_2",
  "mkt/2-SOCIAL_PROOF-User_Image_1",
  "mkt/2-SOCIAL_PROOF-User_Image_3",
];

const commenters = [
  {
    name: "Sarah Whitman",
    label: "Middle School ELA",
  },
  {
    name: "Sean Scanion",
    label: "Director of Curriculumn a& Instruction",
  },
  {
    name: "Mrs. Gonzalez",
    label: "Third Grade Teacher",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [expand, setExpand] = useState(true);
  const lastest = useRef(0);

  useEffect(() => {
    setExpand(true);
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!lastest.current || Date.now() - lastest.current > 4000) {
        setIndex((prev) => (prev + 1 > 2 ? 0 : prev + 1));
        lastest.current = 0;
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StyledCarousel index={index}>
      <div
        className={cn("comment flex align-center", { expand })}
        onAnimationEnd={() => setExpand(false)}
      >
        <p>{comments[index]}</p>
      </div>
      <div className="avatar-queue flex-center">
        {picUrls.map((url, i) => {
          const active = i === index;
          return (
            <div
              key={i}
              className={cn("pic-wrapper b-radius-round pointer", { active })}
              onClick={() => {
                lastest.current = Date.now();
                if (!active) {
                  setExpand(false);
                  setIndex(i);
                }
              }}
            >
              <img src={imgLink(url)} alt="" />
            </div>
          );
        })}
      </div>
      <div className="commenter">
        <p className="name">{commenters[index].name}</p>
        <p className="mt-1 label">{commenters[index].label}</p>
      </div>
    </StyledCarousel>
  );
}
