import reviewsModel from "./reviews-model.js";
import reviewsSchema from "./reviews-schema.js";

//Find all reviews created
export  const findAllReviews = async () => {
  const reviews = reviewsModel.find();
  return reviews;
};

//find all the reviews for a specific park and sort by likes
export const findReviewsByPark = async (parkId) => {
  const reviews = reviewsModel.find({parkId}).sort({likes : -1});
  return reviews;
};

//Find all the reviews by a specific user and sort by date created
export const findReviewsByUser = async (username) => {
  const reviews = reviewsModel.find({author: username}).sort({creation_date: -1});
  return reviews;
};

//Create review in database.
//Returns the created review with id.
export const createReview = async (review) => {
  const newReview = reviewsModel.create(review)
  return newReview;
};

//Update given review in the database.
//Returns a status.
export const updateReview = async (reviewId) => {
  const status = reviewsModel.updateOne({_id: reviewId});
  return status;
};

//Delete specified review in the database.
//Returns a status.
export const deleteReview = async (reviewId) => {
  const status = reviewsModel.deleteOne({_id: reviewId});
  return status;
};

//Increment the likes field of a specified review by 1.
//Returns the entire review affected.
export const incLikes = async (reviewId) => {
  const review = await reviewsModel.findOneAndUpdate({_id: reviewId}, {$inc: {'likes': 1}});
  return review;
};

//Decrement the likes field of a specified review by 1.
//Returns the entire review affected.
export const decLikes = async (reviewId) => {
  const review = await reviewsModel.findOneAndUpdate({_id: reviewId}, {$inc: {'likes': -1}});
  return review;
};


