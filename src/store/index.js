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
  selectedShoe: "sneaker",

  shoeModels: {
    sneaker: {
      name: "Sneaker",
      path: "/models/sneaker.glb",
      scale: 2.2,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
    },

    sports: {
      name: "Sports Shoe",
      path: "/models/sports.glb",
      scale: 1,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
    },

    formal: {
      name: "Formal Shoe",
      path: "/models/formal.glb",
      scale: 0.005,
      position: [0, -0.3, 0],
      rotation: [0, 0, 0],
    },
  },

  designImage: "",
});

export default state;