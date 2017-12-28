import Constants from "./constant"

const url = "http://127.0.0.1:9010"
let xhr: any;

class Deferred {
    promise: any
    resolve: any
    reject: any

    constructor() {
        this.promise = new Promise((resolve: any, reject: any) => {
            this.resolve = resolve;
            this.reject = reject;
        })
    }
}

class Api {
    constructor() {
        xhr = this.xhr
    }

    xhr = (method: any, path: any, body = {}): any => {
        const deferred = new Deferred();
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                deferred.resolve(JSON.parse(xhr.responseText))
            }
        }
        xhr.open(method, url + path, true);  //设置异步请求
        xhr.send(JSON.stringify(body));
        return deferred.promise;
    }
    login = (data: any) => {
        return xhr(Constants.POST, '/login', data);
    }

    getUser = () => {
        return xhr(Constants.GET, '/user')
    }


    getPath = (path: string, params: Object): string => {
        const keys = Object.keys(params);
        const paramStr = keys.map(k => `${k}=${params[k]}`).join('&');
        if (paramStr.length > 0) {
            path = path + '?' + paramStr;
        }
        return path;
    }

    fetchUsers = (params: any = {}) => {
        let path = '/users';
        path = this.getPath(path, params);
        return xhr(Constants.GET, path, {});
    }

    updateUser = (params: any) => {
        let path = "/user/update";
        return xhr(Constants.POST, path, params);
    }

    cretaeUser = (params: any) => {
        let path = "/user/create";
        return xhr(Constants.POST, path, params);
    }

    deleteUser = (id: number) => {
        let path = "/user/delete";
        path = this.getPath(path, {id});
        return xhr(Constants.GET, path, {})
    }
}

export default new Api()