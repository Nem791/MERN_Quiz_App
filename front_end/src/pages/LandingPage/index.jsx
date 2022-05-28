import { useEffect, useState } from "react";
import Hero from "./Hero";
import NavBar from "./NavBar";
import SignupForm from "./SignupForm";
import { StyledLandingPage } from "./styles";
import Testimonials from "./Testimonials";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(null);

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
      <div className="content flex-col relative">
        <Hero />
        <Testimonials />
      </div>
      {modal === "signup" && <SignupForm close={() => setModal(null)} />}
    </StyledLandingPage>
  );
}
