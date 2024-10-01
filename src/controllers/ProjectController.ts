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
        try {
            const projects = await Project.find()
            res.json( projects )
        } catch (error) {
            console.log("🚀 ~ ProjectController ~ getAllProjects= ~ error:", error)
        }
    }

    static getProjectById = async( req: Request , res: Response ) => { 
        const { id } = req.params
        try {
            const project = await Project.findById( id ).populate('tasks')
            if( !project ){
                const error = new Error('Proyecto no encontrado')
                return res.status( 404 ).json( { error: error.message } )
            }
            res.json( project )


        } catch (error) {
            console.log("🚀 ~ ProjectController ~ getProjectById=async ~ error:", error)
        }
    }

    static updateProject = async( req: Request , res: Response ) => { 
        const { id } = req.params
        try {
            const project = await Project.findById( id )
            if( !project ){
                const error = new Error('Proyecto no encontrado')
                return res.status( 404 ).json( { error: error.message } )
            }
            project.clientName = req.body.clientName
            project.projectName = req.body.projectName
            project.description = req.body.description
            res.send( 'Proyecto actualizado' )
        } catch (error) {
            console.log("🚀 ~ ProjectController ~ updateProject=async ~ error:", error)
        }
    }

    static deleteProject = async( req: Request , res: Response ) => { 
        const { id } = req.params
        try {
            const project = await Project.findByIdAndDelete( id )
            if( !project ){
                const error = new Error('Proyecto no encontrado')
                return res.status( 404 ).json( { error: error.message } )
            }
            res.send( 'Proyecto eliminado' )
        } catch (error) {
            console.log("🚀 ~ ProjectController ~ staticdeleteProject ~ error:", error)
        }
    }
}