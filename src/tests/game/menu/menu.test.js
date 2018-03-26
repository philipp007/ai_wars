import React from 'react';
import Menu from '../../../game/menu/menu';
import MenuItem from '../../../game/menu/menuItem';
import renderer from 'react-test-renderer';
import InputManager from '../../../game/inputManager';
import Keys from '../../../game/inputManager';

test('Menu should be rendered', () => { 
    const menuItems = [
        { id: 1, name: "MenuItem1", selected: true },
        { id: 2, name: "MenuItem2", selected: false },
        { id: 3, name: "MenuItem3", selected: false }
    ]

    let menuRef = null;

    const menu = renderer.create(
        <Menu onRef = { ref => (menuRef = ref) } menuItems = { menuItems } />
    );

    let tree = menu.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Menu should change selected items upon key press', () => { 
    const menuItems = [
        { id: 1, name: "MenuItem1", selected: true },
        { id: 2, name: "MenuItem2", selected: false },
        { id: 3, name: "MenuItem3", selected: false }
    ]

    let menuRef = null;

    const menu = renderer.create(
        <Menu onRef = { ref => (menuRef = ref) } menuItems = { menuItems } />
    );

    let tree = menu.toJSON();
    expect(tree).toMatchSnapshot();

    menuRef.updateItems({ down: true });

    tree = menu.toJSON();
    expect(tree).toMatchSnapshot();

    menuRef.updateItems({ down: true });

    tree = menu.toJSON();
    expect(tree).toMatchSnapshot();
});