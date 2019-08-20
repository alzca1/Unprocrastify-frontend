import axios from 'axios';

class ListService {
    constructor () {
        this.listToDo = axios.create({
            baseURL: 'http://localhost:4000/list'
        })
    };


getOneList(id) {
    return this.listToDo.get(`/lists/${id}`, id)
    .then(data => data )
};

createNewList(newList){
    return this.listToDo.post(`/lists/new`, newList)
    .then(data => data)
}

updateOneList(id, updatedList) {
    return this.listToDo.put(`/lists/${id}/edit`, updatedList)
    .then (data => data)
}

deleteOneList(id){
    return this.listToDo.delete(`/lists/${id}/delete`)
    .then(data => data)
}

getAllLists(id) {
    return this.listToDo.get('/lists')
    .then(data => data);
};

}

const listService = new ListService(); 
export default listService;