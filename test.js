var marry = require('./index')()
var DSON = require('dson.js')
var d = DSON.DSON
var j = DSON.JVD
var it2 = global.debug || it



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

var diffGender = (self,another, options)=>{
    return self.gender != another.gender
}
// book demands
marry.book( lights.yellow , {
    love : [ lights.qin , lights.ishabella],
    must : [ diffGender],
    pluses : [ d('pretty'), (self,another)=>{ return 100- another.magic || 0} ]
})

marry.book(lights.blue , {
    love : lights.qin,
})
marry.book(lights.light , {
    love : lights.ishabella
})
marry.book(lights.qin , {
    love : lights.blue,
    must : (me,another)=> { return another == lights.blue}
})
marry.book(lights.ishabella, {
    love : lights.light,
    must : [(me,another)=> { return another == lights.light}]
})

marry.book(lights.cook , {
    must : d('gender').test('=1'),
    pluses :[
        {
            name : 'strong',
            point : 1,
            item : d('strong')
        },
        {
            name : 'magic',
            point : 2,
            item :async (self,another, options)=>{
                return Promise.resolve( 100 - another.magic)
            }
        }
    ]
})


it2('hello main' , async ()=>{
    var data = await marry.touch(lights.yellow,persons)
    expect(data.benches.length).toBe(2)
    expect(data.betrothal.name).toBe('lute')

    var data2 = await marry.touch(lights.cook, persons)
    
    expect(data2.debug.length).toBe(3)
    expect(data2.debug[0].point).toBe(80 + (100-30)*2)
})