import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Hedear/Header";
import Login from "./Components/Login/Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { ContextConsumer } from "./ContextApi/GlobalContext";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Checkout from "./Components/Checkout/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./Orders/Orders";

function App() {
  const { dispatch } = ContextConsumer();
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        dispatch({
          type: "SET_USER",
          user: authuser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cart"
          element={
            <>
              <Header />
              <Cart />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Elements stripe={stripePromise}>
                <Checkout />
              </Elements>
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
