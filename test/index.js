const test = require('tape')

const { convert, createUnit, hours, minutes, seconds, milliseconds } = require('../index')

test('unit factory', t => {
    const unit = createUnit(123)
    t.assert(typeof unit === 'function')
    const [quotient, remainder] = unit(123 * 123 + 99)
    t.equal(quotient, 123)
    t.equal(remainder, 99)
    t.end()
})

test('convert returns a function', t => {
    t.assert(typeof convert(hours) === 'function')
    t.end()
})

test('converter function return an array', t => {
    t.assert(Array.isArray(convert(hours)(1)))
    t.end()
})

test('convert milliseconds to hours', t => {
    const result = convert(hours)(3600123)
    t.deepEqual(convert(hours)(3600123),[1])
    t.end()
})

test('convert milliseconds to hours:seconds', t => {
    const result = convert(hours, seconds)(3723000)
    t.deepEqual(result, [1,123])
    t.end()
})

test('convert milliseconds to hours:minutes:seconds:milliseconds', t => {
    const result = convert(hours, minutes, seconds, milliseconds)(3723004)
    t.deepEqual(result, [1,2,3,4])
    t.end()
})
