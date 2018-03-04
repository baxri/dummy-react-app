import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {

    constructor(){
        super();
        this.state = {
            fullname : 'Dummy react app',
        };
    }

    changeEvent(e){
        this.setState({
            fullname : e.target.value
        });
    }

    render() {
        return (
            <div>
                <input onChange={(e) => this.changeEvent(e)} value={this.state.fullname} />
                <p>{this.state.fullname}</p>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
