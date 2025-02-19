import React, { Component } from 'react'
import withAuth from '../components/withAuth'
import taskService from '../services/task-service'
import listService from '../services/list-service'
import Navbar from '../components/Navbar'
import { Redirect } from 'react-router'


 class TodoForm extends Component {

    state = {
        name: '',
        duedate: '', 
        priority: '', 
        notes: '',
        list: [], 
        completed: false, 
        owner: this.props.user._id, 
        user: '',
        selectedList: ''
         
        
    };


    componentDidMount(){
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
    }

    handleChange = (event) => {
        
        const { name, value } = event.target; 
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = (event) => {
        console.log(event)
        const {name, duedate,  priority, notes, owner, selectedList} = this.state; 
        event.preventDefault();
        taskService.createNewTask({
            name, duedate, priority, notes, owner, list: selectedList
        })
       
        
        .then(() => response => {
            
           console.log('task added!')
           this.props.history.push('/homepage')
           

           
           
        })
        .catch(error => {
            console.log(error)
        })
        
    }

    render(){
        console.log(this.props.user)
        const { name,duedate, notes, redirect} = this.state; 
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

export default withAuth(TodoForm)