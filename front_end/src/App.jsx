// import "katex/dist/katex.min.css";
import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
// import { BlockMath } from "react-katex";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { AUTO_LOGIN } from "./app/userSlice";
import callApi, { handleResponse } from "./helpers/callApi";
import Creator from "./pages/Creator";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import MyLibrary from "./pages/MyLibrary";
import Player from "./pages/Player";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import { getColor } from "./styledComponents/helpers";
import { colors } from "./theme";

const StyledApp = styled.div`
  min-height: 100vh;
  background: ${getColor("white2")};
`;

export default function App() {
  const mode = useSelector((state) => state.ui.mode);
  const userId = useSelector((state) => state.user._id);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      callApi({
        endpoint: "users/check-login-status",
        method: "POST",
        token,
      })
        .then(handleResponse)
        .then((data) => {
          dispatch(AUTO_LOGIN(data));
        })
        .catch(console.log);
    }
  }, []);

  return (
    <ThemeProvider theme={colors[mode]}>
      <StyledApp>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={userId ? <Home /> : <LandingPage />}>
              <Route index element={<Explore />} />
              <Route path="private" element={<MyLibrary />} />
              <Route path="profile" element={<Profile />} />
              <Route path="search/:key" element={<Search />} />
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
