# render
前端快速渲染引擎
* ## render object
```html
<div class="root">
    {{item.name}}
</div>
```
```javascript
let data ={
    name:"tong",
    age:22
};
new Render(".root").obj(data);
```
---
* ## render array
```html
<ul class="root">
    <li id="list-{{key}}">{{item.name}} {{item.age}}</li>
</ul>
```
```javascript
let data =[
    {
        name:"tong",
        age:22
    }
]
new Render(".root").for(data);
```
### you can use `{{key}}` get `index` when use `for` function

---
# advanced
```javascript
function add(e) {
  return e+e;
}
let node = `<h1>HELLO RENDER</h1>`;
```
* use function
    * `{{item.age >22 ? "up" : "down"}}`
    * `{{add(item.age)}}`
* use render html
    * {{this.append(html_text)}}


