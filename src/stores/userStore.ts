import {Store} from "flux/utils"
import AppDispatcher from "../AppDispatcher"
import Constants from "../service/constant";
import LocalStorage from 'store';
import {addEventListener} from "history/DOMUtils";

export const  USER_STORAGE_KEY = 'myuser'

interface userInterface {
    [key: string]: any;
    [index: number]: any;
}

class UserStore extends Store {

    fetching: object = {};
    _users: object = {};
    _userIds: Array<string> = [];
    _currentUser: Object;

    constructor() {
        super(AppDispatcher);
    }

    public addChangeListener = (callback: () => void): any => {
        return super.addListener(callback);
    }

    handleFetchUsers = (users: Array<any>): void => {
        if (Array.isArray(users)) {
            this._userIds = users.map(user => {
                let id = user.id;
                this._users[id] = user;
                return id;
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
        super.__emitChange()
    }

    get currentUser() {
        return this._currentUser
    }

    get users() {
        this._userIds.map( id => {
            return this._users[id]
        })
        return this._userIds.map( id => this._users[id]) || []
    }
}


export default new UserStore()