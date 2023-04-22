import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import session from "express-session";

//controller imports
import HelloController from "./controllers/hello-controller.js";
import UsersController from "./controllers/users/users-controller.js";
import NpsApiController from "./controllers/nps-api/nps-api-controller.js"
import ReviewsController from "./controllers/reviews/reviews-controller.js";
import ReviewLikesController
  from "./controllers/reviewLikes/reviewLikes-controller.js";
import ParkLikesController
  from "./controllers/parkLikes/parkLikes-controller.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
 || 'mongodb://127.0.0.1:27017/spring23-webdev-final-project';
mongoose.connect(CONNECTION_STRING);
const app = express();

let sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  cookie: {secure: false },
  saveUninitialized: true,
}
if (process.env.ENV === 'production') {
  console.log("in production")
  app.set('trust proxy', 1)
  sess.cookie.secure = true;
  sess.cookie.sameSite = 'none';
}

app.use(session(sess));
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'https://celebrated-souffle-0b61bd.netlify.app']
}));
app.use(express.json());

//pass app to different controllers here
HelloController(app);
UsersController(app);
NpsApiController(app);
ReviewsController(app);
ReviewLikesController(app);
ParkLikesController(app);

//tell the app to listen on port 4000, or defined port via environment var
app.listen(process.env.PORT || 4000);