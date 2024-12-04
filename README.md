
# School Management API

A Node.js and Express.js application to manage school data using MongoDB. The application includes endpoints to add schools and retrieve a sorted list of schools by proximity to a user's location.

---

## Features
- Add a school with name, address, latitude, and longitude.
- List all schools sorted by proximity to a given latitude and longitude.
- MongoDB integration for data storage.
- Deployed on [Vercel](https://vercel.com).

---

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose)
- Vercel for deployment

---

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org) installed
- MongoDB server or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vercel CLI](https://vercel.com/docs/cli) installed (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Chinmay1635/Node-JS-assignment.git
   cd school-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following environment variables:
   ```
   PORT=3000
   MONGO_URL=your-mongodb-connection-string
   ```

4. Start the development server:
   ```bash
   node index.js
   ```
   The server will run at `http://localhost:3000`.

---

## API Endpoints

### 1. **Add School**
- **Endpoint**: `/addSchool`
- **Method**: `POST`
- **Payload**:
  ```json
  {
      "name": "Greenwood High School",
      "address": "123 Elm Street, Springfield",
      "latitude": 37.7749,
      "longitude": -122.4194
  }
  ```
- **Response**:
  ```json
  {
      "message": "School added successfully!",
      "school": {
          "_id": "64e9c21e8f1d2b3c3493a2ab",
          "name": "Greenwood High School",
          "address": "123 Elm Street, Springfield",
          "latitude": 37.7749,
          "longitude": -122.4194,
          "__v": 0
      }
  }
  ```

### 2. **List Schools**
- **Endpoint**: `/listSchools`
- **Method**: `GET`
- **Query Parameters**:
  - `latitude`: User's latitude (e.g., `37.7749`)
  - `longitude`: User's longitude (e.g., `-122.4194`)
- **Response**:
  ```json
  {
      "message": "Schools fetched and sorted by proximity.",
      "schools": [
          {
              "_id": "64e9c21e8f1d2b3c3493a2ab",
              "name": "Greenwood High School",
              "address": "123 Elm Street, Springfield",
              "latitude": 37.7749,
              "longitude": -122.4194,
              "distance": 0
          }
      ]
  }
  ```

---

## Testing the API
Use [Postman](https://www.postman.com/) to test the endpoints:
1. **Add School**:
   - Method: `POST`
   - URL: `http://localhost:3000/addSchool`
   - Payload: Refer to **Add School** above.

2. **List Schools**:
   - Method: `GET`
   - URL: `http://localhost:3000/listSchools?latitude=37.7749&longitude=-122.4194`



---

## Acknowledgements
- MongoDB for database support
- Express.js for the web framework
- Vercel for deployment hosting
```

---
