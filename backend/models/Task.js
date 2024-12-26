import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
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
        enum: ['Low', 'Medium', 'High'],
      },
      status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
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

})

const Task=mongoose.model('Task',taskSchema);

export default Task;