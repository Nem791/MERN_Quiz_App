import cn from "classnames";
import styled from "styled-components";
import { _LIBRARY_NAMES, _LIBRARY_INFOS } from "../../configs";
import { getColor } from "../../styledComponents/helpers";

export default function LeftSec({ library, setLibrary }) {
  return (
    <StyledLeftSec className="full-w">
      <h2>My Library</h2>
      <div className="mt-4 full-w flex sidebar">
        {_LIBRARY_NAMES.map((name) => {
          const { Icon, text } = _LIBRARY_INFOS[name];
          return (
            <div
              key={text}
              className={cn("p-2 library-name b-radius-1 flex pointer", {
                active: name === library,
              })}
              onClick={() => setLibrary(name)}
            >
              <Icon className="mr-3" />
              <p className="fw-600 fs-0875">{text}</p>
            </div>
          );
        })}
      </div>
    </StyledLeftSec>
  );
}

const StyledLeftSec = styled.div`
  .sidebar {
    flex-direction: column;
    gap: 0.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${getColor("dividerLight")};
  }
  .library-name {
    color: ${getColor("text3")};
  }
  .library-name:hover {
    background-color: rgba(255, 255, 255, 0.6);
    color: ${getColor("primary")};
  }
  .library-name.active {
    background-color: white;
    color: black;
  }
`;
