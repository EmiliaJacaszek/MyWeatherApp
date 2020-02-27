import React, { Component } from 'react';
import './NotFound.css';


class NotFound extends Component {
    render() {

        return(
            <div className="text-container">
            <h3>404 Not found</h3>
            <p>We couldn't find that page</p>
            </div>
            )
    }
}

export default NotFound;