const moment = require('moment-timezone');
const select = require('./select');

module.exports = function compare(value1, value2, options) {
  const duration1 = diff(isSelected(value1) ? value1 : select(value1, options));
  const duration2 = diff(isSelected(value2) ? value2 : select(value2, options));
  return duration1 === duration2
    ? 0
    : duration1 > duration2
    ? 1
    : -1;
};

function isSelected(value) {
  return Boolean(value.start && value.end);
}

function diff(value) {
  const start = moment(value.start);
  const end = moment(value.end);
  return end.diff(start);
}
