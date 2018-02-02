const { convert, createUnit, hours, minutes, seconds, milliseconds } = require('./index')


console.log(
    convert(minutes,seconds,milliseconds)(14567890)
        // .map(n => n < 10? '0'+n : n.toString())
        // .join(':')
)

const convert_ = (ms, separator=':', zeropad=true ) => {
    const res = convert(hours,minutes,seconds,milliseconds)(14567890)
    if(zeropad) return res
        .map(n => n < 10? '0'+n : n.toString())
        .join(separator)
    return res.join(separator)
}

// convert(12345678, 'hh:mm:ss.') - parse format string
// convert(h,m,s)(12345678)
// convert(12345678,h,m,s) - not curried
// convert(123456) - with default
// raw_convert(12345678) - returns the raw array
