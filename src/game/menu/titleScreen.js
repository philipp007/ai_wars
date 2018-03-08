import React from 'react';
import './menu.css'

export default class TitleScreen extends React.Component {
    render() {
        const title = {
            'top': '5%',
            'color': 'green',
            'fontSize': '80px',
        };

        return (
            <div>
                <span style={title} className="centerScreen">AI Wars</span>
            </div>
        );
    }
}