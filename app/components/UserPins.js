import React from "react";
import axios from "axios";
import { Link } from 'react-router';
var elem;
var msnry;

class UserPins extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            pins: []
        }
    }

    componentWillMount() {
        var _this = this;
        axios.get('/getuserpins/' + _this.props.params.username)
            .then(function(response) {
                _this.setState({
                    pins: response.data.pins || []
                });
            });
    }

    loadPlaceholder(e) {
        var _this = this;
        e.target.onError = null;
        e.target.src = '/placeholder.png';
    }

    componentDidUpdate() {
        elem = document.querySelector('#userpins');
        msnry = new Masonry(elem, {
            // options
            itemSelector: '.pin'
        });
    }

    layout() {
        msnry.layout();
    }

    render() {

        var _this = this;

        var pinHtml = _this.state.pins.map(function(pin) {

            return (
                <div className="pin" key={pin._id}>
                    <img src={pin.src} onError={(e) => _this.loadPlaceholder(e)} onLoad={(e) => _this.layout(e)} />
                    <div>
                        <p class="subtitle">{pin.title}</p>
                        <Link to={"/user/" + pin.creator.username}>{"From " + pin.creator.username}</Link>
                    </div>
                </div>
            );
        });

        return (
            <div id="userpins">
              {pinHtml}
            </div>
        );
    }

}

export default UserPins;
