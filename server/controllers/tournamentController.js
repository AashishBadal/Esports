import Tournament from "../models/tournamentModel.js";

// @desc    Create a new tournament
// @route   POST /api/tournaments
// @access  Public (no auth)
export const createTournament = async (req, res) => {
  try {
    const { name, game, location, startDate, endDate, prizePool, organizer } = req.body;

    if (!name || !game || !location || !startDate || !endDate) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const tournament = await Tournament.create({
      name,
      game,
      location,
      startDate,
      endDate,
      prizePool,
      organizer: organizer || null, // accept from body or null
    });

    res.status(201).json(tournament);
  } catch (error) {
    console.error("Error creating tournament:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tournaments
// @route   GET /api/tournaments
// @access  Public
export const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
