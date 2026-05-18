import React from "react";
import { useSnapshot } from "valtio";
import state from "../store";

const OrderSuccess = () => {
  const snap = useSnapshot(state);

  if (!snap.orderSuccess) return null;

  return (
    <div className="absolute top-0 left-0 z-40 w-full min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-black mb-3">Order Placed Successfully!</h1>

        <p className="text-gray-600 mb-4">
          Your customized shoe order has been submitted. Our team will review
          your design and contact you soon.
        </p>

        <button
          onClick={() => {
            state.orderSuccess = false;
            state.intro = true;
          }}
          className="bg-black text-white px-5 py-3 rounded-lg font-bold"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;