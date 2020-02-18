# render
前端快速渲染引擎
```html
<div class='array' render-for="data">
{{name}} {{age}}
</div>

<div class="two" render-obj="data">
    <h1>{{age}}</h1>
    <h1>{{name}}</h1>
</div>
```
```javascript
// 渲染数组
// render array
NewRender(".array").for({data:[{name:"a",age:"b"},{name:"c",age:"d"}]})
let X = new Render(".root");
X.obj({data: {name: "AAAA", age: 123,ak:{yashua:"xxxx"}}});


// 渲染object
// render object
NewRender(".two").obj({data:{name:"a",age:"b"}})
```



