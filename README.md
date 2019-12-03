# render
前端快速渲染模板
```html
<div class='root' render-for="data">
{item.name} {item.age}
</div>
```
```javascript
const render = NewRender().setNode(".father").for({data:[{name:"a",age:"b"},{name:"c",age:"d"}]});`
```

