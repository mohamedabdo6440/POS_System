import { Field } from "formik";
import React from "react";

const ReusableFieldAuth = ({
  icone,
  FieldName,
  type,
  placeholderName,
  ErrorMessage,
  touched,
  parentUser,
  colorIcon,
  setColorIcon,
  lableID,
}) => {
  return (
    <div key={lableID}>
      <div>
        <div className="form-outline || gap-3 || justify-content-between || formControl || d-flex || align-items-center">
          <div className=" py-1 || px-3 || rounded-3 || d-flex || align-items-center || inputStyle">
            <div
              ref={parentUser}
              style={{
                color: `${colorIcon ? "#13B9E2" : "#BBBBBB"}`,
              }}
              className="iconLoignColor || fs-5"
            >
              {icone}
            </div>
            <Field
              name={FieldName}
              id={lableID}
              type={type}
              className="w-100"
              placeholder={placeholderName}
              onFocus={() => {
                setColorIcon(true);
              }}
              onBlur={() => {
                setColorIcon(false);
              }}
            />
          </div>
        </div>
      </div>

      <div className="text-danger || mb-4 || mt-2 || ms-5">
        {ErrorMessage && touched ? <div>{ErrorMessage}</div> : null}
      </div>
    </div>
  );
};

export default ReusableFieldAuth;
