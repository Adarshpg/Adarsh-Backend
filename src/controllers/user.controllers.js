import { asyncHandler } from '../utils/asyncHandler.js'
import { User} from "../models/user.model.js"

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    const { fullName, email, username, password } = req.body || {}
    console.log('email', email)

    //validation - not empty 
    if ([fullName,email,username,password].some((field) => 
        field?.trim()==="")
    ) {
        throw new ApiError(400,"All fields are required")
    }

    //check whether the user already exists
    const existedUser = username.findOne({
        $or:[{username},{email}]
    })
    if (existedUser) {
        throw new ApiError(409,"User with this userame and email is already registed")
    }


})

export { registerUser }