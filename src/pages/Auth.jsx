import React, { useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase";

const Auth = () => {
  const snap = useSnapshot(state);

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (!snap.authPage) return null;

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      alert("Signup successful! Please login.");
      setIsLogin(true);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);

      if (error.code === "auth/email-already-in-use") {
        alert("Email already exists");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters");
      } else {
        alert(error.message);
      }
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      state.currentUser = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(state.currentUser)
      );

      state.authPage = false;

      alert("Login successful!");
    } catch (error) {
      console.log(error);

      if (error.code === "auth/user-not-found") {
        alert("User not found");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password");
      } else {
        alert(error.message);
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      return alert("Please enter your email");
    }

    try {
      await sendPasswordResetEmail(auth, formData.email);

      alert("Password reset email sent!");
    } catch (error) {
      console.log(error);

      if (error.code === "auth/user-not-found") {
        alert("No user found with this email");
      } else {
        alert(error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      await handleLogin();
    } else {
      await handleSignup();
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
              setFormData({
                ...formData,
                name: e.target.value,
              })
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
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        <button className="w-full bg-black text-white py-3 rounded-lg font-bold">
          {isLogin ? "Login" : "Signup"}
        </button>

        {isLogin && (
          <button
            type="button"
            onClick={handleForgotPassword}
            className="w-full mt-3 text-blue-600 font-bold"
          >
            Forgot Password?
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-3 border border-black py-3 rounded-lg font-bold"
        >
          {isLogin
            ? "Create New Account"
            : "Already have account? Login"}
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