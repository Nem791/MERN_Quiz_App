import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../app/userSlice/thunks";
import { RESET_ERROR } from "../../app/userSlice";
import Form from "../../components/Form";
import Modal from "../../components/Modal";
import { _PASSWORD_MIN_LEN } from "../../configs";

export default function LoginForm({ close }) {
  const dispatch = useDispatch();
  const { reqPending, reqError } = useSelector((state) => state.user.formInfo);
  const closeForm = () => {
    dispatch(RESET_ERROR());
    close();
  };
  return (
    <Modal close={closeForm}>
      <Form
        heading="Log In"
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
          if (password.length < _PASSWORD_MIN_LEN) {
            errors.password = "Please enter a valid password.";
          }
          return errors;
        }}
        handleSubmit={(values, { setSubmitting }) => {
          dispatch(LOGIN(values));
          // setTimeout(() => {
          // setSubmitting(false);
          // close();
          // }, 2000);
        }}
        submitting={reqPending}
        submitError={reqError}
        close={closeForm}
      />
    </Modal>
  );
}
