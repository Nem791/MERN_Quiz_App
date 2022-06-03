import styled from "styled-components";
import cn from "classnames";
import { Field } from "formik";
import { FaExclamationCircle } from "react-icons/fa";
import { StyledCommonTextInput } from "./styles";
import { getColor } from "../../styledComponents/helpers";

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

export const StyledTextGroup = styled(StyledCommonTextInput)`
  .error-text {
    display: none;
    position: absolute;
    bottom: calc(100% + 5px);
    left: 50%;
    max-width: 60%;
    transform: translateX(-50%);
    &:after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-style: solid;
      border-width: 5px;
      border-color: ${getColor("error")} transparent transparent transparent;
    }
  }
`;
