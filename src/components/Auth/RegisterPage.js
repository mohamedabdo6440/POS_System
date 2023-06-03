import React from 'react'
import './Login.css'
import piglogo from '../../images/LoginImage/android-chrome-512x512.png'
import smalllogo from '../../images/LoginImage/web_light_myphone.png'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { loginPending, loginSuccess, loginFail } from '../../redux/store/LoginSlice'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';


const SignupSchema = Yup.object().shape({
    userName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required Field'),
    email: Yup.string().email('Invalid email').required('Required Field'),
});



const RegisterPage = () => {


    const dispatch = useDispatch()
    const { isLoading, isAuth, error } = useSelector(state => state.login)
    return (


        <div className='container text-center my-4'>
            <div><h1>Registration Page</h1></div>
            <section className="rounded">
                <div className="container h-custom h-100">
                    <div className="row d-flex justify-content-start align-items-center h-100">
                        <div className="image_con col-md-9 col-lg-6 col-xl-5 col-sm-3 h-100 ">
                            <div className='w-50 m-auto mt-5 '>
                                <img src={piglogo}
                                    className="img-fluid" alt="Sample" />
                            </div>
                            <div className='m-auto'>
                                <img src={smalllogo}
                                    className="img-fluid" alt="Sample" />
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <div className="word_login ms-5 mb-5">
                                <p className="">Registration</p>

                            </div>
                            <Formik
                                initialValues={{
                                    userName: '',
                                    email: '',
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={values => {

                                    // same shape as initial values
                                    alert('[' + values.userName + ' ------ ' + values.email + ']');
                                    let token = localStorage.setItem('token')
                                    try {
                                        jwt_decode(token)
                                    } catch (error) {
                                        localStorage.clearItem('token');

                                    }

                                    dispatch(loginSuccess())
                                }}


                            >

                                {({ errors, touched }) => (
                                    <Form>
                                        <div className="form-outline d-flex">
                                            <label className="form-label me-2 mt-2 w-25" htmlFor="form3Example3">UserName</label>
                                            <Field name="userName" id="form3Example3" className="form-control-lg w-100" />
                                        </div>
                                        <div className='text-danger mb-4 mt-2 ms-5'>
                                            {errors.userName && touched.userName ? (
                                                <div>{errors.userName}</div>
                                            ) : null}
                                        </div>

                                        <div className="d-flex form-outline mb-3">
                                            <label className="form-label me-3 mt-2 w-25" htmlFor="form3Example4">E-mail</label>

                                            <Field name="email" type="email" id="form3Example4" className=" form-control-lg w-100" />

                                        </div>
                                        <div className='text-danger mb-4 mt-2 ms-5'>
                                            {errors.email && touched.email ? (
                                                <div>{errors.email}</div>
                                            ) : null}
                                        </div>

                                        <div className="ms-5 text-center  mt-4 ">
                                            <button type="submit">Submit</button>
                                            {isLoading && <Spinner variant="primary" animation="border" role="status"> <span className="visually-hidden">Loading...</span></Spinner>}
                                        </div>
                                    </Form>
                                )}
                            </Formik>




                        </div>
                    </div>
                </div>



            </section>

        </div>
    )
}

export default RegisterPage