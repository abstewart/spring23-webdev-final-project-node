import mongoose from "mongoose";

const schema = mongoose.Schema({
  review: {type: mongoose.Schema.Types.ObjectId, ref: 'reviews', required: true},
  username: {type: String, required: true}
}, {collection: 'reviewLikes'});

export default schema;