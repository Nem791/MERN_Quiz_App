// import "antd/dist/antd.css";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import { getColor } from "./styledComponents/helpers";
import { colors } from "./theme";

const StyledApp = styled.div`
  min-height: 100vh;
  background: ${getColor("white2")};
`;

function App() {
  const mode = useSelector((state) => state.ui.mode);
  const userName = useSelector((state) => state.user.name);
  return (
    <ThemeProvider theme={colors[mode]}>
      <StyledApp>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={userName ? <HomePage /> : <LandingPage />}
            />
          </Routes>
        </BrowserRouter>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;

function KatexDemo() {
  const blockFormula = `\\frac a b = \\frac{1}{2} = \\tfrac 12`;
  return (
    <div>
      <p>Block formula:</p>
      <BlockMath math={blockFormula} />
    </div>
  );
}
