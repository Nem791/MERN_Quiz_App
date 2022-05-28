import cn from "classnames";
import { Field } from "formik";
import { FaExclamationCircle } from "react-icons/fa";
import { Col } from "../../styledComponents/Layout";
import { StyledRadioGroup, StyledTextGroup } from "./styles";

export const TextGroup = ({ name, type, placeholder }) => {
  return (
    <Field
      name={name}
      children={({ field, meta }) => {
        const error = meta.touched && meta.error;
        return (
          <StyledTextGroup className="mb-3 relative">
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
};

export const RadioGroup = ({ name, options, spans = [] }) => {
  const defaultSpan = 24 / (spans.length || 1);
  return (
    <StyledRadioGroup className="mb-3">
      {options.map((opt, i) => (
        <Col key={opt} span={spans[i] || defaultSpan}>
          <label className="input-box grow-1 flex align-center">
            <Field type="radio" className="mr-2" name={name} value={opt} />
            <p className="capitalize">{opt}</p>
          </label>
        </Col>
      ))}
    </StyledRadioGroup>
  );
};
