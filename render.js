class Render {
    node;
    name;
    status;

    constructor() {
        this.status = 0;
    }

    _FindPrefix(str, data) {
        let a = 0;
        let c = str;
        for (let i in str) {
            if (str[i] === "{") {
                a = i;
            }
            if (str[i] === "}") {
                let ns = str.substr(a, i - a + 1);
                let nss = str.substr(a, i - a);
                let t = data[nss.split(".")[1]];
                c = c.replace(ns, t);
            }
        }
        return c
    }

    _parseDom(arg) {
        let objE = document.createElement("div");
        objE.innerHTML = arg;
        return objE.firstChild;
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
                node.attributes.removeNamedItem("render-for");
            }
            let n = node.nextSibling;
            while (n) {
                let nn = n;
                n = n.nextSibling;
                nn.remove();
            }
            if (this.status !== 0) {
                node.attributes.removeNamedItem("status");
            }
            data[dname] = data[dname].reverse();
            for (let j of data[dname]) {
                i.after(this._parseDom(this._FindPrefix(node.outerHTML, j)));
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
