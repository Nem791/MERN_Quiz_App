import cn from "classnames";
import { FieldArray, useField } from "formik";
import { FaExclamationCircle } from "react-icons/fa";
import styled from "styled-components";
import { getColor } from "../../styledComponents/helpers";

export default function TagGroup({ name = "", options = [], chosen = [] }) {
  const [, { error, touched }] = useField({ name });
  return (
    <StyledTagGroup className="mb-5">
      <FieldArray
        name={name}
        children={({ remove, push }) => (
          <div className="tag-options custom-sb flex-wrap">
            {options.map((opt) => {
              const index = chosen.indexOf(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  className={cn("px-3 py-1", { chosen: index !== -1 })}
                  onClick={() => (index === -1 ? push(opt) : remove(index))}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}
      />
      {error && touched && (
        <p className="mt-2 error-text flex align-center">
          <FaExclamationCircle size="1.25rem" />
          <span className="ml-2">{error}</span>
        </p>
      )}
    </StyledTagGroup>
  );
}

const StyledTagGroup = styled.div`
  .tag-options {
    gap: 0.625rem;
    height: 30vh;
    button {
      border-radius: 100px;
    }
    button:hover {
      background-color: ${getColor("primaryLight")};
    }
    button.chosen {
      color: ${getColor("primaryText")};
      background-color: ${getColor("primary")};
    }
  }
`;
