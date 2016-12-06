/**
  * *Keep in mind that Vector2 is **not an immutable class**. It is also assumed that your **positive y axis points down***.
  */
export default class Vector2 {
    private _v;
    constructor(x?: number, y?: number);
    x: number;
    y: number;
    set(x: number, y: number): Vector2;
    /**
      * Read data from another vector into this vector.
      */
    read(v: Vector2): Vector2;
    /**
      * Reverse the X and Y values.
      */
    reverse(): Vector2;
    /**
      * Equivalent to rotating the vector 180 degrees.
      */
    flip(): Vector2;
    /**
      * Create a new vector initialized with the values of this vector.
      */
    clone(): Vector2;
    add(vector: Vector2): Vector2;
    addX(x: number): Vector2;
    addY(y: number): Vector2;
    subtract(vector: Vector2): Vector2;
    /**
      * Alias for `subtract()`.
      */
    sub(vector: Vector2): Vector2;
    multiply(scale: number): Vector2;
    /**
      * Alias for `multiply()`.
      */
    mul(scale: number): Vector2;
    /**
      * Alias for `multiply()`.
      */
    mult(scale: number): Vector2;
    divide(scale: number): Vector2;
    /**
      * Alias for `divide()`.
      */
    div(scale: number): Vector2;
    isEqualTo(vector: Vector2): boolean;
    /**
      * Alias for `isEqualTo()`.
      */
    eql(vector: Vector2): boolean;
    setLength(scale: number): Vector2;
    getLength(): number;
    normalize(): Vector2;
    distance(vector: Vector2): number;
    angle(): number;
    round(): Vector2;
    /**
      * Rotate the given vector around the origin `[0, 0]`.
      */
    rotate(degrees: number, round?: number): Vector2;
    /**
      * Faster than calling `rotate(90)`.
      */
    rotate90(): Vector2;
    /**
      * Alias to `rotate90`
      */
    rotate90C(): Vector2;
    /**
      * Same as `rotate90()` but instead rotates counter-clockwise.
      */
    rotate90CC(): this;
    /**
      * Faster than calling `rotate(180)` or `rotate90()` twice.
      */
    rotate180(): Vector2;
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
      * Returns a new array `[x, y]`.
      */
    toArray(): Array<number>;
    log(): void;
    /**
      * Use the 1/2 determinant method to find the area of a triangle.
      */
    static areaTriangle(p1: Vector2, p2: Vector2, p3: Vector2): number;
    /**
      * Returns the point of intersection between 2 line segments.
      * Returns `undefined` if no intersection is found.
      */
    static segmentsIntersection(p: Vector2, p2: Vector2, q: Vector2, q2: Vector2): Vector2;
    /**
      * Casts a ray from `v1` towards `v2` in an infinite 2d grid space. Returns an array of grid spaces the ray intersects between `v1` and `v2`.
      */
    static castBetween(v1: Vector2, v2: Vector2, width?: number): Vector2[];
}
