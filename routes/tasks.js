const express = require('express')
const router = express.Router()
const {
       getTasks,
       createTask,
       deleteTask,
       updateTask 
    } = require('../controllers/tasksController')

router.get('/',getTasks)
router.post('/',createTask)
// router.route('/').get(getTasks).post(createTask)

router.put('/:id',updateTask)
router.delete('/:id',deleteTask)
// router.route('/:id').put(updateTask).delete(deleteTask)

module.exports = router