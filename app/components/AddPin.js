import React from "react";
import axios from "axios";
import { Link } from 'react-router';

class AddPin extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            src: "",
            title: ""
        }
    }

    loadPlaceholder(e) {
        var _this = this;
        e.target.onError = null;
        e.target.src = '/placeholder.jpg';
    }

    handleChange(e) {
        var nextState = {};
        nextState[e.target.placeholder.toLowerCase()] = e.target.value;
        this.setState(nextState);
    }

    handleSubmit(e) {
        if (e) e.preventDefault();
        var _this = this;
        _this.setState({
            title: "",
            src: ""
        });

        axios.post('/addpin', {
                title: _this.state.title,
                src: _this.state.src
            })
            .then(function(response) {
                if (!response.data.redirect && response.data.pin) {
                    _this.context.router.push('/my');
                }
            });
    }

    render() {

        var _this = this;

        return (
            <div id="addpin">
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="input">
                    <input type="text" placeholder="Title" value={this.state.title} onChange={(e) => this.handleChange(e)}/>
                </div>
                <div className="input">
                    <input type="text" placeholder="src" value={this.state.src} onChange={(e) => this.handleChange(e)}/>
                </div>
                <div id="add">
                    <button type='submit'>Add</button>
                </div>
            </form>
            </div>
        );
    }

}

AddPin.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default AddPin;
