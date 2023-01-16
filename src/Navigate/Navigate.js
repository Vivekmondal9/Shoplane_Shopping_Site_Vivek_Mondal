import React from "react";
import "./Navigate.css";
import { useNavigate } from "react-router-dom";

function Navigate(){
    let nav=useNavigate();
    function navtomen(){
        nav("/mencloth",true)

    }
    function allProduct(){
        nav("/",true);

    }
    function electronics(){
        nav("/electronics",true);
    }
    function navtowomen(){
        nav("/womencloth",true);

    }
    function navtoJewel(){
        nav("/jewelery",true);
    }
    return(
        <div className="navigate-part">
            <span className="all" onClick={allProduct}>All</span>
            <span className="electronics" onClick={electronics}>Electronics</span>
            <span className="jewelery" onClick={navtoJewel}>Jewelery</span>
            <span className="men-cloth" onClick={navtomen}>Men's Clothing</span>
            <span className="women-cloth" onClick={navtowomen}>Women's Clothing</span>
        </div>
    )
}


export default Navigate;