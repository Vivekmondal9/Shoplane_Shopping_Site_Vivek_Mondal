import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router";
import "./Product.css";


function Product(props) {
    let product = props.items;
    let favourite = props.favourite;

    // console.log(Math.round(product.rating.rate));
    // console.log(product);



    function handleSubmit() {
        let cartit = localStorage.getItem("shoplanecart");

        if (!cartit) {
            cartit = [];
        }
        else {
            cartit = JSON.parse(cartit);
        }

        let flag = 0;
        for (let i = 0; i < cartit.length; i++) {
            if (JSON.stringify(product.id) == cartit[i].id) {
                flag = 1;
                cartit[i].QTY = cartit[i].QTY + 1;
            }
        }


        if (flag == 0) {
            let record = JSON.stringify(product).substring(0, JSON.stringify(product).length - 1) + ",\"QTY\":1}"
            let recordCart = JSON.parse(record);
            cartit.push(recordCart);
        }

        localStorage.setItem("shoplanecart", JSON.stringify(cartit));

        props.notify(cartit.length);
    }


    let nav = useNavigate();


    // This function is for Show individual Product
    function Showindividual(e) {
        console.log(e.target.id);


        let prdct = localStorage.getItem("selectedproduct");
        if (!prdct) {
            prdct = [];
        }
        else {
            prdct = JSON.parse(prdct);
        }
        let p = [];
        p.push(product)
        console.log(p);



        localStorage.setItem("selectedproduct", JSON.stringify(p));
        nav("/selectedproduct");

    }
    //geting the items from Favourite sec.
    let fav = localStorage.getItem("favitems");
    if (!fav) {
        fav = [];
    }
    else {
        fav = JSON.parse(fav);
    }


    // Function for favourite..
    function favClicked(e) {

        if (e.target.className == "fa fa-heart gray-color") {
            e.target.className = "fa fa-heart red-color";
            alert("Item added To Favourites.");

            let favit=localStorage.getItem("favitems");

            if(!favit){
                favit=[];
            }
            else{
                favit=JSON.parse(favit);
            }

            favit.push(product);
            // console.log(favit);

            localStorage.setItem("favitems",JSON.stringify(favit));
        
        }
        else {
            e.target.className = "fa fa-heart gray-color";
            alert("Item remove from Favourites.");
            
            let favit=localStorage.getItem("favitems");

            if(!favit){
                favit=[];
            }
            else{
                favit=JSON.parse(favit);
            }
            
            let point;
           
            for(let i=0;i<favit.length;i++){
                if(product.id==favit[i].id){
                  
                    point=i;
    
                }

            }

            favit.splice(point,1);
             localStorage.setItem("favitems",JSON.stringify(favit));

        }
    }

    function pleaselog(){
        alert("Please Login First!!");
        nav("/login",true)
    }



    let loginDetails;
    loginDetails = localStorage.getItem("logdata");
    loginDetails = JSON.parse(loginDetails);


    return (
        <div className="card-main" id={product.id}>
            {!loginDetails &&
                <div className="fav-part" id={`fav-heart-${product.id}`}><i className="fa fa-heart gray-color" id={product.id} onClick={pleaselog}></i></div>
            }

            {loginDetails &&
                (<>
                    {

                        favourite == "true" ?
                            <div className="fav-part" id={`fav-heart-${product.id}`}><i className="fa fa-heart red-color" id={product.id} onClick={favClicked}></i></div>
                            :

                            <div className="fav-part" id={`fav-heart-${product.id}`}><i className="fa fa-heart gray-color" id={product.id} onClick={favClicked}></i></div>
                    }
                </>)
            }

            {/* <div className="fav-part" id={`fav-heart-${product.id}`}  ><i className="fa fa-heart gray-color" id={product.id} onClick={favClicked}></i></div> */}

            <img src={product.image} id={product.id} className="card-img-top" alt="LoadImage" onClick={Showindividual}></img>
            <h5 className="product-title" id={product.id} onClick={Showindividual}>{product.title}</h5>
            <div className="ratings" id={product.id}>

                <div className="rating-star" >
                    {Math.floor(product.rating.rate) == 0 &&
                        (<><span class="fa fa-star "></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></>
                        )}
                    {Math.floor(product.rating.rate) == 1 &&
                        (<><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></>
                        )}
                    {Math.floor(product.rating.rate) == 2 &&
                        (<><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></>
                        )}
                    {Math.floor(product.rating.rate) == 3 &&
                        (<><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></>
                        )}
                    {Math.floor(product.rating.rate) == 4 &&
                        (<><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span></>
                        )}
                    {Math.floor(product.rating.rate) == 5 &&
                        (<><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></>
                        )}


                </div>
                <span id={product.id}>{product.rating.count} Reviews</span>
            </div>


            <div className="price-sec id={product.id}">
                <p className="price">$ {product.price}</p>
            </div>
            <button className="add-cart" onClick={handleSubmit}><i className='fa fa-shopping-cart crt' />Add-to-cart</button>


        </div>
    )
}


export default Product;