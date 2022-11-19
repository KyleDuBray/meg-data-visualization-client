import express from "express";
import dbConnection from "../../models/db.js";
import auth from "../../middleware/auth.js";

const projectsRouter = express.Router();

// @route    GET api/projects/:id
// @desc     Get projects for specific user
// @access   PRIVATE

projectsRouter.get("/", auth, async (req, res) => {
  try {
    const query = `INSERT INTO project(project_name) VALUES(?)`;
    const valuesArr = [req.user.id];
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
projectsRouter.post("/", auth, async (req, res) => {
  const { project_name } = req.body;
  try {
    const query = "INSERT INTO project(project_name) VALUES(?)";
    const valuesArr = [project_name];
    dbConnection.query(query, valuesArr, (err, results) => {
      console.log(results);
      if (!results) {
        return res.status(400).send("Bad Request- a record was not created");
      }
      try {
        const query2 =
          "INSERT INTO works_on(project_id, user_id, is_admin) VALUES(?, ?, ?)";
        const valuesArr2 = [results.insertId, req.user.id, 1];
        dbConnection.query(query2, valuesArr2, (err2, results2) => {
          console.log(results2);
          if (!results2) {
            return res
              .status(400)
              .send("Bad Request- a record was not created");
          }
          return res.status(201).json(results2);
        });
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/projects/add-user
// @desc     Add user to project
//           uses stored procedure
//           add_user_to_project
//           (project_id, user_id, is_admin, message)
// @access   PRIVATE

projectsRouter.post("/add-user", auth, async (req, res) => {
  const { project_id, user_id, isAdmin } = req.body;
  try {
    // First query to see if user who made request is authorized to add another user to project
    const query =
      "SELECT project_name, p.project_id, is_admin FROM project AS p JOIN works_on as W ON p.project_id = w.project_id WHERE p.project_id = ? AND w.user_id = ?";
    const valuesArr = [project_id, req.user.id];
    dbConnection.query(query, valuesArr, async (err, results) => {
      console.log(results);
      if (!results || results.length === 0) {
        return res.status(400).send("Bad Request- a record was not created");
      }
      if (results[0].is_admin === 0) {
        return res.status(401).send("Unauthorized- a record was not created.");
      }
      try {
        // If project exists and request user is admin, call stored procedure to add new
        // user to project and create notification for them
        const query2 = "CALL add_user_to_project(?, ?, ?, ?)";
        const valuesArr2 = [
          project_id,
          user_id,
          isAdmin,
          `You have been added to the ${results[0].project_name} project.`,
        ];
        dbConnection.query(query2, valuesArr2, (err2, results2) => {
          console.log(results2);
          if (!results2 || results2.length == 0) {
            return res
              .status(400)
              .send("Bad Request- a record was not created");
          }
          return res.status(201).json(results2);
        });
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

export default projectsRouter;
