import React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions' 

class Search extends React.Component {
    constructor(){
        super()
        this.state = {
            keyword: '',
        }
    }
    onChange = (event) => {
        let target = event.target
        let name = target.name
        let value = target.value
        this.setState({
            [name] : value
        })
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword)
    }
    render(){
        let { keyword } = this.state
        return (
            <>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        
                    <div className="input-group">
                        
                        <input type="text" name="keyword" className="form-control"
                        value={ keyword }
                        onChange = {this.onChange}
                        placeholder="Nhập từ khóa ..." />

                        <span className="input-group-btn">
                            <button type="button" 
                            onClick={ this.onSearch }
                            className="btn btn-primary">
                                <span className="fa fa-search mr-5"></span>Tìm
                            </button>
                        </span>
                    </div>
                    
                </div>
            </>
        )
    }
  
}

const mapStateToProps = state => {
    return {
       
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSearch: keyword => {
            dispatch(actions.searchTask(keyword))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
