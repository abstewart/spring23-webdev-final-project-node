import mongoose from "mongoose";
import reviewLikesSchema from "./reviewLikes-schema.js";
const reviewLikesModel = mongoose
.model('ReviewLikesModel', reviewLikesSchema);
export default reviewLikesModel;