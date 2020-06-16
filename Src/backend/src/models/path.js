import mongoose, { Schema } from "mongoose";

const PathSchema = new Schema({
  date_time: String,
  user_id: String,
  journey_time_id: String,
  lon: Number,
  lat: Number,
  speed: Number,
  altitude: Number,
});

const Path = mongoose.model("Path", PathSchema);
export default Path;
