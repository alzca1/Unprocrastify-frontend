import React, { Component } from 'react'
import withAuth from '../components/withAuth'
import listService from '../services/list-service'

class ListForm extends Component {
    state = {
        listname: '',
        color: '', 
        owner: this.props.user._id, 
        
    }

    handleChange = (event) => {
        const { name, value } = event.target; 
        this.setState({
            [name]: value,
        })
    };

    handleSubmit = (event) => {
        const {name, color, owner} = this.state; 
        event.preventDefault(); 
        listService.createNewList({
            name, color, owner,
        })
        .then(response => {
            console.log('list added!')
        })
        .catch(error => {
            console.log(error)
        })
        this.props.history.push('/homepage')
    }




    render() {
        const {name, color} = this.state; 
        return (
            <form onSubmit={this.handleSubmit}>

                <div>
                    <label htmlFor="name">Todo List Name</label>
                    <input  name="name" value={name} onChange={this.handleChange} /> <br />

                    <div className="radio-group">
                    <label htmlFor="color">color</label>yellow
                    <input type="radio" name="color" value="yellow" onChange={this.handleChange}/>green                   
                    <input type="radio" name="color" value="green" onChange={this.handleChange}/>blue                
                    <input type="radio" name="color" value="blue" onChange={this.handleChange}/>purple               
                    <input type="radio" name="color" value="purple" onChange={this.handleChange}/>orange              
                    <input type="radio" name="color" value="orange" onChange={this.handleChange}/>red                                                
                    </div>
                </div>

                <button type="submit"> Add new List</button>

            </form>
        )
    }








}

export default withAuth(ListForm)