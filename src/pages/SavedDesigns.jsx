import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";

const SavedDesigns = () => {
  const snap = useSnapshot(state);
  const [designs, setDesigns] = useState([]);

  const fetchDesigns = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/saved-designs");
      const data = await res.json();

      const userDesigns = data.filter(
        (design) => design.user === snap.currentUser?.id
      );

      setDesigns(userDesigns);
    } catch (error) {
      console.log("Fetch saved designs error:", error);
    }
  };

  const deleteDesign = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this design?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/orders/saved-designs/${id}`, {
        method: "DELETE",
      });

      fetchDesigns();
    } catch (error) {
      console.log("Delete design error:", error);
    }
  };

  useEffect(() => {
    if (snap.savedDesignsPage && snap.currentUser) {
      fetchDesigns();
    }
  }, [snap.savedDesignsPage, snap.currentUser]);

  if (!snap.savedDesignsPage) return null;

  if (!snap.currentUser) {
    state.savedDesignsPage = false;
    state.authPage = true;
    return null;
  }

  return (
    <div className="absolute top-0 left-0 z-40 w-full min-h-screen bg-gray-100 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black">Saved Designs</h1>

        <button
          onClick={() => {
            state.savedDesignsPage = false;
          }}
          className="bg-black text-white px-4 py-2 rounded-lg font-bold"
        >
          Back
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {designs.map((design) => (
          <div key={design._id} className="bg-white rounded-xl shadow p-4">
            <img
              src={design.designImage}
              alt="Saved Design"
              className="w-full rounded-lg border"
            />

            <p className="mt-3 text-sm text-gray-500">
              Saved on: {new Date(design.createdAt).toLocaleString()}
            </p>

            <button
              onClick={() => deleteDesign(design._id)}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg font-bold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {designs.length === 0 && (
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold">No saved designs found</h2>
        </div>
      )}
    </div>
  );
};

export default SavedDesigns;