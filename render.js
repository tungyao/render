class Render {
    node;
    name;
    status;
    _prefix;
    _node;

    constructor() {
        this.status = 0;
        this._prefix = 0;
        this._node = document.createElement("div");
    }

    _findPrefix(node, data) {
        let c = node;
        this._findAttr(c, data);
        for (let i of c.childNodes) {
            this._findAttr(i, data);
            if (i.nodeType === 3) {
                i = this._parseDom(i, data)
            }
            if (i.nodeType === 1) {
                this._findChild(i.childNodes, data)
            }
        }
        return c
    }

    _findAttr(node, data) {
        if (typeof node.attributes === "undefined") {
            return;
        }
        for (let i of node.attributes) {
            this._parseDom(i, data)
        }
    }

    _findChild(node, data) {
        this._findAttr(node, data);
        if (typeof node.length === "undefined") {
            if (typeof node === "object" && node.nodeType === 1) {
                this._parseDom(node, data);
            }
            return;
        }
        for (let i of node) {
            if (i.nodeType === 3) {
                this._parseDom(i, data)
            } else if (i.nodeType === 1) {
                this._findChild(i, data)
            }
        }
    }

    _parseDom(node, data) {
        let html = node.nodeValue;
        if (node.nodeValue === null) {
            html = node.innerHTML;
        }
        let a = 0;
        for (let j in html) {
            if (html[j] === "{") {
                a = j;
            }
            if (html[j] === "}") {
                let ns = html.substr(a, j - a + 1);
                let nss = html.substr(a, j - a);
                let t = data[nss.split(".")[1]];
                if (node.nodeValue === null) {
                    node.innerHTML = node.innerHTML.replace(ns, t);
                } else {
                    node.nodeValue = node.nodeValue.replace(ns, t);
                }
            }
        }
        return node;
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

    _same(nodes, data, type) {
        let node = nodes;
        let dname;
        if (type === 0) {
            dname = nodes.attributes.getNamedItem("render-for").value;
        } else if (type === 1) {
            dname = nodes.attributes.getNamedItem("render-obj").value;
        }
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
        if (type === 0) {
            for (let j of data[dname]) {
                nodes.after(this._findPrefix(node.cloneNode(true), j));
            }
        } else if (type === 1) {
            nodes.after(this._findPrefix(node.cloneNode(true), data[dname]));
        }

        nodes.style.display = "none";
        nodes.attributes.setNamedItem(document.createAttribute("status"));
    }

    obj(data) {
        this._same(this.node[0], data, 1)
    }

    for(data) {
        for (let i of this.node) {
            this._same(i, data, 0);
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
