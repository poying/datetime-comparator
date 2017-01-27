datetime-comparator
===================

A utility to compare two datetime range.

```javascript
> const { compare } = require('datetime-comparator')
> compare('2 days', '[YYYY/MM/DD] 2017/01/01 - 2017/02/01')
-1
> ['2 months', '1 year', '[hh:mm] 10:00 - 12:00', '30 days'].sort(compare)
[ '[hh:mm] 10:00 - 12:00', '30 days', '2 months', '1 year' ]
```
