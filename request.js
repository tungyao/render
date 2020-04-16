function _normal(url, data, method)
{
    return new Promise(function (resolve, reject) {
        let XHR = new XMLHttpRequest();
        if (method === "GET" || method === "DELETE") {
            url = url + "?";
            for (let i in data) {
                // url += `${i}=${data[i]}`;
                url+= i+"="+data[i];
            }
        }
        XHR.open(method, url, true);
        XHR.setRequestHeader("Content-Type", "application/json");
        XHR.onreadystatechange = function () {
            if (XHR.readyState === 4) {
                if (XHR.status === 200) {
                    try {
                        let response = JSON.parse(XHR.responseText);
                        resolve(response);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error(XHR.statusText));
                }
            }
        };
        XHR.send(JSON.stringify(data));
    })
}

function get(url, data)
{
    return _normal(url, data, "GET")
}

function post(url, data)
{
    return  _normal(url, data, "POST")
}

function deletes (url, data)
{
    return _normal(url, data, "DELETE")
}

function put(url, data)
{
    return _normal(url, data, "PUT")
}
