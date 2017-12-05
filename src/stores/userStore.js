import {Store} from "flux/utils"
import AppDispatcher from "../AppDispatcher"
import Constants from "../service/constant";
import LocalStorage from 'store';

export const  USER_STORAGE_KEY = 'myuser'

class UserStore extends Store {

    constructor() {
        super(AppDispatcher);
        this.fetching = {};
        this._users = {};
        this._userIds = [];

        //todo 添加用户登陆
        // _currentUser = LocalStorage.get(USER_STORAGE_KEY) || {};
    }

    handleFetchUsers = (users) => {
        if (Array.isArray(users)) {
            this._userIds = users.map(user => {
                this._users[user.id] = user;
                return user.id;
            })
        }
    }
    __onDispatch(payload) {
        const {type, fetchStatus} = payload
        switch (type) {
            case Constants.LOGIN:
                this.fetching[Constants.LOGIN] = fetchStatus === Constants.FETCH_SENDING
                if (fetchStatus === Constants.FETCH_SUCCESS) {
                    this._currentUser = payload.user;
                    LocalStorage.set(USER_STORAGE_KEY, payload.user);
                }
                break;
            case Constants.FETCH_USERS:
                if (fetchStatus === Constants.FETCH_SUCCESS) {
                    this.handleFetchUsers(payload.data)
                }
                break;
        }
        this.__emitChange()
    }

    get currentUser() {
        return this._currentUser
    }

    get users() {
        return this._userIds.map( id => this._users[id]) || []
    }
}


export default new UserStore()