import React from 'react';
import './menu.css'
import Menu from './menu'

export default class MainMenu extends React.Component {
    constructor(args) {
        super()
        const menuItems = [];
        menuItems.push({ id: 1, name: "Play", selected: true });
        menuItems.push({ id: 2, name: "Exit", selected: false });

        this.state = {
            onBack: args.onBack,
            menuItems: menuItems
        };
    }

    back() {
        if (this.state.onBack) {
            this.state.onBack();
        }
    }

    update(keys) {
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
        }

        this.setState({ menuItems: menuItems });
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    render() {
        const style = {
            'top': '25%'
        }        

        return (
            <div className="centerScreen" style={style}>
                <Menu items={ this.state.menuItems } />
            </div>
        );
    }
}