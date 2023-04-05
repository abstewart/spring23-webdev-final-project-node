import usersModel from "./users-model.js";

export const findAllUsers = async () => {
  const users = await usersModel.find();
  return users;
}

export const findAllRegularUsers = async () => {
  const users = await usersModel.find({role: "USER"});
  return users;
}

export const findAllAdminUsers = async () => {
  const users = await usersModel.find({role: "ADMIN"});
  return users;
}

export const findUserById = async (id) => {
  const user = await usersModel.findById(id);
  return user;
}

export const findUserByUsername = async (username) => {
  const user = await usersModel.findOne({username});
  return user;
}

export const findUserByCredentials = async ({username, password}) => {
  const user = await usersModel.findOne({username, password});
  return user;
}

export const deleteUser = async (id) => {
  const status = await usersModel.deleteOne({_id: id});
  return status;
}

export const createUser = async (user) => {
  const newUser = await usersModel.create(user);
  return newUser;
}

export const updateUser = async (id, user) => {
  const status = await usersModel.updateOne({_id: id}, user);
  return status;
}

/**Add or remove a review id from a users list of liked reviews
 * client should also call the incReview/decReview function on the
 * specific review to modifiy the likes # as well
 *
 * @param username Username of the logged in user
 * @param reviewId ReviewId of the specific review
 * @returns {Promise<Query<UpdateResult, any, unknown, any>>}
 */
export const changeLikedReview = async (username, reviewId) => {
  //get the user
  const user = await usersModel.findOne({username});
  //get their liked reviews
  var likedReviews = { 'liked_reviews' : user};
  //get the potential index of liked review id
  const idx = likedReviews.indexOf(reviewId);
  //remove or add the id to the list
  if(idx !== -1) {
    likedReviews.splice(idx, 1);
  } else {
    likedReviews.push(reviewId);
  }
  //update the user in the database, and send the updated user
  const res = await usersModel.updateOne({username},
      {liked_reviews: likedReviews});
  return res;
}