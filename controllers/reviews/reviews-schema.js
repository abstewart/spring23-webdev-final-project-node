import mongoose from "mongoose";

const schema = mongoose.Schema({
  parkId: {type: String, required: true},
  author: {type: String, required: true},
  rating: {type: Number, required: true, enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]},
  summary: {type: String, required: true},
  message: {type: String, required: true},
  creation_date: {type: Date, default: Date.now},
  hidden: {type: Boolean, default: false}
}, {collection: 'reviews'});

export default schema;