import express from "express";
import dbConnection from "../../models/db.js";
import bcrypt from "bcryptjs";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res) => {
  const { firstName, lastName, email, password, organization } = req.body;

  // Simple Validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  console.log(`Creating account for you, ${firstName}.`);

  const hashedPass = await bcrypt.hash(password, 10);

  console.log(organization);

  let valuesArr = [firstName, lastName, email, hashedPass];
  if (organization) valuesArr.push(organization);

  const query = `INSERT INTO \`meg\`.\`user\`(\`first_name\`, \`last_name\`, \`email\`, \`password\` ${
    organization ? `, \`organization\`` : ""
  }) VALUES(?, ?, ?, ? ${organization ? ",?" : ""} );`;
  dbConnection.query(query, valuesArr, (err, results) => {
    console.log(err);
    console.log(results); // results contains rows returned by server
    res.json({
      results,
    });
  });
});

export default usersRouter;
