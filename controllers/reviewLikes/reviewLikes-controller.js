import * as reviewLikesDao from './reviewLikes-dao.js'

const ReviewLikesController = (app) => {

  const findAllReviewLikes = async (req, res) => {
    console.log("findAllReviewLikes called");
    const reviewLikes = await reviewLikesDao.findAllLikes();
    res.json(reviewLikes);
  };
  const likedReviews = async (req, res) => {
    console.log("likedReviewsByUsername called")
    const reviewLikes = await reviewLikesDao.likesByUsername(req.params.username);
    res.json(reviewLikes);
  };
  const whoLiked = async (req, res) => {
    console.log("whoLiked called")
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
    const numLikes = await reviewLikesDao.numLikesByUsername(req.params.username);
    res.json({numLikes});
  };
  const deleteReviewLike = async (req, res) => {
    console.log("deleting review");
    const status = await reviewLikesDao.deleteLike(req.params.id)
    res.send(status);
  };
  const createReviewLike = async (req, res) => {
    console.log("createReviewLike called");
    const like = req.body;
    const newLike = await reviewLikesDao.createLike(like);
    res.json(newLike);
  };


  app.get("/api/reviewLikes", findAllReviewLikes);//default
  app.get("/api/reviewLikes/byUser/:username", likedReviews);
  app.get("/api/reviewLikes/whoLiked/:review", whoLiked);
  app.get("/api/reviewLikes/numLikedReview/:review", numLikesForReview);
  app.get("/api/reviewLikes/numLikedUsername/:username", numReviewsLikedByUser);
  app.delete("/api/reviewLikes/:id", deleteReviewLike);
  app.post("/api/reviewLikes", createReviewLike);
}
export default ReviewLikesController;