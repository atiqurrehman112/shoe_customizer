import React, { useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import { CustomButton } from "../components";

const Order = () => {
  const snap = useSnapshot(state);

  const [formData, setFormData] = useState({
    name: snap.currentUser?.name || "",
    email: snap.currentUser?.email || "",
    phone: "",
    shoeSize: "",
    footProblem: "",
    material: "",
    soleType: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const calculatePrice = () => {
    let basePrice = 5000;

    if (formData.material === "Leather") {
      basePrice += 2000;
    }

    if (formData.material === "Suede") {
      basePrice += 1500;
    }

    if (formData.soleType === "Orthopedic Sole") {
      basePrice += 2500;
    }

    if (formData.soleType === "Extra Grip Sole") {
      basePrice += 1200;
    }

    if (formData.footProblem !== "No Problem") {
      basePrice += 1000;
    }

    return basePrice;
  };
  const submitOrder = async (e) => {
    e.preventDefault();

    if (!state.currentUser) {
      alert("Please login first to place your order.");
      state.orderPage = false;
      state.authPage = true;
      return;
    }

    const orderData = {
      user: state.currentUser?.id,

      ...formData,

      designImage: snap.designImage,
      selectedColors: snap.items,
      logoDecal: snap.logoDecal,
      fullDecal: snap.fullDecal,

      price: calculatePrice(),
      orderStatus: "Pending",
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Saved Order:", data);

        setFormData({
          name: "",
          email: "",
          phone: "",
          shoeSize: "",
          footProblem: "",
          material: "",
          soleType: "",
          address: "",
        });

        state.lastOrderId = data.order?._id || "";
        state.orderPage = false;
        state.orderSuccess = true;
      } else {
        alert(data.message || "Order submission failed");
      }
    } catch (error) {
      console.log("Order Error:", error);
      alert("Backend server is not running or connection failed");
    }
  };

  if (!snap.orderPage) return null;

  return (
    <div className="absolute top-0 left-0 z-20 w-full h-screen bg-[#f5f5f5] overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-black mb-2">Finalize Your Shoe Order</h1>
        <p className="text-gray-600 mb-6">
          Review your customized shoe and fill order details.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-3">Design Preview</h2>

            {snap.designImage ? (
              <img
                src={snap.designImage}
                alt="Customized Shoe"
                className="w-full rounded-xl border shadow"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center border rounded-xl">
                No design preview found
              </div>
            )}

            <div className="mt-5">
              <CustomButton
                type="filled"
                title="Back to Customizer"
                customStyle="w-fit px-4 py-2.5 font-bold text-sm"
                handleClick={() => {
                  state.orderPage = false;
                }}
              />
            </div>
          </div>

          <form onSubmit={submitOrder} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Customer Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />

            <select
              name="shoeSize"
              value={formData.shoeSize}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Select Shoe Size</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
            </select>

            <select
              name="footProblem"
              value={formData.footProblem}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Select Foot Problem</option>
              <option value="No Problem">No Problem</option>
              <option value="Flat Foot">Flat Foot</option>
              <option value="Wide Foot">Wide Foot</option>
              <option value="Heel Pain">Heel Pain</option>
              <option value="Diabetic Foot">Diabetic Foot</option>
              <option value="Orthopedic Support">Orthopedic Support</option>
            </select>

            <select
              name="material"
              value={formData.material}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Select Material</option>
              <option value="Leather">Leather</option>
              <option value="Mesh">Mesh</option>
              <option value="Suede">Suede</option>
              <option value="Canvas">Canvas</option>
            </select>

            <select
              name="soleType"
              value={formData.soleType}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Select Sole Type</option>
              <option value="Normal Sole">Normal Sole</option>
              <option value="Soft Sole">Soft Sole</option>
              <option value="Orthopedic Sole">Orthopedic Sole</option>
              <option value="Extra Grip Sole">Extra Grip Sole</option>
            </select>

            <textarea
              name="address"
              placeholder="Delivery Address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border p-3 rounded-lg"
            />
            <div className="bg-gray-100 p-4 rounded-xl">
              <h2 className="text-xl font-black">
                Total Price: Rs. {calculatePrice()}
              </h2>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-bold"
            >
              Submit Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;