import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";

const MyOrders = () => {
  const snap = useSnapshot(state);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();

      const userOrders = data.filter(
        (order) => order.user === snap.currentUser?.id
      );

      setOrders(userOrders);
    } catch (error) {
      console.log("Fetch my orders error:", error);
    }
  };

  useEffect(() => {
    if (snap.myOrdersPage && snap.currentUser) {
      fetchOrders();
    }
  }, [snap.myOrdersPage, snap.currentUser]);

  if (!snap.myOrdersPage) return null;

  if (!snap.currentUser) {
    state.myOrdersPage = false;
    state.authPage = true;
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 z-40 w-full bg-gray-100 p-6"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black">My Orders</h1>

        <button
          onClick={() => {
            state.myOrdersPage = false;
          }}
          className="bg-black text-white px-4 py-2 rounded-lg font-bold"
        >
          Back
        </button>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-xl shadow p-5">
            <div className="grid md:grid-cols-3 gap-5">
              <img
                src={order.designImage}
                alt="Design"
                className="rounded-lg border"
              />

              <div>
                <h2 className="font-bold text-xl">{order.name}</h2>
                <p>Email: {order.email}</p>
                <p>Size: {order.shoeSize}</p>
                <p>Material: {order.material}</p>
              </div>

              <div>
                <p className="font-bold">Status: {order.orderStatus}</p>
                <p className="mt-2">Price: Rs. {order.price}</p>
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <h2 className="text-xl font-bold">No orders found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;