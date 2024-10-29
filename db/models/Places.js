import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
  name: { type: String },
  description: { type: String },
  location: { type: String },
  image: { type: String },
  mapURL: { type: String },
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
