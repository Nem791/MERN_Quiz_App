import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./styles.module.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCustomHeader =
  (yearArr) =>
  ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) =>
    (
      <div className="m-1 flex justify-center">
        <button
          className="pl-1 pr-2 flex-center"
          type="button"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
        >
          <FaChevronLeft />
        </button>
        <select
          className="px-2 py-1"
          value={date.getFullYear()}
          onChange={({ target: { value } }) => changeYear(value)}
        >
          {yearArr.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          className="px-2 py-1"
          value={months[date.getMonth()]}
          onChange={({ target: { value } }) =>
            changeMonth(months.indexOf(value))
          }
        >
          {months.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button
          className={"pl-2 pr-1 flex-center " + styles.hiddenWhenDisabled}
          type="button"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
        >
          <FaChevronRight />
        </button>
      </div>
    );

export default renderCustomHeader;
