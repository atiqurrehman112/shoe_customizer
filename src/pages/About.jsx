import React from "react";
import { useSnapshot } from "valtio";
import state from "../store";

const About = () => {
  const snap = useSnapshot(state);

  if (!snap.aboutPage) return null;

  return (
    <div
      className="fixed top-0 left-0 z-40 w-full bg-gray-100 p-6"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-black mb-4">
          About 3D Custom Shoe Maker
        </h1>

        <p className="text-gray-700 mb-4">
          This project is a web-based 3D shoe customization and ordering system.
          It allows customers to design their own shoes using an interactive 3D
          model, select materials, choose sole types, add orthopedic needs, and
          place customized orders online.
        </p>

        <h2 className="text-2xl font-black mt-6 mb-2">Problem Statement</h2>
        <p className="text-gray-700 mb-4">
          Many customers need personalized footwear due to style preferences or
          foot-related problems such as flat foot, wide foot, heel pain, or
          orthopedic support needs. Traditional shoe buying does not provide
          enough customization and visualization before ordering.
        </p>

        <h2 className="text-2xl font-black mt-6 mb-2">Proposed Solution</h2>
        <p className="text-gray-700 mb-4">
          Our system provides a 3D customization platform where users can design
          shoes visually, download their design, save it, and place an order
          with personal foot requirements. Admin can manage orders, statuses,
          reviews, and customer requests from a dashboard.
        </p>

        <h2 className="text-2xl font-black mt-6 mb-2">Main Features</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Interactive 3D shoe customization</li>
          <li>Color, logo, and texture customization</li>
          <li>Download customized design</li>
          <li>Save customized designs</li>
          <li>Dynamic price calculation</li>
          <li>Customer order placement</li>
          <li>Order tracking system</li>
          <li>Admin dashboard</li>
          <li>Order status management</li>
          <li>Customer reviews and feedback</li>
        </ul>

        <button
          onClick={() => {
            state.aboutPage = false;
          }}
          className="mt-6 bg-black text-white px-5 py-3 rounded-lg font-bold"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default About;