// Initialize Selected Rating
let selectedRating = 0;

// Handle Star Clicks
document.querySelectorAll('.stars span').forEach((star) => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-star'), 10); // Get selected star rating
    updateStars(selectedRating); // Highlight stars
    displayRating(selectedRating); // Display selected rating
  });
});

// Highlight Stars Based on Selected Rating
function updateStars(rating) {
  document.querySelectorAll('.stars span').forEach((star) => {
    const starValue = parseInt(star.getAttribute('data-star'), 10);
    star.style.color = starValue <= rating ? 'gold' : 'gray'; // Highlight selected stars in gold
  });
}

// Display Selected Rating
function displayRating(rating) {
  document.getElementById('rating-display').textContent = rating; // Update rating display
}
