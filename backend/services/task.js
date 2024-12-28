import Task from "../models/Task.js";
import { NotFoundError } from "../utils/appErrors.js";
const taskServices = {
    createTask: async (taskData, userId) => {
        const newTask = new Task({
            ...taskData,
            createdBy: userId
        });
        await newTask.save();
        return newTask;
    },
    getTaskById: async (taskId) => {
        const task = await Task.findById(taskId);
        if (!task) throw new NotFoundError('Task not found')
    },
}
export default taskServices;