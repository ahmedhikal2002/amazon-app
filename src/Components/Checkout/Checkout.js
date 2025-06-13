import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { NavLink, useNavigate } from "react-router-dom";
import { totalQuantity, totalPrice } from "../../ContextApi/AppReducer";
import { ContextConsumer } from "../../ContextApi/GlobalContext";
import { FormatCurrency } from "../../FormatCurrency";
import CartProducts from "../CartProducts/CartProducts";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { basket, user, dispatch } = ContextConsumer();
  const [sessionId, setSessionId] = useState("");
  const [process, setProcess] = useState(null);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const handleChange = (e) => {
    setDisabled(false);
    setError(e.error ? e.message : null);
  };
  const handleCheckOut = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.warning("you have to login frist");
      return;
    }
    if (basket.length === 0) {
      toast.warning("your cart is empty");
      return;
    }
    setProcess("processing...");
    await stripe
      .confirmCardPayment(sessionId, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        const docRef = doc(db, "users", user?.uid, "orders", paymentIntent.id);
        setDoc(docRef, {
          basket: basket,
          created: paymentIntent.created,
          amount: paymentIntent.amount,
        });
        setProcess(null);
        setError(null);
        navigate("/orders", { replace: true });
        toast.success("payment status success ");
        dispatch({ type: "CLEAR_BASKET" });
      })
      .catch((e) => {
        toast.error(`something goes wrong ${e.message}`);
        setError(e.message);
      });
    setProcess(null);
  };
  useEffect(() => {
    if (!user || basket.length === 0) return;
    const getSessionId = async () => {
      if (totalPrice(basket) > 0 && user) {
        const res = await axios.post(
          `http://localhost:4242/payments/create?total=${
            totalPrice(basket) * 100
          }`
        );
        setSessionId(res.data.clientSecret);
      }
      return;
    };
    getSessionId();
  }, [basket, user]);

  return (
    <div className="checkout">
      <div className="title">
        Checkout
        <NavLink to="/cart">
          {totalQuantity(basket) <= 1
            ? ` (${totalQuantity(basket)} item)`
            : ` (${totalQuantity(basket)} items)`}
        </NavLink>
      </div>
      <div className="checkout-process">
        <div className="head">
          <h3>Delivery Address</h3>
          <div className="details">
            <span>{user?.email}</span>
            <p>Alexandria, Egypt</p>
          </div>
        </div>
      </div>
      <div className="checkout-process">
        <div className="head">
          <h3>Review items and delivery</h3>
          <div className="details">
            {basket.map((item) => (
              <CartProducts
                key={item.id}
                name={item.name}
                image={item.imgUrl}
                rating={item.rate}
                price={item.price}
                id={item.id}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="checkout-process">
        <div className="head">
          <h3>Payment Method</h3>
          <div className="details">
            <form onSubmit={handleCheckOut}>
              <CardElement onChange={handleChange} />
              <h4 style={{ marginTop: "10px" }}>
                Order Total :{FormatCurrency(totalPrice(basket))}
              </h4>
              <button className="btn" disabled={process || disabled}>
                {process ? process : "Buy Now"}
              </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
