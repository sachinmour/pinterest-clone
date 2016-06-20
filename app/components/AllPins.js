import React from "react";
import axios from "axios";
import { Link } from 'react-router';

class AllPins extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            pinss: []
        }
    }

    componentWillMount() {
        var _this = this;
        axios.get('/getallpins')
            .then(function(response) {
                _this.setState({
                    pins: response.data.pins
                });
            });
    }

    loadPlaceholder(e) {
        var _this = this;
        e.target.onError = null;
        e.target.src = '/placeholder.jpg';
    }

    render() {

        var _this = this;
        var pinHtml = _this.state.pins.map(function(pin) {

            return (
                <div className="pin" key={pin._id}>
                    <img src={book.image} onError={(e) => _this.loadPlaceholder(e)}/>
                    <p class="subtitle">{pin.title}</p>
                    <Link to={"/user/" + pin.creator.username}>{"From " + pin.creator.username}</Link>
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
