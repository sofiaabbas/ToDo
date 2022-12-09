const express = require("express")
const router = express.Router();
const fs = require('fs');
const taskRoutes = require('./task.js') //import task route

router.use(taskRoutes) //use task route

module.exports = router;

//path to our JSON file
const dataPath = './details/task.json'

//util functions
const saveTaskData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getTaskData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)
}

/* saveTaskData({
    todos: [
      { task: 'Eat', id: '4S7L1', description: 'consume tacos' },
      { task: 'Code', id: 'C29A0', description: 'do code' },
      { task: 'Sleep', id: '3Y64Z', description: 'snore' },
      { task: 'Code', id: 'C29A0' }
    ]
}); */

//Create
taskRoutes.post('/task/addtask', (req, res) => {

    console.log("Adding task...", req.body);
    let existTask = getTaskData()
    const newTaskId = Math.floor(100000 + Math.random() * 900000)
    console.log(existTask);
    if (req.body.id) {
        existTask.todos.push(req.body)
    } else {
        existTask.todos.push({
            ...req.body,
            id: newTaskId
        })
    }

    saveTaskData(existTask);
    console.log("All tasks:", getTaskData());
    res.send({success: true, msg: 'task added successfully'})
})

//Read - get all tasks from the json file
taskRoutes.get('/task/list', (req, res) => {
    const task = getTaskData()
    console.log("Sending all Tasks");
    res.send(task)
})

//Update - using Put method
taskRoutes.put('/task/:id', (req, res) => {
    let existTask = getTaskData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
        let todosId = req.params['id'];
        existTask[todosId] = req.body;
        saveTaskData(existTask);
        res.send(`todos with id ${todosId} has been updated`)
    }, true);
});

//Delete - using delete method
taskRoutes.delete('/task/delete/:id', (req, res) => {
    let existTask = getTaskData()
    let taskId = req.params['id'];
    const newTodos = existTask.todos.filter((item, index, array) => {
        if (item.id == taskId) {
        return false;
        } else {
        return true;
        }
    })
    saveTaskData({todos: newTodos});
    console.log("Data removed.");
    console.log(existTask);
    res.send(`tasks with id ${taskId} has been deleted`)
})

