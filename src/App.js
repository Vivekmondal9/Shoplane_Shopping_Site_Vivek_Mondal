import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Mencollection from './Categories/MenCollection';
import { useEffect, useState } from 'react';
import Loading from './Product/Loading';
import Electronics from './Categories/Electronics';
import WomenCollection from './Categories/WomenCollection';
import JeweleryCollection from './Categories/Jewelery';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Forgotpassword from './Login/Forgotpassword';
import Cart from './Cart/Cart';
import Address from './Cart/Address';
import Singleproduct from './Product/SingleProduct';
import Favourite from './Categories/Favourite';


function App() {


 return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/mencloth' element= {<Mencollection></Mencollection>}></Route>
      <Route path='/electronics' element={<Electronics></Electronics>}></Route>
      <Route path='/womencloth' element={<WomenCollection></WomenCollection>}></Route>
      <Route path='/jewelery' element={<JeweleryCollection></JeweleryCollection>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/signup' element={<Signup></Signup>}></Route>
      <Route path="forgotpassword" element={<Forgotpassword></Forgotpassword>}></Route>
      <Route path='/cart' element={<Cart></Cart>}></Route>
      <Route path='/address' element={<Address></Address>}></Route>
      <Route path='/selectedproduct' element={<Singleproduct></Singleproduct>}></Route>
      <Route path='/favourite' element={<Favourite></Favourite>}></Route>
     </Routes>
    </div>
  );
}

export default App;
