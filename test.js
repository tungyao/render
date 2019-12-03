let nodea = NewRender().setNode(".father").for({data:[{name:"a",age:"b"},{name:"c",age:"d"}]});
setTimeout(function () {
    nodea.for({data:[{name:"aa",age:"bb"},{name:"cc",age:"dd"}]});
},1000);
setTimeout(function () {
    nodea.if(false)
},2000)
let node = NewRender().setNode(".two").if(false);
setTimeout(function () {
    node.if(true);
},1000);