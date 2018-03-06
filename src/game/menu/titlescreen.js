import React, { Component } from 'react';
import './menu.css'

export default class TitleScreen extends React.Component {
    render() {
        const title = {
            'top': '10%',
            'color': 'green',
            'font-size': '80px',
        };

        return (
            <div>
                <span style={title} className="centerScreen">AI Wars</span>
            </div>
        );
    }
}