import express from "express";
import dbConnection from "../../models/db.js";
import auth from "../../middleware/auth.js";

const notificationsRouter = express.Router();

// @route    GET api/notifications/:id
// @desc     Get notifications for specific user
// @access   PRIVATE
notificationsRouter.get("/:id", auth, async (req, res) => {
  try {
    const query = `SELECT * FROM notification WHERE user_id = ?`;
    const valuesArr = [req.params.id];
    dbConnection.query(query, valuesArr, async (err, results) => {
      if (results) {
        console.log(results);
        return res.status(200).json(results);
      } else
        return res.status(400).send("Bad Request- unable to retrieve records");
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// TODO: POST /api/notifications route
//              OR
// Stored procedure that automatically creates
// notification on being added to project?

export default notificationsRouter;
