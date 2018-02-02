# convert-ms
convert milliseconds to any format

# usage
```js
const { convert, h, m, s, ms } = require('convert-ms')

convert(h,m,s)(12345678) // [4, 2, 47]
convert(m,s)(12345678) // [242, 47]
```

What happends under the hood? The `convert` curried function calls all functions passed to it, in order. The `h`, `m`, etc.. functions convert milliseconds to their respective units (hours, minutes, etc...). You can choose which unit functions to include in the conversion, or even create your own by using `createUnit`. 

The only restriction is that units must be in descending order of magnitude.

# philosphy
`convert-ms` performs the convertion with the units you specify, but is agnostic as to what you want to do with the converted units.

It is encouraged that you create your own wrapper functions for you specific use-case. For instance, to convert milliseconds to a `hh:mm:ss` format, you can write the following:

```js
    convert(h,m,s)(14567890)
        .map(n => n < 10? '0'+n : n.toString()) // zero-pad
        .join(':')
```
