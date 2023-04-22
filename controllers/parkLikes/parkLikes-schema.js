import mongoose from "mongoose";

const schema = mongoose.Schema({
  park: {type: String, required: true},
  username: {type: String, required: true},
  date: {type: Date, default: Date.now}
}, {collection: 'parkLikes'});

export default schema;