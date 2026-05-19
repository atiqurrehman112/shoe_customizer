import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCSShw6tMJ8JTUSXFSjnlfXaCO88sATGI",
  authDomain: "dshoecustomizer.firebaseapp.com",
  projectId: "dshoecustomizer",
  storageBucket: "dshoecustomizer.firebasestorage.app",
  messagingSenderId: "145612538504",
  appId: "1:145612538504:web:83500dd8a8ba27ec1f553d",
  measurementId: "G-3ZDN23FTV4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;