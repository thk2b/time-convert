const { convert, createUnit, hours, minutes, seconds, milliseconds } = require('./index')


console.log(
    convert(hours,minutes,seconds,milliseconds)(14567890)
        .map(n => n < 10? '0'+n : n.toString())
        .join(':')
)