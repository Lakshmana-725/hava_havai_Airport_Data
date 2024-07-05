# hava_havai_Airport_Data

```
## Project Structure

```
project-folder/
│
├── data.sql         # SQLite database file
├── package.json     # Node.js package configuration
└── server.js        # Express.js server script
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the server:**

   ```bash
   node airportInfo.js
   ```

## Server Initialization (`airportInfo.js`)

```javascript
const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
const dbPath = path.join(__dirname, "data.sql");
let db = null;

/**
 * Initializes the SQLite database connection and starts the server.
 * If an error occurs during initialization, the process is terminated.
 */
const initializeDBAndServer = async () => {
  try {
    // Open the SQLite database connection
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Start the Express server
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

// Call the initialization function
initializeDBAndServer();

/**
 * GET endpoint to retrieve airport data by ID.
 * @route GET /airport/:id/
 * @param {string} id - The ID of the airport.
 * @returns {object} - The airport data.
 */
app.get("/airport/:id/", async (req, res) => {
  const { id } = req.params;
  const airportDataQuery = `
    SELECT * FROM airport
    WHERE id = ${id}
  `;
  const airport = await db.get(airportDataQuery);
  res.send(airport);
});

/**
 * GET endpoint to retrieve airport data based on query parameters.
 * @route GET /airport/
 * @param {string} order - The order of the results (default: "ASC").
 * @param {string} order_by - The field to order the results by (default: "id").
 * @param {string} search_q - The query string to search for in the title field (default: "iata_code").
 * @returns {object[]} - An array of airport data that match the query parameters.
 */
app.get("/airport/", async (req, res) => {
  const { order = "ASC", order_by = "id", search_q = "iata_code" } = req.query;
  const searchQuery = `%${search_q}%`;
  const airportDataQuery = `
    SELECT * FROM airport
    WHERE title LIKE '${searchQuery}'
    ORDER BY ${order_by} ${order}
  `;
  const airports = await db.all(airportDataQuery);
  res.send(airports);
});
```

## Endpoints

### Retrieve Airport by ID

- **GET /airport/:id/**
  - Retrieves airport data by ID.
  - Parameters:
    - `id` (string): The ID of the airport.

### Retrieve Airports Based on Query Parameters

- **GET /airport/**
  - Retrieves airport data based on optional query parameters.
  - Query Parameters:
    - `order` (string): Order of results (`ASC` or `DESC`, default: `ASC`).
    - `order_by` (string): Field to order results by (default: `id`).
    - `search_q` (string): Query string to search in the `title` field (default: `iata_code`).
```
