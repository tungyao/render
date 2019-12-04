class Render {
    node;
    name;
    status;
    _prefix;
    _node;
    _pnode;

    constructor() {
        this.status = 0;
        this._prefix = 0;
        this._node = document.createElement("div");
    }

    _findPrefix(data) {
        let c = this._pnode;
        for (let i of c.childNodes) {
            if (i.nodeType===3) {
                let a = 0;
                let html = i.nodeValue;
                for (let j in html) {
                    console.log(html[j]);
                    if (html[j] === "{") {
                        a = j;
                        console.log(a,1);
                    }
                    if (html[j] === "}") {
                        console.log(j,2);
                        console.log(html);
                        let ns = html.substr(a, j - a + 1);
                        let nss = html.substr(a, j - a);
                        let t = data[nss.split(".")[1]];
                        html = html.replace(ns,t);
                    }
                }
                i.nodeValue = html;
            }
        }
        return c
    }

    _parseDom(arg) {
        return arg;
    };

    setNode(node) {
        this.node = document.querySelectorAll(node);
        this.name = node;
        this._check();
        return this;
    }

    _check() {
        for (let i of this.node) {
            if (i.attributes.getNamedItem("render-if") !== null) {
                if (i.attributes.getNamedItem("render-if").value === "false") {
                    i.style.display = "none";
                }
            }
        }
    }

    if(status) {
        this.setNode(this.name);
        for (let i of this.node) {
            if (status) {
                if (!i.attributes.getNamedItem("status")) {
                    i.style.removeProperty("display")
                }
            } else {
                i.style.display = "none";
            }
        }
        return this;
    }

    for(data) {
        for (let i of this.node) {
            let node = i;
            let dname = i.attributes.getNamedItem("render-for").value;
            if (node.style.display === "none") {
                node.style.removeProperty("display");
                // node.attributes.removeNamedItem("render-for");
            }
            let n = node.nextSibling;
            while (n) {
                let nn = n;
                n = n.nextSibling;
                nn.remove();
            }
            if (node.attributes.getNamedItem("status") && this.status !== 0) {
                node.attributes.removeNamedItem("status");
            }
            data[dname].reverse();
            for (let j of data[dname]) {
                this._pnode = node.cloneNode(true);
                i.after(this._findPrefix(j));
            }
            i.style.display = "none";
            i.attributes.setNamedItem(document.createAttribute("status"));
        }
        this.status += 1;
        return this;
    }

    append(node) {
        for (let i of this.node) {
            i.innerHTML = node
        }
        return this;
    }
}

function NewRender(node) {
    if (node) {
        return new Render().setNode(node);
    }
    return new Render();
}
