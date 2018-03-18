import { toVector, toRadians } from '../../game/utils';

test('toRadians should convert 90° to Math.PI / 2', () => {
    expect(toRadians(90)).toBeCloseTo(Math.PI / 2);
});

test('toRadians should convert 180° Math.PI', () => {
    expect(toRadians(180)).toBeCloseTo(Math.PI);
});

test('toRadians should convert 360° to Math.PI * 2', () => {
    expect(toRadians(360)).toBeCloseTo(Math.PI * 2);
});

test('toVector should convert 0° to {x: 0, y: -1 }', () => {
    const vector = toVector(0);
    expect(vector.x).toBeCloseTo(0);
    expect(vector.y).toBeCloseTo(-1);
});

test('toVector should convert 90° to {x: 1, y: 0 }', () => {
    const vector = toVector(90);
    expect(vector.x).toBeCloseTo(1);
    expect(vector.y).toBeCloseTo(0);
});

test('toVector should convert 180° to {x: 0, y: 1 }', () => {
    const vector = toVector(180);
    expect(vector.x).toBeCloseTo(0);
    expect(vector.y).toBeCloseTo(1);
});

test('toVector should convert 270° to {x: -1, y: 0 }', () => {
    const vector = toVector(270);
    expect(vector.x).toBeCloseTo(-1);
    expect(vector.y).toBeCloseTo(0);
});

test('toVector should convert 360° to {x: 0, y: -1 }', () => {
    const vector = toVector(360);
    expect(vector.x).toBeCloseTo(0);
    expect(vector.y).toBeCloseTo(-1);
});