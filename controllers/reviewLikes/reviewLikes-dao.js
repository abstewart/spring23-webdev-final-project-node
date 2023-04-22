import reviewLikesModel from "./reviewLikes-model.js";

//Read operations
/**
 * Find all likes
 */
export const findAllLikes = async () => {
  const likes = await reviewLikesModel.find();
  return likes;
};
/**
 * Find all the review ids liked by a given user
 * @param username to search by
 */
export const likesByUsername = async (username) => {
  const likes = await reviewLikesModel.find({username}, {review: 1})
  return likes;
};
/**
 * Find all the usernames of the users who liked the given review
 * @param review to search by
 */
export const usersWhoLikedReview = async (review) => {
  const usernames = await reviewLikesModel.find({review}, {username: 1})
  return usernames;
};
/**
 * Find the number of likes for the specified review
 * @param review to count for
 */
export const numLikesByReview = async (review) => {
  const numLikes = await reviewLikesModel.find({review}).countDocuments();
  return numLikes;
};
/**
 * Find the number of reviews liked by a username
 * @param username to count for
 */
export const numLikesByUsername = async (username) => {
  const numLikes = await reviewLikesModel.find({username}).countDocuments();
  return numLikes;
};

//Delete operation
/**
 * Delete the like with the given id
 * @param _id id of like to delete
 */
export const deleteLike = async (_id) => {
  const status = await reviewLikesModel.deleteOne({_id});
  return status;
};

/**
 * Delete the like relationship specified by the username and review
 * @param username
 * @param review
 */
export const deleteLikeByParams = async (username, review) => {
  const status = await reviewLikesModel.deleteOne({username, review});
  return status;
}

//Create operations
/**
 * Create the given like relationship
 * @param like
 */
export const createLike = async (like) => {
  const newLike = await reviewLikesModel.create(like);
  return newLike;
};

//no update operation