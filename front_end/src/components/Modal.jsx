import { useEffect } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";

export default function Modal({ close, children }) {
  useEffect(() => {
    const handlePressEsc = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handlePressEsc, true);
    return () => document.removeEventListener("keydown", handlePressEsc, true);
  }, []);
  return ReactDOM.createPortal(
    <ModalLayout>
      <div className="modal-layout full-w full-h" onClick={close} />
      {children}
    </ModalLayout>,
    document.querySelector("#portal")
  );
}

export const ModalLayout = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  .modal-layout {
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
