import React from 'react';
import Search from './TaskSearchControl'
import Sort from './TaskSortControl'

class Control extends React.Component {
    render(){
        return (
            <>
            <Search onSearch={this.props.onSearch}/>
            <Sort onSort={this.props.onSort} sortBy={this.props.sortBy} sortValue={this.props.sortValue}/>
            </>
        )
    }
  
}

export default Control;
