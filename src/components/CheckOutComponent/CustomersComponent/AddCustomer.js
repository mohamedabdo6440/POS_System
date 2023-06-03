import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { insertCustomers } from "../../../redux/store/CustomersSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/esm/Spinner";
import { IoMdPhonePortrait } from "react-icons/io";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";
import ReusableField from "./ReusableField";
const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required Name"),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required Name"),
  phone: Yup.number().required("Required Phone Number"),
  // address: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  email: Yup.string().email("Invalid email").required("Required Field"),
  birth_date: Yup.date().required("Required Field"),
});
const AddCustomer = ({ showForm, setOpenpopUp }) => {
  const customSelect = useRef();
  const date = useRef();
  const dispatch = useDispatch();
  const [gender, setGender] = useState("");
  const [show, setShow] = useState("");
  const [openSelect, setOpenSelect] = useState(false);
  const { isLoading } = useSelector((state) => state.customers);

  // this function get GenderSelected from select options
  const handleGenderSelected = (e) => {
    setGender(e.target.value);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        customSelect.current &&
        !customSelect.current.contains(event.target)
      ) {
        setOpenSelect(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSelect]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (date.current && !date.current.contains(event.target)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [date, show]);

  return (
    <>
      <div className={`${showForm ? "unvisable" : "visable"} transition`}>
        <div className="">
          <Formik

            initialValues={{
              // address:"",
              first_name: "",
              last_name: "",
              phone: "",
              email: "",
              gender: "",
              birth_date: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              values.gender = gender;
              dispatch(insertCustomers(values));
              setTimeout(() => {
                values.first_name = "";
                values.address = "";
                values.last_name = "";
                values.phone = "";
                values.email = "";
                values.gender = "";
                values.birth_date = "";
              }, 100);
            }}
          >
            {({ errors, touched, values, handleChange, handleBlur }) => (
              <Form>
                <div className="row">
                  <div className="col-12 || col-md-6">
                    <ReusableField
                      icone={<AiOutlineUser />}
                      FieldName={"first_name"}
                      placeholderName={"Firest Name"}
                      ErrorMessage={errors.first_name}
                      touched={touched.first_name}
                    />
                  </div>
                  <div className="col-12 || col-md-6">
                    <ReusableField
                      icone={<AiOutlineUser />}
                      FieldName={"last_name"}
                      placeholderName={"Last Name"}
                      ErrorMessage={errors.last_name}
                      touched={touched.last_name}
                    />
                  </div>
                </div>

                <ReusableField
                  icone={<IoMdPhonePortrait />}
                  FieldName={"phone"}
                  placeholderName={"Phone Number"}
                  ErrorMessage={errors.phone}
                  touched={touched.phone}
                />

                <ReusableField
                  icone={<AiOutlineMail />}
                  FieldName={"email"}
                  placeholderName={"Email Address"}
                  ErrorMessage={errors.email}
                  touched={touched.email}
                />

                <div className="row">
                  <div className="col-12 || col-md-6">
                    <div className="select selectCo" ref={date}>
                      <Field
                        name="birth_date"
                        type="date"
                        className=""
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.birth_date}
                        onClick={(e) => {
                          setShow(!show);
                          if (!show) {
                            e.target.showPicker();
                          } else {
                            e.target.stepDown();
                          }
                        }}
                      />
                      <div className="DateContro">
                        <BsFillCalendarDateFill />
                      </div>
                    </div>
                    <div className="text-danger || fs-6 || text-start || px-4 || DangerText">
                      <div className="opacity-0">1</div>
                    </div>
                  </div>
                  <div className="col-12 || col-md-6">
                    <div className="select">
                      <select
                        className=""
                        aria-label=".form-select-lg example"
                        onChange={handleGenderSelected}
                      >
                        <option value="M">select an gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </select>
                    </div>

                    <div>
                      <div className="text-danger || fs-6 || text-start || px-4 || DangerText">
                        <div className="opacity-0">1</div>
                      </div>
                    </div>
                  </div>
                </div>
                {isLoading ? (
                  <button
                    type="submit"
                    className="loadingBtn position-relative mt-2 || btnDesign"
                  >
                    <p className="mb-0 unvisable">Create</p>
                    <div className="loadingControl position-absolute ">
                      <Spinner
                        variant="primary"
                        animation="border"
                        role="status"
                        className=""
                      ></Spinner>

                    </div>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className=" mt-2 || btnDesign || fw-normal"
                  >
                    Create
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddCustomer;
