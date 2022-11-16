import express from "express";
import dbConnection from "../../models/db.js";
import auth from "../../middleware/auth.js";

const projectsRouter = express.Router();

// @route    POST api/projects
// @desc     Create new project
// @access   PRIVATE
projectsRouter.post("/", auth, async (req, res) => {
  const { name } = req.body;
  try {
    const query = `INSERT INTO project(project_name) VALUES(?)`;
    const valuesArr = [name];
    dbConnection.query(query, valuesArr, async (err, results) => {
      if (results) {
        console.log(results);
        return res.status(201).json(results);
      } else
        return res.status(400).send("Bad Request- a record was not created");
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

export default projectsRouter;
