import express from "express";
import dbConnection from "../../models/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import secret from "../../config/secret.config.js";

const usersRouter = express.Router();

// @route    POST api/users
// @desc     Register new user
// @access   PUBLIC
usersRouter.post("/", async (req, res) => {
  const { firstName, lastName, email, password, organization } = req.body;

  // Simple Validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  console.log(`Creating account for you, ${firstName}.`);

  const hashedPass = await bcrypt.hash(password, 10);

  console.log(
    organization ? `organization: ${organization}` : "organization undefined"
  );

  let valuesArr = [firstName, lastName, email, hashedPass];
  if (organization) valuesArr.push(organization);

  const query = `INSERT INTO \`meg\`.\`user\`(\`first_name\`, \`last_name\`, \`email\`, \`password\` ${
    organization ? `, \`organization\`` : ""
  }) VALUES(?, ?, ?, ? ${organization ? ",?" : ""} );`;
  dbConnection.query(query, valuesArr, (err, results) => {
    if (err) {
      console.log("Error inserting nerw user into DB.");
      return res.status(500).send("Server Error");
    }
    console.log(`A new user was created with ID of ${results.insertId}`); // results contains rows returned by server

    // Create jwt to return to user
    const payload = {
      user: {
        id: results.insertId,
      },
    };

    jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      return res.status(201).json({
        token,
      });
    });
  });
});

export default usersRouter;
