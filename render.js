class Render {
    constructor(node) {
        this.node = null;
        this.name = null;
        this.status = null;
        this.setNode(node);
        this.status = 0;
        this._prefix = 0;
        this.backNode = null;
        this._node = document.createElement("div");
    }

    _findPrefix(node, data, index = 0) {
        let c = node;
        this._findAttr(c, data, index);
        for (let i of c.childNodes) {
            this._findAttr(i, data, index);
            if (i.nodeType === 3) {
                this._parseDom(i, data, index)
            }
            if (i.nodeType === 1) {
                this._findChild(i.childNodes, data, index)
            }
        }
        return c
    }

    _findAttr(node, data, index) {
        if (typeof node.attributes === "undefined") {
            return;
        }
        for (let i of node.attributes) {
            this._parseDom(i, data, index)
        }
    }

    _findChild(node, data, index) {
        this._findAttr(node, data, index);
        if (typeof node.length === "undefined") {
            if (typeof node === "object" && node.nodeType === 1) {
                this._parseDom(node, data);
            }
            return;
        }
        for (let i of node) {
            this._findAttr(i, data, index);
            if (i.nodeType === 3) {
                this._parseDom(i, data, index)
            } else if (i.nodeType === 1) {
                this._findChild(i.childNodes, data, index)
            }
        }
    }

    _change(html, nodex, item, index) {
        let a = -1;
        html = html.replace("{{key}}", index);
        if (nodex.nodeValue === null) {
            nodex.innerHTML = html;
        } else {
            nodex.nodeValue = html;
        }
        for (let j = 0; j < html.length; j++) {
            if (html[j] === "{" && html[j + 1] === "{") {
                a = j;
            }
            if (html[j] === "}" && html[j + 1] === "}") {
                let nss = html.substring(a, j + 2);
                let ns = nss.substring(2, nss.length - 2);
                if (ns[0] === "{") {
                    ns = ns.substring(1, nss.length);
                }
                let key = typeof item === "string" ? item : eval(ns);
                if (typeof key === "object") {
                    key=""
                }
                let value = html.replace(nss, key);
                if (nodex.nodeValue === null) {
                    nodex.innerHTML = value;
                } else {
                    nodex.nodeValue = value;
                }
                this._change(value, nodex, item, index);
                break;
            }
        }
    }

    _parseDom(nodex, data, index) {
        let html = nodex.nodeValue;
        if (nodex.nodeValue === null) {
            html = nodex.innerHTML;
        }
        this._change(html, nodex, data, index);
    };

    _fff(object, key) {
        if (typeof object === 'object') {
            for (let i in object) {
                if (typeof object[i] === 'object') {
                    return this._fff(object[i], key);
                }
                if (key === i) {
                    return object[key];
                }
            }
        }
        return object[key];
    }

    setNode(node) {
        this.node = document.querySelectorAll(node);
        if (typeof this.node !== "object") {
            this.node = document.getElementsByClassName(node.substr(1, node.length - 1));
        }
        this.name = node;
        return this;
    }

    _same(nodes, data, type) {
        if (type === 0) {
            this.node.innerHTML = "";
            for (let j in data) {
                let x = this._findPrefix(this.backNode.cloneNode(true), data[j], j);
                for (let i of x.childNodes) {
                    this.node.appendChild(i.cloneNode(true));
                }
            }
        } else if (type === 1) {
            let x = this._findPrefix(this.backNode, data);
            for (let i of this.node) {
                for (let j of x.childNodes) {
                    i.appendChild(j.cloneNode(true));
                }
                for (let k of x.attributes) {
                    i.setAttribute(k.name, k.value);
                }
            }

        }
    }

    obj(data) {
        if (this.backNode !== null) {
            this.node[0].innerHTML = "";
            this.backNode = this.backNodex.cloneNode(true);
            this._same(this.backNodex, data, 1)
        } else {
            this.backNode = this.node[0].cloneNode(true);
            this.backNodex = this.node[0].cloneNode(true);
            for (let i of this.node[0].childNodes) {
                i.remove();
            }
            this._same(this.backNode, data, 1)
        }

    }

    for(data) {
        if (this.backNode !== null) {
            this.backNode = this.backNodex.cloneNode(true);
            this._same(this.backNode, data, 0);
        } else {
            this.backNode = this.node[0].cloneNode(true);
            this.backNodex = this.node[0].cloneNode(true);
            this.node = this.node[0];
            this._same(this.backNode, data, 0);
        }
    }

    append(node) {
        for (let i of this.node) {
            i.innerHTML = node
        }
        return this;
    }
}