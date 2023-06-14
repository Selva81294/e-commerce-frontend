import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import NewProducts from "./Pages/NewProducts";
import ProductPage from "./Pages/ProductPage";
import CategoryPage from "./Pages/CategoryPage";
import ScrollToTop from "./Components/ScrollToTop";
import CartPage from "./Pages/CartPage";
import OrdersPage from "./Pages/OrdersPage";
import AdminDashboard from "./Pages/AdminDashboard";
import EditProductPage from "./Pages/EditProductPage";
import { useEffect } from "react";
import { io } from "socket.io-client"
import { addNotification } from "./features/userSlice";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  useEffect(()=>{
    const socket = io("ws://localhost:8000")
    socket.off('notification').on('notification', (msgObj, user_id)=>{
      //logic for notification
      if(user_id === user._id){
        dispatch(addNotification(msgObj))
      }
    })

    socket.off('new-order').on('new-order', (msgObj)=> {
      if(user.isAdmin){
        dispatch(addNotification(msgObj))
      }
    })

  },[])

  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop/>
        <Navigation />
        <Routes>
          <Route index element={<HomePage />} />
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          {user && (
            <>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </>
          )}
          {user && user.isAdmin && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/product/:id/edit" element={<EditProductPage />} />
            </>
          )}
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/new-product" element={<NewProducts />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
