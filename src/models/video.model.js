import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
    {
        videofile:{        // Cloudinary URL
            type:String,
            required:true
        },
        thumbnail:{        //Cloudinary URL
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        descritption:{
            type:String,
            required:true
        },
        duration:{
            type:Number,
            required:true
        },
        views:{
            type:Number,
            deafult:0
        },
        isPublished:{
            type:Boolean,
            required:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    })

export const video = mongoose.model("Video",videoSchema)