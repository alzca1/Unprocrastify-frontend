import axios from 'axios'


class TaskService {
    constructor() {
        this.taskToDo = axios.create({
            baseURL: 'http://localhost:4000/task'
        });
    }

    createNewTask(newTask){
        return this.taskToDo.post(`/tasks/new`, newTask)
        .then(data => data)
    }

    getAllTasks() {
        return this.taskToDo.get('/tasks')
        .then(response => response)
    };

    getOneTask(id) {
        return this.taskToDo.get(`/tasks/${id}`, id)
        .then (response => response)
    }

    updateOneTask(updatedTask){
        
        return this.taskToDo.put(`/tasks/${updatedTask.id}/edit `, updatedTask)
        .then (response => response)
    }

    deleteOneTask(id){
        return this.taskToDo.delete(`/tasks/${id}/delete`)
        .then(data => data)
    }
}

const taskService = new TaskService();
export default taskService; 


