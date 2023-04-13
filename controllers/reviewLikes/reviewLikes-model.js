import mongoose from "mongoose";
import reviewLikesSchema from "./reviewLikes-schema.js";
const reviewLikesModel = mongoose
.model('LikesModel', reviewLikesSchema);
export default reviewLikesModel;