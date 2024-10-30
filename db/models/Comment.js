import mongoose from "mongoose";
import Place from "./Places";
const { Schema } = mongoose;

const commentSchema = new Schema({
  name: { type: String },
  comment: { type: String },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
