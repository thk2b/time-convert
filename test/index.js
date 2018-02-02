const test = require('tape')

const { Unit, h, m, s, ms } = require('../')

test('Unit constructor', t => {
    const unit = new Unit(123)
    t.assert(unit.magnitude = 123)
    t.end()
})
test('Unit methods are defined', t => {
    const unit = new Unit(123)
    t.assert(unit.convert !== undefined)
    t.assert(unit.to !== undefined)
    t.assert(unit.from !== undefined)
    t.end()
})

test('Unit `convert` method', t => {
    const unit = new Unit(123)
    t.deepEqual(unit.convert(12), [0, 12])
    t.deepEqual(unit.convert(123), [1, 0])
    t.deepEqual(unit.convert(1234), [10, 4])
    t.end()
})

test('Unit methods `to` and `from` return a function that returns the correct type', t => {
    const unit = new Unit(123)
    const unit1 = new Unit(1234)
    t.assert(typeof unit.to(unit1) === 'function' )
    t.assert(typeof unit.from(unit1) === 'function')
    t.assert(Array.isArray(unit.to(unit1)(123*123)))
    t.assert(typeof unit.from(unit1)(123) === 'number')
    t.end()
})

test('Unit method `to` whith time units', t => {
    t.deepEqual(ms.to(s)(1234), [1])
    t.deepEqual(
        ms.to(h,s)(3723000),
        [1, 123]
    )
    t.deepEqual(
        ms.to(h,m,s,ms)(3723004),
        [1,2,3,4]
    )
    t.end()
})

test('Unit method `from`', t => {
    t.equal(ms.from(s)(1), 1000)
    t.equal(s.from(h)(2), 3600 * 1000 * 2)
    t.equal(ms.from(h,s)(1, 123), 3723000)
    t.end()
})