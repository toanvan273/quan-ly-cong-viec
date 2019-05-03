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
        const { isDisplayForm } = this.props
      
        
        
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
                            <Control  />
                        </div> <br/>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList />                        
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
