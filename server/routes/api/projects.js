import express from "express";
import dbConnection from "../../models/db.js";
import auth from "../../middleware/auth.js";

const projectsRouter = express.Router();

// @route    GET api/projects/:id
// @desc     Get projects for specific user
// @access   PRIVATE

projectsRouter.get("/:id", auth, async (req, res) => {
  try {
    const query = `INSERT INTO project(project_name) VALUES(?)`;
    const valuesArr = [req.params.id];
    dbConnection.query(query, valuesArr, async (err, results) => {
      if (results) {
        console.log(results);
        return res.status(200).json(results);
      } else
        return res.status(400).send("Bad Request- a record was not created");
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/projects
// @desc     Create new project
// @access   PRIVATE

// TODO: Need to query or call stored procedure to
// insert in the project table and the
// works_on table with user_id as admin -
// will need separate route for just adding new users
// to a project
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
