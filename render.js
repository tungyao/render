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

    _findPrefix(node, data, index = 0, params) {
        let c = node;
        this._findAttr(c, data, index, params);
        for (let i of c.childNodes) {
            this._findAttr(i, data, index, params);
            if (i.nodeType === 3) {
                this._parseDom(i, data, index, params)
            }
            if (i.nodeType === 1) {
                this._findChild(i.childNodes, data, index, params)
            }
        }
        return c
    }

    _findAttr(node, data, index, params) {
        if (typeof node.attributes === "undefined") {
            return;
        }

        for (let i of node.attributes) {
            this._parseDom(i, data, index, params)
        }
    }

    _findChild(node, data, index, params) {
        this._findAttr(node, data, index, params);
        if (typeof node.length === "undefined") {
            if (typeof node === "object" && node.nodeType === 1) {
                this._parseDom(node, data, params);
            }
            return;
        }
        for (let i of node) {
            this._findAttr(i, data, index, params);
            if (i.nodeType === 3) {
                this._parseDom(i, data, index, params)
            } else if (i.nodeType === 1) {
                this._findChild(i.childNodes, data, index, params)
            }
        }
    }

    _change(html, nodex, item, index, params) {
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
                let key = typeof item !== "object" ? item : eval(ns);
                if (key.constructor === HTMLDivElement) {
                    nodex.innerHTML = "";
                    nodex.nodeValue = "";
                    for (let jk of key.childNodes) {
                        nodex.parentNode.appendChild(jk.cloneNode(true));
                    }
                    break;
                }
                let value = html.replace(nss, key);
                if (nodex.nodeValue === null) {
                    nodex.innerHTML = value;
                } else {
                    nodex.nodeValue = value;
                }
                this._change(value, nodex, item, index, params);
                return;
            }
        }
    }

    _parseDom(nodex, data, index, params) {
        let html = nodex.nodeValue;
        if (nodex.nodeValue === null) {
            html = nodex.innerHTML;
        }
        this._change(html, nodex, data, index, params);
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

    _same(nodes, data, type, params) {
        if (type === 0) {
            this.node.innerHTML = "";
            for (let j in data) {
                let x = this._findPrefix(this.backNode.cloneNode(true), data[j], j, params);
                for (let i of x.childNodes) {
                    this.node.appendChild(i.cloneNode(true));
                }
            }
        } else if (type === 1) {
            let x = this._findPrefix(this.backNode, data, params);
            for (let j of x.childNodes) {
                this.node[0].appendChild(j.cloneNode(true));
            }
            for (let k of x.attributes) {
                this.node[0].setAttribute(k.name, k.value);
            }

        }
    }

    obj(data, params = {}) {
        if (this.backNode !== null) {
            this.node[0].innerHTML = "";
            this.backNode = this.backNodex.cloneNode(true);
            this._same(this.backNodex, data, 1, params)
        } else {
            this.backNode = this.node[0].cloneNode(true);
            this.backNodex = this.node[0].cloneNode(true);
            this.node[0].innerHTML = null;
            this._same(this.backNode, data, 1, params)
        }

    }

    for(data, params = {}) {
        if (this.backNode !== null) {
            this.backNode = this.backNodex.cloneNode(true);
            this._same(this.backNode, data, 0, params);
        } else {
            this.backNode = this.node[0].cloneNode(true);
            this.backNodex = this.node[0].cloneNode(true);
            this.node = this.node[0];
            this._same(this.backNode, data, 0, params);
        }
    }

    html(node) {
        let d = document.createElement("div");
        d.innerHTML = node;
        return d;
    }

    formatDate(dateOrUnix) {
        let d = new Date(dateOrUnix * 1000);    //根据时间戳生成的时间对象
        let month = d.getMonth() + 1;
        let datt = d.getDate();
        let hours = d.getHours();
        let minutes = d.getMinutes();
        if (month <= 10) {
            month = '0' + month;
        }
        if (datt <= 10) {
            datt = '0' + datt;
        }
        if (hours <= 10) {
            hours = '0' + hours;
        }
        if (minutes <= 10) {
            minutes = '0' + minutes;
        }

        let dateX = (d.getFullYear()) + "-" +
            (month) + "-" +
            (datt) + "T" +
            (hours) + ":" +
            (minutes)
        return dateX;
    }
}

window.Render = Render;