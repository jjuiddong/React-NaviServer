import Landmark from "../../models/landmark";

//const {ObjectId} = mongoose.Types;

// GET /api/landmarks?page=
export const list = async (ctx) => {
  const page = parseInt(ctx.query.page || "1", 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const landmarks = await Landmark.find()
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const landmarkCount = await Landmark.countDocuments().exec();
    ctx.set("Cur-Page", page);
    ctx.set("Last-Page", Math.ceil(landmarkCount / 10));
    ctx.body = landmarks;
  } catch (e) {
    ctx.throw(500, e);
  }
};
