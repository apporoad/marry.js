
### law
```js
//tobe done

```

### book
```js


var marry = M()

marry.book({}, {
    love : 'one'   , //  or Array  , or Function AsyncFunction　 \　suppport　DSON
    must :  async  (self , another, options) =>{
        console.log(options.others)
        console.log(options.law)
    },   // or Array   support dson 
    pluses : {
        name : 'height',
        point : 4,
        item : async (self , another , options) =>{ }
    } // 支持 function dson
})


// pluses 也支持 [ dson ,dson ]   [ function ，dson ]

```

### touch 返回值
```js
{
    betrothal : {},
    benches : [ {
        data:  {},
        points :  88
    }, {}]
}


```