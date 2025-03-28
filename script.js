// Initialize Selected Rating
let selectedRating = 0;

// Star Rating System
document.querySelectorAll('.stars span').forEach((star) => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-star'), 10); // Get selected star rating
    updateStars(selectedRating); // Highlight stars
    displayRating(selectedRating); // Update rating display
  });
});

// Highlight Stars Based on Selected Rating
function updateStars(rating) {
  document.querySelectorAll('.stars span').forEach((star) => {
    const starValue = parseInt(star.getAttribute('data-star'), 10);
    star.classList.toggle('active', starValue <= rating); // Add or remove 'active' class
  });
}

// Display Rating
function displayRating(rating) {
  document.getElementById('rating-display').textContent = rating; // Update rating display
}

// Initialize Ratings Array
const ratings = [];

// Function to Add Rating
function addRating(rating) {
  ratings.push(rating);
  updateRatingsDisplay(); // Update the displayed ratings
}

// Update Ratings Display Section
function updateRatingsDisplay() {
  const ratingsList = document.getElementById('ratings-list');
  const averageRating = document.getElementById('average-rating');

  // Generate List of Ratings
  ratingsList.innerHTML = ratings
    .map((rating, index) => `<li>Rating ${index + 1}: ⭐ ${rating}</li>`)
    .join('');

  // Calculate Average Rating
  const average = (
    ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length || 0
  ).toFixed(1); // Keep one decimal point
  averageRating.textContent = average; // Update average rating
}

// Handle Star Click
document.querySelectorAll('.stars span').forEach((star) => {
  star.addEventListener('click', () => {
    const rating = parseInt(star.getAttribute('data-star'), 10);
    addRating(rating); // Add rating to the list
    updateStars(rating); // Highlight stars
    displayRating(rating); // Update selected rating display
  });
});

// Highlight Stars Based on Selected Rating
function updateStars(rating) {
  document.querySelectorAll('.stars span').forEach((star) => {
    const starValue = parseInt(star.getAttribute('data-star'), 10);
    star.classList.toggle('active', starValue <= rating);
  });
}

// Display Selected Rating
function displayRating(rating) {
  document.getElementById('rating-display').textContent = rating;
}