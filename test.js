let arr = [];
for (let key=0;key<10000;key++) {
   arr.push({name:"a",age:key})
}
console.log(arr);
let nodea = NewRender().setNode(".father").for({data:arr});
// setTimeout(function () {
//     nodea.for({data:[{name:"aa",age:"bb"},{name:"cc",age:"dd"}]});
// },1000);
// setTimeout(function () {
//     nodea.if(false)
// },2000)
// let node = NewRender().setNode(".two").if(false);
// setTimeout(function () {
//     node.if(true);
// },1000);