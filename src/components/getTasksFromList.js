import React, { Component } from 'react'
import taskService from '../services/task-service'

 class getTasksFromList extends Component {
    state = {
        tasks: [],
    }

    componentDidMount(){
        taskService.getOneTask()
        console.log()
        .then(response => {
            console.log(response)
        })
    }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default getTasksFromList
