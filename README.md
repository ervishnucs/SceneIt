# 🎥 Movie Tracker App

## Description
The **Movie Tracker App** is a simple and efficient web application that helps users manage their personal movie collection. It allows users to add movies, mark them as watched, list their favorite scenes, and edit or delete existing entries. The app leverages a **serverless backend** deployed on AWS to handle dynamic data storage and retrieval.

## Features
- Add movies to **Not Watched** or **Watched** lists.
- Tag favorite scenes for each movie.
- Edit or delete movies.
- Dynamic backend for data storage and retrieval.
- Scene tags with **heart icons** for watched movies.
- Responsive UI with modern design.

## Technologies Used
### Frontend
- **HTML**, **CSS**, **JavaScript** (DOM manipulation)

### Backend (AWS Serverless Stack)
| Service      | Usage Description                                                                 |
|--------------|----------------------------------------------------------------------------------|
| **AWS Lambda** | Backend functions for handling create, read, update, and delete (CRUD) operations. |
| **API Gateway** | Exposes RESTful endpoints to connect frontend with backend.                     |
| **DynamoDB**  | Stores movie data, including title, status, and favorite scenes.                  |
| **S3**        | Hosts the static frontend files (HTML, CSS, JS).                                 |

---

## AWS Architecture Overview
1. **Frontend Hosting:** Static files are stored in **AWS S3** for web hosting.
2. **API Gateway:** Routes HTTP requests from the frontend to the appropriate **Lambda** functions.
3. **Lambda Functions:** Handle all CRUD operations for movies and scenes.
4. **DynamoDB:** Stores all movie data, including titles, status (watched/unwatched), and favorite scenes.

---

## Screenshot
Below is a screenshot of the **Movie Tracker App** interface:

![Movie Tracker Screenshot](Screenshot%202025-03-05%20004116.png)

---

## How It Works
1. **User Action:** Add/Edit/Delete movie from the frontend.
2. **API Request:** Frontend sends requests to **API Gateway**.
3. **Lambda Execution:** API Gateway triggers Lambda functions.
4. **Data Storage:** Lambda reads/writes data to **DynamoDB**.
5. **Update UI:** Frontend fetches and displays updated movie list.

---

## How to Run Locally
1. Clone the repository.
2. Open `index.html` directly in your browser.
3. For full functionality (with AWS backend), configure `script.js` to call your **API Gateway** endpoints.

---

## Deployment Guide (AWS)
### 1. Frontend (S3 Hosting)
- Upload `index.html`, `style.css`, and `script.js` to **AWS S3 bucket**.
- Enable **Static Website Hosting** in bucket properties.

### 2. Backend (Lambda + API Gateway + DynamoDB)
- Create a **DynamoDB table** (e.g., `Movies`) with attributes:
    - `MovieID` (Primary Key - String)
    - `Title` (String)
    - `Status` (String - Watched/Not Watched)
    - `Scenes` (List)

- Create Lambda functions for:
    - `addMovie`
    - `getMovies`
    - `updateMovie`
    - `deleteMovie`

- Create an **API Gateway REST API** to expose:
    - `POST /movies` → addMovie Lambda
    - `GET /movies` → getMovies Lambda
    - `PUT /movies/{id}` → updateMovie Lambda
    - `DELETE /movies/{id}` → deleteMovie Lambda

- Update `script.js` to use your deployed **API Gateway URLs**.

---

## Demo Video
Watch the full walkthrough and demo here:  
🔗 [https://youtu.be/buQvIcs_sFw](https://youtu.be/buQvIcs_sFw)

---


