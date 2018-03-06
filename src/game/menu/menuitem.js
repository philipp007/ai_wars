import React, { Component } from 'react';

export default class MenuItem extends React.Component {
    constructor(args) {
        this.state = {
            name: args.name,
            subItems: args.subItems,
            onOpen: args.onOpen,
            selected: args.selected
        };
    }

    open() {
        if (this.state.subItems) {
            
        }
    }

	render() {        
		return (
			<div>
			</div>
        );
	}
}