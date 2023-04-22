import mongoose from "mongoose";
import parkLikesSchema from "./parkLikes-schema.js";
const parkLikesModel = mongoose
.model('ParkLikesModel', parkLikesSchema);
export default parkLikesModel;