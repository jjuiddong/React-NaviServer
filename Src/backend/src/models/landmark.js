import mongoose, { Schema } from "mongoose";

const LandmarkSchema = new Schema({
  date_time: Date,
  user_id: Number,
  lon: Number,
  lat: Number,
  address: String,
  comment: String,
});

const Landmark = mongoose.model("Landmark", LandmarkSchema);
export default Landmark;
