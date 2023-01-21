import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navigate from "../Navigate/Navigate";
import Loading from "../Product/Loading";



function JeweleryCollection() {
    const [products, setProduct] = useState([]);
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(res => setProduct(res))

    }, [])
    let jewel;
    jewel = products.filter(a => a.category == "jewelery");
    // console.log(jewel);
    let cartit = localStorage.getItem("shoplanecart");
    if (!cartit) {
        cartit = [];
    }
    else {
        cartit = JSON.parse(cartit);
    }
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

            for(let i=0;i<jewel.length;i++){
                if(jewel[i].id==e.target.id){
            let record = JSON.stringify(jewel[i]).substring(0, JSON.stringify(jewel[i]).length - 1) + ",\"QTY\":1}";
            let recordCart = JSON.parse(record);
            cartit.push(recordCart);
                }
            }
        }

        localStorage.setItem("shoplanecart", JSON.stringify(cartit));
        window.location.reload();


    }
    let nav=useNavigate();

     // This function is for Show individual Product
    function Showindividual(e) {
        console.log(e.target.id);
  

        
            let prdct = localStorage.getItem("sjeweltedproduct");
            if (!prdct) {
                prdct = [];
            }
            else {
                prdct = JSON.parse(prdct);
            }
           
            let p=[];

            for(let i=0;i<jewel.length;i++){
                if(jewel[i].id==e.target.id){
                    p.push(jewel[i]);
                    break;

                }
            }
            // console.log(p);

            
       
            localStorage.setItem("sjeweltedproduct", JSON.stringify(p));
            nav("/sjeweltedproduct");
        





    }
    //Getting the Favourite Items from Local Storage
let fav = localStorage.getItem("favitems");
if (!fav) {
    fav = []
}
else {
    fav = JSON.parse(fav);
}

   // Function for add to Favourite
    function favClicked(e) {
        let point;

        if (e.target.className == "fa fa-heart gray-color") {
            e.target.className = "fa fa-heart red-color";
            alert("Item added To Favourites.")
            
            for(let i=0;i<jewel.length;i++){
                if(jewel[i].id==e.target.id){
                    fav.push(jewel[i]);
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




//Geting the Login State.
let loginDetails;
loginDetails = localStorage.getItem("logdata");
loginDetails = JSON.parse(loginDetails);



function pleaselog(){
    alert("Please Login First!!");
    nav("/login",true)
}
function logbeforesubmit(e){
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

        for (let i = 0; i < jewel.length; i++) {
            if (jewel[i].id == e.target.id) {
                let record = JSON.stringify(jewel[i]).substring(0, JSON.stringify(jewel[i]).length - 1) + ",\"QTY\":1}";
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
   
    return (
        <div>
            <Header></Header>
            <Navigate></Navigate>
            <div className="row">
            {jewel &&
                    (jewel).map((product, i) =>
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
                        <div className="price-sec">
                            <p className="price">$ {product.price}</p>
                        </div>
                        {!loginDetails &&
                            <button className="add-cart" id={"d" + product.id} onClick={logbeforesubmit}><i className='fa fa-shopping-cart crt' />Add-to-cart</button>
                        }

                        {loginDetails &&
                            (<>
                                {JSON.stringify(cartit).includes(JSON.stringify(product.title)) ?
                                    <button className="already-in-cart" onClick={gotocart}><i className='fa fa-shopping-cart crt' />Item-in-Cart</button>
                                    :
                                    <button className="add-cart" onClick={handleSubmit} id={product.id}><i className='fa fa-shopping-cart crt' />Add-to-cart</button>

                                }
                            </>)}


                    </div>)
                    )}
                {jewel.length == 0 &&
                    (<div className="loading"><Loading></Loading></div>)}

            </div>
            <Footer></Footer>






        </div>

    )

}




export default JeweleryCollection;