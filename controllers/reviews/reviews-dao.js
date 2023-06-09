import reviewsModel from "./reviews-model.js";
import reviewsSchema from "./reviews-schema.js";

//Find all reviews created
export  const findAllReviews = async () => {
  const reviews = await reviewsModel.find();
  return reviews;
};

//find all the reviews for a specific park and sort by likes
export const findReviewsByPark = async (parkId) => {
  const reviews = await reviewsModel.find({parkId, hidden: {$ne: true}}).sort({creation_date : -1});
  //const reviews = await reviewsModel.find({parkId});
  return reviews;
};

//Find all the reviews by a specific user and sort by date created
export const findReviewsByUser = async (username) => {
  const reviews = await reviewsModel.find({author: username}).sort({creation_date: -1});
  return reviews;
};

//Create review in database.
//Returns the created review with id.
export const createReview = async (review) => {
  const newReview = await reviewsModel.create(review)
  return newReview;
};

//Update given review in the database.
//Returns a status.
export const updateReview = async (reviewId, review) => {
  const status = await reviewsModel.updateOne({_id: reviewId}, review);
  return status;
};

//Delete specified review in the database.
//Returns a status.
export const deleteReview = async (reviewId) => {
  const status = await reviewsModel.deleteOne({_id: reviewId});
  return status;
};

export const findMostRecentReview = async () => {
  const review = await reviewsModel.findOne({hidden: {$ne: true}}, {}, { sort: { 'creation_date' : -1 } })
  return review;

}

