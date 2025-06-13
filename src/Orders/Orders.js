import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ContextConsumer } from "../ContextApi/GlobalContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import "./orders.css";
import Order from "../Order/Order";

function Orders() {
  const { user } = ContextConsumer();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      const collectionRef = collection(db, "users", user?.uid, "orders");
      const queryRef = query(collectionRef, orderBy("created", "desc"));
      const unsubscribe = onSnapshot(queryRef, (snapshoot) => {
        setOrders(
          snapshoot.docs.map((doc) => {
            return { data: doc.data(), id: doc.id };
          })
        );
      });
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h3>Your Orders</h3>
      {orders.length > 0 &&
        orders.map((order) => <Order order={order} key={order.id} />)}
    </div>
  );
}

export default Orders;
