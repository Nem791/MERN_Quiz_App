import { useDispatch, useSelector } from "react-redux";
import { RESET_ERROR } from "../../app/userSlice";
import { SIGNUP } from "../../app/userSlice/thunks";
import Form from "../../components/Form";
import Modal from "../../components/Modal";
import { _PASSWORD_MIN_LEN, _USER_NAME_MIN_LEN } from "../../configs";

export default function SignupForm({ close }) {
  const dispatch = useDispatch();
  const { reqPending, reqError, reqSuccess } = useSelector(
    (state) => state.user.formInfo
  );

  const closeForm = () => {
    dispatch(RESET_ERROR());
    close();
  };
  return (
    <Modal close={closeForm}>
      <Form
        heading="Sign Up"
        initialValues={{
          name: "",
          gender: "",
          birthday: null,
          email: "",
          password: "",
          repassword: "",
        }}
        fieldsInfo={[
          { name: "name", placeholder: "Full name" },
          { name: "email", placeholder: "Email", type: "email" },
          { name: "password", placeholder: "Password", type: "password" },
          {
            name: "repassword",
            placeholder: "Retype password",
            type: "password",
          },
          {
            label: "Gender",
            name: "gender",
            type: "ratio",
            options: ["male", "female", "other"],
            spans: [8, 8, 8],
          },
          {
            label: "Date of Birth",
            name: "birthday",
            placeholder: "YYYY/MM/DD",
            type: "date",
            maxDate: new Date(),
            yearRange: 100,
            inline: true,
          },
        ]}
        validate={({ name, email, password, repassword, gender, birthday }) => {
          const errors = {};
          if (name.length < _USER_NAME_MIN_LEN) {
            errors.name = `Your name must contain atleast ${_USER_NAME_MIN_LEN} letters.`;
          } else if (/[^a-zA-Z ]/g.test(name)) {
            errors.name = "Your name can only contain spaces and a-z letters.";
          }
          if (!/\S+@\S+/.test(email)) {
            errors.email = "Invalid email address.";
          }
          if (password.length < _PASSWORD_MIN_LEN) {
            errors.password = `Password must contain atleast ${_PASSWORD_MIN_LEN} characters`;
          } else if (
            password.search(/[0-9]/) === -1 ||
            password.search(/[A-Z]/) === -1
          ) {
            errors.password =
              "Password must contain aleast 1 number and 1 uppercasse letter.";
          }
          if (password && repassword !== password) {
            errors.repassword = "Retyped password is incorrect.";
          }
          if (!gender.length) {
            errors.gender = "Please choose a gender.";
          }
          if (birthday === null) {
            errors.birthday = "Please enter or choose a valid date.";
          } else if (new Date().getFullYear() - birthday.getFullYear() < 3) {
            errors.birthday = "You must be atleast 3-year-old to sign up.";
          }
          return errors;
        }}
        handleSubmit={(values, { setSubmitting }) => {
          let { birthday } = values;
          const addZeroIfNeeded = (n) => (n < 10 ? `0${n}` : n);
          const month = addZeroIfNeeded(birthday.getMonth() + 1);
          const day = addZeroIfNeeded(birthday.getDate());
          const info = {
            name: values.name,
            email: values.email,
            password: values.password,
            gender: values.gender,
            birthday: `${birthday.getFullYear()}/${month}/${day}`,
          };
          dispatch(SIGNUP(info));
        }}
        submitting={reqPending}
        submitError={reqError}
        successMsg={reqSuccess && "Sign up successfully!"}
        close={closeForm}
      />
    </Modal>
  );
}
