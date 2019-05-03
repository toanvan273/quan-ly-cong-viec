import React from 'react';
import { connect } from 'react-redux'
import * as actions from './../actions'

class TaskForm extends React.Component {
    constructor(){
        super()
        this.state = {
           
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.editTask ) {
            this.setState({
                id: nextProps.editTask.id,
                name: nextProps.editTask.name,
                status: nextProps.editTask.status
            })
        }else{
            this.onClear()
        }
    }

    onChange = (event) => {
        let target = event.target
        let name = target.name
        let value = target.value
        if(name === 'status'){
            value = target.value === 'true'? true : false
        }
        this.setState({
            [name] : value,
        })
    }
    onSave = (value) => {
        value.preventDefault();
        this.props.onSaveTask(this.state)
        this.onClear()
        this.props.onCloseForm()
    }
    onClear = () => {
        this.setState({
            name: '',
            status: false,
        })
    }
    render(){
        const { onCloseForm } = this.props
       const { id } = this.state
        if(!this.props.isDisplayForm) return ""
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title"> { id !== ''? 'Cập nhật công việc' : 'Thêm công việc'}
                        <span className="fa fa-times-circle text-right pointer" onClick={onCloseForm}></span>
                    </h3>
                </div>
                <div className="panel-body">
                    
                <form onSubmit={this.onSave}>
                
                    <div className="form-group">
                        <label >Tên :</label>
                        <input type="text" className="form-control" name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        placeholder="Input field" />
                    </div>
                    <label>Trạng thái :</label>
                    
                    <select name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    className="form-control" >
                        <option value={true}>Kích hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select> <br/>
                    
                    <div className="text-center">
                        <button type="submit" className="btn btn-warming">
                            <span className="fa fa-plus mr-5">Lưu lại</span>    
                        </button> &nbsp;
                        <button type="button" className="btn btn-danger" onClick={ this.onClear }>
                            <span className="fa fa-close mr-5">Hủy bỏ</span>    
                        </button> &nbsp;
                    </div>
            
                </form>
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

const mapDispatchToProps = (dispatch) => {
    return {
        onSaveTask: task => {
            dispatch(actions.saveTask(task))
        },
        onCloseForm: () => {
            dispatch(actions.closeForm())
        },
       
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskForm)
