3D Shoe Customizer 👟

A modern full-stack 3D Shoe Customization Platform built using React, Three.js, Firebase Authentication, Node.js, Express, and MongoDB.
Users can customize shoes in real-time using interactive 3D models, save designs, place orders, track orders, and manage accounts securely.

🚀 Features
🎨 3D Shoe Customization
Real-time 3D shoe editing
Multiple shoe models
Color customization
Logo upload
Texture customization
Download customized design
👤 Authentication
Firebase Email/Password Authentication
Login & Signup
Forgot Password Email Reset
User session management
🛒 Ordering System
Place custom shoe orders
Dynamic order details
Order tracking
My Orders page
Save customized designs
⭐ Reviews System
Customer reviews & ratings
Admin review management
🛠 Admin Dashboard
Admin login
Manage customer orders
Update order statuses
View order details
Manage reviews
💾 Database
MongoDB integration
Store:
Orders
Reviews
Saved Designs
User-related data
🧰 Technologies Used
Frontend
React.js
Vite
Tailwind CSS
Three.js
React Three Fiber
Drei
Framer Motion
Valtio
Backend
Node.js
Express.js
MongoDB
Mongoose
Authentication
Firebase Authentication
📂 Project Structure
3DShoeCustomizer/
│
├── client/
│   ├── src/
│   │   ├── canvas/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── firebase.js
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
⚙️ Installation
1️⃣ Clone Repository
git clone https://github.com/atiqurrehman112/shoe_customizer.git
2️⃣ Install Frontend Dependencies
npm install
3️⃣ Install Backend Dependencies
cd server
npm install
🔥 Firebase Setup
Create Firebase project
Enable Authentication
Enable Email/Password Sign In
Create:
src/firebase.js
Add Firebase config
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
🍃 MongoDB Setup

Create .env file inside server/

MONGO_URI=your_mongodb_connection
PORT=5000
▶️ Run Project
Start Backend
cd server
npm start
Start Frontend
npm run dev
📸 Main Pages
Home Page
3D Customizer
Login / Signup
Saved Designs
Order Tracking
Customer Reviews
My Orders
Admin Dashboard
🎯 Future Improvements
Google Authentication
AI Shoe Recommendation
Payment Gateway Integration
AR Shoe Preview
Wishlist
Live Chat Support
Admin Analytics Dashboard
👨‍💻 Developed By

Atiq Ur Rehman
Air University – Computer Science

📜 License

This project is developed for educational and Final Year Project purposes.