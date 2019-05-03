import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm'
import Control from './components/TaskControl'
import TaskList from './components/TaskList'
import { connect } from 'react-redux'
import * as actions from './actions'


class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            filter : {
                name: '',
                status: -1
            },
            keyword: '',
            sortBy: 'name',
            sortValue: 1
        }
    }
    

    onCloseFrom = () => {
        this.setState({
            isDisplayForm: false
        })
    }
    onShowFrom = () => {
        this.setState({
            isDisplayForm: true
        })
    }

    findIndex = (id) => {
        let { tasks } = this.state
        let result = -1
        tasks.forEach((task,index) => {
            if(task.id === id){
                result = index
            }
        })
        return result
    }
 
    onUpdate = (id) => {
        let { tasks } = this.state
        let index = this.findIndex(id)
        let taskEditing = tasks[index]
        this.setState({
            taskEditing: taskEditing
        })
        this.onShowFrom()
        
    }
    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt( filterStatus)
        this.setState({
            filter : {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        })
    }
    onSearch = (key) => {
        this.setState({
            keyword: key
        })
    } 
    onSort = (sortBy,sortValue) => {
     this.setState({
         sortBy: sortBy,
         sortValue: sortValue
     })
      
    }
    ToggleForm = () => {
        const { editTask } = this.props
        if(editTask && editTask.id !== ''){
            this.props.openFormEdit()
        }else{
           this.props.onToggleForm()
          
        }
        this.props.onClearTask({
            id: '',
            name: '',
            status: false
        }) 
        
    }
    render(){
        const {  sortBy, sortValue } = this.state;
        const { isDisplayForm } = this.props
        // if(filter){
        //     if(filter.name){
        //         tasks = tasks.filter( task => {
        //             return task.name.toLowerCase().indexOf(filter.name) !== -1 // indexOf ko tìm ra kết quả trả về -1
        //         })
        //     }
        //     tasks =  tasks.filter( task => {
        //         if(filter.status === -1){
        //             return task
        //         }else{
        //             return task.status === (filter.status === 1 ? true : false)
        //         }
        //     })
        // }
        // if(keyword){
        //     tasks = tasks.filter( task => {
        //         return task.name.toLowerCase().indexOf(keyword) !== -1 // indexOf ko tìm ra kết quả trả về -1
        //     })
        // }
        // if(sortBy === 'name'){
        //     tasks.sort( (a,b) => {
        //         if(a.name > b.name) return sortValue
        //         else if( a.name < b.name) return -sortValue
        //         else return 0
        //     })
        // }else{
        //     tasks.sort( (a,b) => {
        //         if(a.status > b.status) return -sortValue
        //         else if( a.status < b.status) return sortValue
        //         else return 0
        //     })
        // }
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản lý công việc</h1>
                </div>
                <div className="row">
                    <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                        <TaskForm />
                    </div>
                    <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8': 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button type="button" className="btn btn-primary" onClick={this.ToggleForm}>
                            <span className="fa fa-plus mr-5">Thêm công việc</span>
                        </button> 
       
                        <div className="row mt-15">
                            <Control onSearch={this.onSearch} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue}/>
                        </div> <br/>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList 
                                onUpdate={this.onUpdate}
                                onFilter={this.onFilter}
                                />                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
  
}

const mapStateToProps = state => {
    return {
     isDisplayForm: state.isDisplayForm,
     editTask: state.editTask
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm())
        },
        onClearTask: task => {
            dispatch(actions.editTask(task))
        },
        openFormEdit: () => {
            dispatch(actions.openForm())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
