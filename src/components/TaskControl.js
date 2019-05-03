import React from 'react';
import Search from './TaskSearchControl'
import Sort from './TaskSortControl'

class Control extends React.Component {
    render(){
        return (
            <>
            <Search/>
            <Sort />
            </>
        )
    }
  
}

export default Control;
