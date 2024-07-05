const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
const dbPath = path.join(__dirname, "data.sql");

let db = null;

/**
 * Initializes the database connection and starts the server.
 * If an error occurs during the initialization, the process is terminated.
 */
const initializeDBAndServer = async () => {
  try {
    // Open the database connection
    db = await open({
      filename: dbPath, // Path to the database file
      driver: sqlite3.Database, // SQLite driver
    });

    // Start the server
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    // Log the error message and terminate the process
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

// Call the initialization function
initializeDBAndServer();

/**
 * Endpoint to retrieve airport data by ID.
 * @route GET /airport/:id/
 * @param {string} id - The ID of the airport.
 * @returns {object} - The airport data.
 */
app.get("/airport/:id/", async (request, response) => {
  // Extract the ID from the request parameters
  const { id } = request.params;

  // SQL query to retrieve airport data by ID
  const airportData = `
    SELECT
      *
    FROM
      Database - airport
    WHERE
      id = ${id};
  `;

  // Execute the query and retrieve the airport data
  const airport = await db.get(airportData);

  // Send the airport data as the response
  response.send(airport);
});

/**
 * Endpoint to retrieve airport data based on query parameters.
 * @route GET /airport/?order=&order_by=&search_q=
 * @param {string} order - The order of the results (default: "ASC").
 * @param {string} order_by - The field to order the results by (default: "id").
 * @param {string} search_q - The query string to search for in the title field.
 * @returns {object[]} - An array of airport data that match the query parameters.
 */
app.get("/airport/?order=&order_by=&search_q=", async (request, response) => {
  // Extract and assign the query parameters with default values
  const {
    order = "ASC",
    order_by = "id",
    search_q = "iata_code",
  } = request.query;

  // Construct the SQL query to retrieve airport data based on the query parameters
  const getInfo = `
    SELECT
      *
    FROM
     Database - airport
    WHERE
     title LIKE '%${search_q}%'
    ORDER BY ${order_by} ${order};
  `;

  // Execute the query and retrieve the airport data
  const information = await db.all(getInfo);

  // Send the airport data as the response
  response.send(information);
});
