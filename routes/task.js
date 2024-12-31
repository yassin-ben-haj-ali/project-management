import express from 'express'
import taskControllers from '../controllers/task.js'
import catchMiddleware from '../middlewares/api.js'

const taskRouter = express.Router()

taskRouter.post('/', catchMiddleware(taskControllers.createTask))
taskRouter.get('/:id', catchMiddleware(taskControllers.getTaskById))

export default taskRouter
