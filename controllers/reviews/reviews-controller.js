import * as reviewsDao from './reviews-dao.js'

const ReviewsController = (app) => {
  const findAllReviews = async (req, res) => {
    console.log("findAllReviews called");
    try {
      const reviews = await reviewsDao.findAllReviews();
      res.json(reviews);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  }
  const findReviewsByPark = async (req, res) => {
    console.log("findReviewsByPark called with: " + req.params.parkId);
    try {
      const reviews = await reviewsDao.findReviewsByPark(req.params.parkId)
      console.log("reviews: " + reviews);
      res.json(reviews);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  }
  const findReviewsByUser = async (req, res) => {
    console.log("findReviewsByUser called");
    try {
      const reviews = await reviewsDao.findReviewsByUser(req.params.id);
      res.json(reviews);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  }
  const createReview = async (req, res) => {
    console.log("createReview called");
    const review = req.body;
    try {
      const newReview = await reviewsDao.createReview(review);
      res.json(newReview);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  }
  const updateReview = async (req, res) => {
    console.log("updateReview called");
    const review = req.body;
    try {
      const status = await reviewsDao.updateReview(req.body._id, review);
      res.send(status);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  }
  const deleteReview = async (req, res) => {
    console.log("deleteReview called");
    try {
      const status = await reviewsDao.deleteReview(req.params.id);
      res.send(status);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  }

  const mostRecentReview = async (req, res) => {
    console.log("mostRecentReview called");
    try {
      const review = await reviewsDao.findMostRecentReview();
      res.send(review);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  }


  app.get("/api/reviews", findAllReviews);
  app.get("/api/reviews/user/:id", findReviewsByUser)
  app.get("/api/reviews/park/:parkId", findReviewsByPark);
  app.get("/api/reviews/recent", mostRecentReview);
  app.post("/api/reviews", createReview);
  app.put("/api/reviews", updateReview);
  app.delete("/api/reviews/:id", deleteReview);
}
export default ReviewsController;