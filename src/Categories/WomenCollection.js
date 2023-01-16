import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navigate from "../Navigate/Navigate";
import Loading from "../Product/Loading";



function WomenCollection() {
    const [products, setProduct] = useState([]);
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(res => setProduct(res))

    }, [])
    let womenCloth;
    womenCloth = products.filter(a => a.category == "women's clothing");
 
    // Function for add items to cart..
    function handleSubmit(e) {
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

            for (let i = 0; i < womenCloth.length; i++) {
                if (womenCloth[i].id == e.target.id) {
                    let record = JSON.stringify(womenCloth[i]).substring(0, JSON.stringify(womenCloth[i]).length - 1) + ",\"QTY\":1}";
                    let recordCart = JSON.parse(record);
                    cartit.push(recordCart);
                }
            }
        }

        localStorage.setItem("shoplanecart", JSON.stringify(cartit));
        window.location.reload();


    }
    let nav = useNavigate();

    // This function is for Show individual Product
    function Showindividual(e) {
        let prdct = localStorage.getItem("selectedproduct");
        if (!prdct) {
            prdct = [];
        }
        else {
            prdct = JSON.parse(prdct);
        }

        let p = [];

        for (let i = 0; i < womenCloth.length; i++) {
            if (womenCloth[i].id == e.target.id) {
                p.push(womenCloth[i]);
                break;

            }
        }
        localStorage.setItem("selectedproduct", JSON.stringify(p));
        nav("/selectedproduct");
    }
  // Function for favourite..
  function favClicked(e) {
    let point;

    if (e.target.className == "fa fa-heart gray-color") {
        e.target.className = "fa fa-heart red-color";
        alert("Item added To Favourites.");
        for(let i=0;i<womenCloth.length;i++){
            if(womenCloth[i].id==e.target.id){
                fav.push(womenCloth[i]);
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

    // geeting favourite items from local Storage.
    let fav = localStorage.getItem("favitems");
    if (!fav) {
        fav = []
    }
    else {
        fav = JSON.parse(fav);
    }


    let loginDetails;
    loginDetails = localStorage.getItem("logdata");
    loginDetails = JSON.parse(loginDetails);

    function pleaselog(){
        alert("Please Login First!!");
        nav("/login",true)
    }


    return (
        <div>
            <Header></Header>
            <Navigate></Navigate>
            <div className="row">
            {womenCloth &&
                    (womenCloth).map((product, i) =>
                    (<div className="card-main" key={i} id={product.id}>
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

                        <img src={product.image} id={product.id} className="card-img-top" alt="LoadImage" onClick={Showindividual}></img>
                        <h5 className="product-title" id={product.id} onClick={Showindividual}>{product.title}</h5>
                        <div className="ratings" id={product.id}>

                            <div className="rating-star">
                                {Math.floor(product.rating.rate) == 0 &&
                                    (<><span className="fa fa-star "></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span></>
                                    )}
                                {Math.floor(product.rating.rate) == 1 &&
                                    (<><span className="fa fa-star checked"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span></>
                                    )}
                                {Math.floor(product.rating.rate) == 2 &&
                                    (<><span className="fa fa-star checked"></span><span className="fa fa-star checked"></span><span className="fa fa-star"></span><span className="fa fa-star"></span><span className="fa fa-star"></span></>
                                    )}
                                {Math.floor(product.rating.rate) == 3 &&
                                    (<><span className="fa fa-star checked"></span><span className="fa fa-star checked"></span><span className="fa fa-star checked"></span><span className="fa fa-star"></span><span className="fa fa-star"></span></>
                                    )}
                                {Math.floor(product.rating.rate) == 4 &&
                                    (<><span className="fa fa-star checked"></span><span className="fa fa-star checked"></span><span className="fa fa-star checked"></span><span className="fa fa-star checked"></span><span className="fa fa-star"></span></>
                                    )}
                                {Math.floor(product.rating.rate) == 5 &&
                                    (<><span className="fa fa-star checked"></span><span className="fa fa-star checked"></span><span className="fa fa-star checked"></span><span className="fa fa-star checked"></span><span className="fa fa-star checked"></span></>
                                    )}
                            </div>
                            <span>{product.rating.count} Reviews</span>
                        </div>
                        <div className="price-sec">
                            <p className="price">$ {product.price}</p>
                        </div>
                        <button className="add-cart" onClick={handleSubmit} id={product.id}><i className='fa fa-shopping-cart crt' />Add-to-cart</button>


                    </div>)
                    )}
                {womenCloth.length == 0 &&
                    (<div className="loading"><Loading></Loading></div>)}

            </div>





            <Footer></Footer>

        </div>

    )

}




export default WomenCollection;