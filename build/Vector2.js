"use strict";
function _frac0(f) {
    return f % 1;
}
function _frac1(f) {
    return 1 - f + Math.floor(f);
}
/**
  * *Keep in mind that Vector2 is **not an immutable class**. It is also assumed that your **positive y axis points down***.
  */
var Vector2 = (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._v = [x, y];
    }
    Object.defineProperty(Vector2.prototype, "x", {
        get: function () {
            return this._v[0];
        },
        set: function (x) { this._v[0] = x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "y", {
        get: function () {
            return this._v[1];
        },
        set: function (y) { this._v[1] = y; },
        enumerable: true,
        configurable: true
    });
    Vector2.prototype.set = function (x, y) {
        this._v[0] = x;
        this._v[1] = y;
        return this;
    };
    /**
      * Read data from another vector into this vector.
      */
    Vector2.prototype.read = function (v) {
        this._v[0] = v.x;
        this._v[1] = v.y;
        return this;
    };
    /**
      * Reverse the X and Y values.
      */
    Vector2.prototype.reverse = function () {
        this._v.reverse();
        return this;
    };
    /**
      * Equivalent to rotating the vector 180 degrees.
      */
    Vector2.prototype.flip = function () {
        this._v[0] = -this._v[0];
        this._v[1] = -this._v[1];
        return this;
    };
    /**
      * Create a new vector initialized with the values of this vector.
      */
    Vector2.prototype.clone = function () {
        return new Vector2(this._v[0], this._v[1]);
    };
    Vector2.prototype.add = function (vector) {
        this.addX(vector._v[0]);
        this.addY(vector._v[1]);
        return this;
    };
    Vector2.prototype.addX = function (x) {
        this._v[0] += x;
        return this;
    };
    Vector2.prototype.addY = function (y) {
        this._v[1] += y;
        return this;
    };
    Vector2.prototype.subtract = function (vector) {
        this._v[0] -= vector._v[0];
        this._v[1] -= vector._v[1];
        return this;
    };
    /**
      * Alias for `subtract()`.
      */
    Vector2.prototype.sub = function (vector) {
        return this.subtract(vector);
    };
    Vector2.prototype.multiply = function (scale) {
        this._v[0] *= scale;
        this._v[1] *= scale;
        return this;
    };
    /**
      * Alias for `multiply()`.
      */
    Vector2.prototype.mul = function (scale) {
        return this.multiply(scale);
    };
    /**
      * Alias for `multiply()`.
      */
    Vector2.prototype.mult = function (scale) {
        return this.multiply(scale);
    };
    Vector2.prototype.divide = function (scale) {
        this._v[0] /= scale;
        this._v[1] /= scale;
        return this;
    };
    /**
      * Alias for `divide()`.
      */
    Vector2.prototype.div = function (scale) {
        return this.divide(scale);
    };
    Vector2.prototype.isEqualTo = function (vector) {
        return (this._v[0] == vector._v[0] && this._v[1] == vector._v[1]);
    };
    /**
      * Alias for `isEqualTo()`.
      */
    Vector2.prototype.eql = function (vector) {
        return this.isEqualTo(vector);
    };
    Vector2.prototype.setLength = function (scale) {
        return this.normalize().multiply(scale);
    };
    Vector2.prototype.getLength = function () {
        return Math.sqrt(Math.pow(this._v[0], 2) + Math.pow(this._v[1], 2));
    };
    Vector2.prototype.normalize = function () {
        return this.div(this.getLength());
    };
    Vector2.prototype.distance = function (vector) {
        return vector.clone().subtract(this).getLength();
    };
    Vector2.prototype.angle = function () {
        return Math.atan2(this._v[0], this._v[1]) * (180 / Math.PI);
    };
    Vector2.prototype.round = function () {
        this._v[0] = Math.round(this._v[0]);
        this._v[1] = Math.round(this._v[1]);
        return this;
    };
    /**
      * Rotate the given vector around the origin `[0, 0]`.
      */
    Vector2.prototype.rotate = function (degrees, round) {
        round = round || 1;
        var theta = (Math.PI / 180) * degrees;
        var cs = Math.cos(theta);
        var sn = Math.sin(theta);
        var px = this._v[0] * cs - this._v[1] * sn;
        var py = this._v[0] * sn + this._v[1] * cs;
        this._v[0] = px;
        this._v[1] = py;
        return this;
    };
    /**
      * Faster than calling `rotate(90)`.
      */
    Vector2.prototype.rotate90 = function () {
        var ox = this._v[0];
        this._v[0] = -this._v[1];
        this._v[1] = ox;
        return this;
    };
    /**
      * Alias to `rotate90`
      */
    Vector2.prototype.rotate90C = function () {
        return this.rotate90();
    };
    /**
      * Same as `rotate90()` but instead rotates counter-clockwise.
      */
    Vector2.prototype.rotate90CC = function () {
        var ox = this._v[0];
        this._v[0] = this._v[1];
        this._v[1] = -ox;
        return this;
    };
    /**
      * Faster than calling `rotate(180)` or `rotate90()` twice.
      */
    Vector2.prototype.rotate180 = function () {
        return this.flip();
    };
    Vector2.prototype.cross = function (v2) {
        var v1 = this;
        return v1.x * v2.y - v1.y * v2.x;
    };
    Vector2.prototype.vectorTo = function (v) {
        var vc = v.clone();
        return vc.subtract(this);
    };
    /**
      * Determine if the point lies within the given rectangle.
      */
    Vector2.prototype.inRect = function (topLeft, bottomRight) {
        return ((this.x >= topLeft.x) && (this.x <= bottomRight.x) && (this.y >= topLeft.y) && (this.y <= bottomRight.y));
    };
    /**
      * Determine if the point lies within the given triangle.
      */
    Vector2.prototype.inTriangle = function (v1, v2, v3) {
        var sign1 = Vector2.areaTriangle(this, v1, v2) < 0;
        var sign2 = Vector2.areaTriangle(this, v2, v3) < 0;
        var sign3 = Vector2.areaTriangle(this, v3, v1) < 0;
        return ((sign1 == sign2) && (sign2 == sign3));
    };
    Vector2.prototype.centerBetween = function (v2) {
        var v1 = this;
        var center = new Vector2((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);
        return center;
    };
    /**
      * Returns a new array `[x, y]`.
      */
    Vector2.prototype.toArray = function () {
        return this._v.slice();
    };
    Vector2.prototype.log = function () {
        console.log(this._v[0], this._v[1]);
    };
    /**
      * Use the 1/2 determinant method to find the area of a triangle.
      */
    Vector2.areaTriangle = function (p1, p2, p3) {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    };
    /**
      * Returns the point of intersection between 2 line segments.
      * Returns `undefined` if no intersection is found.
      */
    Vector2.segmentsIntersection = function (p, p2, q, q2) {
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
        if ((t >= 0) && (t <= 1) && (u >= 0) && (u <= 1)) {
            var intersectionPoint = p.clone().add(r.clone().multiply(t));
            return intersectionPoint;
        }
    };
    /**
      * Casts a ray from `v1` towards `v2` in an infinite 2d grid space. Returns an array of grid spaces the ray intersects between `v1` and `v2`.
      */
    Vector2.castBetween = function (v1, v2, width) {
        if (width === void 0) { width = 1; }
        var cellsCrossed = [];
        v1 = v1.clone().div(width);
        v2 = v2.clone().div(width);
        var tDeltaX, tMaxX;
        var dx = Math.sign(v2.x - v1.x);
        if (dx !== 0)
            tDeltaX = Math.min(dx / (v2.x - v1.x), 10000000);
        else
            tDeltaX = 10000000;
        if (dx >= 0)
            tMaxX = tDeltaX * _frac1(v1.x);
        else
            tMaxX = tDeltaX * _frac0(v1.x);
        var tDeltaY, tMaxY;
        var dy = Math.sign(v2.y - v1.y);
        if (dy !== 0)
            tDeltaY = Math.min(dy / (v2.y - v1.y), 10000000);
        else
            tDeltaY = 10000000;
        if (dy >= 0)
            tMaxY = tDeltaY * _frac1(v1.y);
        else
            tMaxY = tDeltaY * _frac0(v1.y);
        var destX = Math.floor(v2.x);
        var destY = Math.floor(v2.y);
        var x = v1.x;
        var y = v1.y;
        while (true) {
            var fx = Math.floor(x);
            var fy = Math.floor(y);
            cellsCrossed.push(new Vector2(fx, fy));
            if (destX === fx && destY === fy)
                break;
            if (tMaxX < tMaxY) {
                tMaxX = tMaxX + (tDeltaX);
                x = x + dx;
            }
            else {
                tMaxY = tMaxY + (tDeltaY);
                y = y + dy;
            }
        }
        return cellsCrossed;
    };
    return Vector2;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Vector2;
