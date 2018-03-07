import React from 'react';
import './menu.css'

export default class MenuItem extends React.Component {
    constructor(args) {
        super()
        this.state = {
            items: args.items,
            onBack: args.onBack
        };
    }

    back() {
        if (this.state.onBack) {
            this.state.onBack();
        }
    }

	render() { 
        const style = {
            'top': '20%',
            'font-size': '80px',
        };

		return (
			<div style={ style }>
                { this.state.items }
			</div>
        );
	}
}