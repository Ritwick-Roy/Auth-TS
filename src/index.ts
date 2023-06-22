import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({path:__dirname+'/../.env'});

import router from './router';

const SERVER_PORT = process.env.SERVER_PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors({
  credentials:true,
}))
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(SERVER_PORT,()=>(
  console.log( `Server running on http://localhost:${SERVER_PORT}/`)
))

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
mongoose.connection.on('error',(error:Error) => console.log(error));
app.use('/',router());