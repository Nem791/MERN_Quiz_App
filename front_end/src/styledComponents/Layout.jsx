import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const Col = styled.div`
  position: relative;
  min-height: 1px;
  ${(pr) => pr.offset && `margin-left: ${(pr.offset / 24) * 100}%;`}
  ${(pr) => {
    if (pr.span) {
      const pct = (pr.span / 24) * 100;
      return `
        flex: 0 0 ${pct}%;
        max-width: ${pct}%;
      `;
    }
  }}
`;
