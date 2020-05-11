# marry.js
they match  
marry.js 主要做的是匹配  
marry 将匹配做了简单封装，非常有意思的可以让你找到与你需求一致的东西  
笔者想到的最多的场景是 根据tags匹配，根据特征寻找  
now just try it and love her  

## just do it
```bash
npm i --save marry.js
```
```js
var marry = require('marry.js')()

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


var test async ()=>{
    var data = await marry.touch(lights.yellow,persons)
    console.log(data.benches.length)
    console.log(data.betrothal.name)
}
test()
```

## with dson.js
[dson.js](https://github.com/apporoad/dson.js)

```bash
npm i dson.js
```
```js
var marry = require('./index')()
var DSON = require('dson.js')
var d = DSON.DSON
var j = DSON.JVD

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

var test async ()=>{
    var data2 = await marry.touch(lights.cook, persons)
    console.log(data2.debug.length)
    console.log(data2.debug[0].point)
}
test()


```

## notions
1. betrothal
婚约者，即你最合适的对象
your best choose
2. benches
备胎，你的备选对象们
B-plans
3. love
你的love， 是最优先的，甚至超越law， 当然需要双方相爱才行
4. law 
婚姻法， 除了对相爱的人无效外，其他人均需要遵守
[尚未实现]
5. must
你的必要需求，如果对方没法满足你的must，pass him/her  , 当然如果你已经爱上 him/her 了，must也是无关紧要的
6. pluses
你的需求加分项，你当然会想你的另一半更漂亮一点，身材更棒...在对方满足你的must之后，就要看对方的得分了！！！  
加分项，支持加权，排序时，根据总分排名
7. institutionOfMarriage  1:1
婚配比， marry方法时起效，当然[尚未实现]  
当然默认是一夫一妻制， 一夫多妻也是可以
8. 策略
如果当真有 [恋爱禁止的世界](https://zh.wikipedia.org/wiki/%E6%88%80%E6%84%9B%E8%88%87%E8%AC%8A%E8%A8%80) , 那就用策略来实现，[尚未实现]

