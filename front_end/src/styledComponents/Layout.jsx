import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  ${(pr) => {
    if (pr.gap) {
      const hasRowGap = Array.isArray(pr.gap);
      const colGap = `${(hasRowGap ? pr.gap[0] : pr.gap) / 2}px`;
      let result = `
        margin-left: -${colGap};
        margin-right: -${colGap};
        & > * {
          padding-left: ${colGap};
          padding-right: ${colGap};
        }
      `;
      if (hasRowGap) result = `row-gap: ${pr.gap[1]}px;` + result;
      return result;
    }
    return "";
  }}
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
