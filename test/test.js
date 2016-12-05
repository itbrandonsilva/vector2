const Vector2 = require('../dist/Vector2.js').default;
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
});
