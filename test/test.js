"use strict";

const Vector2 = require('../build/Vector2.js').default;
const chai = require('chai');
const expect = chai.expect;
chai.should();

describe('Vector2', () => {
    it('can be constructed', () => {
        let v = new Vector2(1, 2);
        v.x.should.equal(1);
        v.y.should.equal(2);
    });
    it('can construct from() an array', () => {
        let v = Vector2.from([1, 2]);
        v.x.should.equal(1);
        v.y.should.equal(2);
    });
    it('can read() from another vector', () => {
        let v1 = new Vector2(1, 1);
        let v2 = new Vector2(2, 3);
        v1.read(v2);
        v1.x.should.equal(2);
        v2.y.should.equal(3);
    });
    it('can clone() into a new vector', () => {
        let v = new Vector2(2, 3);
        let cloned = v.clone();
        cloned.x.should.equal(2);
        cloned.y.should.equal(3);
    });
    it('can flip()', () => {
        let v = new Vector2(3, 3);
        v.flip();
        v.x.should.equal(-3);
        v.y.should.equal(-3);
    });
    it('can reverse()', () => {
        let v = new Vector2(1, 2);
        v.reverse();
        v.x.should.equal(2);
        v.y.should.equal(1);
    });
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
    it('can rotate90()', () => {
        let v = new Vector2(0, 5);
        v.rotate90();
        v.x.should.equal(-5);
        v.y.should.equal(0);

        v.rotate90C();
        v.x.should.equal(0);
        v.y.should.equal(-5);
    });
    it('can rotate90CC()', () => {
        let v = new Vector2(0, 5);
        v.rotate90CC();
        v.x.should.equal(5);
        v.y.should.equal(0);
        
        v.rotate90CC();
        v.x.should.equal(0);
        v.y.should.equal(-5);
    });
    it('can find if a point is inTriangle()', () => {
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
    it('can find a segmentsIntersection()', () => {
        let s1p1 = new Vector2(1, 2);
        let s1p2 = new Vector2(3, 2);
        let s2p1 = new Vector2(2, 1);
        let s2p2 = new Vector2(2, 3);

        let intersection = Vector2.segmentsIntersection(s1p1, s1p2, s2p1, s2p2);
        intersection.x.should.equal(2);
        intersection.y.should.equal(2);

        s2p1 = new Vector2(4, 4);
        s2p2 = new Vector2(4, 5);
        intersection = Vector2.segmentsIntersection(s1p1, s1p2, s2p1, s2p2);
        expect(intersection).to.be.undefined;
    });
    it('can toArray()', () => {
        let v = new Vector2(1, 2);
        let a = v.toArray();
        a[0].should.be.equal(1);
        a[1].should.be.equal(2);
    });
    it('can castBetween()', () => {
        let cells = Vector2.castBetween(new Vector2(0, 0), new Vector2(5, 5));
        cells.length.should.equal(11);

        let first = cells[0];
        first.x.should.equal(0);
        first.y.should.equal(0);

        let last = cells.pop();
        last.x.should.equal(5);
        last.y.should.equal(5);

        cells = Vector2.castBetween(new Vector2(1, 1), new Vector2(5, 1));
        cells.length.should.equal(5);

        first = cells[0];
        first.x.should.equal(1);
        first.y.should.equal(1);

        last = cells.pop();
        last.x.should.equal(5);
        last.y.should.equal(1);

        cells = Vector2.castBetween(new Vector2(2, 1), new Vector2(2, 8));
        cells.length.should.equal(8);

        first = cells[0];
        first.x.should.equal(2);
        first.y.should.equal(1);

        last = cells.pop();
        last.x.should.equal(2);
        last.y.should.equal(8);

        cells = Vector2.castBetween(new Vector2(6, 6), new Vector2(2, 2));
        cells.length.should.equal(9);

        first = cells[0];
        first.x.should.equal(6);
        first.y.should.equal(6);

        last = cells.pop();
        last.x.should.equal(2);
        last.y.should.equal(2);
    });

    it('can calc dot() product', () => {
        let v1 = new Vector2(5, -5);

        let v2;
        let dot;

        v2 = new Vector2(2, 0);
        dot = v1.dot(v2);
        dot.should.equal(10);

        v2 = new Vector2(1, 0);
        dot = v1.dot(v2);
        dot.should.equal(5);
    });
});
