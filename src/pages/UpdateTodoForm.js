import React, { Component } from 'react'
import withAuth from '../components/withAuth'
import taskService from '../services/task-service'
import listService from '../services/list-service'
import Navbar from '../components/Navbar'


 class UpdateTodoForm extends Component {

    state = {
        name: '',
        duedate: '', 
        priority: '', 
        notes: '',
        list: [], 
        selectedList: '',
        completed: false, 
        owner: this.props.user._id, 
        user: '',
        selectedList: '',
        id: '',
        
    };


    componentDidMount(){
       
        const {id} = this.props.match.params;

        taskService.getOneTask(id)
        .then ((response) => {
            const {name,duedate, priority, notes, list, completed, owner, user} = response.data.specificTask;
            this.setState({
                name,
                duedate, 
                priority,
                notes,
                list,
                completed,
                owner,
                user,
                id
            })
        }).then (() => {
            listService.getAllLists()
        .then ((response) => {
            const listsData = response.data
            console.log(listsData)
            this.setState({
                list: listsData,
                selectedList: listsData.listOfLists[0]._id
                
            })
        })
        .catch((error) => {
            console.log(error)
        })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    handleChange = (event) => {
        
        const { name, value } = event.target; 
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = (event) => {
        console.log(event)
        const {name, duedate,  priority, notes, owner, selectedList, id } = this.state; 
        event.preventDefault();
        taskService.updateOneTask({
            id, name, duedate, priority, notes, owner
        })
        .then(response => {
           console.log('task added!')
        })
        .catch(error => {
            console.log(error)
        })
         this.props.history.push('/homepage')
    }

    render(){
        console.log(this.props.user)
        const { name,duedate, notes} = this.state; 
        return(
            <form id="todoForm" onSubmit={this.handleSubmit}> 
            
            <div>
                <label htmlFor="name">Todo Name</label>
                <input  name="name" value={name} onChange={this.handleChange} /> <br />


                
                <label htmlFor="duedate">Due Date & Time</label>
                <input type="datetime-local" name="duedate" value={duedate} onChange={this.handleChange} required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />

               <label htmlFor="lists">Lists</label>           
               <select form="todoForm" name="selectedList" onChange={this.handleChange} >
                   {this.state.list.listOfLists ? this.state.list.listOfLists.map((list) =>{
                       return (
                           <option key={list._id} value={list._id}>{list.name}</option>
                       )
                   })
                   : null
                   }                    
                </select>

                <div className="radio-group">
                <label htmlFor="priority">Priority</label>none
                <input type="radio" name="priority" value="none" onChange={this.handleChange}/>low
                
                <input type="radio" name="priority" value="low" onChange={this.handleChange}/> medium
               
                <input type="radio" name="priority" value="medium" onChange={this.handleChange}/>high
              
                <input type="radio" name="priority" value="high" onChange={this.handleChange}/>                
                </div>

                <br />

                <label>Notes</label>
                <textarea name="notes" value={notes} onChange={this.handleChange} />
            </div>
            <button type="submit"> Add new Task</button>
            </form>
        )
    }

}

export default withAuth(UpdateTodoForm)