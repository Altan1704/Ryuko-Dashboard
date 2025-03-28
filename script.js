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