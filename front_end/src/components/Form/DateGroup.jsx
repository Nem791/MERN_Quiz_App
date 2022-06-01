import { Field, useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import { FaExclamationCircle } from "react-icons/fa";
import styled from "styled-components";

export default function DateGroup(props) {
  const { setFieldValue } = useFormikContext();
  const [name] = useField(props);
  return (
    <Field
      name={name}
      children={(props) => {
        const { field, meta } = props;
        const error = meta.touched && meta.error;
        return (
          <StyledDateGroup className="mb-3 pos-relative">
            <DatePicker
              // className={cn("input-box", { error })}
              {...field}
              {...props}
              selected={(field.value && new Date(field.value)) || null}
              onChange={(date) => setFieldValue(name, date)}
              // {...field}
            />
            {error && (
              <>
                <p className="error-text">{error}</p>
                <FaExclamationCircle className="error-icon" />
              </>
            )}
          </StyledDateGroup>
        );
      }}
    />
  );
}

const StyledDateGroup = styled.div``;
