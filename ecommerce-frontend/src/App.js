import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import './assets/style.css';
import CartList from './frontend/CartList';
import Checkout from './frontend/Checkout';
import Home from './frontend/Home';
import Login from './frontend/Login';
import Logout from './frontend/Logout';
import OrderSuccessMassage from './frontend/OrderSuccessMassage';
import Product from './frontend/Product';
import Registration from './frontend/Registration';
import Header from './frontend/includes/Header';
// import CartList from './frontend/CartList';

function App() {
  const [cart, setCart] = useState(0);
  const [searchData, setSearchData] = useState([]);
  let user = JSON.parse(localStorage.getItem('user-info'));
  let userId =  user ? user.id : '';
  
  function userUpdate() {
    user = JSON.parse(localStorage.getItem('user-info'));
    userId =  user ? user.id : '';
  }
  useEffect( ()=>{
    cartItems();
  },[]);

  async function cartItems(){
    let result =await fetch('http://127.0.0.1:8000/api/cartitem/'+userId);
    result= await result.json();
    setCart(result);
  }

  function emptyCart(){
    setCart(0);
  }
  
  return (
    <BrowserRouter> {console.log(searchData)}
      <Header items={cart} setSearchData={setSearchData} />
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/cartlist" element={<CartList cartItem={cartItems}/>} />
            <Route path="/login" element={<Login cartItem={cartItems} userUpdate={userUpdate} />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/product/:id" element={<Product cartItem={cartItems} />} />
            <Route path="/checkout" element={<Checkout cartItem={cartItems} />} />
            <Route path="/massage" element={<OrderSuccessMassage />} />
            <Route path="/logout" element={<Logout emptyCart={emptyCart} />} />
          </Route>
        </Routes>

    </BrowserRouter>
  );
}
export default App;
