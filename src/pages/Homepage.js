import React, {Component} from 'react'
import listService from '../services/list-service'

class Homepage extends Component{

    state = {
        lists: [], 
    }

    componentDidMount(){
        listService.getAllLists()
        .then ((response) => {
            const listsData = response.data
            console.log("aqui",response.data)
            this.setState({
                lists:listsData,
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

   render() {
       console.log(this.state)
       
       return (
         
            <section>
            {this.state.lists.listOfLists ? this.state.lists.listOfLists.map((list) => {
                
                return (
                    <article key={list._id}>
                        <h3>{list.name}</h3>
                        {console.log('hola', list)}
                        {list.tasks.length > 0 ? 
                            (list.tasks.map((task) => {
                                return(
                                    <p>{task.name}</p>
                                )
                            })) : null
                        }
                    </article>
                )
            })
        : null
        }
            </section>
       )
   }
}

export default Homepage


