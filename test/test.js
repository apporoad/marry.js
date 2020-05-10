var marry = require('../index')()
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


var persons = [
    { name : 'red' , gender : 1 , pretty : 90 , strong : 80  , magic : 30},
    { name : 'yellow' , gender : 1 , pretty :60 , strong : 95 , magic : 0},
    { name : 'blue' , gender : 1 ,  pretty : 80 , strong : 30 , magic : 90},
    { name : 'light' , gender : 1 , pretty : 99 , strong : 90 , magic : 99},
    { name : 'cook' , gender : 1 , pretty : 30 , strong : 85, magic : 30 },
    { name : 'qin' , gender : 2 , pretty: 95 , magic: 50 },
    { name : 'ishabella' , gender : 2 , pretty : 99 , magic : 99},
    { name : 'lily' , gender : 2 , pretty :46 , magic : 30},
    { name : 'lute' , gender : 2 , pretty : 90 , magic :25},
    { name : 'huimei' , gender : 2 , pretty : 55 , magic : 0}
]


// yellow demands
marry.book(persons[1] , {
    love : [ persons[5] , persons[6]],
    must : (self , another ,options ) =>{ },
    pluses : []
})

