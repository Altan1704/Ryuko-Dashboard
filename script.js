// Initialize reviews array
const reviews = [];

// Capture Selected Rating
let selectedRating = 0;

// Star Rating System
document.querySelectorAll('.stars span').forEach((star) => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-star'), 10); // Capture selected star rating
    updateStars(selectedRating); // Highlight stars
  });
});

// Highlight Stars Based on Rating
function updateStars(rating) {
  document.querySelectorAll('.stars span').forEach((star) => {
    const starValue = parseInt(star.getAttribute('data-star'), 10);
    star.style.color = starValue <= rating ? 'gold' : 'gray'; // Highlight selected stars in gold
  });
}

// Submit Review
async function submitReview() {
  const reviewText = document.getElementById('review').value;

  // Validate Rating and Review
  if (!selectedRating) {
    alert('Please select a rating before submitting!');
    return;
  }

  if (reviewText.trim() === '') {
    alert('Please write a review before submitting!');
    return;
  }

  // Add review to local reviews array (or send to backend)
  try {
    const response = await fetch('http://localhost:5000/add-review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating: selectedRating, review: reviewText }),
    });

    if (response.ok) {
      alert('Review submitted successfully!');
      document.getElementById('review').value = ''; // Clear input
      selectedRating = 0; // Reset selected rating
      updateStars(selectedRating); // Reset stars
      fetchReviews(); // Update reviews section
    } else {
      alert('Error submitting review.');
    }
  } catch (error) {
    console.error('Error submitting review:', error);
  }
}

// Fetch Reviews
async function fetchReviews() {
  try {
    const response = await fetch('http://localhost:5000/get-reviews');
    const reviews = await response.json();

    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = reviews
      .map((r) => `<li>⭐ ${r.rating}: ${r.review}</li>`)
      .join('');
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}

// Fetch reviews on page load
fetchReviews();
