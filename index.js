/**
 * @param {Number} msInUnit - Number of milliseconds in the unit.
 * @returns {Function} - Returns a unit function that takes a Number of milliseconds
 *                       and returns an array with the remainder followed by the quotient
 */
const createUnit = msInUnit => 
    /**
     * @param {Number} ms - miliseconds to be converted
     * @returns {[Number, Number]} - the number of units in the passed milliseconds, and the remainder in milliseconds
     */    
    ms => [
        Math.floor(ms / msInUnit),
        ms % msInUnit
    ]

const hours = createUnit(3600000)
const minutes = createUnit(60000)
const seconds = createUnit(1000)
const milliseconds = createUnit(1)

/**
 * Creates a converter function
 * @param {...Function} units - Any number of unit functions to be applied, in order, to the milliseconds
 * @returns {Function}
 */
const convert = (...units) => 
    /**
     * @param {Number} ms - milliseconds to be converted
     * @returns {Array} - Each element coresponds to a unit, in the same order they were passed to `convert`
     */
    ms => units
        .reduce(
            (arr, fn) => [...arr.slice(0, -1), ...fn(arr[arr.length-1])]
        , [ms])
        .slice(0, -1)
    /* 
    ** The last element of the array always represents miliseconds.
    ** For each unit, replace the last element of the result array by the number of units it contains,
    ** and carry the remainder, which is in milliseconds, as the last element.
    */

module.exports = {
    convert,
    createUnit,
    hours, minutes, seconds, milliseconds,
    /* unit shorthands */
    h: hours, m: minutes, s: seconds, ms: milliseconds
}
