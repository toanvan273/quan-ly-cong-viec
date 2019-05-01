import React from 'react';


class TaskForm extends React.Component {
    constructor(){
        super()
        this.state = {
            id: '',
            name: '',
            status: false,
        }
    }
    componentWillMount(){
        if(this.props.task ) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            })
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task ) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            })
        }else if(nextProps.task === null){
            this.setState({
                id: '',
                name: '',
                status: false,
            })
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
            [name] : value
        })
    }
    onSubmit = (value) => {
        value.preventDefault();
        this.props.onSubmit(this.state )
    }
    onClear = () => {
        this.setState({
            name: '',
            status: false,
        })
    }
    render(){
        const { close } = this.props
       const { id } = this.state
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title"> { id !== ''? 'Cập nhật công việc' : 'Thêm công việc'}
                        <span className="fa fa-times-circle text-right pointer" onClick={close}></span>
                    </h3>
                </div>
                <div className="panel-body">
                    
                <form onSubmit={this.onSubmit}>
                
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

export default TaskForm;
