class Request {
    _root;
    method;
    url;
    data;
    header;
    _methods = ['POST', 'GET', 'PUT', 'PATCH', 'COPY', 'DELETE', 'HEAD', 'OPTIONS', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND', 'VIEW'];

    constructor(...config) {
        this._root = "";
        console.log(config.length);
        if (config.length === 2) {
            this.method = config[0];
            this.url = config[1];
        } else if (config.length === 3) {
            this.data = config[2];
        } else if (config.length === 3) {
            this.header = config[3];
        } else {
            console.error("constructor parameter length must 2 or 3 or 4")
        }
        this.send();
    }

    send() {
        if (this._methods.includes(this.method.toUpperCase())) {
            this.method.toUpperCase();
            return this._Method(this.method, this.data, this.method.toUpperCase())
        } else {
            console.error("request method is error", this.method);
        }
    }

    _Method(url, data, method) {
        let t = this;
        return new Promise(function (resolve, reject) {
            let XHR = new XMLHttpRequest();
            let u = t._root + url;
            if (method === "GET" ||method === "PUT" ) {
                {
                    u += "?";
                    for (let i in data) {
                        u += `${i}=${data[i]}`;
                    }
                }
            }
            XHR.open(method, u, true);
            console.log(t.header);
            if(typeof t.header==="object"){
                for (let i in t.header){
                    console.log(i);
                }
            }
            XHR.setRequestHeader("Content-Type", "application/json");
            XHR.onreadystatechange = function () {
                if (XHR.readyState === 4) {
                    if (XHR.status === 200) {
                        try {
                            resolve(XHR.responseText);
                        } catch (e) {
                            reject(e);
                        }
                    } else {
                        reject(new Error(XHR.statusText));
                    }
                }
            };
            XHR.send(data);
        })
    }
}

function request(...method_url_data_header) {
    return new Request(...method_url_data_header);
}