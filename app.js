import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import session from "express-session";

//controller imports
import HelloController from "./controllers/hello-controller.js";
import UsersController from "./controllers/users/users-controller.js";
import NpsApiController from "./controllers/nps-api/nps-api-controller.js"
import ReviewsController from "./controllers/reviews/reviews-controller.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
 || 'mongodb://127.0.0.1:27017/spring23-webdev-final-project';
mongoose.connect(CONNECTION_STRING);
const app = express();

//Put app.use lines here

//app.use(cors());

//todo fix cors, can have multiple domains

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'https://celebrated-souffle-0b61bd.netlify.app']
}))


app.use(express.json());
//todo fix the secret
let sess = {
  secret: "secret",
  resave: true,
  // cookie: {secure: false },
  saveUninitialized: true,
}
//todo fix this
if (process.env.ENV === 'production') {
  console.log("in production")
  app.set('trust proxy', 1)
  //sess cookie secure stuff
  // sess = {
  //   ...sess,
  //   cookie: {secure: true}
  // }
}

//using this session for now
app.use(session(sess))

//pass app to different controllers here
HelloController(app);
UsersController(app);
NpsApiController(app);
ReviewsController(app);

//tell the app to listen on port 4000, or defined port via environment var
app.listen(process.env.PORT || 4000);