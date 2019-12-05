let arr = [];
for (let key = 0; key < 3; key++) {
    arr.push({name: "a", age: key})
}
let nodea = NewRender().setNode(".father").for({data: arr});
// setTimeout(function () {
//     nodea.for({data: [{name: "aa", age: "bb"}, {name: "cc", age: "dd"}]});
// }, 1000);
// setTimeout(function () {
//     nodea.if(false)
// }, 2000);
// setTimeout(function () {
//     nodea.if(true)
// }, 3000);
// setTimeout(function () {
//     nodea.for({data: arr});
// }, 4000);
// setTimeout(function () {
//     nodea.for({data: [{name: "aa", age: "bb"}, {name: "cc", age: "dd"}]});
// }, 5000);
//
//
// let node = NewRender().setNode(".two").if(false);
// setTimeout(function () {
//     node.if(true);
// }, 1000);
// request(url="123123");
// request("get","www.a.com",{"application":"json","a":"b"});