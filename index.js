const { floor } = Math

class Unit {
    constructor(magnitude){
        this.magnitude = magnitude
    }
    convert(n){
        const mag = this.magnitude
        return [ floor(n / mag), n % mag ]
    }
    to(...units){
        const mag = this.magnitude
        return n => units.reduce(
            (arr, unit) => [
                ...arr.slice(0, -1), 
                ...unit.convert(arr[arr.length-1] * this.magnitude)
            ]
        , [n]).slice(0,-1)
    }
    from(...units){
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