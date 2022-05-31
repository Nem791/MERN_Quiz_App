import { Form, Formik } from "formik";
import { FaTimes } from "react-icons/fa";
import TextGroup from "./TextGroup";
import RadioGroup from "./RadioGroup";
import FormLayout from "./styles";
import { MainButton } from "../../styledComponents/Inputs";
import { Row, Col } from "../../styledComponents/Layout";

const FormGroup = ({ info, ...rest }) => {
  let Group;
  if (!info.type || ["text", "email", "password"].includes(info.type)) {
    Group = TextGroup;
  } else if (info.type === "ratio") {
    Group = RadioGroup;
  }
  return (
    <Col span={info.span || 24} offset={info.offset}>
      {info.label && <p className="group-label">{info.label}</p>}
      <Group {...info} {...rest} />
    </Col>
  );
};

export default function MyForm({
  heading,
  desc,
  initialValues,
  fieldsInfo = [],
  validate,
  handleSubmit,
  submitText,
  cancelBtn,
  submitting,
  submitError,
  close
}) {
  return (
    <FormLayout>
      <div className="top">
        <h1>{heading}</h1>
        {desc && <p>{desc}</p>}
        <div className="close-icon flex-center" onClick={close}>
          <FaTimes />
        </div>
      </div>
      {submitError && <p className="submit-error fw-600">{submitError}</p>}
      <div className="bottom">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
          children={({ errors, touched, isSubmitting }) => {
            return (
              <Form className="flex-col">
                <Row>
                  {fieldsInfo.map((info) => (
                    <FormGroup
                      key={info.name}
                      info={info}
                      errors={errors}
                      touched={touched}
                    />
                  ))}
                </Row>
                <div className="mt-4 mx-auto">
                  {cancelBtn}
                  <MainButton type="submit" disabled={submitting}>
                    {submitText || "Submit"}
                  </MainButton>
                </div>
              </Form>
            );
          }}
        />
      </div>
    </FormLayout>
  );
}
