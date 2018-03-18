export function toVector(angle) {
    const radians = toRadians(angle);
    return { x: Math.sin(radians), y: -Math.cos(radians) };
}

export function toRadians(angle) {
    return angle * (Math.PI / 180);
}