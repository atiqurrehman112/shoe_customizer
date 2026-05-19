import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { CustomButton } from "../components";

const Home = () => {
  const snap = useSnapshot(state);

  const openAdmin = () => {
    if (snap.currentUser?.role === "admin") {
      state.adminPage = true;
      state.adminLoggedIn = true;
    } else {
      state.adminPage = true;
    }
  };

  const logoutUser = () => {
    state.currentUser = null;
    state.token = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section
          className="h-screen w-full bg-[#f5f5f5] relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute top-[-120px] right-[-120px] w-[420px] h-[420px] bg-black rounded-full opacity-10" />
          <div className="absolute bottom-[-160px] left-[-160px] w-[420px] h-[420px] bg-orange-400 rounded-full opacity-20" />

          <header className="relative z-10 flex items-center justify-between px-8 py-6">
            <div className="flex items-center gap-3">
              <img
                src="./threejs.png"
                alt="logo"
                className="w-10 h-10 object-contain"
              />
              <h2 className="font-black text-xl">ShoeCraft 3D</h2>
            </div>

            <div className="flex items-center gap-3">
              {snap.currentUser && (
                <span className="hidden md:block font-bold text-gray-700">
                  Hi, {snap.currentUser.name}
                </span>
              )}

              <button
                onClick={openAdmin}
                className="bg-white border border-gray-300 px-4 py-2 rounded-xl font-bold hover:bg-black hover:text-white transition"
              >
                Admin
              </button>

              {snap.currentUser ? (
                <button
                  onClick={logoutUser}
                  className="bg-black text-white px-4 py-2 rounded-xl font-bold"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    state.authPage = true;
                  }}
                  className="bg-black text-white px-4 py-2 rounded-xl font-bold"
                >
                  Login
                </button>
              )}
            </div>
          </header>

          <main className="relative z-10 grid lg:grid-cols-2 gap-10 items-center px-8 lg:px-20 py-10">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <div className="inline-block bg-white border px-4 py-2 rounded-full font-bold text-sm mb-5 shadow-sm">
                Custom Orthopedic Footwear Platform
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                Design Shoes
                <br />
                <span className="text-orange-500">Your Way.</span>
              </h1>

              <p className="text-gray-600 text-lg leading-8 max-w-xl mb-8">
                Create personalized 3D shoes, choose materials, customize
                colors, save designs, place orders, and track progress through
                a complete smart footwear ordering system.
              </p>

              <div className="flex flex-wrap gap-4">
                <CustomButton
                  type="filled"
                  title="Start Customizing"
                  handleClick={() => (state.intro = false)}
                  customStyle="px-6 py-3 font-bold text-sm rounded-xl"
                />

                <CustomButton
                  type="outline"
                  title="Track Order"
                  handleClick={() => {
                    state.trackingPage = true;
                  }}
                  customStyle="px-6 py-3 font-bold text-sm rounded-xl"
                />

                {snap.currentUser && (
                  <CustomButton
                    type="outline"
                    title="My Orders"
                    handleClick={() => {
                      state.myOrdersPage = true;
                    }}
                    customStyle="px-6 py-3 font-bold text-sm rounded-xl"
                  />
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-10 max-w-xl">
                <div className="bg-white p-4 rounded-2xl shadow">
                  <h3 className="text-2xl font-black">3D</h3>
                  <p className="text-sm text-gray-500">Live Customizer</p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow">
                  <h3 className="text-2xl font-black">24/7</h3>
                  <p className="text-sm text-gray-500">Order Tracking</p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow">
                  <h3 className="text-2xl font-black">Smart</h3>
                  <p className="text-sm text-gray-500">Price System</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="bg-white rounded-[40px] shadow-2xl p-8">
                <img
                  src="./threejs.png"
                  alt="3D Shoe Preview"
                  className="w-24 h-24 object-contain mb-6"
                />

                <h2 className="text-3xl font-black mb-4">
                  Shoe Customizer
                </h2>

                <div className="grid gap-4">
                  <button
                    onClick={() => {
                      state.savedDesignsPage = true;
                    }}
                    className="text-left bg-gray-100 hover:bg-black hover:text-white transition p-4 rounded-2xl font-bold"
                  >
                    View Saved Designs
                  </button>

                  <button
                    onClick={() => {
                      state.reviewPage = true;
                    }}
                    className="text-left bg-gray-100 hover:bg-black hover:text-white transition p-4 rounded-2xl font-bold"
                  >
                    Customer Reviews
                  </button>

                  <button
                    onClick={() => {
                      state.aboutPage = true;
                    }}
                    className="text-left bg-gray-100 hover:bg-black hover:text-white transition p-4 rounded-2xl font-bold"
                  >
                    About Project
                  </button>

                  <button
                    onClick={() => {
                      state.contactPage = true;
                    }}
                    className="text-left bg-gray-100 hover:bg-black hover:text-white transition p-4 rounded-2xl font-bold"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </motion.div>
          </main>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;