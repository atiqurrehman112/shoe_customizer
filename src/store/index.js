import { proxy } from "valtio";

const state = proxy({
  current: null,

  items: {
    laces: "#fff",
    mesh: "#fff",
    caps: "#fff",
    inner: "#fff",
    sole: "#fff",
    stripes: "#fff",
    band: "#fff",
    patch: "#fff",
  },

  intro: true,
  orderPage: false,
  adminPage: false,
  adminLoggedIn: false,
  orderSuccess: false,
  trackingPage: false,
  savedDesignsPage: false,
  reviewPage: false,
  adminReviewsPage: false,
  contactPage: false,
  aboutPage: false,
  authPage: false,
  myOrdersPage: false,
  currentUser: null,
  token: "",
  lastOrderId: "",

  color: "#c6d4ec",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",


  designImage: "",
});

export default state;