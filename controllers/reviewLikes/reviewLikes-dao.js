import reviewLikesModel from "./reviewLikes-model.js";
import usersModel from "../users/users-model.js";

//Read operations
/**
 * Find all likes
 */
export const findAllLikes = async () => {
  const likes = await reviewLikesModel.find();
  return likes;
};
/**
 * Find all the reviews liked by a given user
 * @param username
 */
export const likesByUsername = async (username) => {
  const likes = await reviewLikesModel.find({username})
  return likes;
};
/**
 * Find all the usernames of the users who liked the given review
 * @param review
 */
export const usersWhoLikedReview = async (review) => {
  const usernames = await reviewLikesModel.find({review}, {username: 1})
  return usernames;
};
/**
 * Find the number of likes for the specified review
 * @param review
 */
export const numLikesByReview = async (review) => {
  const numLikes = await reviewLikesModel.find({review}).countDocuments();
  return numLikes;
};
/**
 * Find the number of reviews liked by a username
 * @param username
 */
export const numLikesByUsername = async (username) => {
  const numLikes = await reviewLikesModel.find({username}).countDocuments();
  return numLikes;
};

//Delete operation
export const deleteLike = async (_id) => {
  const status = await reviewLikesModel.deleteOne(_id);
  return status;
};

//Create operation
export const createLike = async (like) => {
  const newLike = await usersModel.create(like);
  return newLike;
};

//no update operation