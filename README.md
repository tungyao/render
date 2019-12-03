# render
前端快速渲染模板
```html
<div class='father' render-for="data">
{item.name} {item.age}
</div>

<div class="root" render-if="false">
    <h1>HELLO</h1>
</div>
```
```javascript
NewRender().setNode(".father").for({data:[{name:"a",age:"b"},{name:"c",age:"d"}]});

NewRender().setNode(".root").if(true);

NewRender().setNode(".root").append(true);
```
## OR
```javascript
NewRender(".father").for({data:[{name:"a",age:"b"},{name:"c",age:"d"}]});

NewRender(".root").if(true);

NewRender(".root").append(`<h1>HELLO WORLD</h1>`);
```


