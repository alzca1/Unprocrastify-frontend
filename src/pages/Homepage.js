import React, {Component} from 'react'
import listService from '../services/list-service'
import taskService from '../services/task-service'
import { Link } from 'react-router-dom';

class Homepage extends Component{

    state = {
        lists: [],
        isLoading: true, 
    }

    componentDidMount(){
        setTimeout(() => {

        listService.getAllLists()
        .then ((response) => {
            const listsData = response.data
            console.log("aqui",response.data)
            this.setState({
                lists: listsData.listOfLists,
                isLoading: false,
            })
        })
        .catch((error) => {
            console.log(error)
        })
        }, 1000)
    }

    handleDelete = (id) => {
        taskService.deleteOneTask(id)
        .then(() => {
            const newLists = [...this.state.lists]
            newLists.forEach((list) => {
                const newTaskArray = list.tasks.filter(task => {
                    return task._id !== id
                });
                list.tasks = newTaskArray
            })
            this.setState({
                lists: newLists,
            })
        }).catch((error) => {
            console.log(error);
        })
    }
    
    

   render() {
       console.log(this.state)
       if(this.state.isLoading){
           return(
               <div className="homepage-loading">                
               <h1 className="loading"> Loading... </h1>
               </div>
           )
       }else{
           
       return (
            <div className="homepage">
            <div className="add-btn-container"> 
            <ul>
                <li className="rounded-button"><Link to='/listform'>New List</Link></li>
                <li className="rounded-button"><Link to='/todoform'>New Task</Link></li>
            </ul> 
            </div>
         
            <section className="todo-list">
            {this.state.lists.length > 0 ? this.state.lists.map((list) => {
                
                return (
                    <div>
                    <ul>
                        
                    </ul>
                    <article key={list._id}>
                        <h3>{list.name}</h3>
                        {list.tasks.length > 0 ? 
                            (list.tasks.map((task) => {
                                return(
                                    <div className="todo-card">
                                        <p className="todo-item">{task.name}</p>
                                        <p className="todo-item" onClick={() => this.handleDelete(task._id)}>delete</p>
                                        <Link to={`/task/${task._id}/edit`} className="todo-item">Edit </Link>

                                    </div>
                                )
                            })) : null
                        }
                    </article>
                    </div>
                )
            })
        : null
        }
            </section>
            </div>
            
       )
       }
   }
}

export default Homepage


