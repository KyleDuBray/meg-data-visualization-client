import express from "express";
import dbConnection from "../../models/db.js";
import auth from "../../middleware/auth.js";

const eventsRouter = express.Router();

// @route    POST api/events
// @desc     Upload new event data
// @access   PRIVATE
eventsRouter.post("/", auth, async (req, res) => {
  console.log("POST event");
  return res.send("POST event attempted");
});

export default eventsRouter;
