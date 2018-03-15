import React from 'react';
import './menu.css'
import MenuItem from './menuItem';

export default class Menu extends React.Component {
    constructor(args) {
        super();
        this.state = {
            menuItems: args.menuItems,
            onBack: args.onBack
        };

        this.timeSinceLastUpdate = 0;
        this.updateInterval = 100;
    }    

    back() {
        if (this.state.onBack) {
            this.state.onBack();
        }
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    update(keys, timeDelta) {        
        if (this.timeSinceLastUpdate < this.updateInterval) {            
            this.timeSinceLastUpdate += timeDelta;
            return;
        }
        
        if (keys.up || keys.down) {
            this.timeSinceLastUpdate = 0;
        }

        this.updateItems(keys);        
    }

    updateItems(keys) {
        let menuItems = this.state.menuItems;
        const selectedIndex = menuItems.findIndex(x => x.selected);

        if (keys.up) {
            if (selectedIndex > 0) {
                menuItems[selectedIndex].selected = false;
                menuItems[selectedIndex - 1].selected = true;
            }
        } else if (keys.down) {
            if (selectedIndex < menuItems.length - 1) {
                menuItems[selectedIndex].selected = false;
                menuItems[selectedIndex + 1].selected = true;
            }
        } else if (keys.enter) {
            const selectedItem = menuItems[selectedIndex];
            selectedItem.onOpen && selectedItem.onOpen();
        }      
        
        this.setState({ menuItems: menuItems });
    }

	render() { 
        const style = {
            'fontSize': '80px',
            'top': '25%'
        };

        const menuItems = this.state.menuItems.map(x => <MenuItem key={ x.id } name={ x.name } selected={ x.selected } />);

		return (
			<div className="centerScreen" style={ style }>
                { menuItems }
			</div>
        );
	}
}