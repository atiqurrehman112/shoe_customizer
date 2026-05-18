import React, { useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";

const Auth = () => {
  const snap = useSnapshot(state);
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (!snap.authPage) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/signup";

    const body = isLogin
      ? {
          email: formData.email,
          password: formData.password,
        }
      : formData;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          state.currentUser = data.user;
          state.token = data.token;
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);

          state.authPage = false;
          alert("Login successful!");
        } else {
          alert("Signup successful! Please login now.");
          setIsLogin(true);
        }
      } else {
        alert(data.message || "Authentication failed");
      }
    } catch (error) {
      console.log("Auth error:", error);
      alert("Backend connection failed");
    }
  };

  return (
    <div className="absolute top-0 left-0 z-50 w-full min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-black text-center mb-6">
          {isLogin ? "Login" : "Signup"}
        </h1>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full border p-3 rounded-lg mb-4"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        <button className="w-full bg-black text-white py-3 rounded-lg font-bold">
          {isLogin ? "Login" : "Signup"}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-3 border border-black py-3 rounded-lg font-bold"
        >
          {isLogin ? "Create New Account" : "Already have account? Login"}
        </button>

        <button
          type="button"
          onClick={() => {
            state.authPage = false;
          }}
          className="w-full mt-3 text-gray-500 font-bold"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default Auth;