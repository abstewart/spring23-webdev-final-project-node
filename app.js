import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";

//controller imports
import HelloController from "./controllers/hello-controller.js";
import UsersController from "./controllers/users/users-controller.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
 || 'mongodb://127.0.0.1:27017/spring23-webdev-final-project';
mongoose.connect(CONNECTION_STRING);
const app = express();

//Put app.use lines here
app.use(cors());
app.use(express.json());

//pass app to different controllers here
HelloController(app);
UsersController(app);

//tell the app to listen on port 4000, or defined port via environment var
app.listen(process.env.PORT || 4000);