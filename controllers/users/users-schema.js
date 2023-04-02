import mongoose from "mongoose";

const schema = mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  first_name: String,
  last_name: String,
  email: {type: String, unique: true},
  role: {type: String, default: "USER", enum: ["USER", "ADMIN"]},
  creation_date: {type: Date, default: Date.now}
}, {collection: 'users'});

export default schema;