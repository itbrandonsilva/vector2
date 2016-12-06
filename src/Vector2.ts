/**
  * *WARNING: All calls that need to modify the host vector will do so **in place***.
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

    /*set(v: Vector2): Vector2 {
        this._v[0] = v.x;
        this._v[1] = v.y;
        return this;
    }*/

    mimic(v: Vector2): Vector2 {
        this._v[0] = v.x;
        this._v[1] = v.y;
        return this;
    }

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

    sub(vector: Vector2): Vector2 {
        return this.subtract(vector);
    }

    multiply(scale: number): Vector2 {
        this._v[0] *= scale;
        this._v[1] *= scale;
        return this;
    }

    mul(scale: number): Vector2 {
        return this.multiply(scale);
    }

    mult(scale: number): Vector2 {
        return this.multiply(scale);
    }

    divide(scale: number): Vector2 {
        this._v[0] /= scale;
        this._v[1] /= scale;
        return this;
    }

    div(scale: number): Vector2 {
        return this.divide(scale);
    }

    isEqual(vector: Vector2): boolean {
        return (this._v[0] == vector._v[0] && this._v[1] == vector._v[1]);
    }

    setLength(scale: number): Vector2 {
        return this.normalize().multiply(scale);
    }

    getLength(): number {
        return Math.sqrt(Math.pow(this._v[0],2) + Math.pow(this._v[1],2));
    }

    normalize(): Vector2 {
        return this.div(this.getLength());
        //let l = this.getLength();
        //this._v[0] /= l;
        //this._v[1] /= l;
        //return this;
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
      * Rotate the given vector around the origin [ 0, 0 ].
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
      * Use the 1/2 determinant method to find the area of a triangle.
      */
    static areaTriangle(p1: Vector2, p2: Vector2, p3: Vector2) {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    }

    toArray(): Array<number> {
        return this._v.slice();
    }

    log(): void {
        console.log(this._v[0], this._v[1]);
    }
}
