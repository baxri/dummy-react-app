import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {

    constructor(){
        super();
        this.state = {
            fullname : 'Hello React App!',
        };
    }

    changeEvent(e){
        this.setState({
            fullname : e.target.value
        });
    }

    alert(e){
        e.preventDefault();
        alert('Yes it is!!!');
    }

    render() {
        return (
            <div>
                <CustomLink onClick={(e) => this.alert(e)} />
                <p><label>Change Value:</label></p>
                <input onChange={(e) => this.changeEvent(e)} value={this.state.fullname} />
                <p>{this.state.fullname}</p>
            </div>
        );
    }
}

function CustomLink(props) {
    return <a href="#" onClick={props.onClick}>Welcome back!</a>;
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
