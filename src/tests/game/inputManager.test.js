import InputManager from '../../game/inputManager';

test('Keys should be false by default', () => {
    const inputManager = new InputManager();
    expect(inputManager.pressedKeys).toBeDefined();
    expect(inputManager.pressedKeys).toEqual({ 
        left: false, 
        right: false, 
        up: false, 
        down: false, 
        space: false, 
        enter: false
    });
});

test('Keys should be set to true upon pressing', () => {
    const inputManager = new InputManager();

    expect(inputManager.pressedKeys).toBeDefined();
    expect(inputManager.pressedKeys.left).toEqual(false);

    inputManager.handleKeys(true,{ keyCode: 37 });
    expect(inputManager.pressedKeys.left).toEqual(true);    
});