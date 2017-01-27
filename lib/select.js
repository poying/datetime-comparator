const assert = require('assert');
const moment = require('moment');

const unitRe = /^(?:(\d+)\s*)?(year|month|day)s?$/;
const customFormatRe = /^\[(.+)\]([^\-~]+?)[\-~](.+)$/;

module.exports = function select(value, currTime) {
  currTime || (currTime = new Date());
  currTime = moment(currTime);
  return customFormatToRange(value, currTime)
    || unitFormatToRange(value, currTime)
    || notSupport(value, currTime);
};

function customFormatToRange(value) {
  const parts = customFormatRe.exec(value);
  if (!parts) {
    return;
  }
  const format = parts[1].trim();
  const time1 = moment(parts[2].trim(), format).toDate();
  const time2 = moment(parts[3].trim(), format).toDate();
  assert(time2 >= time1, 'End time can\'t smaller then start time');
  return {
    start: parts[2].trim(),
    end: parts[3].trim(),
    format
  };
}

function unitFormatToRange(value, currTime) {
  const parts = unitRe.exec(value);
  if (!parts) {
    return;
  }
  const end = currTime;
  const time = Number(parts[1]) | 0 || 1;
  const unit = parts[2];
  const start = end.clone().add(-1 * time, unit);
  const format = {
    day: 'YYYY/MM/DD',
    month: 'YYYY/MM',
    year: 'YYYY'
  }[unit];
  return {
    start: start.format(format),
    end: end.format(format),
    format
  };
}

function notSupport(value) {
  throw new Error('Invalid format: ' + value);
}
