# render
前端快速渲染引擎
```html
<div class='array' render-for="data">
{item.name} {item.age}
</div>

<div class="root" render-if="false">
    <h1>HELLO</h1>
</div>

<div class="two" render-obj="data">
    <h1>{item.age}</h1>
    <h1>{item.name}</h1>
</div>
```
### 老版本浏览器 请使用 `OldRender` 代替
```javascript
// 渲染数组用这个
NewRender(".array").for({data:[{name:"a",age:"b"},{name:"c",age:"d"}]})

// 渲染object用这个
NewRender(".two").obj({data:{name:"a",age:"b"}})

NewRender(".root").if(true);
NewRender(".root").append(`<h1>HELLO WORLD</h1>`);
```
## OR
```javascript
// 渲染数组用这个
NewRender().setNode(".array").for({data:[{name:"a",age:"b"},{name:"c",age:"d"}]});

// 渲染object用这个
NewRender().setNode(".two").obj({data:{name:"a",age:"b"}})

NewRender().setNode(".root").if(true);
NewRender().setNode(".root").append(true);
```




