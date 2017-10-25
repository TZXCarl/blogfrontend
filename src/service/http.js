import Constants from "./constant"

const url = "http://127.0.0.1:9000"
let xhr = null;

class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        })
    }
}

class Api {
    constructor() {
        xhr = this.xhr
    }
    xhr = (method, path, body = {}) => {
        const deferred = new Deferred();
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                deferred.resolve(xhr.responseText)
            }
        }
        xhr.open(method, url + path, true);  //设置异步请求
        xhr.send(JSON.stringify(body));
        return deferred.promise;
    }
    login = (data) => {
        return xhr(Constants.POST, '/login', data);
    }
    getUser = () => {
        return xhr(Constants.GET, '/user')
    }
    createNote = (data) => {
        return xhr(Constants.POST, '/createNote', data)
    }
}

export default  new Api()