import { Field } from "formik";
import { FaExclamationCircle } from "react-icons/fa";
import styled from "styled-components";
import { getColor } from "../../../styledComponents/helpers";
import { Row, Col } from "../../../styledComponents/Layout";

export default function TypeGroup({
  name = "",
  options = [],
  errors = {},
  touched = {}
}) {
  const error = errors[name] && touched[name];
  return (
    <StyledTypeGroup className="mb-5">
      {error && (
        <p className="mb-2 error-text flex align-center">
          <FaExclamationCircle size="1.25rem" />
          <span className="ml-2">{errors[name]}</span>
        </p>
      )}
      <Row gap={[8, 8]}>
        {options.map(({ img, value }) => (
          <Col key={value} span={12}>
            <label className="input-box flex align-center pointer pos-relative">
              <img src={img} alt="" />
              <span className="ml-2 capitalize fw-600">{value}</span>
              <Field
                type="radio"
                className="d-none"
                name={name}
                value={value}
              />
              <div className="background pos-absolute full-stretch" />
            </label>
          </Col>
        ))}
      </Row>
    </StyledTypeGroup>
  );
}

const StyledTypeGroup = styled.div`
  img {
    width: 40px;
    height: 40px;
  }
  .background {
    border: 1px solid #ccd0d5;
    border-radius: inherit;
    background-color: #f5f6f7;
    z-index: -1;
    &:hover {
      border-color: black;
    }
  }
  input:checked ~ .background {
    border-color: black;
    background-color: ${getColor("primaryLight")};
  }
  .input-box {
    border: none;
    background: transparent;
  }
`;
