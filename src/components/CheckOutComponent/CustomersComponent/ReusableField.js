import { Field } from "formik";
import React from "react";

const ReusableField = ({
  icone,
  FieldName,
  placeholderName,
  ErrorMessage,
  touched,
}) => {
  return (
    <div key={FieldName}>
      <div className="inputStyle || d-flex || align-items-center || py-1 || rounded-3 || px-3 || inputStyleDesign">
        <div className="iconLoignColor || fs-5">{icone}</div>
        <Field
          name={FieldName}
          placeholder={placeholderName}
          className="w-100"
        />
      </div>
      <div className="text-danger || fs-6 || text-start || px-4 || DangerText">
        {ErrorMessage && touched ? (
          ErrorMessage
        ) : (
          <div className="opacity-0">1</div>
        )}
      </div>
    </div>
  );
};

export default ReusableField;
