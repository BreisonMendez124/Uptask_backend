import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { validateProjectExist } from "../middleware/project";
import { TaskController } from "../controllers/TaskController";

const router = Router()
router.post('/', 
    body('projectName')
        .notEmpty()
        .withMessage('El nombre del proyecto no puede estar vacio.'),
    body('clientName')
        .notEmpty()
        .withMessage('El nombre del cliente no puede estar vacio.'),
    body('description')
        .notEmpty()
        .withMessage('La descripcion del proyecto no puede estar vacia.'),
    handleInputErrors,
    ProjectController.createProject )

router.get('/' , ProjectController.getAllProjects )

router.get('/:id', 
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.getProjectById )


router.put('/:id', 
    param('id')
        .isMongoId()
        .withMessage('ID no valido'),
    body('projectName')
        .notEmpty()
        .withMessage('El nombre del proyecto no puede estar vacio.'),
    body('clientName')
        .notEmpty()
        .withMessage('El nombre del cliente no puede estar vacio.'),
    body('description')
        .notEmpty()
        .withMessage('La descripcion del proyecto no puede estar vacia.'),
    handleInputErrors,
    ProjectController.updateProject )

router.delete('/:id', 
        param('id').isMongoId().withMessage('ID no valido'),
        handleInputErrors,
        ProjectController.deleteProject )
        

/**  ============== Routes for task ================== */

router.param('projectId' , validateProjectExist )
router.post('/:projectId/tasks' , 
    body('name')
        .notEmpty()
        .withMessage('El nombre de la tarea no puede estar vacio.'),
    body('description')
        .notEmpty()
        .withMessage('La descripcion de la tarea no puede estar vacia.'),
   handleInputErrors,
   TaskController.createTask )

router.get('/:projectId/tasks' , 
    TaskController.getProjectTasks
)

router.get('/:projectId/tasks/:taskId' , 
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TaskController.getTaskById
)


export default router