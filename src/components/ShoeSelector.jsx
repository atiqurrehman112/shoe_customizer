import React from "react";
import { useSnapshot } from "valtio";
import state from "../store";

const ShoeSelector = () => {
  const snap = useSnapshot(state);

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 bg-white rounded-2xl shadow-xl px-5 py-4">
      <div className="flex items-center gap-4">
        <h2 className="font-black whitespace-nowrap">Shoe Model</h2>

        {Object.entries(snap.shoeModels).map(([key, model]) => (
          <button
            key={key}
            onClick={() => {
              state.selectedShoe = key;
              state.current = null;
            }}
            className={`px-5 py-2 rounded-xl font-bold border transition whitespace-nowrap ${
              snap.selectedShoe === key
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            {model.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShoeSelector;