import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

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
export default router