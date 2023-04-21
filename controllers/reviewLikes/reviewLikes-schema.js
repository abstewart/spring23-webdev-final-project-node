import mongoose from "mongoose";

const schema = mongoose.Schema({
  review: {type: mongoose.Schema.Types.ObjectId, ref: 'reviews', required: true},
  username: {type: String, required: true},
  date: {type: Date, default: Date.now}
}, {collection: 'reviewLikes'});

export default schema;