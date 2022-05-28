import { useDispatch } from "react-redux";
import { LOGIN } from "../../app/userSlice";
import Form from "../../components/Form";
import Modal from "../../components/Modal";
import { PASSWORD_MIN_LEN } from "../../configs";

export default function SignupForm({ close }) {
  const dispatch = useDispatch();
  return (
    <Modal close={close}>
      <Form
        heading="Sign Up"
        initialValues={{ email: "", password: "" }}
        fieldsInfo={[
          { name: "email", placeholder: "Email", type: "email" },
          { name: "password", placeholder: "Password", type: "password" },
        ]}
        validate={({ email, password }) => {
          const errors = {};
          if (!email.length) {
            errors.email = "Please enter your email address.";
          }
          if (password.length < PASSWORD_MIN_LEN) {
            errors.password = "Please enter a valid password.";
          }
          return errors;
        }}
        handleSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            dispatch(LOGIN("Huan"));
            close();
            // setSubmitting(false);
          }, 200);
        }}
        close={close}
      />
    </Modal>
  );
}
