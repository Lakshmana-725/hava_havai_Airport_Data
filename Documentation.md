# API Documentation

## Overview
This API provides endpoints to interact with airport, city, and country data from a MySQL database.

## Installation

### Prerequisites
Before starting, ensure you have the following installed:
- Node.js (v12.x or higher)
- npm (Node Package Manager)
- MySQL Server

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MySQL database**
   - Create a MySQL database named `hava_havai_airport_database` (or adjust `database` in connection configuration).
   - Ensure your MySQL server is running.

4. **Configuration**
   - Adjust database connection details in `index.js` if necessary.

5. **Start the application**
   ```bash
   npm start
   ```
   The server should now be running on `http://localhost:3001`.

## Base URL
All endpoints are relative to:
```
```
http://localhost:3001
```

## Endpoints

### Get all airports
```
GET /airport
```
Returns a JSON array of all airports.

#### Example
```json
GET http://localhost:3001/airport
```

### Get airport by ID
```
GET /airport/:id
```
Returns details of the airport with the specified ID.

#### Parameters
- `id`: ID of the airport (integer).

#### Example
```json
GET http://localhost:3001/airport/4
```

### Get airport by IATA code
```
GET /airport/iata_code/:iata_code
```
Returns details of the airport with the specified IATA code.

#### Parameters
- `iata_code`: IATA code of the airport (string).

#### Example
```json
GET http://localhost:3001/airport/iata_code/AAE
```

### Get all cities
```
GET /city
```
Returns a JSON array of all cities.

#### Example
```json
GET http://localhost:3001/city
```

### Get all countries
```
GET /country
```
Returns a JSON array of all countries.

#### Example
```json
GET http://localhost:3001/country
```

## Error Handling
- If there's an error fetching data from the database, the API will respond with a 500 status code and an error message in the response body.

## Server
The server is running on port 3001.

```javascript
console.log("Server listening on port 3001");
```

## Technologies Used
- Express.js
- MySQL
---