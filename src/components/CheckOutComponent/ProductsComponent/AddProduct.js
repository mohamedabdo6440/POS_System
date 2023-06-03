import React, { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from 'react-redux'
import * as Yup from "yup";
import { insertProduct } from "../../../redux/store/ProductsSlice";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/esm/Spinner";

const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg"];
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  imageUrl: Yup.mixed()
    .nullable()
    .notRequired()
    .test(
      "FILE_SIZE",
      "Uploaded file is too big.",
      (value) => !value || (value && value.size <= 1024 * 1024)
    )
    .test(
      "FILE_FORMAT",
      "Uploaded file has unsupported format.",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
});

const AddProduct = ({ showForm }) => {

  const dispatch = useDispatch()

  const { isLoading } = useSelector((state) => state.products);

  const [image, setImage] = useState("");
  const fileRef = useRef("");
  const [category, setCategory] = useState("http://myphone-pos.onrender.com/api/device/categories/1");
  const [company, setCompany] = useState("http://myphone-pos.onrender.com/api/device/companies/1");

  //handle image promise returned with base54
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setImage(base64);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  //handle category select
  const handleCategorySelected = (e) => {
    setCategory(e.target.value);
  };
  //handle company select
  const handleCompanySelected = (e) => {
    setCompany(e.target.value);
  };

  return (
    <div className={`${showForm ? "unvisable" : "visable"} transition`}>
      <h4 className="fs-6 || my-3 || text-info">Add New Product If you nedded</h4>

      <Formik
        initialValues={{
          name: "",
          imageUrl: "",
          category: "",
          company: "",
        }}
        validationSchema={SignupSchema}

        onSubmit={(values) => {
          values.imageUrl = "/images/models/samsung/web_samsung-galaxy-s21-plus-5g-2.png";
          values.category = category;
          values.company = company;

          //async request
          setTimeout(() => {
            dispatch(insertProduct(values));
            setTimeout(() => {
              values.name = '';
              values.imageUrl = '';
              values.category = '';
              values.company = '';
            }, 100);
          }, 1000);

        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="name"
              placeholder="name"
              className="inputStyle || py-1 || rounded-3 || px-3 || my-2"
            />
            {errors.name && touched.name ? (
              <div className="text-danger">{errors.name}</div>
            ) : null}

            <div className="col-md-12">
              <div className="form-group my-2">
                <input
                  ref={fileRef}
                  hidden
                  type="file"
                  className="form-control"
                  onChange={(e) => uploadImage(e)}
                />
                <div className="text-danger text-center py-1">
                  {errors.imageUrl}
                </div>
              </div>

              <button
                type="button"
                className={` ${fileRef.current.value ? "bg-success" : ""
                  } my-4 w-100`}
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                <i className="fa-solid fa-image fa-lg me-3 fa-fw"></i>
                {fileRef.current.value
                  ? ` Done / ${fileRef.current.value}`
                  : "Upload Product Image"}
              </button>
            </div>

            <div className="form-group my-2">
              <select
                className="form-select form-control mb-3"
                aria-label=".form-select-lg example"
                onChange={handleCategorySelected}
              >
                <option value="http://myphone-pos.onrender.com/api/device/categories/1">Smartphone</option>
              </select>
            </div>

            <div className="form-group my-2">
              <select
                className="form-select form-control mb-3"
                aria-label=".form-select-lg example"
                onChange={handleCompanySelected}
              >
                <option value="http://myphone-pos.onrender.com/api/device/companies/1">Apple</option>
                <option value="http://myphone-pos.onrender.com/api/device/companies/2">Samsung</option>
              </select>
            </div>

            <div>
              {isLoading ? (
                <button
                  type="submit"
                  className="loadingBtn position-relative mt-2"
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
                <button type="submit" className=" mt-2">
                  Create
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
