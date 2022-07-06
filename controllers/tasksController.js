const asyncHnadler = require('express-async-handler');
const taskModel = require('../models/task')
const userModel = require('../models/user') 

const getTasks = asyncHnadler(async (req, res) => {
    const tasks = await taskModel.find()
    res.status(200).json(tasks);
})

const createTask =  asyncHnadler(async (req, res) => {
    // handle exception in case body is empty
    if (!req.body.text) {
        res.status(400)
        throw new Error('text is empty')
    }
    const task = await taskModel.create({
        text : req.body.text
    })
    res.status(200).json(task);
})

const updateTask =  asyncHnadler(async (req, res) => {
    const task = await taskModel.findById(req.params.id)
    if (!task) {
        res.status(400)
        throw new Error('ttask not exist')
    }
    // check for user 
    const user = await userModel.findById(req.user.id)
    if (!user) {
        res.status(400)
        throw new Error('user not exist')
    }

    // check if the task owner who want to update

    if (user.id !== task.user.toString()) {
        res.status(401)
        throw new Error('user not authorized')   
    }
    const updatedTask = await taskModel.findByIdAndUpdate(req.params.id, updateTask,{new : true})
    res.status(200).json(updatedTask);
   
})

const deleteTask =  asyncHnadler(async (req, res) => {
    const task = await taskModel.findById(req.params.id)

    if (!task) {
        res.status(400)
        throw new Error('task not exist')
    }
    // check for user 
    const user = await userModel.findById(req.user.id)
    if (!user) {
        res.status(400)
        throw new Error('user not exist')
    }

    // check if the task owner who want to update

    if (user.id !== task.user.toString()) {
        res.status(401)
        throw new Error('user not authorized')   
    }
    const deletedTask = await taskModel.findByIdAndDelete(req.params.id)
    res.status(200).json(deleteTask)
})

module.exports = {
    getTasks,
    createTask,
    deleteTask,
    updateTask
}