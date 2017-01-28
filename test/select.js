const tk = require('timekeeper');
const { expect } = require('chai');
const moment = require('moment-timezone');
const select = require('../lib/select');

describe('select', () => {
  afterEach(() => tk.reset());

  it('day', () => {
    const end = moment();
    const start = end.clone().add(-1, 'days');
    tk.freeze(end.toDate());
    expect(select('day')).to.deep.equal({
      start: start.toDate(),
      end: end.toDate()
    });
  });

  it('n days', () => {
    const end = moment();
    const start = end.clone().add(-3, 'days');
    tk.freeze(end.toDate());
    expect(select('3 days')).to.deep.equal({
      start: start.toDate(),
      end: end.toDate()
    });
  });

  it('n days before x', () => {
    const end = moment('2016-01-01', 'YYYY-MM-DD');
    const start = end.clone().add(-30, 'days');
    tk.freeze(end.toDate());
    expect(select('30 days', end.toDate())).to.deep.equal({
      start: start.toDate(),
      end: end.toDate()
    });
  });

  it('month', () => {
    const end = moment();
    const start = end.clone().add(-1, 'months');
    tk.freeze(end.toDate());
    expect(select('month')).to.deep.equal({
      start: start.toDate(),
      end: end.toDate()
    });
  });

  it('year', () => {
    const end = moment();
    const start = end.clone().add(-1, 'years');
    tk.freeze(end.toDate());
    expect(select('year')).to.deep.equal({
      start: start.toDate(),
      end: end.toDate()
    });
  });

  it('custom format', () => {
    const now = moment();
    tk.freeze(now.toDate());
    expect(select('[hh:mm] 12:00 - 20:00')).to.deep.equal({
      start: new Date(now.format('YYYY-MM-DD') + ' 12:00'),
      end: new Date(now.format('YYYY-MM-DD') + ' 20:00'),
      format: 'hh:mm'
    });
    expect(select('[hh:mm] 12:00 ~ 20:00')).to.deep.equal({
      start: new Date(now.format('YYYY-MM-DD') + ' 12:00'),
      end: new Date(now.format('YYYY-MM-DD') + ' 20:00'),
      format: 'hh:mm'
    });
  });

  it('unsupported format', () => {
    expect(() => select('WTF')).to.throw('Invalid format: WTF');
  });
});
