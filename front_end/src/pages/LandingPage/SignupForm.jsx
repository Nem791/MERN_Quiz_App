import Modal from "../../components/Modal";
import Form from "../../components/Form";
import { USER_NAME_MIN_LEN, PASSWORD_MIN_LEN } from "../../configs";
import { useDispatch, useSelector } from "react-redux";
import { RESET_ERROR } from "../../app/userSlice";
import { SIGNUP } from "../../app/thunks";

export default function SignupForm({ close }) {
  const dispatch = useDispatch();
  const submitting = useSelector((state) => state.user.reqPending);
  const submitError = useSelector((state) => state.user.reqError);

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
          // gender: "",
          // dob: new Date(),
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
          // {
          //   label: "Gender",
          //   name: "gender",
          //   type: "ratio",
          //   options: ["male", "female", "other"],
          //   spans: [8, 8, 8],
          // },
          // {
          //   label: "Date of Birth",
          //   name: "dob",
          //   type: "date",
          // },
        ]}
        validate={({ name, email, password, repassword, gender }) => {
          const errors = {};
          if (name.length < USER_NAME_MIN_LEN) {
            errors.name = `Your name must contain atleast ${USER_NAME_MIN_LEN} letters.`;
          } else if (/[^a-zA-Z ]/g.test(name)) {
            errors.name = "Your name can only contain spaces and a-z letters.";
          }
          if (!/\S+@\S+/.test(email)) {
            errors.email = "Invalid email address.";
          }
          if (password.length < PASSWORD_MIN_LEN) {
            errors.password = `Password must contain atleast ${PASSWORD_MIN_LEN} characters`;
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
          // if (!gender.length) {
          //   errors.gender = "Please choose a gender.";
          // }
          return errors;
        }}
        handleSubmit={(values, { setSubmitting }) => {
          dispatch(
            SIGNUP({
              name: values.name,
              email: values.email,
              password: values.password,
            })
          );
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 200);
        }}
        submitting={submitting}
        submitError={submitError}
        close={closeForm}
      />
    </Modal>
  );
}
