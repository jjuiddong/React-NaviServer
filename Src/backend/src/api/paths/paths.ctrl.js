import Path from "../../models/path";
//import mongoose from "mongoose";

//const {ObjectId} = mongoose.Types;

// GET /api/paths?timeid=
export const read = async (ctx) => {
  const query = {
    ...{ journey_time_id: ctx.query.timeid },
  };

  try {
    const paths = await Path.find(query)
      //.sort({ _id: -1 })
      .exec();
    ctx.body = paths;
  } catch (e) {
    ctx.throw(500, e);
  }
};
