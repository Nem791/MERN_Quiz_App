import { useState } from "react";
import styled from "styled-components";
import Form from "../../components/Form";
import callApi, { handleResponse } from "../../helpers/callApi";

export default function BtmSec({ name, email, setInfo }) {
  const [submitState, setSubmitState] = useState({
    submitting: false,
    submitError: "",
  });
  const changeInfo = (reqData, changeFE) => {
    callApi({
      endpoint: "users/update-user-info",
      method: "PATCH",
      reqData,
      token: localStorage.getItem("token"),
    })
      .then(handleResponse)
      .then((data) => {
        console.log(data);
        if (changeFE) setInfo((prev) => ({ ...prev, ...reqData }));
      })
      .catch(console.log);
  };
  return (
    <StyledBtmSec className="flex justify-center">
      <div>
        <Form
          heading="Account"
          initialValues={{ email, name }}
          fieldsInfo={[
            {
              label: "Email",
              name: "email",
              placeholder: "Email",
              type: "email",
            },
            {
              label: "Username",
              name: "name",
              placeholder: "Username",
              type: "text",
            },
          ]}
          validateOnChange={false}
          validateOnBlur={false}
          validate={({ email, name }) => {
            const errors = {};
            if (!email.length) {
              errors.email = "Please enter your new email address.";
            }
            if (!name.length) {
              errors.password = "Please enter your new username.";
            }
            return errors;
          }}
          handleSubmit={(values, { setSubmitting }) => {
            changeInfo(values, true);
          }}
          submitText="Save Changes"
          submitting={submitState.submitting}
          submitError={submitState.submitError}
        />
        <Form
          heading="Password"
          initialValues={{ oldPassword: "", password: "", rePassword: "" }}
          fieldsInfo={[
            {
              label: "Old Password",
              name: "oldPassword",
              placeholder: "Old Password",
              type: "password",
            },
            {
              label: "New Password",
              name: "password",
              placeholder: "New Password",
              type: "password",
            },
            {
              label: "Retype Password",
              name: "rePassword",
              placeholder: "Retype Password",
              type: "password",
            },
          ]}
          validateOnChange={false}
          validateOnBlur={false}
          validate={({ oldPassword, password, rePassword }) => {
            const errors = {};
            if (!oldPassword.length) {
              errors.oldPassword = "Please enter your old password.";
            }
            if (!password.length) {
              errors.password = "Please enter your new password.";
            }
            if (!rePassword.length || password !== rePassword) {
              errors.rePassword = "Please re-enter your new password.";
            }
            return errors;
          }}
          handleSubmit={(values, { setSubmitting }) => {
            changeInfo({ password: values.password }, false);
          }}
          submitText="Save Changes"
          submitting={submitState.submitting}
          submitError={submitState.submitError}
        />
      </div>
    </StyledBtmSec>
  );
}

const StyledBtmSec = styled.div``;
