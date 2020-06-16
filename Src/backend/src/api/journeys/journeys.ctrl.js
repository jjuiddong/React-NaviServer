//import mongoose from "mongoose";
import Journey from "../../models/Journey";

//const {ObjectId} = mongoose.Types;

// GET /api/journeys?page=
export const list = async (ctx) => {
  const page = parseInt(ctx.query.page || "1", 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const journeys = await Journey.find()
      .sort({ date: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const journeyCount = await Journey.countDocuments().exec();
    ctx.set("Cur-Page", page);
    ctx.set("Last-Page", Math.ceil(journeyCount / 10));
    ctx.body = journeys;
  } catch (e) {
    ctx.throw(500, e);
  }
};
