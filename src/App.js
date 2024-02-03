import React,{useState} from "react";
import Home from "./Components/Home";
import Main from "./Components/Main";
import Navbar from "./Components/Navbar";
import  SignInForm  from "./Components/SignInForm";
import SignUpForm from "./Components/SignUpForm";
import {Routes, Route } from "react-router-dom";
import ProductList from "./Components/ProductList";
import Wishlist from "./Components/Wishlist";
import Cart from "./Components/Cart";
function App() {
  const [success,setSuccess]=useState(false);
  return (
    <div className="p-2" style={{backdropFilter: "blur(3px)"}}>
      <Navbar success={success} setSuccess={setSuccess}/>
      <Routes>
      <Route exact path="/login" element={<SignInForm setSuccess={setSuccess}/>}></Route>
      <Route exact path="/" element={<SignUpForm/>}></Route>
      {success
      &&
      <>
        <Route exact path="/main" element={<ProductList/>}></Route>
        <Route exact path="/wishlist" element={<Wishlist/>}></Route>
        <Route exact path="/cart" element={<Cart/>}></Route>
      </>}
      </Routes>
      
    </div>
  );
}

export default App;