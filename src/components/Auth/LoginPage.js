import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import logo from "../../images/LoginImage/logo-POS.png";
import piglogo from "../../images/LoginImage/android-chrome-512x512.png";
import smalllogo from "../../images/LoginImage/web_light_myphone.png";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  loginPending,
  loginSuccess,
  loginFail,
} from "../../redux/store/LoginSlice";
import { userLogin } from "../../redux/store/LoginSlice";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import DarkMode from "../DarkMode/DarkMode";
import "../../Pages/HomePage/HomePage";
import { toast } from "react-toastify";
import ReusableFieldAuth from "./ReusableFieldAuth";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required Field"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required Field"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.login);
  const parentUser = useRef();
  const [colorIconUser, setColorIconUser] = useState(false);
  const [colorIconPassword, setColorIconPassword] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("dark"))) {
      if (!JSON.parse(localStorage.getItem("dark")).dark) {
        setDark(true);
      }
    }
  }, []);

  return (
    <div className="container || text-center || main || d-flex || align-items-center || justify-content-center || login">
      <section className="rounded-5 || overflow-hidden || boxShadow || w-80 || ">
        <div className="container h-custom h-100">
          <div className="row || justify-content-start || h-100">
            <div className="image_con || hightControl || col-sm-6 || col-md-6 || d-none d-lg-flex ||  col-lg-6 || d-flex || flex-column || justify-content-center || align-items-center">
              <div className="pb-32">
                <div className="w-40  || m-auto || mt-5 ">
                  <img src={piglogo} className="img-fluid" alt="Sample" />
                </div>
                <div className="m-auto w-80">
                  <img src={smalllogo} className="w-100" alt="Sample" />
                </div>
              </div>
            </div>
            <div className="col-sm-12 || col-md-12 ||  col-lg-6 || borderConter || px-5 || py-32 position-relative">
              <div className="position-absolute conTrolDark">
                <DarkMode dark={dark} setDark={setDark} />
              </div>
              <div className="word_login text-start ">
                <p className="">Sign in</p>
              </div>

              <div className="logo || d-block d-lg-none">
                <img
                  src="./img/HomeImg/dark-logo-POS.png"
                  className={`${dark ? `` : `d-none`}`}
                  alt=""
                />
                <img src={logo} className={`${dark ? `d-none` : ``}`} alt="" />
              </div>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                  dispatch(loginPending());

                  try {
                    const isAuth = await userLogin(values);
                    console.log(isAuth.data.access);
                    localStorage.setItem(
                      "username",
                      JSON.stringify(values.username)
                    );
                    dispatch(loginSuccess());
                    toast.success("Login Successful", {
                      theme: "dark",
                    });
                  } catch (error) {
                    dispatch(loginFail(error.message));
                    toast.error(error.message, {
                      theme: "dark",
                    });
                  }
                }}
              >
                {({ errors, touched }) => (
                  <Form className="pt-32">
                    <ReusableFieldAuth
                      icone={<AiOutlineUser />}
                      FieldName={"username"}
                      type={"text"}
                      placeholderName={"User Name"}
                      ErrorMessage={errors.username}
                      touched={touched.username}
                      parentUser={parentUser}
                      colorIcon={colorIconUser}
                      setColorIcon={setColorIconUser}
                      lableID={"form3Example3"}
                    />

                    <ReusableFieldAuth
                      icone={<RiLockPasswordLine />}
                      FieldName={"password"}
                      type={"password"}
                      placeholderName={"Password"}
                      ErrorMessage={errors.password}
                      touched={touched.password}
                      parentUser={parentUser}
                      colorIcon={colorIconPassword}
                      setColorIcon={setColorIconPassword}
                      lableID={"form3Example4"}
                    />

                    <div className="mt-5 || text-center">
                      {isLoading ? (
                        <Spinner
                          variant="dark"
                          animation="border"
                          role="status"
                        ></Spinner>
                      ) : (
                        <button type="submit">Login</button>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
