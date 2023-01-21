import React, { useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";




function Header(props) {

    let nav = useNavigate();
    function mainpage() {
        nav("/", true);
    }

    const [count, setCount] = useState(0);

    useEffect(() => {
        let itms = localStorage.getItem("shoplanecart");

        if (itms) {
            itms = JSON.parse(itms);
            setCount(itms.length);
        }

    }, [props.count])


    function toCount() {
        nav("/cart", true);
    }
    let loginDetails;
    loginDetails = localStorage.getItem("logdata");
    loginDetails = JSON.parse(loginDetails);
    // console.log(loginDetails);
    function removelogg() {
        localStorage.removeItem("logdata");
    }

    function logcount() {
        alert("Please Login to view Your cart!!")
        nav("/login", true);
    }
    function myFunction() {
        var x = document.getElementById("myLinks");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }



    return (
        <div className="main-header">
            <div className="left-header" onClick={mainpage}>
                <p className="shoplane-left">SHOP</p><p className="shoplane-right">LANE</p>
            </div>

            <div className="right-header">

                <div class="dropdown">
                    {!loginDetails &&
                        (<><button class="dropbtn"><i class="fa fa-user-circle circle-user" ></i> Login <br />or Signup<i class="fa fa-angle-down arrow"></i></button>
                            <div class="dropdown-content">
                                <a href="./login">LogIn</a>
                                <a href="./signup">Sign Up</a>

                            </div></>)
                    }

                    {loginDetails &&
                        (<>
                            <button className="dropbtn"><i className="fa fa-user-circle circle-user" ></i>{loginDetails}<i className="fa fa-angle-down arrow"></i></button>
                            <div className="dropdown-content">
                                <a href="/favourite">Favourites</a>
                                <a href="./login" onClick={removelogg}>Logout</a>


                            </div>


                        </>)}



                </div>





                {loginDetails &&
                    (<>
                        <div className="cart-sign">
                            <i className='fa fa-shopping-cart crt' onClick={toCount}></i>
                            <span className="small-cart" onClick={toCount}>&#128722;</span>
                            <span className="count">{count}</span>
                        </div>
                    </>)
                }

                {!loginDetails &&
                    (<>
                        <div className="cart-sign">
                            <i className='fa fa-shopping-cart crt' onClick={logcount}></i>
                            <span className="small-cart" onClick={logcount}>&#128722;</span>
                            {/* <span className="count">0</span> */}
                        </div>
                    </>)
                }
            </div>
        </div>


    )
}

export default Header;