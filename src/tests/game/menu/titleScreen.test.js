import React from 'react';
import TitleScreen from '../../../game/menu/titleScreen';
import renderer from 'react-test-renderer';

test('TitleScreen should be rendered', () => { 
    const titleScreen = renderer.create(
        <TitleScreen key='1' name="Test" selected={ false } />
    );

    let tree = titleScreen.toJSON();
    expect(tree).toMatchSnapshot();
});