const { expect } = require('chai');
const moment = require('moment-timezone');
const select = require('../lib/select');
const compare = require('../lib/compare');

describe('compare', () => {
  it('range1 > range2', () => {
    expect(compare('[hh:mm] 10:00 - 12:00', '[hh:mm] 13:00 - 13:30')).to.equal(1);
  });

  it('range1 < range2', () => {
    expect(compare('[hh:mm] 10:00 - 12:00', '[hh:mm] 13:00 - 20:00')).to.equal(-1);
  });

  it('range1 = range2', () => {
    expect(compare('[hh:mm] 10:00 - 12:00', '[hh:mm] 10:00 - 12:00')).to.equal(0);
  });

  describe('custom format and unit format', () => {
    it('range1 > range2', () => {
      expect(compare('day', '[hh:mm] 13:00 - 13:30')).to.equal(1);
    });

    it('range1 < range2', () => {
      expect(compare('2 days', '[YYYY/MM/DD hh:mm] 2017/01/01 13:00 - 2017/03/01 20:00')).to.equal(-1);
    });

    it('range1 = range2', () => {
      expect(compare('[hh:mm] 00:00 - 24:00', 'day')).to.equal(0);
    });
  });

  describe('selected value', () => {
    it('select(range1) > range2', () => {
      expect(compare(select('[hh:mm] 10:00 - 12:00'), '[hh:mm] 13:00 - 13:30')).to.equal(1);
    });

    it('range1 < select(range2)', () => {
      expect(compare('[hh:mm] 10:00 - 12:00', select('[hh:mm] 13:00 - 20:00'))).to.equal(-1);
    });

    it('select(range1) = select(range2)', () => {
      expect(compare(select('[hh:mm] 10:00 - 12:00'), select('[hh:mm] 10:00 - 12:00'))).to.equal(0);
    });
  });
});
