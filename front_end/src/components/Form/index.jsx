import { Form, Formik } from "formik";
import { FaTimes } from "react-icons/fa";
import { TextGroup, RadioGroup } from "./Groups";
import { Layout } from "./styles";
import { MainButton } from "../../styledComponents/Inputs";
import { Row, Col } from "../../styledComponents/Layout";

const FormGroup = ({ info }) => {
  let Group;
  if (!info.type || ["text", "email", "password"].includes(info.type)) {
    Group = TextGroup;
  } else if (info.type === "ratio") {
    Group = RadioGroup;
  }
  return (
    <Col span={info.span || 24} offset={info.offset}>
      {info.label && <p className="group-label">{info.label}</p>}
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
  close,
}) {
  return (
    <Layout>
      <div className="top">
        <h1>{heading}</h1>
        {desc && <p>{desc}</p>}
        <div className="close-icon flex-center" onClick={close}>
          <FaTimes />
        </div>
      </div>
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
                    <FormGroup key={info.name} info={info} />
                  ))}
                </Row>
                <MainButton
                  type="submit"
                  className="mt-4 mx-auto"
                  disabled={isSubmitting}
                >
                  Submit
                </MainButton>
              </Form>
            );
          }}
        />
      </div>
    </Layout>
  );
}
