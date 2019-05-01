import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm'
import Control from './components/TaskControl'
import TaskList from './components/TaskList'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
            filter : {
                name: '',
                status: -1
            },
            keyword: '',
            sortBy: 'name',
            sortValue: 1
        }
    }

    componentWillMount(){
        if(localStorage && localStorage.getItem('tasks')){
            let tasks = JSON.parse( localStorage.getItem('tasks'))
            this.setState({
                tasks: tasks
            })
        }
    }

    s4(){
        return Math.floor((1+Math.random())* 0x10000).toString(16).substring(1)
    }
    generateID(){
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4()
    }
    ToogleTaskFrom = () => {
        if(this.state.isDisplayForm && this.state.taskEditing !== null){
            this.setState({
                isDisplayForm: true,
                taskEditing: null
            })

        }else{
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditing: null
            })
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
    onSubmit = (data) => {
        let { tasks } = this.state
        if(data.id === ''){
            data.id = this.generateID()
            tasks.push(data)
        }else{
            let index = this.findIndex(data.id)
            tasks[index] = data
        }
        
        this.setState({
            tasks: tasks,
            taskEditing: null
        })
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    onUpdateStatus = (id) => {
        let { tasks } = this.state
        let index = this.findIndex(id)
        // console.log('ty',tasks[index].status)
        if(index !== -1){
            tasks[index].status = !tasks[index].status
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
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
    onDelete = (id) => {
      
        let { tasks } = this.state
        let index = this.findIndex(id)
        
        if(index !== -1){
            tasks.splice(index, 1)
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
        this.onCloseFrom()
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
    render(){
        const { isDisplayForm, taskEditing, filter,keyword, sortBy, sortValue } = this.state;
        let {tasks} = this.state
        if(filter){
            if(filter.name){
                tasks = tasks.filter( task => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1 // indexOf ko tìm ra kết quả trả về -1
                })
            }
            tasks =  tasks.filter( task => {
                if(filter.status === -1){
                    return task
                }else{
                    return task.status === (filter.status === 1 ? true : false)
                }
            })
        }
        if(keyword){
            tasks = tasks.filter( task => {
                return task.name.toLowerCase().indexOf(keyword) !== -1 // indexOf ko tìm ra kết quả trả về -1
            })
        }
        if(sortBy === 'name'){
            tasks.sort( (a,b) => {
                if(a.name > b.name) return sortValue
                else if( a.name < b.name) return -sortValue
                else return 0
            })
        }else{
            tasks.sort( (a,b) => {
                if(a.status > b.status) return -sortValue
                else if( a.status < b.status) return sortValue
                else return 0
            })
        }
        const elmTaskForm = isDisplayForm ? <TaskForm onSubmit={ this.onSubmit} 
        task={taskEditing}
        close={this.ToogleTaskFrom}/> : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản lý công việc</h1>
                </div>
                <div className="row">
                    <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                        { elmTaskForm }
                    </div>
                    <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8': 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button type="button" className="btn btn-primary" onClick={this.ToogleTaskFrom}>
                            <span className="fa fa-plus mr-5">Thêm công việc</span>
                        </button> 
                        {/* Xoa nut Generate */}
                        {/* <button type="button" className="btn btn-danger ml-5"
                        onClick={ this.onGenerateData }
                        >
                        Generate Data
                        </button>  */}
                        <div className="row mt-15">
                            <Control onSearch={this.onSearch} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue}/>
                        </div> <br/>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList tasks= {tasks} onUpdateStatus={this.onUpdateStatus}
                                onDelete={this.onDelete}
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

export default App;
