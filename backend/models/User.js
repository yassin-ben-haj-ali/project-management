import { Schema, model } from 'mongoose'

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: false,
        },
        lastName: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: true,
        },
        Role: {
            type: Schema.Types.ObjectId,
            ref: 'Role',
        },
    },
    {
        timestamps: true,
    }
)

const User = model('User', userSchema)

export default User
