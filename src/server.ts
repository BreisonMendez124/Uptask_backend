import  express from "express";
import dotenv from 'dotenv'
import { connectDB } from "./config/db";
import ProjectRoutes from './routes/ProjectRoutes'


dotenv.config()
connectDB();

const app = express()
app.use( express.json() )

//Routes
app.use('/api/projects' , ProjectRoutes )
export default app