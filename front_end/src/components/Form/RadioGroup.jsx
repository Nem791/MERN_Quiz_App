import { Field, useFormikContext } from "formik";
import { FaExclamationCircle } from "react-icons/fa";
import styled from "styled-components";
import { getColor } from "../../styledComponents/helpers";
import { Row, Col } from "../../styledComponents/Layout";

export default function RadioGroup({ name = "", options = [], spans = [] }) {
  const { errors, touched } = useFormikContext();
  const defaultSpan = 24 / (spans.length || 1);
  const error = errors[name] && touched[name];
  return (
    <StyledRadioGroup className="mb-3 pos-relative">
      <Row gap={8}>
        {options.map((opt, i) => (
          <Col key={opt} span={spans[i] || defaultSpan}>
            <label className="input-box flex align-center">
              <Field type="radio" className="mr-2" name={name} value={opt} />
              <span className="capitalize">{opt}</span>
            </label>
          </Col>
        ))}
      </Row>
      {error && <FaExclamationCircle className="error-icon" />}
      <p className="error-text">{errors[name]}</p>
    </StyledRadioGroup>
  );
}

const StyledRadioGroup = styled.div`
  .error-text {
    display: none;
    position: absolute;
    right: 2rem;
    bottom: calc(100% + 5px);
    max-width: 60%;
    &:after {
      content: "";
      border-style: solid;
      border-color: transparent transparent transparent ${getColor("error")};
      border-width: 6px;
      position: absolute;
      bottom: 5px;
      left: 100%;
    }
  }
  .error-icon {
    bottom: calc(100% + 0.25rem);
    right: 0.25rem;
  }
  .error-icon:hover ~ .error-text {
    display: block;
  }
`;
