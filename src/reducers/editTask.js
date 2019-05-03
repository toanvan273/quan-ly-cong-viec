import * as types from './../constants'

let initialState = {
    id: '',
    name: '',
    status: false
}
const myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.EDIT_TASK:
        Object.assign(state, action.task)
            return {...state}
        default:
            return state
        }
   
}

export default myReducer