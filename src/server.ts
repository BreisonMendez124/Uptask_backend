import  express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import AuthRoutes from './routes/AuthRoutes'
import ProjectRoutes from './routes/ProjectRoutes'


dotenv.config()
connectDB();

const app = express()
app.use( cors( corsConfig ))
app.use( express.json() )

//Routes
app.use('/api/auth' , AuthRoutes )
app.use('/api/projects' , ProjectRoutes )
export default app