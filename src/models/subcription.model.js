import mongoose, {Schema} from "mongoose";

const subscriberSchema = new Schema({
    Subscriber:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    Channel:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

export const Subscriber = mongoose.model("Subscriber", subscriberSchema)