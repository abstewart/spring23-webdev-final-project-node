import parkLikesModel from "./parkLikes-model.js";

//Read operations
/**
 * Find all park like objects
 */
export const findAllLikes = async() => {
  const likes = await parkLikesModel.find();
  return likes;
};
/**
 * Return all the park ids liked by the given username
 * @param username to get parks liked by
 */
export const parksLikedByUsername = async(username) => {
  const parks = await parkLikesModel.find({username}, {park: 1});
  return parks;
};
/**
 * Return all the usernames of users who liked the given park
 * @param park to get usernames who liked
 */
export const usersWhoLikedPark = async(park) => {
  const usernames = await parkLikesModel.find({park}, {username: 1});
  return usernames;
};
/**
 * Find the number of likes for the given park.
 * @param park to search on
 */
export const numLikesByPark = async(park) => {
  const numLikes = await parkLikesModel.find({park}).countDocuments();
  return numLikes;
};
/**
 * Find the number of likes the given username has
 * @param username to search on
 */
export const numLikesByUsername = async(username) => {
  const numLikes = await parkLikesModel.find({username}).countDocuments();
  return numLikes;
};

//Delete operations
/**
 * Delete the like from the given id
 * @param _id of the like to delete
 */
export const deleteLike = async(_id) => {
  const status = await parkLikesModel.deleteOne({_id});
  return status;
};
/**
 * Delete the like relationship specified by the username and park
 * @param username
 * @param park
 */
export const deleteLikeByParams = async (username, park) => {
  const status = await parkLikesModel.deleteOne({username, park});
  return status;
}

//Create operation
/**
 * Create the given like.
 * @param like to create
 */
export const createLike = async(like) => {
  const newLike = await parkLikesModel.create(like);
  return newLike;
};
//no update operation