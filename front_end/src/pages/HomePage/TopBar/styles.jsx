import styled from "styled-components";
import { getColor } from "../../../styledComponents/helpers";
import { boxShadows } from "../../../theme";

const borderRadius = "border-radius: 0 0 5px 5px";

const StyledTopBar = styled.div`
  height: 56px;
  padding: 8px;
  border-left: 2px solid ${getColor("white2")};
  background-color: ${getColor("white1")};
  box-shadow: ${boxShadows.common};
  z-index: 2;
  .search-bar {
    background-color: ${getColor("white2")};
    border-radius: 0.5rem;
    .inherit-br {
      border-radius: inherit;
    }
    .search-icon {
      position: absolute;
      pointer-events: none;
      border-radius: 50%;
      top: 52%;
      transform: translateY(-50%);
    }
    input {
      padding: 8px 8px 8px 36px;
      border: none;
      outline: none;
      background-color: inherit;
      color: ${getColor("text1")};
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.02rem;
    }
    button {
      font-size: 0.875rem;
    }
    .results-dropdown {
      ${borderRadius};
      background-color: ${getColor("white1")};
      p {
        padding: 4px 16px 4px 36px;
        line-height: 1.5;
        &:hover {
          background-color: ${getColor("primaryLight")};
        }
      }
    }
    .divider {
      width: 1px;
      background: ${getColor("dividerLight")};
    }
    .divider + div {
      min-width: 130px;
    }
    .library-dropdown {
      position: absolute;
      top: 100%;
      background: ${getColor("white1")};
      ${borderRadius};
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      p:not(:last-child) {
        border-bottom: 1px solid ${getColor("dividerLight")};
      }
      p:last-child {
        border-radius: inherit;
      }
      p:hover {
        background: ${getColor("white2")};
      }
      p.active {
        color: ${getColor("primary")};
        background-color: ${getColor("primaryLight")};
      }
    }
  }
  .notif-btn {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: ${getColor("white2")};
  }
`;

export default StyledTopBar;
