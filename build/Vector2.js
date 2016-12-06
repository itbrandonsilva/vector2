"use strict";
/**
  * *WARNING: All calls that need to modify the host vector will do so **in place***.
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
    /*set(v: Vector2): Vector2 {
        this._v[0] = v.x;
        this._v[1] = v.y;
        return this;
    }*/
    Vector2.prototype.mimic = function (v) {
        this._v[0] = v.x;
        this._v[1] = v.y;
        return this;
    };
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
    Vector2.prototype.sub = function (vector) {
        return this.subtract(vector);
    };
    Vector2.prototype.multiply = function (scale) {
        this._v[0] *= scale;
        this._v[1] *= scale;
        return this;
    };
    Vector2.prototype.mul = function (scale) {
        return this.multiply(scale);
    };
    Vector2.prototype.mult = function (scale) {
        return this.multiply(scale);
    };
    Vector2.prototype.divide = function (scale) {
        this._v[0] /= scale;
        this._v[1] /= scale;
        return this;
    };
    Vector2.prototype.div = function (scale) {
        return this.divide(scale);
    };
    Vector2.prototype.isEqual = function (vector) {
        return (this._v[0] == vector._v[0] && this._v[1] == vector._v[1]);
    };
    Vector2.prototype.setLength = function (scale) {
        return this.normalize().multiply(scale);
    };
    Vector2.prototype.getLength = function () {
        return Math.sqrt(Math.pow(this._v[0], 2) + Math.pow(this._v[1], 2));
    };
    Vector2.prototype.normalize = function () {
        return this.div(this.getLength());
        //let l = this.getLength();
        //this._v[0] /= l;
        //this._v[1] /= l;
        //return this;
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
      * Rotate the given vector around the origin [ 0, 0 ].
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
      * Use the 1/2 determinant method to find the area of a triangle.
      */
    Vector2.areaTriangle = function (p1, p2, p3) {
        return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
    };
    Vector2.prototype.toArray = function () {
        return this._v.slice();
    };
    Vector2.prototype.log = function () {
        console.log(this._v[0], this._v[1]);
    };
    return Vector2;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Vector2;
