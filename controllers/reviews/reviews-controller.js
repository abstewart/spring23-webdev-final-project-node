import * as reviewsDao from './reviews-dao.js'

const ReviewsController = (app) => {
  const findAllReviews = async (req, res) => {
    console.log("findAllReviews called");
    const reviews = await reviewsDao.findAllReviews();
    res.json(reviews);
  }
  const findReviewsByPark = async (req, res) => {
    console.log("findReviewsByPark called");
    const reviews = await reviewsDao.findReviewsByPark(req.params.parkId)
    res.json(reviews);
  }
  const findReviewsByUser = async (req, res) => {
    console.log("findReviewsByUser called");
    const reviews = await reviewsDao.findReviewsByUser(req.params.id);
    res.json(reviews);
  }
  const createReview = async (req, res) => {
    console.log("createReview called");
    const review = req.body;
    const newReview = await reviewsDao.createReview(review);
    res.json(newReview);
  }
  const updateReview = async (req, res) => {
    console.log("updateReview called");
    const review = req.body;
    const status = await reviewsDao.updateReview(req.body._id, review);
    res.send(status);
  }
  const deleteReview = async (req, res) => {
    console.log("deleteReview called");
    const status = await reviewsDao.deleteReview(req.params.id);
    res.send(status);
  }

  const mostRecentReview = async (req, res) => {
    console.log("mostRecentReview called");
    const review = await reviewsDao.findMostRecentReview();
    res.send(review);
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