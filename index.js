// var dson = null
// var jvd = null
const utils = require('lisa.utils')
const uType = utils.Type
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
var innerTouchOne = async (me, you , all , map) =>{
    var resultTemplate  = {
        success : false,
        point : 0,
        isLove : false,
        data  : me
    }
    var demands = map[me]
    if(!demands || !uType.isObject(demands)){
        return  Object.assign({}, resultTemplate , {
            success : true
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
    if(demands.love){
        if(utils.ArrayContains( uType.isArray(demands.love) ?  demands.love : [demands.love]  , you)){
            //todo  支持　ＤＳＯＮ
        }
    }

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
var innerTouch = async (me, all, map)=>{
    var result = {
        betrothal : null,
        benches : []
    }
    var array = []
    if(me && uType.isArray(all)){
        for(var i =0 ;i < all.length ;i ++){
            var you = all[i]
            //只有不同对象时
            if(me != you){
                var postion = await innerTouchOne(me,you ,all  ,map)
                if(postion.success){
                    var reverse = await innerTouchOne( you, me , [me], map)
                    if(reverse.success){
                        array.push(postion)
                    }
                }
            }
        }
    }
    if(array.length>0){
        array = utils.ArraySort(array, (one,two)=>{
            if(one.isLove !=  two.isLove){
                return ( one.isLove ?  2 : 1)  - (two.isLove ? 2 : 1)
            }
            else{
                return one.point - two.point
            }
        })
        result.betrothal = array[0].data
        for(var i =1 ;i < array.length ;i++){
            result.benches.push({
                data :  array[i].data,
                point : array[i].point
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
        return await innerTouch(me,others ,_map)
    }
    this.marry = async (array) => {
        console.log('todo in the future')
    }
}


module.exports = function (law) {
    return new Marry(law)
}