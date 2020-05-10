var dson = null
var jvd = null
const utils = require('lisa.utils')
const uType = utils.Type
try {
    require.resolve('dson.js')
    dson = require('dson.js').DSON
    jvd = require('dson.js').JVD
} catch (ex) {
    //console.log(ex)
}


function Marry(law) {
    var _law = law
    var _this = this
    var _map = new Map()
    this.book = (oneOrPairArray, demands) => {
        if (oneOrPairArray && demands) {
            _map[oneOrPairArray] = demands
        } else if (uType.isArray(oneOrPairArray) && oneOrPairArray.length > 0) {
            //   [ one , demands]  , null
            if (!uType.isArray(oneOrPairArray[0]) && oneOrPairArray.length == 2) {
                _map[oneOrPairArray[0]] = oneOrPairArray[1]
            } else {
                // [ [one,demands], [two,demands]]  , null
                oneOrPairArray.forEach(element => {
                    if (!uType.isArray(element) || element.length != 2) {
                        throw Error('marry.js -> book  : error params')
                    }
                    _map[element[0]] = element[1]
                })
            }
        } else {
            throw Error('marry.js -> book  : error params')
        }
    }

    this.law = (law) => {
        if (law)
            _law = law
        return _law
    }

    this.touch = (me, others) => {

    }
    this.marry = (array) => {
        console.log('todo in the future')
    }
}


module.exports = function (law) {
    return new Marry(law)
}