NewRender().setNode(".father").for({data:[{name:"a",age:"b"},{name:"c",age:"d"}]});
let node = NewRender().setNode(".two").if(false);
setTimeout(function () {
    node.if(true);
},1000);