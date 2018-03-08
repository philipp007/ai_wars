import React from 'react';
import './menu.css'
import MenuItem from './menuItem';

export default class Menu extends React.Component {
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
            'fontSize': '80px',
        };

        const menuItems = this.state.items.map(x => <MenuItem key={ x.id } name={ x.name } selected={ x.selected } />);

		return (
			<div style={ style }>
                { menuItems }
			</div>
        );
	}
}