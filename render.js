class Render {
    node;
    name;
    _FindPrefix(str, data) {
        let a = [];
        let b = [];
        let c = str;
        for (let i in str) {
            if (str[i] === "{") {
                a.push(i);
            }
            if (str[i] === "}") {
                b.push(i);
            }
        }

        for (let i in a) {
            let ns = str.substr(a[i], b[i] - a[i] + 1);
            let nss = str.substr(a[i], b[i] - a[i]);
            let t = data[nss.split(".")[1]];
            c = c.replace(new RegExp(ns, 'g'), t);
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
                i.style.removeProperty("display")
            } else {
                i.style.display = "none";
            }
        }
        return this;
    }

    for(data) {
        for (let i of this.node) {
            let dname = i.attributes.getNamedItem("render-for").value;
            if (i.style.display === "none") {
                i.style.removeProperty("display");
                i.attributes.removeNamedItem("render-for");
            }
            let n = i.nextSibling;
            while (n) {
                let nn = n;
                n = n.nextSibling;
                nn.remove();
            }
            let node = i.outerHTML;
            data[dname] = data[dname].reverse();
            for (let j of data[dname]) {
                i.after(this._parseDom(this._FindPrefix(node, j)));
            }
            i.style.display = "none";
        }
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
