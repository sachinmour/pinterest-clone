import React from "react";
import axios from "axios";
import { Link } from 'react-router';
var elem;
var msnry;

class AllPins extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            pins: []
        }
    }

    componentWillMount() {
        var _this = this;
        axios.get('/getallpins')
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
        elem = document.querySelector('#allpins');
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

            var link;
            if (_this.props.user.username === pin.creator.username) {
                link = "/my";
            } else {
                link = "/user/" + pin.creator.username;
            }

            return (
                <div className="pin" key={pin._id}>
                    <img src={pin.src} onError={(e) => _this.loadPlaceholder(e)} onLoad={(e) => _this.layout(e)} />
                    <div>
                        <p class="subtitle">{pin.title}</p>
                        <Link to={link}>{"From " + pin.creator.username}</Link>
                    </div>
                </div>
            );
        });

        return (
            <div id="allpins">
              {pinHtml}
            </div>
        );
    }

}

export default AllPins;
