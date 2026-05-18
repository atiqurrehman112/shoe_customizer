import React, { useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";

const TrackOrder = () => {
  const snap = useSnapshot(state);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);

  if (!snap.trackingPage) return null;

  const searchOrders = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();

      const filteredOrders = data.filter(
        (order) => order.email === email && order.phone === phone
      );

      setOrders(filteredOrders);
      setSearched(true);
    } catch (error) {
      console.log("Track order error:", error);
    }
  };

  return (
    <div className="absolute top-0 left-0 z-40 w-full min-h-screen bg-gray-100 overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h1 className="text-3xl font-black mb-4">Track Your Order</h1>

          <form onSubmit={searchOrders} className="grid md:grid-cols-3 gap-4">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-3 rounded-lg"
              required
            />

            <button className="bg-black text-white rounded-lg font-bold">
              Search Orders
            </button>
          </form>

          <button
            onClick={() => {
              state.trackingPage = false;
              setSearched(false);
              setOrders([]);
            }}
            className="mt-4 border border-black px-4 py-2 rounded-lg font-bold"
          >
            Back
          </button>
        </div>

        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl shadow p-6">
              <div className="grid md:grid-cols-3 gap-5">
                <img
                  src={order.designImage}
                  alt="Design"
                  className="rounded-xl border"
                />

                <div>
                  <h2 className="text-2xl font-black">Order Details</h2>
                  <p>Email: {order.email}</p>
                  <p>Phone: {order.phone}</p>
                  <p>Size: {order.shoeSize}</p>
                  <p>Material: {order.material}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-black">Status</h2>
                  <p className="text-xl mt-2 font-bold">{order.orderStatus}</p>
                  <p className="mt-3">Price: Rs. {order.price}</p>
                </div>
              </div>
            </div>
          ))}

          {searched && orders.length === 0 && (
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-xl font-bold">No orders found</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;