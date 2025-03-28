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
mongoose.connect('mongodb://localhost:27017/ratingsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Schema for Ratings and Reviews
const reviewSchema = new mongoose.Schema({
  rating: Number,
  review: String,
});

const Review = mongoose.model('Review', reviewSchema);

// Routes
app.post('/add-review', async (req, res) => {
  try {
    const { rating, review } = req.body;
    const newReview = new Review({ rating, review });
    await newReview.save();
    res.status(201).send('Review added successfully!');
  } catch (error) {
    res.status(500).send('Error saving the review');
  }
});

app.get('/get-reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).send('Error fetching reviews');
  }
});

// Start the Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));