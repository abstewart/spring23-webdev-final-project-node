import * as reviewLikesDao from './reviewLikes-dao.js';

const ReviewLikesController = (app) => {

  const findAllReviewLikes = async (req, res) => {
    console.log("findAllReviewLikes called");
    try{
      const reviewLikes = await reviewLikesDao.findAllLikes();
      res.json(reviewLikes);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  };
  const likedReviews = async (req, res) => {
    console.log("likedReviewsByUsername called");
    const {username} = req.session.currentUser;
    try{
      const reviews = await reviewLikesDao.likesByUsername(username);
      res.json(reviews);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  };
  const whoLiked = async (req, res) => {
    console.log("whoLiked called");
    try {
      const usernames = await reviewLikesDao.usersWhoLikedReview(req.params.review);
      res.json(usernames);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  };
  const numLikesForReview = async (req, res) => {
    console.log("numLikesForReview called");
    try{
      const numLikes = await reviewLikesDao.numLikesByReview(req.params.review);
      console.log("likes found: " + numLikes);
      res.json({numLikes});
    } catch (err) {
      console.log(err.message)
      res.sendStatus(500);
    }
  };
  const numReviewsLikedByUser = async (req, res) => {
    console.log("numReviewsLikedbyUser called");
    const {username} = req.session.currentUser;
    try{

    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
    const numLikes = await reviewLikesDao.numLikesByUsername(username);
    res.json({numLikes});
  };
  const deleteReviewLike = async (req, res) => {
    console.log("deleteReviewLike called");
    try {
      const status = await reviewLikesDao.deleteLike(req.params.id)
      res.send(status);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }

  };
  const deleteReviewLikeByParams = async (req, res) => {
    console.log("deleteReviewLikeByParams called");
    const {username} = req.session.currentUser;
    try {
      const status = await reviewLikesDao.deleteLikeByParams(username,
          req.params.review)
      res.send(status);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  }
  const createReviewLike = async (req, res) => {
    console.log("createReviewLike called");
    const {username} = req.session.currentUser;
    const rl = {username, review: req.params.review};
    try {
      const newLike = await reviewLikesDao.createLike(rl);
      res.json(newLike);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(500);
    }
  };


  app.get("/api/reviewLikes", findAllReviewLikes);//default
  app.get("/api/reviewLikes/byUser", likedReviews);
  app.get("/api/reviewLikes/whoLiked/:review", whoLiked);
  app.get("/api/reviewLikes/numLikedReview/:review", numLikesForReview);
  app.get("/api/reviewLikes/numLikedUsername", numReviewsLikedByUser);
  app.delete("/api/reviewLikes/:id", deleteReviewLike);
  app.delete("/api/reviewLikes/reviewId/:review", deleteReviewLikeByParams);
  app.post("/api/reviewLikes/:review", createReviewLike);
}
export default ReviewLikesController;