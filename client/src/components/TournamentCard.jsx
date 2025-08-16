import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MapPin, Calendar, Trophy } from "lucide-react";

const TournamentList = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/tournament");
        setTournaments(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load tournaments");
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">
        Tournaments
      </h1>

      {tournaments.length === 0 ? (
        <p className="text-center text-gray-400">No tournaments found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((t) => (
            <div
              key={t._id}
              className="bg-gray-800 rounded-2xl shadow-lg p-5 hover:shadow-orange-500/50 transition-shadow duration-300 border border-gray-700"
            >
              <h2 className="text-xl font-semibold mb-2 text-white">
                {t.name}
              </h2>
              <p className="text-gray-300 mb-2">{t.game}</p>

              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <MapPin size={18} className="text-orange-500" />
                <span>{t.location}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Calendar size={18} className="text-orange-500" />
                <span>
                  {new Date(t.startDate).toLocaleDateString()} -{" "}
                  {new Date(t.endDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2 text-orange-400 font-semibold mt-3">
                <Trophy size={18} />
                <span>Prize: Rs. {t.prizePool}</span>
              </div>

              {/* ✅ Entry Fee */}
              <div className="flex items-center gap-2 text-orange-300 font-medium mt-2">
                💰 <span>Entry Fee: Rs. {t.entryFee}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-300 font-medium mt-2">
                👥 <span>Max Participants: {t.maxParticipants}</span>
              </div>

              <button
                className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                onClick={() => toast.info(`Viewing details for ${t.name}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TournamentList;
