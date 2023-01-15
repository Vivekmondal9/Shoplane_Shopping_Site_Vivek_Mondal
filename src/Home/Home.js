import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navigate from "../Navigate/Navigate";
import Loading from "../Product/Loading";
import Product from "../Product/Product";
import "./Home.css";




function Home() {
    const [products, setProduct] = useState([]);
    const [count, setCount] = useState(0);
    let nav=useNavigate();

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(res => setProduct(res))

    }, [])

    function notifyhome(count) {
        setCount(count);
    }

    function ff(e){
        console.log(e.target.id);
        let prdct=localStorage.getItem("selectedproduct");
        if(!prdct){
            prdct=[];
        }
        else{
            prdct=JSON.parse(prdct);
        }
        let p=[];

        for(let i =0;i<products.length;i++){
            if(JSON.parse(products[i].id)==e.target.id){
                p.push(products[i]);
                break;
            }
        }
        console.log(p);
        localStorage.setItem("selectedproduct",JSON.stringify(p));
        nav("/selectedproduct");





    }
    let fav = localStorage.getItem("favitems");
    if (!fav) {
        fav = []
    }
    else {
        fav = JSON.parse(fav);
    }


   

    return (
        <div className="home-elements">
            <Header count={count}></Header>
            <Navigate></Navigate>
            <div className="row">

                {products &&
                    products.map((p, i) => 
                    
                    (<div key={i} className="col-md-3">
                        {
                        JSON.stringify(fav).includes(JSON.stringify(p))?
                         <Product key={i} items={p} notify={notifyhome} favourite="true"></Product>
                        :
                        <Product key={i} items={p} notify={notifyhome} favourite="false"></Product>
                        }
                        
                       
                       </div>)
                    )
                }
                {products.length==0 &&
                    (<div className="loading"><Loading></Loading></div>)}
            </div>
            <Footer></Footer>

            

        </div>
    )
}

export default Home;