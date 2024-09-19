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
            
        }
    }
}