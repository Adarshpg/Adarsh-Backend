// try catch async handler

// const asyncHandler = (fn) =>async(req,res,next)=>{
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code||500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }



//Promise async handler
const asynchandler = (requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((error)=>next(error))
    } 
}