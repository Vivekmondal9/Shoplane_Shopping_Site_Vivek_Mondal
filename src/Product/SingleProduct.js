import React from "react";
import { useNavigate } from "react-router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loading from "./Loading";
import "./SingleProduct.css";




function Singleproduct(){


    let singleprd=localStorage.getItem("selectedproduct");
    singleprd=JSON.parse(singleprd);
    let cartit = localStorage.getItem("shoplanecart");
    function handleSubmit(e) {
        // let prd;
        // console.log(e.target.id);
      




        let cartit = localStorage.getItem("shoplanecart");



        if (!cartit) {
            cartit = [];
        }
        else {
            cartit = JSON.parse(cartit);
        }

        let flag = 0;
        for (let i = 0; i < cartit.length; i++) {
            if (JSON.stringify(cartit[i].id) == e.target.id) {
                flag = 1;
                cartit[i].QTY = cartit[i].QTY + 1;
            }
        }


        if (flag == 0) {

            for(let i=0;i<singleprd.length;i++){
                if(singleprd[i].id==e.target.id){
            let record = JSON.stringify(singleprd[i]).substring(0, JSON.stringify(singleprd[i]).length - 1) + ",\"QTY\":1}";
            let recordCart = JSON.parse(record);
            cartit.push(recordCart);
                }
            }
        }

        localStorage.setItem("shoplanecart", JSON.stringify(cartit));
        window.location.reload();


    }
      //geting the items from Favourite sec.
      let fav = localStorage.getItem("favitems");
      if (!fav) {
          fav = []
      }
      else {
          fav = JSON.parse(fav);
      }


      let nav=useNavigate();
     // Function for favourite..
     function favClicked(e) {
         let point;
 
         if (e.target.className == "fa fa-heart gray-color") {
             e.target.className = "fa fa-heart red-color";
             alert("Item added To Favourites.");
             for(let i=0;i<singleprd.length;i++){
                 if(singleprd[i].id==e.target.id){
                     fav.push(singleprd[i]);
                 }
             }
 
             localStorage.setItem("favitems",JSON.stringify(fav));
 
         }
         else {
             e.target.className = "fa fa-heart gray-color";
             alert("Item remove from Favourites.");
             for(let i=0;i<fav.length;i++){
                 if(e.target.id==fav[i].id){
                     point=i;
                     break;
 
                 }
             }
 
             fav.splice(point,1);
             localStorage.setItem("favitems",JSON.stringify(fav));
 
 
         }
     }

    
    let loginDetails;
    loginDetails = localStorage.getItem("logdata");
    loginDetails = JSON.parse(loginDetails);


    function pleaselog(){
        alert("Please Login First!!");
        nav("/login",true)
    }
    function logbeforesubmit(e){
        
        if (!cartit) {
            cartit = [];
        }
        else {
            cartit = JSON.parse(cartit);
        }
    
        let flag = 0;
        for (let i = 0; i < cartit.length; i++) {
            if (JSON.stringify(cartit[i].id) == e.target.id) {
                flag = 1;
                cartit[i].QTY = cartit[i].QTY + 1;
            }
        }
    
    
        if (flag == 0) {
    
            for (let i = 0; i < singleprd.length; i++) {
                if (singleprd[i].id == e.target.id) {
                    let record = JSON.stringify(singleprd[i]).substring(0, JSON.stringify(singleprd[i]).length - 1) + ",\"QTY\":1}";
                    let recordCart = JSON.parse(record);
                    cartit.push(recordCart);
                }
            }
        }
    
        localStorage.setItem("shoplanecart", JSON.stringify(cartit));
        alert("Please Login to Add Item in Cart");
        nav("/login",true);
        
    
    }
    function gotocart(){
        nav("/cart",true);
    }
    return(
        <div>
            <Header></Header>
            <div className="row">
                {singleprd &&
                    singleprd.map((product, i) =>
                    (<div className="prd-main" key={i} id={product.id}>
                         {!loginDetails &&
                            <div className="fav-part" id={`fav-heart-${product.id}`}><i className="fa fa-heart gray-color" id={product.id} onClick={pleaselog}></i></div>
                        }
                        {loginDetails &&
                            (<>{
                                JSON.stringify(fav).includes(JSON.stringify(product)) ?
                                    <div className="fav-part" key={i} id={`fav-heart-${product.id}`}><i className="fa fa-heart red-color" id={product.id} onClick={favClicked}></i></div>
                                    :

                                    <div className="fav-part" key={i} id={`fav-heart-${product.id}`}><i className="fa fa-heart gray-color" id={product.id} onClick={favClicked}></i></div>

                            }</>)}

                        <img className="prd-img-top"src={product.image} alt="Loading Image"></img>
                        <h5 className="prd-title">{product.title}</h5>
                        <p>{product.description}</p>
                        <div className="prd-ratings">

                            <div className="prd-rating-star">
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
                            <span>{product.rating.count} Reviews</span>
                        </div>
                        <div className="prd-price-sec">
                            <p className="prd-price">$ {product.price}</p>
                        </div>
                        {!loginDetails &&
                            <button className="add-cart" id={"d" + product.id} onClick={logbeforesubmit}><i className='fa fa-shopping-cart crt' />Add-to-cart</button>
                        }

                        {loginDetails &&
                            (<>
                                {cartit.includes(JSON.stringify(product.title)) ?
                                    <button className="already-in-cart" onClick={gotocart}><i className='fa fa-shopping-cart crt' />Item-in-Cart</button>
                                    :
                                    <button className="add-cart" onClick={handleSubmit} id={product.id}><i className='fa fa-shopping-cart crt' />Add-to-cart</button>

                                }
                            </>)}


                    </div>)
                    )}
                {
                    singleprd.length == 0 &&
                    (<div className="loading"><Loading></Loading></div>)
                }

            </div>


            <Footer></Footer>
        </div>
    )

}




export default Singleproduct;