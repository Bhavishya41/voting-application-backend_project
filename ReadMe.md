
# 🗳️ Voting Application Backend

A secure and scalable backend API for a voting system where users can sign up using their Aadhaar number, view candidates, cast a single vote, and see live vote counts. Admins can manage candidates with full CRUD access.

---

## 🚀 Features

- 🔐 User authentication with Aadhaar number and hashed password
- 🧾 One-time voting system with vote tracking
- 📊 Live vote count display, sorted in descending order
- 👁️ View all candidates before voting
- 🔁 Password change functionality
- 🛡️ Admin panel to perform full candidate CRUD
- 🚫 Admins are restricted from voting

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **Render** for deployment
- **MongoDB Atlas** for cloud database

---

## 📚 API Endpoints

### 🔐 Authentication

| Method | Route      | Description                          |
|--------|------------|--------------------------------------|
| POST   | `/signup`  | Register a new user with Aadhaar     |
| POST   | `/signin`  | Login using Aadhaar and password     |

---

### 🗳️ Voting

| Method | Route                    | Description                    |
|--------|--------------------------|--------------------------------|
| GET    | `/candidates`            | View list of all candidates    |
| POST   | `/vote/:candidateID`     | Vote for a specific candidate  |

---

### 📈 Vote Count

| Method | Route           | Description                                |
|--------|------------------|--------------------------------------------|
| GET    | `/vote/count`   | View live vote counts (sorted by votes)     |

---

### 👤 User Profile

| Method | Route                   | Description                  |
|--------|--------------------------|------------------------------|
| GET    | `/profile`              | View profile info            |
| PUT    | `/profile/changePassword` | Change account password       |

---

### 🛠️ Admin Panel

| Method | Route                          | Description                     |
|--------|----------------------------------|---------------------------------|
| POST   | `/candidates`                  | Add new candidate               |
| PUT    | `/candidates/:candidateID`     | Update candidate info           |
| DELETE | `/candidate/:candidateID`      | Delete a candidate              |

> 🛡️ Admins are authenticated and restricted from voting.

---

## 🧪 Setup Instructions

### 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=300
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

### 📦 Installation

```bash
git clone https://github.com/Bhavishya41/voting-application-backend_project.git
npm install
npm start
```

---

## 🌐 Live Demo

🔗 [Live API on Render](https://voting-application-backend-project.onrender.com)

---

## 📮 API Testing

Import the Postman collection: https://documenter.getpostman.com/view/46170333/2sB2xEBTsv

---

## 🧑‍💻 Author

**Bhavishya Jain**  
Backend Developer | Exploring Node.js, MongoDB, and scalable APIs

---

## 📄 License

This project is licensed under the MIT License.

---
