import taskServices from '../services/task.js'

const taskControllers = {
    createTask: async (req, res) => {
        const task = await taskServices.createTask(req.body)
        res.json(task)
    },
    getTaskById: async (req, res) => {
        const { id } = req.params
        const task = await taskServices.getTaskById(id)
        res.json(task)
    },
}
export default taskControllers
