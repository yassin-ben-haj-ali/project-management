import { RESSOURCES, ROLES } from '../lib/enum'
import { Schema, model } from 'mongoose'

const roleSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            enum: Object.values(ROLES),
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        ressourcesAndPermissions: {
            type: Map,
            of: new Schema({
                ressources: {
                    type: String,
                    enum: Object.values(RESSOURCES),
                    required: true,
                },
                permissions: {
                    type: Map,
                    of: Boolean,
                    default: {},
                    required: true,
                },
            }),
            default: {},
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Role = model('Role', roleSchema)

export default Role
