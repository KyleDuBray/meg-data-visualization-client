import express from "express";
import dbConnection from "../../models/db.js";
import auth from "../../middleware/auth.js";

const projectsRouter = express.Router();

// @route    GET api/projects
// @desc     Get projects for specific user (user based on token)
// @access   PRIVATE

projectsRouter.get("/", auth, async (req, res) => {
  try {
    const query = `SELECT project.project_id,works_on.works_on_id, project_name, is_admin, 
   (SELECT COUNT(*) from works_on GROUP BY project_id HAVING project_id=project.project_id) as active_members
   FROM project
   JOIN WORKS_ON ON project.project_id = works_on.project_id
   WHERE user_id = ?`;
    const valuesArr = [req.user.id];
    dbConnection.query(query, valuesArr, async (err, results) => {
      if (results) {
        console.log(
          `${results.length} records retreived for user ${req.user.id}`
        );
        return res.status(200).json(results);
      } else console.log(err);
      return res.status(400).send("Bad Request- unable to retreive records");
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/projects/:id
// @desc     Get projects details for specific project (project based on id)
// @access   PRIVATE
projectsRouter.get("/:id", auth, async (req, res) => {
  try {
    const query = `SELECT * from project
    JOIN works_on ON works_on.project_id = project.project_id
    WHERE user_id = ? AND project.project_id = ?`;
    const valuesArr = [req.user.id, req.params.id];
    dbConnection.query(query, valuesArr, async (err, results) => {
      if (results) {
        console.log(
          `Project ${results[0].project_id} records retreived for user ${req.user.id}`
        );
        return res.status(200).json(results);
      } else console.log(err);
      return res.status(400).send("Bad Request- unable to retreive records");
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/projects/users/:id
// @desc     Get user details for specific project
// @access   PRIVATE
projectsRouter.get("/users/:id", auth, async (req, res) => {
  try {
    const query = `SELECT works_on_id, user.user_id, project_id, is_admin,
     first_name, last_name, organization, email from works_on
    JOIN user on user.user_id = works_on.user_id
    WHERE project_id = ?`;
    const valuesArr = [req.params.id];
    dbConnection.query(query, valuesArr, async (err, results) => {
      if (!results || results.length == 0) {
        return res.status(400).send("Bad Request- unable to retreive records");
      }
      console.log(
        `${results.length} User records retrieved for Project ${results[0].project_id}`
      );

      return res.status(200).json(results);
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
