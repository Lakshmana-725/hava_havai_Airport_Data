const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3001; // Choose any available port

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost", // Remove 'http://' and just use 'localhost'
  user: "root",
  password: "8252", // Wrap the password in quotes since it's a string
  database: "hava_havai_airport_database",
});

// Test the connection
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database!");
});

// Get all airports from the database
app.get("/airport", async (req, res) => {
  try {
    const [results] = await connection.promise().query("SELECT * FROM airport");
    res.json(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});

// airport id search
app.get("/airport/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection
      .promise()
      .query("SELECT * FROM airport WHERE id = ?", [id]);
    res.json(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});

// airport iata_code search
app.get("/airport/iata_code/:iata_code", async (req, res) => {
  const { iata_code } = req.params;
  try {
    const [results] = await connection
      .promise()
      .query("SELECT * FROM airport WHERE iata_code = ?", [iata_code]);
    res.json(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});

// Get all cities from the database
app.get("/city", async (req, res) => {
  try {
    const [results] = await connection.promise().query("SELECT * FROM city");
    res.json(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});

// Get all countries from the database
app.get("/country", async (req, res) => {
  try {
    const [results] = await connection.promise().query("SELECT * FROM country");
    res.json(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});