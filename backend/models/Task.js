import { priority, status } from "../lib/enum";
import { Schema,model} from "mongoose";

const taskSchema=new Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      dueDate: {
        type: Date,
        required: false,
      },
      priority: {
        type: String,
        enum: Object.values(priority),
      },
      status: {
        type: String,
        enum: Object.values(status),
        default: status.PENDING,
        required: true,
      },
      subtasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
      }],
      assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }

},
{
    timestamps: true
}
)

const Task=model('Task',taskSchema);

export default Task;