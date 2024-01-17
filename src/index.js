import dotenv from "dotenv";
import mongodbConnection from "./db/index.js";


dotenv.config({
    path: "./.env"
})

mongodbConnection()