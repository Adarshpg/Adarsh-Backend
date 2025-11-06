import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

// CORS configuration - pass an options object (no assignments)
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true,
    })
)

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

//routes import 
import UserRoutes from "./routes/user.routes.js"
app.use("/api/v1/users",UserRoutes)

export {app}
