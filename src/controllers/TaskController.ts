import { Request , Response , NextFunction } from 'express'
import Task from '../models/Task'


export class TaskController { 
    static createTask = async( req: Request , res: Response , next: NextFunction ) => { 

        try {
            const task = new Task( req.body );
            task.project = req.project.id;
            req.project.tasks.push( task );
            await  Promise.allSettled( [ task.save(), req.project.save() ]);
            res.send('Tarea creada correctamente')
        } catch (error) {
            res.status( 500 ).json({ error: 'Hubo un error' } )
        }
    }

    static getProjectTasks = async( req: Request , res: Response , next: NextFunction ) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project')
            res.json( tasks )
        } catch (error) {
            res.status( 500 ).json({ error: 'Hubo un error' } )
        }
     }

     static getTaskById = async( req: Request , res: Response , next: NextFunction ) => {
        try {
          
            if( req.task.project.toString() !== req.project.id ){
                const error = new Error('Accion no valida')
                return res.status( 400 ).json({ error: error.message })
            }
            res.json( req.task )
        } catch (error) {
            res.status( 500 ).json({ error: 'Hubo un error' } )
        }
     }

     static updateTask = async( req: Request , res: Response , next: NextFunction ) => {
        try {
            if( req.task.project.toString() !== req.project.id ){
                const error = new Error('Accion no valida')
                return res.status( 400 ).json({ error: error.message })
            }
            req.task.name = req.body.name;
            req.task.description = req.body.description;
            await req.task.save()
            res.json( req.task )
        } catch (error) {
            res.status( 500 ).json({ error: 'Hubo un error' } )
        }
     }

     static deleteTask = async( req: Request , res: Response , next: NextFunction ) => {
        try {
            //Actualizar proyectos
            const projectsUpdated = req.project.tasks.filter( task  => req.task.id.toString() !== task.toString());
            req.project.tasks = projectsUpdated;
            await Promise.allSettled( [ req.task.deleteOne() , req.project.save() ])
            res.send('Tarea eliminada correctamente')
        } catch (error) {
            res.status( 500 ).json({ error: 'Hubo un error' } )
        }
     }

     static updateStatus = async( req: Request , res: Response , next: NextFunction ) => {
        try {
            
            const { status } = req.body;
            req.task.status = status;
            await req.task.save();
            res.json('Estado actualizado');
        } catch (error) {
            res.status( 500 ).json({ error: 'Hubo un error' } )
        }
     }
}