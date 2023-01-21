import { json, useNavigate } from "react-router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loading from "../Product/Loading";
import "./cart.css";




function Cart() {

    let cartt = localStorage.getItem("shoplanecart");

    if(!cartt){
      cartt=[];
    }
    else{

    cartt = JSON.parse(cartt);
    }


//for delete item from cart...
    function DeleteFromCart(e) {
        let index = 0;
        for (let i = 0; i < cartt.length; i++) {
          if (JSON.stringify(cartt[i].id) == e.target.id) {
            console.log(JSON.stringify(cartt[i].id));
            console.log(e.target.id);
            index = i;
            break;
          }
        }
        console.log(index)
        cartt.splice(index, 1);
        localStorage.setItem("shoplanecart", JSON.stringify(cartt));
        window.location.reload();
      }

 //for the work of quantity "-" button...
    function addItem(e) {
        for (let i = 0; i < cartt.length; i++) {
          if (JSON.stringify(cartt[i].id) == e.target.id ) {

            if(cartt[i].QTY<5){
            cartt[i].QTY += 1;
    
            localStorage.setItem("shoplanecart", JSON.stringify(cartt))
            window.location.reload();
            }
            else{
              alert("Can Not Add More Than 5 Items!!")
            }
    
    
          }
        
        }
    
      }
      

      //for the work of quantity "-" button...
      function reduceItem(e) {
        for (let i = 0; i < cartt.length; i++) {
          if (JSON.stringify(cartt[i].id) == e.target.id) {
            cartt[i].QTY -= 1;
    
            localStorage.setItem("shoplanecart", JSON.stringify(cartt))
            window.location.reload();
    
    
          }
        }
    
      }

      //for the total amount....
      let ttl = [];
      let x;
    
    if(cartt){
     cartt.map((p, i) => {
    
        x = p.QTY * p.price;
    
        ttl.push(x);
        return x;
      })
    }
    
    
      let carttotal;
      let totalValue=0;
      if (ttl.length > 0) {
        carttotal = ttl.reduce((a, b) => a + b);
        totalValue=totalValue+Math.round(carttotal);
        // console.log(carttotal);
      }


      let nav=useNavigate();
      function sartShopping(){
        nav("/",true);
      
      }
      
      function inputAddress(){
        nav("/address",true);
      }





    return (
        <div>
            <Header></Header>
            <div className="cartitems">
                <div className="cart-row">

                    {cartt &&
                        cartt.map((p, i) => (
                            <div className="cart-part" key={i}>
                                <img src={p.image} className="cart-image"></img>
                                <div className="desc">
                                    <h5 className="cart-item-title">{p.title}</h5>
                                    <p className="cart-item-des">{p.description}</p>
                                    <p className="cart-item-price">$ {p.price}</p>
                                </div>
                                <i className="fa fa-trash delete" onClick={DeleteFromCart} id={p.id}></i>
                                <span className="qnty">
                                <p className="qntt">Quantity</p>
                                <div className="quantity-part">
                                    <button className="minus-quantity" id={p.id} onClick={reduceItem}>-</button>
                                    <p className="quantity">{p.QTY}</p>
                                    <button className="plus-quantity" id={p.id} onClick={addItem}>+</button>
                                </div>
                                </span>


                            </div>
                        )


                        )}
                    {cartt.length == 0 &&
                        (<><div className="cart-empty">Your Cart is Empty!!</div>
                            <button className="start-shopping" onClick={sartShopping}>Start Shopping &rarr;</button>
                        </>)}

                        {!cartt &&
                        (<><div className="cart-empty">Your Cart is Empty!!</div>
                            <button className="start-shopping" onClick={sartShopping}>Start Shopping &rarr;</button>
                        </>)}    


                </div>
                <div className="total-order">
                    <h3 className="order-summary">Order Summary</h3>
                    <div className="sub-total-part">
                        <span className="subtotal">Sub Total</span>
                        <span className="amount">$ {totalValue}</span>

                    </div>
                    {totalValue >0 &&
                    (<>
                    <div className="sub-total-part">
                        <span className="subtotal">Shipping Estimate</span>
                        <span className="amount">$ 5</span>

                    </div>

                   <div className="sub-total-part">
                        <span className="subtotal">TaxEstimate</span>

                        <span className="amount">$ 5</span>

                    </div>
                    <hr></hr>
                    <div className="sub-total-part">
                        <span className="total-amount">Total</span>
                        <span className="total-amount">${totalValue+5+5}</span>

                    </div>
                    <button className="buy-now" onClick={inputAddress}>Buy Now</button></>)}
                    

                </div>
            </div>
            <Footer></Footer>
        </div>

    )

}



export default Cart;