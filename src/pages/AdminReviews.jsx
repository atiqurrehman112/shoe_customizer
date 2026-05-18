import React, { useEffect, useState } from "react";
import state from "../store";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/reviews");
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.log("Fetch reviews error:", error);
    }
  };

  const deleteReview = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/orders/reviews/${id}`, {
        method: "DELETE",
      });

      fetchReviews();
    } catch (error) {
      console.log("Delete review error:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="absolute top-0 left-0 z-40 w-full min-h-screen bg-gray-100 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black">Manage Reviews</h1>

        <button
          onClick={() => {
            state.adminReviewsPage = false;
          }}
          className="bg-black text-white px-4 py-2 rounded-lg font-bold"
        >
          Back
        </button>
      </div>

      <div className="grid gap-5">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-xl font-black">{review.name}</h2>

            <p className="text-yellow-500 font-bold">
              {"★".repeat(review.rating)}
            </p>

            <p className="text-gray-600 mt-2">{review.message}</p>

            <button
              onClick={() => deleteReview(review._id)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold"
            >
              Delete Review
            </button>
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <h2 className="text-xl font-bold">No reviews found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;