import { useCallback, useEffect, useState } from "react";
import Hero from "./Hero";
import NavBar from "./NavBar";
import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";
import { StyledLandingPage } from "./styles";
import Testimonials from "./Testimonials";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(null);

  const closeModal = useCallback(() => setModal(false), []);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrolled && window.scrollY > 50) {
        setScrolled(true);
      } else if (scrolled && window.scrollY === 0) {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <StyledLandingPage id="landing-page">
      <NavBar scrolled={scrolled} setModal={setModal} />
      <div className="flex-col relative" style={{ paddingTop: "92px" }}>
        <Hero setModal={setModal} />
        <Testimonials />
      </div>
      {modal === "signup" && <SignupForm close={closeModal} />}
      {modal === "signin" && <SigninForm close={closeModal} />}
    </StyledLandingPage>
  );
}
