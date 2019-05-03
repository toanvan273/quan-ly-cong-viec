import * as types from './../constants'

let initialState = ''
const myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SEARCH:
            return state = action.keyword
        default:
            return state
        }
   
}

export default myReducer