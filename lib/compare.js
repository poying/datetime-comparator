const moment = require('moment');
const select = require('./select');

module.exports = function compare(value1, value2, currTime) {
  const duration1 = diff(isSelected(value1) ? value1 : select(value1, currTime));
  const duration2 = diff(isSelected(value2) ? value2 : select(value2, currTime));
  return duration1 === duration2
    ? 0
    : duration1 > duration2
    ? 1
    : -1;
};

function isSelected(value) {
  return Boolean(value.start && value.end && value.format);
}

function diff(value) {
  const start = moment(value.start, value.format);
  const end = moment(value.end, value.format);
  return end.diff(start);
}
