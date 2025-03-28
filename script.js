// Initialize reviews array
const reviews = [];

// Star Rating System
document.querySelectorAll('.stars span').forEach(star => {
  star.addEventListener('click', () => {
    const starValue = star.getAttribute('data-star');
    alert(`You rated ${starValue} star(s)!`);
  });
});

// Submit Review
function submitReview() {
  const reviewText = document.getElementById('review').value;
  
  if (reviewText.trim() === '') {
    alert('Please write a review before submitting!');
    return;
  }

  // Add review to list
  reviews.push(reviewText);
  updateReviews();

  // Clear textarea
  document.getElementById('review').value = '';
}

// Update Reviews Section
function updateReviews() {
  const reviewsList = document.getElementById('reviews-list');
  reviewsList.innerHTML = reviews.map(review => `<li>${review}</li>`).join('');
}

// Submit Review
async function submitReview() {
  const reviewText = document.getElementById('review').value;
  const rating = document.querySelectorAll('.stars span[style="color: gold;"]').length; // Count highlighted stars

  if (!rating || reviewText.trim() === '') {
    alert('Please provide a rating and review before submitting!');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/add-review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, review: reviewText }),
    });

    if (response.ok) {
      alert('Review submitted successfully!');
      document.getElementById('review').value = '';
      fetchReviews(); // Update reviews section
    } else {
      alert('Error submitting review.');
    }
  } catch (error) {
    console.error(error);
  }
}

// Fetch Reviews
async function fetchReviews() {
  try {
    const response = await fetch('http://localhost:5000/get-reviews');
    const reviews = await response.json();

    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = reviews
      .map(r => `<li>⭐ ${r.rating}: ${r.review}</li>`)
      .join('');
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}

// Fetch reviews on page load
fetchReviews();