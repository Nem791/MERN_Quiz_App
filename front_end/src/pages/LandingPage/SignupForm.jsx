import Modal from "../../components/Modal";
import Form from "../../components/Form";
import { USER_NAME_MIN_LEN, PASSWORD_MIN_LEN } from "../../configs";

export default function SignupForm({ close }) {
  return (
    <Modal close={close}>
      <Form
        heading="Sign Up"
        initialValues={{
          name: "",
          gender: "male",
          birthDate: "",
          birthMonth: "",
          birthYear: "",
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
        ]}
        validate={({ name, email, password, repassword }) => {
          const errors = {};
          if (name.length < USER_NAME_MIN_LEN) {
            errors.name = `Your name must contain atleast ${USER_NAME_MIN_LEN} letters.`;
          } else if (/[^a-zA-Z]/g.test(name)) {
            errors.name = "Your name can only contain a-z letters.";
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
          return errors;
        }}
        handleSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 200);
        }}
        close={close}
      />
    </Modal>
  );
}
