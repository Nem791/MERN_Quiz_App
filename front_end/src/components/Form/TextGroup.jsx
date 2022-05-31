import styled from "styled-components";
import cn from "classnames";
import { Field } from "formik";
import { FaExclamationCircle } from "react-icons/fa";

export default function TextGroup({ name = "", type = "text", placeholder }) {
  return (
    <Field
      name={name}
      children={({ field, meta }) => {
        const error = meta.touched && meta.error;
        return (
          <StyledTextGroup className="mb-3 pos-relative">
            <input
              className={cn("input-box", { error })}
              type={type}
              placeholder={placeholder}
              {...field}
            />
            {error && (
              <>
                <p className="error-text">{error}</p>
                <FaExclamationCircle className="error-icon" />
              </>
            )}
          </StyledTextGroup>
        );
      }}
    />
  );
}

const StyledTextGroup = styled.div`
  input {
    width: 100%;
    &.error {
      border-color: var(--error-color);
    }
    &:focus {
      border: 1px solid var(--primary-color);
      box-shadow: 0 0 0 1px var(--primary-color) inset;
    }
  }
  .error-text {
    display: none;
    position: absolute;
    bottom: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    &:after {
      content: "";
      border-style: solid;
      border-color: var(--error-color) transparent transparent transparent;
      border-width: 5px;
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
    }
  }
  input:focus ~ .error-text {
    display: block;
  }
  input:focus ~ .error-icon {
    display: none;
  }
  .error-icon {
    top: var(--padding);
    right: var(--padding);
    pointer-events: none;
  }
`;
