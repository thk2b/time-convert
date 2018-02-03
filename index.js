const { floor } = Math

class Unit {
    /**
     * Represents a time unit
     * @param {Number} magnitude - The number by which to multiply the unit to obtain its equivalent in the base unit (milliseconds).
     */
    constructor(magnitude){
        this.magnitude = magnitude
    }

    /**
     * Convert base units (milliseconds) to this unit.
     * @param {Number} n - Number of base units (miliseconds) to be converted.
     * @returns {[Number, Number]} - The floored number of units, and the remainder in base unit.
     */  
    convert(n){
        const mag = this.magnitude
        return [ floor(n / mag), n % mag]
    }

    /**
     * Returns a function that converts this unit to a number of other units.
     * @param {...Function} units - Any number of units, in order, to which to convert this unit.
     * @returns {Function}
     */
    to(...units){
        const mag = this.magnitude
            /**
             * @param {Number} n - Number of this unit to be converted.
             * @returns {Array} - Each element corresponds to a unit, in the same order they were passed to `convert`
             */
        return n => units.reduce(
                (arr, unit) => [
                    ...arr.slice(0, -1), 
                    ...unit.convert(arr[arr.length-1] * this.magnitude)
                ]
            , [n]).slice(0,-1)
            /* 
            ** The last element of the array always represents the base unit (miliseconds).
            ** For each unit, replace the last element of the result array by the number of units it contains,
            ** and carry the remainder, which is in milliseconds, as the last element.
            ** Finally, remove the last element (the last carried remainder).
            */ 
    }

    /**
     * Returns a function that converts a number of other units to this unit.
     * @param {...Function} units - Any number of units, in order.
     * @returns {Function}
     */
    from(...units){
        /**
         * @param {...Number} - Number of units, in the same order they were passed to the `from` method.
         * @returns {Number} - A number of this unit.
         */
        return (...ns) => units.reduce(
            (sum, unit, i) => sum + ns[i] * unit.magnitude
        , 0) / this.magnitude
    }
}

const ms = milliseconds = new Unit(1)
const s = seconds = new Unit(1000)
const m = minutes = new Unit(1000 * 60)
const h = hours = new Unit(1000 * 60 * 60)
const d = days = new Unit(1000 * 60 * 60 * 24)

module.exports = {
    Unit,
    d, h, m, s, ms,
    days, hours, minutes, seconds, milliseconds
}
