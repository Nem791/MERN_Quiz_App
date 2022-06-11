import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { CREATE_NEW_SET } from "../../app/creatorSlice/thunks";
import Layout from "../../components/Form/styles";
import TextGroup from "../../components/Form/TextGroup";
import Modal from "../../components/Modal";
import { _TAGS, _QUEST_SET_TYPES } from "../../configs";
import { Button, MainButton } from "../../styledComponents/Inputs";
import { Col, Row } from "../../styledComponents/Layout";
import TagGroup from "./TagGroup";
import TypeGroup from "./TypeGroup";

export default function CreateModal({ initialValues, onSuccess, close }) {
  const dispatch = useDispatch();
  return (
    <Modal close={close}>
      <Layout className="full-h hide-sb" width="360px">
        <div className="top">
          <h1>Create Your Own</h1>
        </div>
        <Formik
          initialValues={
            initialValues || {
              type: "",
              name: "",
              tags: [],
            }
          }
          validate={({ type, name, tags }) => {
            const errors = {};
            if (!type.length) {
              errors.type = "Please choose an option.";
            }
            if (!name.length) {
              errors.name = "Please name your lesson/quiz";
            }
            if (!tags.length) {
              errors.tags = "Please select relevant subjects.";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              dispatch(CREATE_NEW_SET(values, onSuccess));
              // setSubmitting(false);
            }, 1000);
          }}
          children={renderForm(close)}
        />
      </Layout>
    </Modal>
  );
}

function renderForm(close) {
  return ({ values, isSubmitting }) => {
    const type =
      _QUEST_SET_TYPES[values.type] ||
      `${_QUEST_SET_TYPES.sliders}/${_QUEST_SET_TYPES.questions}`;
    return (
      <Form className="p-4 flex-col">
        <TypeGroup
          name="type"
          options={[
            {
              label: _QUEST_SET_TYPES.questions,
              value: "questions",
              img: "https://cf.quizizz.com/img/illustrations/lesson.png",
            },
            {
              label: _QUEST_SET_TYPES.sliders,
              value: "sliders",
              img: "https://cf.quizizz.com/img/illustrations/quiz.png",
            },
          ]}
        />

        <p className="group-label">1. Name your {type}</p>
        <TextGroup name="name" placeholder={`Enter a ${type} name`} />

        <p className="group-label mt-1">2. Choose relevant subjects</p>
        <TagGroup name="tags" chosen={values.tags} options={_TAGS} />

        <Row gap={12}>
          <Col span={12}>
            <Button
              type="button"
              darkerOnHover
              className="full-w"
              onClick={close}
            >
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <MainButton
              className="full-w"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </MainButton>
          </Col>
        </Row>
      </Form>
    );
  };
}
