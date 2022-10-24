import express from "express";
import dbConnection from "../../models/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import secret from "../../config/secret.config.js";
import auth from "../../middleware/auth.js";

const authRouter = express.Router();

// @route    GET api/auth
// @desc     Uses auth middleware to authenticate user with token
// @access   PRIVATE
authRouter.get("/", auth, async (req, res) => {
  try {
    const query = `SELECT * FROM meg.user WHERE user_id = ?`;
    const valuesArr = [req.user.id];
    dbConnection.query(query, valuesArr, async (err, results) => {
      if (results && results.length > 0) {
        const { password, ...cleanedResult } = results[0];
        return res.status(200).json(cleanedResult);
      } else return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/auth
// @desc     Authenticate user for login & get token
// @access   PUBLIC
authRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  const valuesArr = [email];

  try {
    const query = `SELECT * FROM meg.user WHERE email = ?`;

    dbConnection.query(query, valuesArr, async (err, results) => {
      if (!results) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, results[0].password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const payload = {
        user: {
          id: results[0].user_id,
        },
      };

      jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        const { password, ...cleanedResult } = results[0];
        console.log(`Successful login from user ${cleanedResult.user_id}`);
        return res.status(200).json({
          token,
          ...cleanedResult,
        });
      });
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

export default authRouter;
