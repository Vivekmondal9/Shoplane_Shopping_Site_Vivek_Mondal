import Footer from "../Footer/Footer";
import { Field, Form, Formik } from "formik";
import Header from "../Header/Header";
import * as Yup from "yup";
import { useState } from "react";
import "./Address.css";
import { useNavigate } from "react-router";



function Address() {

    const [initialFormValues] = useState({
        Address: "",
        District: "",
        City: "",
        PinCode: "",
        State: ""


    })
    const signupschema = Yup.object().shape({
        Address: Yup.string().required("Address is required").min(5, "Address can not be less than 5 Charecters").max(50, "Address can not exceeds 30 charecters"),
        District: Yup.string().required("District is Required").max(20, "District can not contain more than 20 charecters."),
        City: Yup.string().required("City is Required"),
        PinCode: Yup.string()
        .required()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(6, 'Must be exactly 5 digits')
        .max(6, 'Must be exactly 5 digits'),
        State: Yup.string("Enter a valid State.").required("State is require"),
           
           
        }
    )
        let nav=useNavigate();
    function confirmOrder(){
        let adresssection=document.getElementById("add");
       

        let odrplaced=document.getElementById("order-placed");

        
            adresssection.style.display="none";
        odrplaced.style.display="flex"
    

    setTimeout(()=>{
        nav("/",true);

    },2000)

    localStorage.removeItem("shoplanecart");
        




    }

    return (
        <div>
            <Header></Header>

            <div className="address" id="add">
                <Formik initialValues={initialFormValues} validationSchema={signupschema} onSubmit={confirmOrder}>
                    {({errors,touched})=>(<Form className="form-sec">
                        <label>
                            Address
                            <Field name="Address" id="add"></Field>
                        </label>
                        {errors.Address && touched.Address ? (<div className="errors">{errors.Address}</div>) : null}

                        <label>
                            District
                            <Field name="District" id="dist"></Field>
                        </label>
                        {errors.District && touched.District ? (<div className="errors">{errors.District}</div>) : null}
                        <label>
                            City
                            <Field name="City" id="city"></Field>
                        </label>
                        {errors.City && touched.City ? (<div className="errors">{errors.City}</div>) : null}
                        <label>
                            Pincode
                            <Field name="PinCode" id="pin"></Field>
                        </label>
                        {errors.PinCode && touched.PinCode ? (<div className="errors">{errors.PinCode}</div>) : null}
                        <label>
                            State
                            <Field name="State" id="stt"></Field>
                        </label>
                        {errors.State && touched.State ? (<div className="errors">{errors.State}</div>) : null}

                        <button type="submit" className="reg-sub-btn">Confirm Order</button>

                    </Form>)}
                </Formik>
                
            </div>

            <div className="order-placed" id="order-placed">
                <h1>Your Order Has Been Successfully Placed.</h1>
            </div>





            <Footer></Footer>






        </div>)

}



export default Address;