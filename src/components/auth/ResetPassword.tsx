import { Formik } from "formik";
import * as yup from "yup";

export const ResetPassword = () => {
  return (
    <Formik
      initialValues={{}}
      validationSchema={yup.object({})}
      onSubmit={(values, actions) => {
        console.log("submit");
      }}
      enableReinitialize
    >
      {({ handleSubmit, setFieldValue, errors }) => <form>Sign Up</form>}
    </Formik>
  );
};
