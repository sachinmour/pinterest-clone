import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";

class Main extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {}
        }
    }

    componentWillMount() {
        var _this = this;
        axios.get('/getUser')
            .then(function(response) {
                if (!response.data.redirect) {
                    _this.setState({ user: response.data });
                }
            });
    }

    renderChildren() {
        var _this = this;
        return React.Children.map(_this.props.children, child => {
            return React.cloneElement(child, {
                user: _this.state.user
            });
        });
    }


    render() {
        var _this = this;
        return (
            <div>
                <Header user={_this.state.user}/>
                <div id="content">
                    {_this.renderChildren()}
                </div>
                <Footer />
            </div>
        );
    }

}

export default Main;
