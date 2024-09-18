import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";
import { ITask } from "./Task";

const taskStatus = { 
    PENDING: "pending",
    ON_HOLD: "onHold",
    IN_PROGRESS: "inProgress",
    UNDER_REVIEW: "underReview",
    COMPLETED: "completed"
}

export type TaskStatus = typeof taskStatus[ keyof typeof taskStatus]

export interface IProject extends Document { 
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<ITask & Document>[],
    status: TaskStatus
}

const ProjectSchema: Schema = new Schema( { 
    projectName: { 
        type: String,
        required: true,
        trim: true
    },
    clientName: { 
        type: String,
        required: true,
        trim: true
    },
    description: { 
        type: String,
        required: true,
        trim: true
    },
    tasks: [ {
            type: Types.ObjectId,
            ref: "Task" 
    }],
    status: { 
        type: String,
        enum: Object.values( taskStatus ),
        default: taskStatus.PENDING
    }
} , { timestamps: true } )

const Project = mongoose.model<IProject>('Project' , ProjectSchema );
export default Project;