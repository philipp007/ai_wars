import React from 'react';
import './menu.css'

export default class MenuItem extends React.Component {
    constructor(args) {
        super();
        this.state = {
            name: args.name,
            subItems: args.subItems,
            onOpen: args.onOpen,
            selected: args.selected
        };
    }

    open() {
        if (this.state.onOpen) {
            this.state.onOpen();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props !== nextProps) {
          this.setState({
            selected: nextProps.selected
          });
        }
      }

	render() {   
        let className = '';
        let displayName = this.state.name;

        if (this.state.selected) {
            className = 'activeMenuItem';
            displayName = '< ' + displayName + ' >';
        } else {
            className = 'menuItem';
        }
        
		return (
			<div className={ className }>
                <span>{ displayName }</span>
			</div>
        );
	}
}