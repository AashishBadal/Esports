import express from "express";
import { createTournament, getTournaments } from "../controllers/tournamentController.js";

const router = express.Router();

// No protect middleware
router.post("/", createTournament);
router.get("/", getTournaments);

export default router;
