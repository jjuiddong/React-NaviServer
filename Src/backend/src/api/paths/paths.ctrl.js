import Path from "../../models/path";
import Journey from "../../models/Journey";
import moment from "moment";
//import mongoose from "mongoose";

//const {ObjectId} = mongoose.Types;

// GET /api/paths?timeid=&date=
// date: yyyy-mm-ddThh:mm::ss (ex 2020-06-16T19:18:52)
export const read = async (ctx) => {
  // find timeid journey path
  // if exist date query, find next time journey path
  // if not exist date query, find all journey path
  var query = {};
  if (ctx.query.date) {
    query = {
      journey_time_id: ctx.query.timeid,
      // replace 2020-06-16T19:18:52 -> 2020-06-16 19:18:52
      date_time: { $gte: ctx.query.date.replace("T", " ") },
    };
  } else {
    // no date query
    query = { journey_time_id: ctx.query.timeid };
  }

  try {
    const paths = await Path.find(query).exec();
    ctx.body = paths;
    ctx.set("timeid", ctx.query.timeid);
  } catch (e) {
    ctx.throw(500, e);
  }
};

// GET /api/paths/today?&time=
// time: hh:mm::ss
export const todayRead = async (ctx) => {
  try {
    // find today journey
    const today = moment().format("YYYY-MM-DD");
    //const today = "2020-06-09";
    // var time = moment()
    //   .subtract(10, "h")
    //   .format("HH:mm:ss");
    // time = "2020-06-09 " + time;
    // console.log(ctx.query.time);
    // console.log(time);

    const query1 = { date: today };
    const journey = await Journey.findOne(query1).exec();
    if (!journey) {
      // not found today journey, finish
      ctx.body = [];
      return;
    }

    // find today journey path
    // if exist time query, find next time journey path
    // if not exist time query, find all journey path
    const timeid = journey.time_id;
    var query2 = {};
    if (ctx.query.time) {
      // make date string with moment, time query
      var date = today + " " + ctx.query.time;
      query2 = {
        journey_time_id: timeid,
        date_time: { $gte: date },
      };
    } else {
      query2 = {
        journey_time_id: timeid,
        //date_time: { $gte: time },
      };
    }

    try {
      const paths = await Path.find(query2).exec();
      ctx.body = paths;
      ctx.set("timeid", ctx.query.timeid);
    } catch (e) {
      ctx.throw(500, e);
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};
