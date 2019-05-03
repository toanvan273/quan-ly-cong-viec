import React from 'react';
import TaskItem from './TaskItem'
import { connect } from 'react-redux'
import * as actions from './../actions'

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
        let filter = {
            name : name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        }
        this.props.onFilterTable(filter)
        this.setState({
            [name] : value
        })
    }
    render(){
        const { filterTable, keyword, sort } = this.props
        let { tasks} = this.props
        // filter table
        if(filterTable.name){
        tasks =  tasks.filter(task => {
                return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1 // indexOf ko tìm ra kết quả trả về -1
            })
        }
        tasks = tasks.filter(task => {
            if(filterTable.status === -1){
                return task
            }else{
                return task.status === (filterTable.status === 1 ? true : false)
            }
            })
        // Search keyword
        if(keyword){
            tasks = tasks.filter( task => {
                return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 // indexOf ko tìm ra kết quả trả về -1
            })
        }
        // Sort by - value
        if(sort.by === 'name'){
            tasks = tasks.sort( (a,b) => {
                if(a.name > b.name) return sort.value
                else if( a.name < b.name) return -sort.value
                else return 0
            })
        }else{
            tasks = tasks.sort( (a,b) => {
                if(a.status > b.status) return -sort.value
                else if( a.status < b.status) return sort.value
                else return 0
            })
        }

        // const { filterName, filterStatus } = this.state
        let elmTaskItem = tasks.map( (task,index) => {
            return <TaskItem key={task.id} index={index} 
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
                            // value={ filterName }
                            onChange={this.onChange }
                            name="filterName" />
                        </td>
                        <td>
                            
                            <select name="filterStatus"  
                            // value={ filterStatus }
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
        tasks: state.tasks,
        filterTable: state.filterTable,
        keyword: state.search,
        sort: state.sort
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFilterTable: filter => {
            dispatch(actions.filterTask(filter))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskList)