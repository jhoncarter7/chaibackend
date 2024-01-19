import dotenv from "dotenv";
import mongodbConnection from "./db/index.js";
import { app } from "./app.js";


dotenv.config({
    path: "./.env"
})

mongodbConnection().then(() =>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`server is running on ${process.env.PORT}`)
    })
}
   
).catch((err)=>{
    console.log('mongodb connection failed !!', err)
})