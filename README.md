# 👟 3D Shoe Customizer Platform

![3D Shoe Customizer](./public/readme-shoe-cust.png)

A modern full-stack **3D Shoe Customization Platform** that allows users to customize shoes in real-time using interactive 3D models, save designs, place orders, track orders, and manage accounts securely.

Built using **React, Three.js, Firebase Authentication, Node.js, Express, and MongoDB**.

---

# 🚀 Features

## 🎨 3D Shoe Customization
- Real-time 3D shoe editing
- Multiple shoe models
- Dynamic color customization
- Logo upload support
- Texture customization
- Download customized shoe design
- Interactive custom cursor

---

## 👤 Authentication System
- Firebase Email/Password Authentication
- Login & Signup
- Forgot Password Email Reset
- Persistent Login Sessions

---

## 🛒 Order Management
- Place customized shoe orders
- Save custom designs
- Order tracking system
- My Orders page
- Dynamic pricing system

---

## ⭐ Reviews & Feedback
- Customer reviews & ratings
- Review management system

---

## 🛠 Admin Dashboard
- Admin login system
- Manage customer orders
- Update order statuses
- Delete orders
- Manage customer reviews
- Export order data

---

## 💾 Database Integration
MongoDB is used to store:
- Orders
- Saved Designs
- Reviews
- User-related order data

---

# 🧰 Technologies Used

## Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Valtio](https://github.com/pmndrs/valtio)

---

## 3D Rendering
- [Three.js](https://threejs.org/)
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- [React Drei](https://github.com/pmndrs/drei)

---

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Authentication
- Firebase Authentication

---

# 📂 Project Structure

```bash
3DShoeCustomizer/
│
├── public/
│   ├── models/
│   └── textures/
│
├── src/
│   ├── canvas/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── config/
│   └── firebase.js
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js

#⚙️ Installation

1️⃣ Clone Repository

git clone https://github.com/atiqurrehman112/shoe_customizer.git
cd shoe_customizer

2️⃣ Install Frontend Dependencies

npm install

3️⃣ Install Backend Dependencies

cd server
npm install

#🔥 Firebase Setup

Create Firebase Project
Enable Authentication
Enable Email/Password Sign-In
Create:
src/firebase.js
Add your Firebase config

#🍃 MongoDB Setup

Create .env inside server/

MONGO_URI=your_mongodb_connection
PORT=5000

#▶️ Run Project

Start Backend
cd server
npm start
Start Frontend
npm run dev

#📸 Main Pages

Home Page
3D Customizer
Login / Signup
Saved Designs
Order Tracking
Customer Reviews
My Orders
Admin Dashboard

#🎯 Future Improvements

Google Authentication
AI Shoe Recommendation
Payment Gateway Integration
AR Shoe Preview
Wishlist System
Cloudinary Image Storage
Analytics Dashboard
Live Chat Support

#👨‍💻 Developed By

Atiq Ur Rehman

Air University – Computer Science Department

#🤝 Contributions

Contributions are welcome!

If you have ideas or improvements:

Open an issue
Submit a pull request

Your feedback and enhancements are highly appreciated.

##📜 License

This project is developed for educational and Final Year Project purposes.