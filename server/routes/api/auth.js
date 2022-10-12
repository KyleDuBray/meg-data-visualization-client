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
      console.log(results);
      if (results && results.length > 0) {
        res.json(results);
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
      console.log(results);

      if (!results) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      console.log(results.password);
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

      console.log(payload);

      jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

export default authRouter;
