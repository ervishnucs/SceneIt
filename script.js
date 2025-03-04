const apiBaseUrl =
  "https://965inj9t5j.execute-api.us-east-1.amazonaws.com/prod/movies";

// Load movies on page load
document.addEventListener("DOMContentLoaded", loadMovies);

async function loadMovies() {
  try {
    const response = await fetch(apiBaseUrl);
    if (!response.ok) throw new Error("Failed to fetch movies");

    const movies = await response.json();
    displayMovies(movies);
  } catch (error) {
    console.error("Error loading movies:", error);
    alert("Failed to load movies.");
  }
}

function displayMovies(movies) {
  const notWatchedList = document.getElementById("not-watched-movies");
  const watchedList = document.getElementById("watched-movies");

  notWatchedList.innerHTML = "";
  watchedList.innerHTML = "";

  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");

    movieItem.innerHTML = `
            <h3>${movie.title}</h3>
            <p><strong>Watched:</strong> ${movie.watched ? "Yes" : "No"}</p>
            <p><strong>Favorite Scenes:</strong> ${
              movie.favoriteScenes?.join(", ") || "None"
            }</p>
            <p><strong>Updated At:</strong> ${new Date(
              movie.updatedAt
            ).toLocaleString()}</p>
            <button onclick="editMovie('${movie.title}')">Edit</button>
            <button onclick="deleteMovie('${movie.title}')">Delete</button>
        `;

    if (movie.watched) {
      watchedList.appendChild(movieItem);
    } else {
      notWatchedList.appendChild(movieItem);
    }
  });
}

function createMovieElement(movie) {
  const movieItem = document.createElement("div");
  movieItem.classList.add("movie-item");

  const favScenesWithHearts = (movie.favoriteScenes || [])
    .map((scene) => `❤️ ${scene}`)
    .join(", ");

  movieItem.innerHTML = `
    <h3>${movie.title}</h3>
    <p><strong>Watched:</strong> ${movie.watched ? "Yes" : "No"}</p>
    <p><strong>Favorite Scenes:</strong> ${favScenesWithHearts || "None"}</p>
    <p><strong>Updated At:</strong> ${new Date(
      movie.updatedAt
    ).toLocaleString()}</p>
    <div class="actions">
      <button onclick="editMovie('${movie.title}')">Edit</button>
      <button class="delete" onclick="deleteMovie('${
        movie.title
      }')">Delete</button>
    </div>
  `;

  return movieItem;
}

async function editMovie(title) {
  const newScenes = prompt("Enter new favorite scenes (comma-separated):", "");
  if (newScenes === null) return;

  const scenesArray = newScenes
    .split(",")
    .map((scene) => scene.trim())
    .filter((scene) => scene); // Filter out empty entries

  const updateData = {
    favoriteScenes: scenesArray,
    updatedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(`${apiBaseUrl}/${encodeURIComponent(title)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) throw new Error("Failed to update movie");

    alert("Movie updated successfully!");
    loadMovies();
  } catch (error) {
    console.error("Error updating movie:", error);
    alert("Failed to update movie.");
  }
}

async function deleteMovie(title) {
  if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

  try {
    const response = await fetch(`${apiBaseUrl}/${encodeURIComponent(title)}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete movie");

    alert("Movie deleted successfully!");
    loadMovies();
  } catch (error) {
    console.error("Error deleting movie:", error);
    alert("Failed to delete movie.");
  }
}

document
  .getElementById("addMovieForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const movieTitle = document.getElementById("movieTitle").value.trim();
    const watchedStatus = document.getElementById("watched-status").value;
    const favScenesInput = document.getElementById("fav-scenes").value.trim();

    const favoriteScenes = favScenesInput
      ? favScenesInput.split(",").map((scene) => scene.trim())
      : [];

    if (!movieTitle) {
      alert("Please enter a movie title.");
      return;
    }

    const movieData = {
      title: movieTitle,
      watched: watchedStatus === "watched",
      favoriteScenes: favoriteScenes,
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(apiBaseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        alert("Movie added successfully!");
        event.target.reset();
        loadMovies();
      } else {
        throw new Error("Failed to add movie");
      }
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Failed to add movie.");
    }
  });
