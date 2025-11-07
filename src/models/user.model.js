import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcrypt"
import JsonWebTokenError from "jsonwebtoken";

const userShema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        avatar: {             //Cloudinary URL
            type: String,
            required: true
        },
        coverImage: {     //Cloudinary URL
            type: String,
            required: true
        },
        password: {
            type: String,
            required: [true, "password is required"]
        },
        refreshToken: {
            type: String
        },
        watchHistory: {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    },
    {
        timestamps: true
    })

userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))
        return next();
    this.password = bcrypt.hash(this.password)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
   return bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
   JsonWebTokenError.sign({
    _id:this._id,
    email:this.email,
    username:this.username
   },
   process.env.ACCESS_TOKEN_SECRET,
   {
    expiresIn:process.env.ACCESS_TOKEN_SECRET_EXPIRES_IN
   }
)
}

userSchema.methods.generateRefreshToken=function(){
    JsonWebTokenError.sign({
    _id:this._id,
   },
   process.env.REFRESH_TOKEN_SECRET,
   {
    expiresIn:process.env.REFRESH_TOKEN_SECRET_EXPIRES_IN
   }
)
}

export const User = mongoose.model("User", userShema)