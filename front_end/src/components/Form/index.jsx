import cn from "classnames";
import { Form, Formik } from "formik";
import { FaTimes } from "react-icons/fa";
import TextGroup from "./TextGroup";
import RadioGroup from "./RadioGroup";
import FormLayout from "./styles";
import { MainButton } from "../../styledComponents/Inputs";
import { Row, Col } from "../../styledComponents/Layout";
import DateGroup from "./DateGroup";

const FormGroup = ({ info }) => {
  let Group;
  if (!info.type || ["text", "email", "password"].includes(info.type)) {
    Group = TextGroup;
  } else if (info.type === "ratio") {
    Group = RadioGroup;
  } else if (info.type === "date") {
    Group = DateGroup;
  }
  return (
    <Col
      className={cn(info.inline && "flex align-center")}
      span={info.span || 24}
      offset={info.offset}
    >
      {info.label && (
        <p className={cn("group-label", { inline: info.inline })}>
          {info.label}
        </p>
      )}
      <Group {...info} />
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
  submitText = "Submit",
  cancelBtn,
  submitting,
  submitError,
  successMsg,
  close,
  validateOnChange = true,
  validateOnBlur = true,
}) {
  const msg = submitError || successMsg;
  return (
    <FormLayout>
      <div className="top">
        <h1>{heading}</h1>
        {desc && <p>{desc}</p>}
        <div className="close-icon flex-center" onClick={close}>
          <FaTimes />
        </div>
      </div>
      <div className="bottom p-4">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
          validateOnChange={validateOnChange}
          validateOnBlur={validateOnBlur}
          children={({ isSubmitting }) => {
            return (
              <Form className="flex-col">
                <Row>
                  {fieldsInfo.map((info) => (
                    <FormGroup key={info.name} info={info} />
                  ))}
                </Row>
                {msg && (
                  <p className={cn("pt-4 fw-600 text-center", { submitError })}>
                    {msg}
                  </p>
                )}
                <div className="mt-4 mx-auto">
                  {cancelBtn}
                  <MainButton type="submit" disabled={submitting}>
                    {submitText}
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
