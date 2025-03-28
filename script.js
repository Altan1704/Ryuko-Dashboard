// Initialize Ratings Array from Local Storage or Start Fresh
const ratings = JSON.parse(localStorage.getItem('ratings')) || [];

// Add a New Rating
function addRating(rating) {
  ratings.push(rating);
  localStorage.setItem('ratings', JSON.stringify(ratings)); // Save to local storage
  updateRatingsDisplay();
}

// Update Ratings Display
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
    addRating(rating); // Add rating to the array and save it
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

// Update the Display on Page Load
updateRatingsDisplay();
