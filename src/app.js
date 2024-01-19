import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

// it will allow with frontend domain to have access the backend
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
// it will accept json data with size upto 16kb
 app.use(express.json({limit: '16kb'}))
// it is used to parse the incoming request with url-encoded payloade.
// extended option allow rich object and arrays to be encoded into  url-encoded formate
 app.use(express.urlencoded({extended: true, limit: "16kb"}))
 //it will help to serve the static file of public where we want ex- public/imsage/logo.png
 app.use(express.static("public"))
 //with this we can decode or set the cookie of user 
 app.use(cookieParser())

export { app };
