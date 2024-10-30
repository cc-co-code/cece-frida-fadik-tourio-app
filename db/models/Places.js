import mongoose from "mongoose";
import Comment from "./Comment";
const { Schema } = mongoose;

const placeSchema = new Schema({
  name: { type: String },
  description: { type: String },
  location: { type: String },
  image: { type: String },
  mapURL: { type: String },
  comments: { type: [Schema.Types.ObjectId], ref: "Comment" },
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
