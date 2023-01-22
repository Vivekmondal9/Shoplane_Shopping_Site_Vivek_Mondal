import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navigate from "../Navigate/Navigate";
import "./Login.css";
import * as Yup from "yup";


function Login() {
    let nav = useNavigate();

    const [initialval] = useState({
        username: "",
        password: ""
    })

    function logsubmit(e) {
        let lg = localStorage.getItem("signedup");
        if (!lg) {
            lg = [];
        }
        else {
            lg = JSON.parse(lg)
        }


        let flag = 0;
        let a = [];


        if (lg.length > 0) {



            for (let i = 0; i < lg.length; i++) {

                if (e.username.toLowerCase() == lg[i].email.toLowerCase()) {

                    a.push(lg[i]);
                    flag = 1;
                    break;

                }

            }
                if (flag == 1) {
                    for (let j of a) {
                        if (j.password == e.password) {
                            alert(`${j.firstName} ${j.lastName}. You have Sucessfully Loggedin.`);
                            nav("/", true);
                            let lc = localStorage.getItem("logdata");
                            let fd = j.firstName + " " + j.lastName;
                            localStorage.setItem("logdata", JSON.stringify(fd));
                        }
                        else {
                            alert("You have Enered an invalid username or password!!!");
                        }
                    }
                }
                else {
                    alert("You dont have any account. Please Sign up.");
                    console.log("hi");

                    nav("/signup", true);

                }


        }
        else {
            alert("You dont have any account. Please Sign up.");
            console.log("hi");


            nav("/signup", true);


        }



        document.getElementsByName("login-form")[0].reset();
    }



    const signupschema = Yup.object().shape({
        username: Yup.string().required("This Field is Required."),
        password: Yup.string().required("Password is Required.")

    })
    return (
        <div >
            <Header></Header>
            <Navigate></Navigate>

            <div className="login-page">
                <div className="log-field">
                    <Formik initialValues={initialval} onSubmit={logsubmit} validationSchema={signupschema}>
                        {({ errors, touched }) => (
                            <Form name="login-form" className="form-sec" >
                                <h1 className="heading-login">Login</h1>
                                <Field name="username" id="uname" className="inputclass" placeholder="User Name" ></Field>
                                {errors.username && touched.username ? (<div className='errors'>{errors.username}</div>) : null}

                                <Field name="password" type="password" id="password" className="inputclass" placeholder="Password"  ></Field>
                                {errors.password && touched.password ? (<div className='errors'>{errors.password}</div>) : null}

                                <p className="dont-have-account">Don't Have an account? Sign Up <a href="/signup" className="signup-here">here.</a></p>
                                <p className="dont-have-account">Forgot Password? <a href="/forgotpassword" className="signup-here">Reset here.</a></p>
                                <button type="submit" id="loginbtn" className="sign-up-btn">Login</button>
                            </Form>
                        )}

                    </Formik>

                </div>


            </div>

            <Footer></Footer>
        </div>
    )

}



export default Login;