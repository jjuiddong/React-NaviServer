require("dotenv").config();
import Koa from "koa";
import Router from "koa-router";
//import bodyParser from 'koa-bodyparser';
import mongoose from "mongoose";
//import Journey from "./models/Journey";
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

import api from "./api";

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // const journeys = [...Array(2).keys()].map((i) => ({
    //   date: Date.now(),
    //   user_id: 1,
    //   time_id: "20190630144723301",
    //   distance: 100,
    //   journey_time: 123,
    //   checked: false,
    // }));
    // Journey.insertMany(journeys, (err, docs) => {
    //   console.log(docs);
    // });
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

router.use("/api", api.routes());
//app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../../frontend/build');
app.use(serve(buildDirectory));
app.use(async (ctx) => {
  if (ctx.status === 404 && ctx.path.indexOf('./api') !== 0) {
    await send(ctx, 'index.html', { root: buildDirectory });
  }
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
