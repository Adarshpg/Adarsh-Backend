import { asyncHandler } from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'backend code successfuly executed',
    })
})

// const Videouser=asynchandler(async(req,res)=>{
//     res.status(201).{
//         message:"the video has uploaded successfully"
//     }
// })

export { registerUser }