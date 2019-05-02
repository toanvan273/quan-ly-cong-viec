import React from 'react';
import TaskItem from './TaskItem'
import { connect } from 'react-redux'

class TaskList extends React.Component {
    constructor(){
        super()
        this.state = {
            filterName: '',
            filterStatus: -1, // all: -1, actice: 1, else: 0
        }
    }
  
    onChange = (event) => {
        let target = event.target
        let name = target.name
        let value = target.value
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        )
        this.setState({
            [name] : value
        })
    }
    render(){
        const { tasks } = this.props
        const { filterName, filterStatus,  } = this.state
        let elmTaskItem = tasks.map( (task,index) => {
            return <TaskItem key={task.id} index={index} 
            onDelete = {this.props.onDelete}
            onUpdate = {this.props.onUpdate}
            task={task}/>
        } )
        return (
            <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" className="form-control" 
                            value={ filterName }
                            onChange={this.onChange }
                            name="filterName" />
                        </td>
                        <td>
                            
                            <select name="filterStatus"  
                            value={ filterStatus }
                            onChange={this.onChange }
                            className="form-control">
                                <option value={-1}>Tất cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích Hoạt</option>
                            </select>
                            
                        </td>
                        <td></td>
                    </tr>
                   { elmTaskItem }
                </tbody>
            </table>
            </>
        )
    }
  
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps,null)(TaskList)
