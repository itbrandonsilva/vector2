function frac0(f) {
    return f % 1;
}

function frac1(f) {
    return 1 - f + Math.floor(f);
}

/**
  * *Keep in mind that Vector2 is **not an immutable class**. It is also assumed that your **positive y axis points down***.
  */
export default class Vector2 {
    private _v: Array<number>;

    constructor(x: number = 0, y: number = 0) {
        this._v = [x, y];
    }

    get x(): number {
        return this._v[0];
    }

    get y(): number {
        return this._v[1];
    }

    set x(x: number) { this._v[0] = x; }
    set y(y: number) { this._v[1] = y; }

    set(x: number, y: number): Vector2 {
        this._v[0] = x;
        this._v[1] = y;
        return this;
    }

    /**
      * Read data from another vector into this vector.
      */
    read(v: Vector2): Vector2 {
        this._v[0] = v.x;
        this._v[1] = v.y;
        return this;
    }

    /**
      * Reverse the X and Y values.
      */
    reverse(): Vector2 {
        this._v.reverse();
        return this;
    }

    /**
      * Equivalent to rotating the vector 180 degrees.
      */
    flip(): Vector2 {
        this._v[0] = -this._v[0];
        this._v[1] = -this._v[1];
        return this;
    }

    /**
      * Create a new vector initialized with the values of this vector.
      */
    clone(): Vector2 {
        return new Vector2(this._v[0], this._v[1]);
    }

    add(vector: Vector2): Vector2 {
        this.addX(vector._v[0]);
        this.addY(vector._v[1]);
        return this;
    }

    addX(x: number): Vector2 {
        this._v[0] += x;
        return this;
    }

    addY(y: number): Vector2 {
        this._v[1] += y;
        return this;
    }

    subtract(vector: Vector2): Vector2 {
        this._v[0] -= vector._v[0];
        this._v[1] -= vector._v[1];
        return this;
    }

    /**
      * Alias for `subtract()`.
      */
    sub(vector: Vector2): Vector2 {
        return this.subtract(vector);
    }

    multiply(scale: number): Vector2 {
        this._v[0] *= scale;
        this._v[1] *= scale;
        return this;
    }

    /**
      * Alias for `multiply()`.
      */
    mul(scale: number): Vector2 {
        return this.multiply(scale);
    }

    /**
      * Alias for `multiply()`.
      */
    mult(scale: number): Vector2 {
        return this.multiply(scale);
    }

    divide(scale: number): Vector2 {
        this._v[0] /= scale;
        this._v[1] /= scale;
        return this;
    }

    /**
      * Alias for `divide()`.
      */
    div(scale: number): Vector2 {
        return this.divide(scale);
    }

    isEqualTo(vector: Vector2): boolean {
        return (this._v[0] == vector._v[0] && this._v[1] == vector._v[1]);
    }

    /**
      * Alias for `isEqualTo()`.
      */
    eql(vector: Vector2): boolean {
        return this.isEqualTo(vector);
    }

    setLength(scale: number): Vector2 {
        return this.normalize().multiply(scale);
    }

    getLength(): number {
        return Math.sqrt(Math.pow(this._v[0],2) + Math.pow(this._v[1],2));
    }

    normalize(): Vector2 {
        return this.div(this.getLength());
    }

    distance(vector: Vector2): number {
        return vector.clone().subtract(this).getLength();
    }

    angle(): number {
        return Math.atan2(this._v[0], this._v[1])*(180/Math.PI);
    }

    round(): Vector2 {
        this._v[0] = Math.round(this._v[0]);
        this._v[1] = Math.round(this._v[1]);
        return this;
    }

    /**
      * Rotate the given vector around the origin `[0, 0]`.
      */
    rotate(degrees: number, round?: number): Vector2 {
        round = round || 1;

        let theta = (Math.PI/180) * degrees;
        let cs = Math.cos(theta);
        let sn = Math.sin(theta);

        let px = this._v[0] * cs - this._v[1] * sn;
        let py = this._v[0] * sn + this._v[1] * cs;

        this._v[0] = px;
        this._v[1] = py;

        return this;
    }

    /**
      * Faster than calling `rotate(90)`.
      */
    rotate90(): Vector2 {
        let ox = this._v[0];
        this._v[0] = -this._v[1];
        this._v[1] = ox;
        return this;
    }

    /**
      * Alias to `rotate90`
      */
    rotate90C() {
        return this.rotate90();
    }

    /**
      * Same as `rotate90()` but instead rotates counter-clockwise.
      */
    rotate90CC() {
        let ox = this._v[0];
        this._v[0] = this._v[1];
        this._v[1] = -ox;
        return this;
    }

    /**
      * Faster than calling `rotate(180)` or `rotate90()` twice.
      */
    rotate180(): Vector2 {
        return this.flip();
    }

    cross(v2: Vector2): number {
        let v1 = this;
        return v1.x * v2.y - v1.y * v2.x;
    }

    vectorTo(v: Vector2): Vector2 {
        let vc = v.clone();
        return vc.subtract(this);
    }

    /**
      * Determine if the point lies within the given rectangle.
      */
    inRect(topLeft: Vector2, bottomRight: Vector2): boolean {
        return ( (this.x >= topLeft.x) && (this.x <= bottomRight.x) && (this.y >= topLeft.y) && (this.y <= bottomRight.y) );
    }

    /**
      * Determine if the point lies within the given triangle.
      */
    inTriangle (v1: Vector2, v2: Vector2, v3: Vector2): boolean {
        let sign1 = Vector2.areaTriangle(this, v1, v2) < 0;
        let sign2 = Vector2.areaTriangle(this, v2, v3) < 0;
        let sign3 = Vector2.areaTriangle(this, v3, v1) < 0;

        return ((sign1 == sign2) && (sign2 == sign3));
    }

    centerBetween(v2: Vector2): Vector2 {
        let v1 = this;
        let center = new Vector2( (v1.x + v2.x)/2, (v1.y + v2.y)/2 );
        return center;
    }

    /**
      * Returns a new array `[x, y]`.
      */
    toArray(): Array<number> {
        return this._v.slice();
    }

    log(): void {
        console.log(this._v[0], this._v[1]);
    }

    /**
      * Use the 1/2 determinant method to find the area of a triangle.
      */
    static areaTriangle(p1: Vector2, p2: Vector2, p3: Vector2) {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    }

    /**
      * Returns the point of intersection between 2 line segments.
      * Returns `undefined` if no intersection is found.
      */ 
    static segmentsIntersection(p: Vector2, p2: Vector2, q: Vector2, q2: Vector2): Vector2 {
        // TODO: Perhaps check in advance that points don't overlap on the opposite segment.

        var r = p2.clone().subtract(p);
        var s = q2.clone().subtract(q);

        var uNumerator = q.clone().subtract(p).cross(r);
        var denominator = r.clone().cross(s);

        if (uNumerator == 0 && denominator == 0) {
            // They are collinear
            return;
        }

        if (denominator == 0) {
            // lines are parallel
            return;
        }

        var t = q.clone().subtract(p).cross(s) / denominator;
        var u = uNumerator / denominator;

        if ( (t >= 0) && (t <= 1) && (u >= 0) && (u <= 1) ) {
            var intersectionPoint = p.clone().add(r.clone().multiply(t));
            return intersectionPoint;
        }
    }

    /**
      * Casts a ray from `v1` towards `v2` in an infinite 2d grid space. Returns an array of grid spaces the ray intersects between `v1` and `v2`.
      */
    static castBetween(v1: Vector2, v2: Vector2, width: number = 1): Vector2[] {
        let cellsCrossed: Vector2[] = [];

        v1 = v1.clone().div(width);
        v2 = v2.clone().div(width);

        let tDeltaX, tMaxX;
        let dx = Math.sign(v2.x - v1.x);
        if ( dx !== 0 ) tDeltaX = Math.min(dx / (v2.x - v1.x), 10000000);
        else tDeltaX = 10000000;
        if ( dx >= 0 ) tMaxX = tDeltaX * frac1(v1.x);
        else tMaxX = tDeltaX * frac0(v1.x);

        let tDeltaY, tMaxY;
        let dy = Math.sign(v2.y - v1.y);
        if ( dy !== 0 ) tDeltaY = Math.min(dy / (v2.y - v1.y), 10000000);
        else tDeltaY = 10000000;
        if ( dy >= 0 ) tMaxY = tDeltaY * frac1(v1.y);
        else tMaxY = tDeltaY * frac0(v1.y);

        let destX = Math.floor(v2.x);
        let destY = Math.floor(v2.y);

        let x = v1.x;
        let y = v1.y;
        while (true) {
            let fx = Math.floor(x);
            let fy = Math.floor(y);

            cellsCrossed.push(new Vector2(fx, fy));

            if (destX === fx && destY === fy) break;

            if (tMaxX < tMaxY) {
                tMaxX = tMaxX + (tDeltaX);
                x = x + dx;
            } else {
                tMaxY = tMaxY + (tDeltaY);
                y = y + dy;
            }
        }

        return cellsCrossed;
    }
}
