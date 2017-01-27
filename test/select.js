const tk = require('timekeeper');
const { expect } = require('chai');
const moment = require('moment');
const select = require('../lib/select');

describe('select', () => {
  it('day', () => {
    const end = moment();
    const start = end.clone().add(-1, 'days');
    tk.freeze(end.toDate());
    expect(select('day')).to.deep.equal({
      start: start.format('YYYY/MM/DD'),
      end: end.format('YYYY/MM/DD'),
      format: 'YYYY/MM/DD'
    });
  });

  it('n days', () => {
    const end = moment();
    const start = end.clone().add(-3, 'days');
    tk.freeze(end.toDate());
    expect(select('3 days')).to.deep.equal({
      start: start.format('YYYY/MM/DD'),
      end: end.format('YYYY/MM/DD'),
      format: 'YYYY/MM/DD'
    });
  });

  it('n days before x', () => {
    const end = moment('2016-01-01', 'YYYY-MM-DD');
    const start = end.clone().add(-30, 'days');
    tk.freeze(end.toDate());
    expect(select('30 days', end.toDate())).to.deep.equal({
      start: start.format('YYYY/MM/DD'),
      end: end.format('YYYY/MM/DD'),
      format: 'YYYY/MM/DD'
    });
  });

  it('month', () => {
    const end = moment();
    const start = end.clone().add(-1, 'months');
    tk.freeze(end.toDate());
    expect(select('month')).to.deep.equal({
      start: start.format('YYYY/MM'),
      end: end.format('YYYY/MM'),
      format: 'YYYY/MM'
    });
  });

  it('year', () => {
    const end = moment();
    const start = end.clone().add(-1, 'years');
    tk.freeze(end.toDate());
    expect(select('year')).to.deep.equal({
      start: start.format('YYYY'),
      end: end.format('YYYY'),
      format: 'YYYY'
    });
  });

  it('custom format', () => {
    expect(select('[hh:mm] 12:00 - 20:00')).to.deep.equal({
      start: '12:00',
      end: '20:00',
      format: 'hh:mm'
    });
    expect(select('[hh:mm] 12:00 ~ 20:00')).to.deep.equal({
      start: '12:00',
      end: '20:00',
      format: 'hh:mm'
    });
  });

  it('unsupported format', () => {
    expect(() => select('WTF')).to.throw('Invalid format: WTF');
  });
});
