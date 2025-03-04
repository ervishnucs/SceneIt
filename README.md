# 🎥 Movie Tracker App

## Description
The **Movie Tracker App** is a lightweight web application that allows users to manage their personal movie watchlist. Users can add movies, mark them as watched or not watched, list their favorite scenes, and edit or delete movies. The app features a clean, responsive user interface built using **HTML, CSS, and JavaScript**.

This project also explores **AWS Services** for hosting and scalability.

## Features
- Add movies to **Not Watched** or **Watched** lists.
- Tag favorite scenes for each movie.
- Edit movie details and scenes.
- Delete movies from the list.
- Scene tags with **heart icons** for watched movies.
- Fully responsive design (mobile-friendly).

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript (DOM manipulation)
- **Cloud Hosting:** AWS S3 (Static Website Hosting)
- **Deployment Automation:** AWS CodePipeline (Optional)
- **Storage (optional future enhancement):** AWS DynamoDB for movie data persistence
- **Scalability (optional future enhancement):** AWS CloudFront for CDN distribution

## AWS Services Overview
| Service      | Usage Description                                                                 |
|--------------|----------------------------------------------------------------------------------|
| **S3**        | Hosting the static website files (HTML, CSS, JS).                               |
| **CloudFront**| Optional: Distribute the app globally with low latency.                         |
| **CodePipeline** | Optional: Automate deployment from GitHub to S3 bucket.                     |
| **DynamoDB**  | Optional Future Scope: Store movies and scenes data for persistence.            |


## How to Deploy on AWS S3
1. Create an S3 bucket.
2. Enable **Static Website Hosting** in bucket properties.
3. Upload `index.html`, `style.css`, and `script.js` to the bucket.
4. Access your app using the S3 public URL.

## Demo Video
Watch the demo on YouTube:  
🔗 [https://youtu.be/buQvIcs_sFw](https://youtu.be/buQvIcs_sFw)
