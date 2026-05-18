import React, { useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";

const Contact = () => {
  const snap = useSnapshot(state);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  if (!snap.contactPage) return null;

  const submitContact = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      message: "",
    });

    state.contactPage = false;
  };

  return (
    <div className="absolute top-0 left-0 z-40 w-full min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={submitContact}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-black mb-4">Contact Support</h1>

        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        <textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full border p-3 rounded-lg mb-4"
          rows="4"
          required
        />

        <button className="w-full bg-black text-white py-3 rounded-lg font-bold">
          Send Message
        </button>

        <button
          type="button"
          onClick={() => {
            state.contactPage = false;
          }}
          className="w-full mt-3 border border-black py-3 rounded-lg font-bold"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default Contact;