import * as reviewLikesDao from './reviewLikes-dao.js';

const ReviewLikesController = (app) => {

  const findAllReviewLikes = async (req, res) => {
    console.log("findAllReviewLikes called");
    const reviewLikes = await reviewLikesDao.findAllLikes();
    res.json(reviewLikes);
  };
  const likedReviews = async (req, res) => {
    console.log("likedReviewsByUsername called");
    const {username} = req.session.currentUser;
    const reviews = await reviewLikesDao.likesByUsername(req.params.username);
    res.json(reviews);
  };
  const whoLiked = async (req, res) => {
    console.log("whoLiked called");
    const usernames = await reviewLikesDao.usersWhoLikedReview(req.params.review);
    res.json(usernames);
  };
  const numLikesForReview = async (req, res) => {
    console.log("numLikesForReview called");
    const numLikes = await reviewLikesDao.numLikesByReview(req.params.review);
    res.json({numLikes});
  };
  const numReviewsLikedByUser = async (req, res) => {
    console.log("numReviewsLikedbyUser called");
    const {username} = req.session.currentUser;
    const numLikes = await reviewLikesDao.numLikesByUsername(req.params.username);
    res.json({numLikes});
  };
  const deleteReviewLike = async (req, res) => {
    console.log("deleteReviewLike called");
    const status = await reviewLikesDao.deleteLike(req.params.id)
    res.send(status);
  };
  const deleteReviewLikeByParams = async (req, res) => {
    console.log("deleteReviewLikeByParams called");
    const {username} = req.session.currentUser;
    const status = await reviewLikesDao.deleteLikeByParams(username, req.params.review)
    res.send(status);
  }
  const createReviewLike = async (req, res) => {
    console.log("createReviewLike called");
    const {username} = req.session.currentUser;
    const rl = {username, review: req.params.review};
    const newLike = await reviewLikesDao.createLike(rl);
    res.json(newLike);
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