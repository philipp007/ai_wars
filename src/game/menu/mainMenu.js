import React from 'react';
import './menu.css'
import Menu from './menu'
import MenuItem from './menuitem'

export default class MainMenu extends React.Component {
    constructor(args) {
        super()
        const menuItems = [];
        menuItems.push(<MenuItem name="Play" selected="true" />);
        menuItems.push(<MenuItem name="Exit" />);

        this.mainMenu = <Menu items={ menuItems } />

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
            'top': '25%'
        }

		return (
			<div className="centerScreen" style={ style }>
                { this.mainMenu }
			</div>
        );
	}
}