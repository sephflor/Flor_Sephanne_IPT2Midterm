# Flor_Sephanne_IPT2Midterm

# COMPUTER SHOP TIME LOG SYSTEM

## 1. Project Title

**Computer Shop Time Log System**

## 2. Project Description

The Computer Shop Time Log System is a full-stack web application designed to manage customer computer usage sessions in a computer shop. The system records important information such as the computer unit number, customer name, starting time, number of hours used, and total amount to be paid.

The application uses **React.js** for the frontend, **Express.js and Node.js** for the backend, and **PostgreSQL** for database management.

The system implements the four basic CRUD operations:

* **Create** – Add a new computer usage session.
* **Read** – View all recorded sessions.
* **Update** – Edit an existing session.
* **Delete** – Remove a session.

---

# 3. Objectives

The main objectives of the system are:

1. To create a digital record of computer shop customer sessions.
2. To allow users to add new customer time logs.
3. To display all recorded computer sessions.
4. To allow users to update incorrect or changed information.
5. To allow users to delete completed or unwanted records.
6. To store records securely in a PostgreSQL database.
7. To demonstrate the implementation of CRUD operations using a full-stack web application.

---

# 4. Technologies Used

| Technology | Purpose                           |
| ---------- | --------------------------------- |
| React.js   | Frontend user interface           |
| JavaScript | Application programming           |
| CSS        | User interface design             |
| Node.js    | Backend runtime                   |
| Express.js | REST API                          |
| PostgreSQL | Database                          |
| pg         | PostgreSQL connection for Node.js |
| CORS       | Frontend-backend communication    |
| dotenv     | Environment variable management   |
| Git        | Version control                   |
| GitHub     | Project repository                |

---

# 5. System Architecture

The system follows a three-layer architecture:

```text
┌──────────────────────────┐
│     React Frontend       │
│                          │
│  Add / View / Edit /     │
│       Delete Sessions    │
└────────────┬─────────────┘
             │
             │ HTTP Requests
             ▼
┌──────────────────────────┐
│   Express.js Backend     │
│                          │
│       REST API           │
│ GET / POST / PUT / DELETE│
└────────────┬─────────────┘
             │
             │ SQL Queries
             ▼
┌──────────────────────────┐
│       PostgreSQL         │
│                          │
│    computeshoptimelog    │
│                          │
│       sessions           │
└──────────────────────────┘
```

---

# 6. Project Folder Structure

```text
FLOR_SEPHANNE_IPT2Midterm/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── package.json
│   ├── index.html
│   │
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       └── main.jsx
│
└── README.md
```

---

# 7. Database Documentation

## 7.1 Database Name

```text
computeshoptimelog
```

## 7.2 Table Name

```text
sessions
```

## 7.3 Database Table Structure

| Column       | Data Type     | Description                      |
| ------------ | ------------- | -------------------------------- |
| id           | SERIAL        | Unique ID of the session         |
| unit_number  | VARCHAR(20)   | Computer unit number             |
| customer     | VARCHAR(100)  | Customer name                    |
| time_started | TIMESTAMP     | Session starting time            |
| hours        | NUMERIC(5,2)  | Number of hours used             |
| amount       | NUMERIC(10,2) | Total payment                    |
| created_at   | TIMESTAMP     | Date and time record was created |
| updated_at   | TIMESTAMP     | Date and time record was updated |

## 7.4 SQL Database Creation

```sql
CREATE DATABASE computeshoptimelog;
```

After selecting the database:

```sql
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    unit_number VARCHAR(20) NOT NULL,
    customer VARCHAR(100) NOT NULL,
    time_started TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    hours NUMERIC(5,2) NOT NULL CHECK (hours > 0),
    amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 8. Backend Documentation

The backend is developed using **Node.js and Express.js**.

The backend is responsible for:

* Connecting to PostgreSQL.
* Receiving requests from React.
* Processing CRUD operations.
* Sending database results back to the frontend.
* Handling errors.

## 8.1 Database Connection

The `db.js` file creates a PostgreSQL connection pool.

```javascript
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
```

## 8.2 Environment Configuration

The `.env` file contains the database connection information.

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=computeshoptimelog
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
DB_PORT=5432
PORT=5000
```

The `.env` file should not be uploaded publicly because it contains database credentials.

---

# 9. REST API Documentation

The backend provides the following API endpoints:

| Method | Endpoint            | Function         |
| ------ | ------------------- | ---------------- |
| GET    | `/api/sessions`     | Get all sessions |
| GET    | `/api/sessions/:id` | Get one session  |
| POST   | `/api/sessions`     | Create a session |
| PUT    | `/api/sessions/:id` | Update a session |
| DELETE | `/api/sessions/:id` | Delete a session |

---

# 10. Create Operation

The **POST** request is used to create a new computer shop session.

```text
POST /api/sessions
```

Example data:

```json
{
  "unit_number": "PC-05",
  "customer": "Seph",
  "time_started": "2026-10-01 10:00:00",
  "hours": 2,
  "amount": 40
}
```

The backend inserts the information into the PostgreSQL `sessions` table.

```sql
INSERT INTO sessions
(unit_number, customer, time_started, hours, amount)
VALUES ($1, $2, $3, $4, $5);
```

---

# 11. Read Operation

The **GET** request retrieves all computer shop sessions.

```text
GET /api/sessions
```

The backend uses:

```sql
SELECT *
FROM sessions
ORDER BY id ASC;
```

The results are returned to React and displayed in the session table.

---

# 12. Update Operation

The **PUT** request updates an existing session.

```text
PUT /api/sessions/:id
```

Example:

```text
PUT /api/sessions/1
```

The backend updates the selected record:

```sql
UPDATE sessions
SET
    unit_number = $1,
    customer = $2,
    time_started = $3,
    hours = $4,
    amount = $5,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $6;
```

---

# 13. Delete Operation

The **DELETE** request removes a session.

```text
DELETE /api/sessions/:id
```

Example:

```text
DELETE /api/sessions/1
```

The backend executes:

```sql
DELETE FROM sessions
WHERE id = $1;
```

Before deleting, the frontend asks the user for confirmation.

---

# 14. Frontend Documentation

The frontend is developed using **React.js**.

The main file is:

```text
frontend/src/App.jsx
```

The application provides a graphical interface for managing sessions.

The interface contains:

1. Add Session Form
2. Session Records Table
3. Edit Button
4. Delete Button
5. Refresh Button

---

# 15. Add Session Form

The form contains the following fields:

```text
Unit Number
Customer
Time Started
Hours
Amount
```

Example:

```text
Unit Number: PC-01
Customer: Juan Dela Cruz
Time Started: 10:00 AM
Hours: 2
Amount: ₱40.00
```

When the user clicks **Add Session**, React sends a POST request to the backend.

---

# 16. Session Records

The frontend displays records in a table.

```text
ID | Unit | Customer | Time Started | Hours | Amount | Actions
```

Example:

```text
1 | PC-01 | Juan Dela Cruz | 10:00 AM | 2 | ₱40.00
2 | PC-02 | Maria Santos  | 10:30 AM | 3 | ₱60.00
```

---

# 17. Edit Function

The user can click:

```text
✏️ Edit
```

The selected record is loaded into the form.

The user can modify:

* Unit number
* Customer
* Time started
* Hours
* Amount

After clicking **Update Session**, the frontend sends a PUT request.

---

# 18. Delete Function

The user can click:

```text
🗑️ Delete
```

A confirmation message appears:

```text
Are you sure you want to delete this session?
```

If the user confirms, the frontend sends a DELETE request to the backend.

---

# 19. React API Connection

The frontend connects to the backend using:

```javascript
const API_URL =
  "http://localhost:5000/api/sessions";
```

The React application uses JavaScript `fetch()` to communicate with the REST API.

### GET

```javascript
fetch(API_URL);
```

### POST

```javascript
fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
});
```

### PUT

```javascript
fetch(`${API_URL}/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
});
```

### DELETE

```javascript
fetch(`${API_URL}/${id}`, {
  method: "DELETE"
});
```

---

# 20. Application Workflow

The overall process is:

```text
User opens application
        ↓
React loads session records
        ↓
GET /api/sessions
        ↓
Express receives request
        ↓
PostgreSQL retrieves records
        ↓
Express returns JSON
        ↓
React displays records
```

For adding a record:

```text
User fills form
        ↓
Click Add Session
        ↓
POST /api/sessions
        ↓
Express
        ↓
PostgreSQL INSERT
        ↓
New record saved
        ↓
React refreshes table
```

For updating:

```text
Click Edit
    ↓
Edit information
    ↓
Click Update
    ↓
PUT /api/sessions/:id
    ↓
PostgreSQL UPDATE
    ↓
Refresh records
```

For deleting:

```text
Click Delete
    ↓
Confirm deletion
    ↓
DELETE /api/sessions/:id
    ↓
PostgreSQL DELETE
    ↓
Refresh records
```

---

# 21. Running the Application

## Backend

Open PowerShell and navigate to:

```powershell
cd "C:\Users\Seph Flor\FLOR_SEPHANNE_IPT2Midterm\backend"
```

Run:

```powershell
npm run dev
```

Expected result:

```text
Server running at http://localhost:5000
```

## Frontend

Open another terminal:

```powershell
cd "C:\Users\Seph Flor\FLOR_SEPHANNE_IPT2Midterm\frontend"
```

Run:

```powershell
npm run dev
```

Then open the Vite URL displayed in the terminal.

---

# 22. Testing

The following CRUD operations should be tested.

| Test           | Expected Result                             |
| -------------- | ------------------------------------------- |
| Add session    | New record appears                          |
| View sessions  | All records are displayed                   |
| Edit session   | Selected record is updated                  |
| Delete session | Selected record is removed                  |
| Refresh        | Latest records are displayed                |
| Empty form     | Required fields prevent submission          |
| Invalid hours  | Database validation prevents invalid value  |
| Invalid amount | Database validation prevents negative value |

---

# 23. Git and GitHub

Git is used for version control.

Check project status:

```powershell
git status
```

Stage changes:

```powershell
git add .
```

Commit changes:

```powershell
git commit -m "Complete computer shop time log CRUD"
```

Synchronize with GitHub:

```powershell
git pull origin main --rebase
```

Push changes:

```powershell
git push origin main
```

Repository:

```text
https://github.com/sephflor/Flor_Sephanne_IPT2Midterm.git
```

---

# 24. Conclusion

The Computer Shop Time Log System demonstrates the development of a full-stack CRUD application using React.js, Express.js, Node.js, and PostgreSQL. The system allows computer shop staff to efficiently manage customer computer usage records through a simple web interface.

The implementation demonstrates how a React frontend communicates with an Express REST API and how the backend interacts with a PostgreSQL database. Through the four CRUD operations, users can add, view, update, and delete computer shop session records.

The project also demonstrates the use of database validation, REST API endpoints, frontend state management, asynchronous requests, and Git version control. These technologies work together to create a functional and organized computer shop time management application.
