# meg-data-visualization-client

---

Project for Database Management Systems focused on magnetoencephalography (MEG) storage and analysis with machine learning. It uses [React](https://reactjs.org/) for the front end and [Node](https://nodejs.org/en/) with [Express](https://expressjs.com/) for the backend. A [Python](https://www.python.org/) [TensorFlow](https://www.tensorflow.org/?gclid=CjwKCAjwm8WZBhBUEiwA178UnLETcZbGxgKLh-Fn-rpOAs22cL3N7BtjNn31cNm9G7ym9_pUSbUWbxoCajUQAvD_BwE) API is used for the machine learning model.

## Getting Started

`cd` into both the [client](/client) and [server](/server) folders and run `npm i` in each directory to install all npm packages for both the client and server.

Add a `.env` file to the root of the project and add the following keys:

```sh
HOST
DB_USER
DB_PASSWORD
DB_NAME
```

Run the SQL code in the [/server/sql/db.sql](/server/sql/db.sql) file in the database you have already created that has the login credentials, host, and name you are referencing with your environment variables.

You can now run `npm start` in the client and `npm run dev` in the server to start up the application locally.
