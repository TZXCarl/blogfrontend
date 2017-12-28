import {Store} from "flux/utils"
import AppDispatcher from "../dispatcher/AppDispatcher"
import Constants from "../service/constant";
import * as LocalStorage from 'store';

export const  USER_STORAGE_KEY = 'myuser'

interface userInterface {
    [key: string]: any;
    [index: number]: any;
}

interface ILastAction {
    type: string;
    status: number;
    [index: string]: any
}

class UserStore extends Store<any> {

    fetching: userInterface;
    _users: userInterface = {};
    _userIds: Array<string> = [];
    _currentUser: userInterface;
    _lastAction: ILastAction;

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
    __onDispatch(payload: any) {
        const {type, fetchStatus} = payload
        this._lastAction = {
            type,
            status: fetchStatus
        }
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
            case Constants.CREATE_USER:
                if (fetchStatus === Constants.FETCH_SUCCESS) {
                    // this.handleFetchUsers(payload.data)
                }
                break;
            case Constants.DELETE_USER:
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

    get lastAction() {
        return this._lastAction;
    }
}


export default new UserStore()