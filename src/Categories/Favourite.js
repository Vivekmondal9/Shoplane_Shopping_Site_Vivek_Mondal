import { useNavigate } from "react-router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navigate from "../Navigate/Navigate";
import Loading from "../Product/Loading";



function Favourite(){
    
    let nav=useNavigate();
    function sartShopping(){
      nav("/",true);
    
    }
    function handleSubmit(e) {
        let prd;
        console.log(e.target.id);
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

            for (let i = 0; i < fav.length; i++) {
                if (fav[i].id == e.target.id) {
                    let record = JSON.stringify(fav[i]).substring(0, JSON.stringify(fav[i]).length - 1) + ",\"QTY\":1}";
                    let recordCart = JSON.parse(record);
                    cartit.push(recordCart);
                }
            }
        }

        localStorage.setItem("shoplanecart", JSON.stringify(cartit));
        window.location.reload();


    }


  

    // Getting the Fvourite items from localStorage.
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
        console.log(e.target.id);

        if (e.target.className == "fa fa-heart red-color") {
         
            alert("Item Removed from  Favourites.");
            
            for(let i=0;i<fav.length;i++){
                if(e.target.id==fav[i].id){
                    point=i;
                    break;

                }
            }

            fav.splice(point,1);
            localStorage.setItem("favitems",JSON.stringify(fav))
            window.location.reload();

        }
       
    }

    //Getting the Login Details..
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
                {fav &&
                    (fav).map((product, i) =>
                    (<div className="card-main" key={i} id={product.id}>
                        {!loginDetails &&
                            <div className="fav-part" id={`fav-heart-${product.id}`}><i className="fa fa-heart gray-color" id={product.id} onClick={pleaselog}></i></div>
                        }
                        {loginDetails &&
                        (<> {
                            JSON.stringify(fav).includes(JSON.stringify(product)) ?
                                <div className="fav-part" key={i} id={`fav-heart-${product.id}`}><i className="fa fa-heart red-color" id={product.id} onClick={favClicked}></i></div>
                                :

                                <div className="fav-part" key={i} id={`fav-heart-${product.id}`}><i className="fa fa-heart gray-color" id={product.id} onClick={favClicked}></i></div>

                        }</>)}
                       
                        <img src={product.image} id={product.id} className="card-img-top" alt="LoadImage"></img>
                        <h5 className="product-title" id={product.id} >{product.title}</h5>
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
                        <button className="add-cart" onClick={handleSubmit} id={product.id}><i className='fa fa-shopping-cart crt' />Add-to-cart</button>


                    </div>)
                    )}
                {
                    fav.length == 0 &&
                    (<><div className="cart-empty">Your Favourite is Empty!!</div>
                    <button className="start-shopping" onClick={sartShopping}>Start Shopping &rarr;</button>
                </>)
                }

            </div>
          <Footer></Footer>








        </div>

    )

}

export default Favourite;