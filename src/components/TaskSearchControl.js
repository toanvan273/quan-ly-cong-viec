import React from 'react';


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
        // console.log('sate', this.state)
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

export default Search;
