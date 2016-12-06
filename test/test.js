"use strict";

const Vector2 = require('../build/Vector2.js').default;
const chai = require('chai');
chai.should();

describe('Vector2', () => {
    it('can round()', () => {
        let v = new Vector2(398.883, 103.335).round();
        v.x.should.equal(399);
        v.y.should.equal(103);
    });
    it('can rotate()', () => {
        let v = new Vector2(5, 0);
        v.rotate(90).round();
        v.x.should.equal(0);
        v.y.should.equal(5);
    });
    it ('can find if a point is inTriangle()', () => {
        let v1 = new Vector2(2, 2);
        let v2 = new Vector2(3, 2);
        let v3 = new Vector2(2, 3);

        let isWithin;

        let point1 = new Vector2(2.1, 2.1);
        isWithin = point1.inTriangle(v1, v2, v3);
        isWithin.should.be.true;

        let point2 = new Vector2(3.1, 2);
        isWithin = point2.inTriangle(v1, v2, v3);
        isWithin.should.be.false;

        let point3 = new Vector2(2, 3.1);
        isWithin = point3.inTriangle(v1, v2, v3);
        isWithin.should.be.false;
    });
});
