import { useEffect } from "react";
import styled from "styled-components";
import cn from "classnames";

export default function Modal({ standard, contentClassName, close, children }) {
  useEffect(() => {
    const handlePressEsc = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handlePressEsc, true);
    return () => document.removeEventListener("keydown", handlePressEsc, true);
  }, []);
  return (
    <ModalLayout>
      <div className="layout full-w full-h" onClick={close} />
      {standard || contentClassName ? (
        <ModalContent className={cn(contentClassName)}>{children}</ModalContent>
      ) : (
        children
      )}
    </ModalLayout>
  );
}

export const ModalLayout = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  .layout {
    background-color: rgba(0, 0, 0, 0.6);
  }
  & > div:nth-child(2) {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10;
    transform: translate(-50%, -50%);
  }
`;

export const ModalContent = styled.div`
  width: 90vw;
  height: 90vh;
  border-radius: 0.625rem;
  background-color: white;
  box-shadow: 0 0 3px white;
  @media (min-width: 440px) {
    width: 398.45px;
  }
  @media (min-width: 610px) {
    width: 586px;
  }
  @media (min-width: 769px) {
    width: 722px;
  }
  @media (min-width: 1025px) {
    height: 85vh;
    width: 944px;
  }
`;
