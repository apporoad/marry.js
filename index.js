// var dson = null
// var jvd = null
const utils = require('lisa.utils')
const uType = utils.Type
const atils = utils.Async
// try {
//     require.resolve('dson.js')
//     dson = require('dson.js').DSON
//     jvd = require('dson.js').JVD
// } catch (ex) {
//     //console.log(ex)
// }


/**
 *  {
 *      success : true,
 *      point : 1232,
 *      isLove : true or false,
 *      data : {}
 *  }
 */
var innerTouchOne = async (me, you, all, map, law) => {
    var resultTemplate = {
        success: false,
        point: 0,
        isLove: false,
        data: you
    }
    var demands = map[me]
    if (!demands || !uType.isObject(demands)) {
        return Object.assign({}, resultTemplate, {
            success: true
        })
    }
    /**
    {
    love : 'one'   , //  or Array 
    must :   (self , another, options) =>{
        console.log(options.others)
        console.log(options.law)
    },   // or Array   support dson
    pluses : {
        name : 'height',
        point : 4,
        item : (self , another , options) =>{ }
    }
     */
    var optionsTemplate = {
        law: law,
        others: all
    }
    //如果是love ， 其他不重要了
    if (demands.love) {
        if (await atils.ArrayContains(uType.isArray(demands.love) ? demands.love : [demands.love], you, async (you, love) => {
                if (uType.isFunction(love) || uType.isAsyncFunction(love)) {
                    //function asyncFunction
                    return await Promise.resolve(love(me, you, optionsTemplate))
                } else if (uType.isObject(love) && uType.isFunction(love.isDSON) && love.isDSON()) {
                    // dson or dson Array
                    return await love.doTest(you)
                } else {
                    //equils
                    return you == love
                }
            })) {
            return Object.assign({}, resultTemplate, {
                success: true,
                isLove: true
            })
        }
    }
    //must 是除了love外 必须满足的
    if (demands.must) {
        //只要一个不满足即为不满足
        if (await atils.ArrayContains(uType.isArray(demands.must) ? demands.must : [demands.must], you, async (you, oneMust) => {
                if (uType.isFunction(oneMust) || uType.isAsyncFunction(oneMust)) {
                    //function asyncFunction
                    return !(await Promise.resolve(oneMust(me, you, optionsTemplate)))
                } else if (uType.isObject(oneMust) && uType.isFunction(oneMust.isDSON) && oneMust.isDSON()) {
                    // dson or dson Array
                    return (await oneMust.doTest(you)) != true
                }
                return false
            })) {
            return resultTemplate
        }
    }
    // pluses 
    var total = 0
    if (demands.pluses) {
        var pArr = uType.isArray(demands.pluses) ? demands.pluses : [demands.pluses]
        for (var i = 0; i < pArr.length; i++) {
            if(!pArr[i]){
                continue
            }
            var plus = pArr[i].item || pArr[i]
            var result = 0
            if (uType.isFunction(plus) || uType.isAsyncFunction(plus)) {
                //function asyncFunction
                result = await Promise.resolve(plus(me, you, optionsTemplate))
            } else if (uType.isObject(plus) && uType.isFunction(plus.isDSON) && plus.isDSON()) {
                // dson or dson Array
                result = await plus.doDraw(you)
            }
            if(isNaN(result)){
                //todo debug
                if(result){
                    total += (pArr[i].point || 0)
                }
            }else{
                //todo debug
                total += (pArr[i].point || 1) * parseFloat(result)
            }
        }
    }
    return Object.assign({}, resultTemplate, {
        success: true,
        point: total
    })
}
/**
 * {
    betrothal : {},
    benches : [ {
        data:  {},
        point :  88
    }, {}]
}
 */
var innerTouch = async (me, all, map, law) => {
    var result = {
        betrothal: null,
        benches: []
    }
    var array = []
    if (me && uType.isArray(all)) {
        for (var i = 0; i < all.length; i++) {
            var you = all[i]
            //只有不同对象时
            if (me != you) {
                var postion = await innerTouchOne(me, you, all, map, law)
                if (postion.success) {
                    var reverse = await innerTouchOne(you, me, [me], map, law)
                    if (reverse.success) {
                        array.push(postion)
                    }
                }
            }
        }
    }
    if (array.length > 0) {
        array = utils.ArraySort(array, (one, two) => {
            if (one.isLove != two.isLove) {
                return (one.isLove ? 2 : 1) - (two.isLove ? 2 : 1)
            } else {
                return one.point - two.point
            }
        })
        result.betrothal = array[0].data
        for (var i = 1; i < array.length; i++) {
            result.benches.push({
                data: array[i].data,
                point: array[i].point
            })
        }
    }
    return result
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

    this.touch = async (me, others) => {
        return await innerTouch(me, others, _map, _law)
    }
    this.marry = async (array) => {
        console.log('todo in the future , 如果你急需这个功能，请github上面issue me')
    }
}


module.exports = function (law) {
    return new Marry(law)
}