import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';

class Header extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        var links;

        if (this.props.user.username) {
            links = <div>
                        <Link to="/my">My Pins</Link>
                        <Link to="/add"><i className="fa fa-plus" aria-hidden="true"></i></Link>
                        <a href="/logout"><i className="fa fa-power-off" aria-hidden="true"></i></a>
                    </div>;
        } else {
            links = <a href="/auth/twitter">Login</a>;
        }

        return (
            <div id="top">
                <div id="header">
                    <div id="name">
                        <Link to="/">Masinterest</Link>
                    </div>
                    <div id="authenticated">
                        {links}
                    </div>
                </div>
            </div>
        );
    }

}

export default Header;
