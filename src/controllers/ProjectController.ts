import type { Request , Response  } from "express"
import Project from "../models/Project"

export class ProjectController { 
    static createProject = async (  req: Request , res: Response ) => {
        const project = new Project( req.body )
        try {
            await project.save()
            res.send('Projecto creado con exito')
        } catch (error) {
            res.send(`🚀 ~ ProjectController ~ createProject= ~ error: ${error}`)
        }
    }

    static getAllProjects = async ( req: Request , res: Response ) => {
        res.send("Todos los proyectos desde aqui")
    }
}