import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TournamentForm = () => {
  const [formData, setFormData] = useState({
  name: "",
  game: "",
  location: "",
  startDate: "",
  endDate: "",
  prizePool: "",
  entryFee: "",
  maxParticipants: ""   // ✅ added
});


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/tournament/", formData);
      toast.success("Tournament created successfully!");
      setFormData({
        name: "",
        game: "",
        location: "",
        startDate: "",
        endDate: "",
        prizePool: "",
        entryFee: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create tournament");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md border border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-4 text-orange-500 text-center">
          Create Tournament
        </h2>

        {[
          { label: "Tournament Name", name: "name", type: "text" },
          { label: "Game", name: "game", type: "text" },
          { label: "Location", name: "location", type: "text" },
          { label: "Start Date", name: "startDate", type: "date" },
          { label: "End Date", name: "endDate", type: "date" },
          { label: "Prize Pool (Rs.)", name: "prizePool", type: "number" },
          { label: "Entry Fee (Rs.)", name: "entryFee", type: "number" },
          {
            label: "Max Participants",
            name: "maxParticipants",
            type: "number",
          }, // ✅ added
        ].map((field) => (
          <div key={field.name} className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Create Tournament
        </button>
      </form>
    </div>
  );
};

export default TournamentForm;
