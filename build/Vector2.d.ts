/**
  * *WARNING: All calls that need to modify the host vector will do so **in place***.
  */
export default class Vector2 {
    private _v;
    constructor(x?: number, y?: number);
    x: number;
    y: number;
    set(x: number, y: number): Vector2;
    mimic(v: Vector2): Vector2;
    clone(): Vector2;
    add(vector: Vector2): Vector2;
    addX(x: number): Vector2;
    addY(y: number): Vector2;
    subtract(vector: Vector2): Vector2;
    sub(vector: Vector2): Vector2;
    multiply(scale: number): Vector2;
    mul(scale: number): Vector2;
    mult(scale: number): Vector2;
    divide(scale: number): Vector2;
    div(scale: number): Vector2;
    isEqual(vector: Vector2): boolean;
    setLength(scale: number): Vector2;
    getLength(): number;
    normalize(): Vector2;
    distance(vector: Vector2): number;
    angle(): number;
    round(): Vector2;
    /**
      * Rotate the given vector around the origin [ 0, 0 ].
      */
    rotate(degrees: number, round?: number): Vector2;
    cross(v2: Vector2): number;
    vectorTo(v: Vector2): Vector2;
    /**
      * Determine if the point lies within the given rectangle.
      */
    inRect(topLeft: Vector2, bottomRight: Vector2): boolean;
    /**
      * Determine if the point lies within the given triangle.
      */
    inTriangle(v1: Vector2, v2: Vector2, v3: Vector2): boolean;
    centerBetween(v2: Vector2): Vector2;
    /**
      * Use the 1/2 determinant method to find the area of a triangle.
      */
    static areaTriangle(p1: Vector2, p2: Vector2, p3: Vector2): number;
    toArray(): Array<number>;
    log(): void;
}
