import "katex/dist/katex.min.css";
import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
// import { BlockMath } from "react-katex";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { SNEAKIN } from "./app/userSlice";
import Creator from "./pages/Creator";
import MyLibrary from "./pages/MyLibrary";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import { getColor } from "./styledComponents/helpers";
import { colors } from "./theme";
import Profile from "./pages/Profile";
import Player from "./pages/Player";

const StyledApp = styled.div`
  min-height: 100vh;
  background: ${getColor("white2")};
`;

export default function App() {
  const mode = useSelector((state) => state.ui.mode);
  const userId = useSelector((state) => state.user._id);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(SNEAKIN());
  // }, []);

  return (
    <ThemeProvider theme={colors[mode]}>
      <StyledApp>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={userId ? <Home /> : <LandingPage />}>
              <Route index element={<Explore />} />
              <Route path="private" element={<MyLibrary />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="creator" element={<Creator />} />
            <Route path="quiz/:id" element={<Player />} />
            <Route path="lesson/:id" element={<Player />} />
          </Routes>
        </BrowserRouter>
      </StyledApp>
    </ThemeProvider>
  );
}

// function KatexDemo() {
//   const blockFormula = `\\frac a b = \\frac{1}{2} = \\tfrac 12`;
//   return (
//     <div>
//       <p>Block formula:</p>
//       <BlockMath math={blockFormula} />
//     </div>
//   );
// }
