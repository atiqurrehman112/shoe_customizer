import React, { useState } from "react";
import state from "../store";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.user.role !== "admin") {
          alert("Access denied. This account is not an admin.");
          return;
        }

        state.adminLoggedIn = true;
        state.currentUser = data.user;
        state.token = data.token;

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        alert("Admin login successful!");
      } else {
        alert(data.message || "Invalid admin email or password");
      }
    } catch (error) {
      console.log("Admin login error:", error);
      alert("Backend connection failed");
    }
  };

  return (
    <div className="absolute top-0 left-0 z-40 w-full min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={loginAdmin}
        className="bg-white p-8 rounded-2xl shadow-xl w-[350px]"
      >
        <h1 className="text-3xl font-black mb-5 text-center">Admin Login</h1>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        <button className="w-full bg-black text-white py-3 rounded-lg font-bold">
          Login
        </button>

        <button
          type="button"
          onClick={() => {
            state.adminPage = false;
          }}
          className="w-full mt-3 border border-black py-3 rounded-lg font-bold"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;