import Modal from "../../components/Modal";
import Form from "../../components/Form";

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
          {
            name: "name",
            placeholder: "Full name",
          },
          {
            name: "email",
            placeholder: "Email",
            type: "email",
          },
          {
            name: "password",
            placeholder: "Password",
            type: "password",
          },
          {
            name: "repassword",
            placeholder: "Password",
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
          if (name.length < 4) {
            errors.name = "Ten phai co it nhat 4 chu cai.";
          } else if (/[^a-zA-Z]/g.test(name)) {
            errors.name = "Ten chi duoc chua cac chu cai tu a-z.";
          }
          if (!/\S+@\S+/.test(email)) {
            errors.email = "Email khong hop le.";
          }
          if (password.length < 6) {
            errors.password = "Mat khau phai co it nhat 6 ky tu.";
          } else if (
            password.search(/[0-9]/) === -1 ||
            password.search(/[A-Z]/) === -1
          ) {
            errors.password =
              "Mat khau phai co it nhat 1 chu so va 1 chu cai in hoa.";
          }
          if (password && repassword !== password) {
            errors.repassword = "Nhap lai mat khau khong dung.";
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
