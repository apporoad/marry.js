var marry = require('../index')()
var DSON = require('dson.js')
var d = DSON.DSON
var j = DSON.JVD
// var persons = [
//     { name : 'apporoad' , gender : 1 , height : 168 ,weight : 68 , pretty : 85},
//     { name : 'lilei' , gender : 1 , height : 180 ,weight : 70 , pretty :60},
//     { name : 'jay' , gender : 1 ,  height : 160 , weight : 80 , pretty : 30  },
//     { name : 'bench' , gender : 1 , height : 173, weight : 58, pretty : 75},
//     { name : 'red' , gender : 1 ,  },
//     { name : 'luna' , gender : 2},
//     { name : 'LiSA' , gender : 2},
//     { name : 'aoer' , gender : 2},
//     { name : 'ishabella' , gender : 2},
//     { name : 'lute' , gender : 2},
//     { name : 'huimei' , gender : 2}
// ]

var lights = {
    red : { name : 'red' , gender : 1 , pretty : 90 , strong : 80  , magic : 30},
    yellow :{ name : 'yellow' , gender : 1 , pretty :60 , strong : 95 , magic : 0},
    blue : { name : 'blue' , gender : 1 ,  pretty : 80 , strong : 30 , magic : 90},
    light : { name : 'light' , gender : 1 , pretty : 99 , strong : 90 , magic : 99},
    cook :  { name : 'cook' , gender : 1 , pretty : 30 , strong : 85, magic : 30 },
    qin : { name : 'qin' , gender : 2 , pretty: 95 , magic: 50 },
    ishabella : { name : 'ishabella' , gender : 2 , pretty : 99 , magic : 99}
}
var persons = [
    lights.red,
    lights.yellow,
    lights.blue,
    lights.light,
    lights.cook,
    lights.qin,
    lights.ishabella,
    { name : 'lily' , gender : 2 , pretty :46 , magic : 30},
    { name : 'lute' , gender : 2 , pretty : 90 , magic :25},
    { name : 'huimei' , gender : 2 , pretty : 55 , magic : 0}
]


// book demands
marry.book( lights.yellow , {
    love : [ lights.qin , lights.ishabella],
    must : (self , another ,options ) =>{ },
    pluses : []
})

//todo test