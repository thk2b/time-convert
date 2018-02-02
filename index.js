const createUnit = msInUnit => ms => [ Math.floor(ms / msInUnit), ms % msInUnit ]

const h = hours = createUnit(3600000)
const m = minutes = createUnit(60000)
const s = seconds = createUnit(1000)
const ms = milliseconds = createUnit(1)

const convert = (...units) => ms => units.reduce(
    (arr, fn) => [...arr.slice(0, -1), ...fn(arr[arr.length-1])]
, [ms]).slice(0, -1)

module.exports = {
    convert,
    createUnit,
    hours, minutes, seconds, milliseconds,
    /* unit shorthands */
    h, m, s, ms
}
