import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";

const Reviews = () => {
  const snap = useSnapshot(state);

  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    rating: "5",
    message: "",
  });

  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.log("Fetch reviews error:", error);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/api/orders/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          rating: Number(formData.rating),
          message: formData.message,
        }),
      });

      setFormData({
        name: "",
        rating: "5",
        message: "",
      });

      fetchReviews();
    } catch (error) {
      console.log("Submit review error:", error);
    }
  };

  useEffect(() => {
    if (snap.reviewPage) {
      fetchReviews();
    }
  }, [snap.reviewPage]);

  if (!snap.reviewPage) return null;

  return (
    <div
      className="fixed top-0 left-0 z-40 w-full bg-gray-100 p-6"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-black">Customer Reviews</h1>

          <button
            onClick={() => {
              state.reviewPage = false;
            }}
            className="bg-black text-white px-4 py-2 rounded-lg font-bold"
          >
            Back
          </button>
        </div>

        <form
          onSubmit={submitReview}
          className="bg-white p-6 rounded-2xl shadow-xl mb-6"
        >
          <h2 className="text-2xl font-black mb-4">Add Review</h2>

          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full border p-3 rounded-lg mb-4"
            required
          />

          <select
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
            className="w-full border p-3 rounded-lg mb-4"
            required
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <textarea
            placeholder="Write your review"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full border p-3 rounded-lg mb-4"
            rows="4"
            required
          />

          <button className="bg-black text-white px-5 py-3 rounded-lg font-bold">
            Submit Review
          </button>
        </form>

        <div className="grid md:grid-cols-2 gap-5">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-5 rounded-xl shadow">
              <h2 className="text-xl font-black">{review.name}</h2>
              <p className="text-yellow-500 font-bold">
                {"★".repeat(review.rating)}
              </p>
              <p className="text-gray-600 mt-2">{review.message}</p>
            </div>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="bg-white p-8 rounded-xl shadow text-center mt-5">
            <h2 className="text-xl font-bold">No reviews yet</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;