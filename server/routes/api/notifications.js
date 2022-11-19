import express from "express";
import dbConnection from "../../models/db.js";
import auth from "../../middleware/auth.js";

const notificationsRouter = express.Router();

// @route    GET api/notifications
// @desc     Get notifications for specific user
// @access   PRIVATE
notificationsRouter.get("/", auth, async (req, res) => {
  try {
    const query = `SELECT * FROM notification WHERE user_id = ?`;
    const valuesArr = [req.user.id];
    dbConnection.query(query, valuesArr, async (err, results) => {
      if (results) {
        console.log(
          `${results.length} notifications received for user ${req.user.id}`
        );
        return res.status(200).json(results);
      } else
        return res.status(400).send("Bad Request- unable to retrieve records");
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

notificationsRouter.patch("/", auth, async (req, res) => {
  try {
    const query = "UPDATE notification SET `read` = 1 WHERE user_id = ?";
    const valuesArr = [req.user.id];
    dbConnection.query(query, valuesArr, (Err, results) => {
      console.log(
        `notifications updated to "read" for ${results.changedRows} items`
      );
      res.status(200).json(results);
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Bad Request- unable to update records");
  }
});

export default notificationsRouter;
