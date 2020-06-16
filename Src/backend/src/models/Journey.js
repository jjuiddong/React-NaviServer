import mongoose, { Schema } from "mongoose";

const JourneySchema = new Schema({
  date: String,
  user_id: Number,
  time_id: String,
  distance: Number,
  journey_time: Number,
  checked: Boolean,
});

const Journey = mongoose.model("Journey", JourneySchema);
export default Journey;
