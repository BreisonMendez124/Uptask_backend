import mongoose, { Document, Schema } from "mongoose";

export interface Iusers extends Document { 
    email: string,
    password: string,
    name: string,
    confirmed: Boolean
}

const userSchema: Schema = new Schema( { 
    email: { 
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    name: { 
        type: String,
        required: true
    },
    confirmed: { 
        type: Boolean,
        default: false
    }
})

const User = mongoose.model<Iusers>('User' , userSchema );
export default User;