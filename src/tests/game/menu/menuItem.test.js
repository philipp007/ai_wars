import React from 'react';
import MenuItem from '../../../game/menu/menuItem';
import renderer from 'react-test-renderer';

test('MenuItem should be rendered', () => { 
    const menu = renderer.create(
        <MenuItem key='1' name="Test" selected={ false } />
    );

    let tree = menu.toJSON();
    expect(tree).toMatchSnapshot();
});