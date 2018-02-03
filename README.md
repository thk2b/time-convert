[![npm version](https://badge.fury.io/js/time-convert.svg)](https://badge.fury.io/js/time-convert)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

# time-convert
🕓 Convert durations to other time unit(s).

# Usage
`npm install time-convert`
```js
const { ms, s, m, h, d } = require('time-convert')
/* verbose equivalent */
const { milliseconds, seconds, minutes, hours, days } = require('time-convert') 

/* convert milliseconds to hours, minutes and seconds */
ms.to(h,m,s)(12345678) // [4, 2, 47]

/* convert milliseconds to minutes and seconds */
ms.to(m,s)(12345678) // [242, 47]

/* get milliseconds from 12 hours, 23 minutes, 45 seconds*/
ms.from(h,m,s)(12, 23, 45) // 44625000

/* get hours from 123 minutes and 12 seconds */
h.from(m,s)(123, 12) // 2.0533333333333332

/* ⚠️ precision is lost */
ms.to(s)(1234) // [1] , not [1.234]
```

The only restriction is that units must be in descending order of magnitude – avoid calling `ms.to(m, h, s)`.

# Philosophy
`time-convert` performs the convertion with the units you specify, but is agnostic as to what you want to do with the converted units.

It is encouraged that you create your own wrapper functions for you specific use-case. 
For instance, to convert milliseconds to a `hh:mm:ss` format, you can write the following:

```js
const msToHms = ms => (
    ms.to(h,m,s)(ms)
        .map(n => n < 10? '0'+n : n.toString()) // zero-pad
        .join(':')
)
msToHms(12345678) // '04:02:47'
```

# Contributing
Contributions welcome.

Possible additions:
- Generalize to units other than time, such as distance, volume, or even currency using a 3rd party exchange-rate API.
This addition requires making sure that precision is not lost in operations. 

# Test
`npm run test`
