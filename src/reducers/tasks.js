import * as types from './../constants'


const s4 = () => {
    return Math.floor((1+Math.random())* 0x10000).toString(16).substring(1)
}
const randomID = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

const findIndex = (tasks, id) => {
    let result = -1
    tasks.forEach((task,index) => {
        if(task.id === id){
            result = index
        }
    })
    return result
}
let data = JSON.parse(localStorage.getItem('tasks'))
let initialState = data ? data : []

const myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.LIST_ALL:
            return state
        case types.ADD_TASK:
        let id = randomID()
        let newTask = {
            id: id,
            name: action.task.name,
            status: action.task.status
        }
        state.push(newTask)
        localStorage.setItem('tasks', JSON.stringify(state))
            return [...state]
        case types.UPDATE_STATUS_TASK:
        // console.log('action',action.id)
        // var id = action.id
        let index = findIndex(state,action.id)
        state[index] = {   // tại phần tử thứ index
            ...state[index], // copy phần tử tại vị trí index
            status: !state[index].status // cập nhật lại status của p.tử thứ index
        }
        // let cloneTask = {...state[index]}
        // cloneTask.status = !cloneTask.status
        // // state.splice(index, 1, cloneTask)
        // state[index] = cloneTask
        localStorage.setItem('tasks', JSON.stringify(state))
        // console.log('cloneTask',cloneTask)
        return [...state]
        default:
            return state
        }
   
}

export default myReducer