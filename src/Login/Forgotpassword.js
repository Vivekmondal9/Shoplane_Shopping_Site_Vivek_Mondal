import React from "react";
import "../Signup/Signup.css";
import { Field, Formik, Form } from "formik";
import { useState } from "react";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navigate from "../Navigate/Navigate";
import * as Yup from "yup";

import { json, useNavigate } from "react-router";




function Forgotpassword() {

    let nav = useNavigate();
    const [initialFormValues] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
    });



    const signupschema = Yup.object().shape({

        firstName: Yup.string().required("First Name is Required").min(3, "Name must have Three Charecters.").max(20, "Name Can not have more than 20 Charecters"),
        lastName: Yup.string().required("Last Name is Required").min(3, "Name must have Three Charecters.").max(20, "Name Can not have more than 20 Charecters"),
        phone: Yup.string().required("Phone Number is Require").min(10, "Phone Must Have 10 Digits.").max(12, "Phone Must have 10 Digits."),
        email: Yup.string("Email type invalid").required("Email can not be empty").email("Invalid Email Address."),
        password: Yup.string().required('Please Enter your password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
        confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Password Must Match.")

    }
    )

    function submitted(e) {
        let sdata = localStorage.getItem("signedup");
        sdata = JSON.parse(sdata);
        let point;
        let flag = false;

        for (let i = 0; i < sdata.length; i++) {
            if (e.email.toLowerCase() == sdata[i].email.toLowerCase()) {
                point = i;
                flag = true;
                break;
            }        
        }

        if(flag==true){
           

            sdata.splice(point,1,e);
            localStorage.removeItem("signedup");
            let frshdata=localStorage.getItem("signedup");
            localStorage.setItem("signedup",JSON.stringify(sdata));
            alert("Your Password has been Successfully Changed...");

           


            
        }
        else {
            alert("You Don't Have any account. Please Sign Up First.!!");
            nav("/signup", true);

        }












        document.getElementsByName("contact-form")[0].reset();
    }



    return (
        <div className="forgot-password">
            <Header></Header>
            <Navigate></Navigate>

            <div className="signup-main">

                <Formik initialValues={initialFormValues} validationSchema={signupschema} onSubmit={submitted}>
                    {({ errors, touched }) => (
                        <Form name="contact-form" className="signup-sec">
                            <h1 className="signup-heading">Forgot password</h1>

                            <Field name="firstName" id="fname" placeholder="First Name"  ></Field>

                            {errors.firstName && touched.firstName ? (<div className='errors'>{errors.firstName}</div>) : null}

                            <Field name="lastName" id="lname" placeholder="Last Name"  ></Field>

                            {errors.lastName && touched.lastName ? (<div className='errors'>{errors.lastName}</div>) : null}


                            <Field type="number" name="phone" id="phone" placeholder="Phone Number"  ></Field>

                            {errors.phone && touched.phone ? (<div className='errors'>{errors.phone}</div>) : null}


                            <Field name="email" type="email" id="mail" placeholder="E-Mail Address"  ></Field>

                            {errors.email && touched.email ? (<div className="errors">{errors.email}</div>) : null}


                            <Field name="password" type="password" placeholder="Password" ></Field>

                            {errors.password && touched.password ? (<div className="errors">{errors.password}</div>) : null}



                            <Field name="confirmPassword" type="password" placeholder="Confirm Password"></Field>

                            {errors.confirmPassword && touched.confirmPassword ? (<div className="errors">{errors.confirmPassword}</div>) : null}
                            {/* <p className="already-have-account">Already Have an account? Login <a href="/login" className="login-here">here.</a></p> */}



                            <button type="submit" className="sign-up-btn">Submit</button>

                        </Form>
                    )}





                </Formik>
            </div>



            <Footer></Footer>

        </div>
    )
}


export default Forgotpassword;