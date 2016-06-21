import React from "react";
import axios from "axios";
import { Link } from 'react-router';
var elem;
var msnry;

class MyPins extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            pins: []
        }
    }

    componentWillMount() {
        var _this = this;
        axios.get('/getmypins')
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
        elem = document.querySelector('#mypins');
        msnry = new Masonry(elem, {
            // options
            itemSelector: '.pin'
        });
    }

    layout() {
        msnry.layout();
    }

    handleDelete(e) {
        e.preventDefault();
        var _this = this;
        var pin_id = e.target.parentElement.parentElement.getAttribute('data-id');
        var oldPins = this.state.pins;
        var newPins = oldPins.filter(function(pin) {
            pin._id !== pin_id;
        });
        this.setState({
            pins: newPins
        })
        axios.post('/deletepin', { id: pin_id }).then(function(response) {
            if (!response.data.pinRemoved) {
                _this.setState({
                    pins: oldPins
                });
            }
        });
    }

    render() {

        var _this = this;

        var pinHtml = _this.state.pins.map(function(pin) {

            return (
                <div className="pin" key={pin._id} data-id={pin._id}>
                    <img src={pin.src} onError={(e) => _this.loadPlaceholder(e)} onLoad={(e) => _this.layout(e)} />
                    <div>
                        <p class="subtitle">{pin.title}</p>
                        <Link to="/my">{"From " + pin.creator.username}</Link>
                        <i className="fa fa-times tooltip"  title="Delete" onClick={(e) => _this.handleDelete(e)} aria-hidden="true"></i>
                    </div>
                </div>
            );
        });

        return (
            <div id="mypins">
              {pinHtml}
            </div>
        );
    }

}

export default MyPins;
