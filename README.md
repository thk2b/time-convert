# convert-ms
🕓 Convert milliseconds to any unit(s).

# Usage
```js
const { ms, s, m, h, d } = require('convert-ms')
const { milliseconds, seconds, minutes, hours, days } = require('convert-ms')

/* convert milliseconds to hours, minutes and seconds */
ms.to(h,m,s)(12345678) // [4, 2, 47]

/* convert milliseconds to minutes and seconds */
ms.to(m,s)(12345678) // [242, 47]

/* get milliseconds from 12 hours, 23 minutes, 45 seconds*/
ms.from(h,m,s)(12, 23, 45) // 44625000

/* get hours from 123 minutes and 12 seconds */
h.from(m,s)(123, 12) // 2.0533333333333332
```

What happends under the hood? The `convert` curried function calls all functions passed to it, in order. The `h`, `m`, etc.. functions convert milliseconds to their respective units (hours, minutes, etc...). You can choose which unit functions to include in the conversion, or even create your own by using `createUnit`. 

The only restriction is that units must be in descending order of magnitude.

# Philosophy
`convert-ms` performs the convertion with the units you specify, but is agnostic as to what you want to do with the converted units.

It is encouraged that you create your own wrapper functions for you specific use-case. 
For instance, to convert milliseconds to a `hh:mm:ss` format, you can write the following:

```js
const msToHms = ms => (
    convert(h,m,s)(ms)
        .map(n => n < 10? '0'+n : n.toString()) // zero-pad
        .join(':')
)
msToHms(12345678) // '04:02:47'
```
