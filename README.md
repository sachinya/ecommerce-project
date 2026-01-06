# 🛒 E-Commerce Application (Full Stack)

A full-stack e-commerce application built to demonstrate real-world web application development using **React** on the frontend and **Spring Boot** on the backend.

This project focuses on clean architecture, REST API integration, and practical full-stack workflows rather than UI polish.

---

## 🚀 Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- HTML / CSS
- Axios

### Backend
- Java 17
- Spring Boot
- REST APIs
- Maven

### Database
- MongoDB

---

## 📂 Project Structure

ecommerce-project/
├── frontend/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/ # Spring Boot backend
│ ├── src/
│ ├── pom.xml
│ ├── mvnw
│ └── mvnw.cmd
│
└── README.md


---

## ✨ Features

- Product listing and browsing
- Backend REST APIs for business logic
- Frontend consumes backend APIs
- Clear separation of frontend and backend
- Easy local development setup

---

## 🛠 Prerequisites

- **Node.js** (LTS recommended)
- **Java 17+**
- **Maven** (or Maven Wrapper)

---

## ▶️ Running the Application

### Start Frontend (React)

```bash
cd frontend
npm install
npm start

Frontend will be available at: http://localhost:3000

### Start Backend (Spring Boot)
cd backend
.\mvnw.cmd spring-boot:run

Backend will be available at: http://localhost:8080

