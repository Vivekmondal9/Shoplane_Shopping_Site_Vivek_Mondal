import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loading from "./Loading";
import "./SingleProduct.css";




function Singleproduct(){


    let singleprd=localStorage.getItem("selectedproduct");
    singleprd=JSON.parse(singleprd);

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
    return(
        <div>
            <Header></Header>
            <div className="row">
                {singleprd &&
                    singleprd.map((product, i) =>
                    (<div className="prd-main" key={i} id={product.id}>
                        <div className="prd-fav-part"><i className="fa fa-heart fav"></i></div>
                        <img src={product.image} className="prd-img-top" alt="LoadImage"></img>
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
                        <button className="prd-add-cart" onClick={handleSubmit} id={product.id}><i className='fa fa-shopping-cart crt' />Add-to-cart</button>


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