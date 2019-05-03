// import * as types from './../constants'
import { combineReducers } from 'redux'
import tasks from './tasks'
import isDisplayForm from './isDisplayForm'
import editTask from './editTask'
const myReducer = combineReducers ({
    tasks, // tasks : tasks
    isDisplayForm, // isDisplayForm : isDisplayForm
    editTask,
})

export default myReducer