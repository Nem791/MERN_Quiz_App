import cn from "classnames";
import { Field, useField } from "formik";
import DatePicker from "react-datepicker";
import { FaExclamationCircle } from "react-icons/fa";
import { StyledCommonTextInput } from "../styles";
import renderCustomHeader from "./Header";

function getYearArr(date, range) {
  const result = [];
  const year = date.getFullYear();
  while (range >= 0) {
    result.push(year - range);
    range--;
  }
  return result;
}

export default function DateGroup({
  name,
  placeholder,
  inline,
  maxDate = new Date(),
  yearRange = 10,
}) {
  const [{ value, onBlur }, , { setValue }] = useField({ name });
  const yearArr = getYearArr(maxDate, yearRange);

  return (
    <Field
      name={name}
      children={({ meta }) => {
        const error = meta.touched && meta.error;
        return (
          <StyledCommonTextInput
            className={cn("mb-3 pos-relative", { "grow-1": inline })}
          >
            <DatePicker
              className={cn("input-box full-w", { error })}
              name={name}
              placeholderText={placeholder}
              dateFormat="yyyy/MM/dd"
              maxDate={maxDate}
              renderCustomHeader={renderCustomHeader(yearArr)}
              selected={value}
              onChange={setValue}
              onBlur={onBlur}
              closeOnScroll
              fixedHeight
            >
              {error && (
                <p
                  className="error-text"
                  style={{ clear: "both", maxWidth: "242px" }}
                >
                  {error}
                </p>
              )}
            </DatePicker>
            {error && <FaExclamationCircle className="error-icon" />}
          </StyledCommonTextInput>
        );
      }}
    />
  );
}
