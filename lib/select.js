const assert = require('assert');
const moment = require('moment-timezone');
const jstz = require('jstimezonedetect');

const defaultTimezone = jstz.determine().name();
const unitRe = /^(?:(\d+)\s*)?(year|month|day)s?$/;
const customFormatRe = /^\[(.+)\]([^\-~]+?)[\-~](.+)$/;

module.exports = function select(value, options) {
  options = Object.assign({
    currentTime: new Date(),
    timezone: defaultTimezone
  }, options || {});
  options.currentTime = moment(options.currentTime);
  return customFormatToRange(value, options)
    || unitFormatToRange(value, options)
    || notSupport(value, options);
};

function customFormatToRange(value, options) {
  const parts = customFormatRe.exec(value);
  if (!parts) {
    return;
  }
  const format = parts[1].trim();
  const time1 = moment.tz(parts[2].trim(), format, options.timezone).toDate();
  const time2 = moment.tz(parts[3].trim(), format, options.timezone).toDate();
  assert(time2 >= time1, 'End time can\'t smaller then start time');
  return {
    start: time1,
    end: time2,
    format
  };
}

function unitFormatToRange(value, options) {
  const parts = unitRe.exec(value);
  if (!parts) {
    return;
  }
  const end = options.currentTime.clone();
  const time = Number(parts[1]) | 0 || 1;
  const unit = parts[2];
  const start = end.clone().add(-1 * time, unit);
  return {
    start: start.toDate(),
    end: end.toDate()
  };
}

function notSupport(value) {
  throw new Error('Invalid format: ' + value);
}
