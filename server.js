const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ratingsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema for Ratings and Reviews
const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true }, // Added validation for rating
  review: { type: String, required: true }, // Added validation for review
});

const Review = mongoose.model('Review', reviewSchema);

// Routes

// Add a Review
app.post('/add-review', async (req, res) => {
  try {
    const { rating, review } = req.body;

    // Validate Input
    if (!rating || !review) {
      return res.status(400).send('Rating and review are required!');
    }

    const newReview = new Review({ rating, review });
    await newReview.save();
    res.status(201).send('Review added successfully!');
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).send('Internal server error');
  }
});

// Get All Reviews
app.get('/get-reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send('Internal server error');
  }
});

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Ratings and Reviews API!');
});

// Start the Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));