import React, { useEffect } from "react";
import { useSnapshot } from "valtio";

import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import Order from "./pages/Order";
import AdminOrders from "./pages/AdminOrders";
import AdminLogin from "./pages/AdminLogin";
import state from "./store";
import OrderSuccess from "./pages/OrderSuccess";
import TrackOrder from "./pages/TrackOrder";
import SavedDesigns from "./pages/SavedDesigns";
import Reviews from "./pages/Reviews";
import AdminReviews from "./pages/AdminReviews";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Auth from "./pages/Auth";
import MyOrders from "./pages/MyOrders";

function App() {
  const snap = useSnapshot(state);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      const parsedUser = JSON.parse(savedUser);

      state.currentUser = parsedUser;
      state.token = savedToken;

      if (parsedUser.role === "admin") {
        state.adminLoggedIn = true;
      }
    }
  }, []);

  return (
    <main className="app transition-all ease-in">
      <Home />
      <Canvas />
      <Customizer />
      <Order />
      <OrderSuccess />
      <TrackOrder />
      <SavedDesigns />
      <Reviews />
      <Contact />
      <About />
      <Auth />
      <MyOrders />

      {snap.adminPage && !snap.adminLoggedIn && <AdminLogin />}
      {snap.adminPage && snap.adminLoggedIn && <AdminOrders />}
      {snap.adminReviewsPage && snap.adminLoggedIn && <AdminReviews />}
    </main>
  );
}

export default App;