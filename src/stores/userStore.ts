import {Store} from "flux/utils"
<<<<<<< HEAD
import AppDispatcher from "../dispatcher/AppDispatcher"
import Constants from "../service/constant";
import * as LocalStorage from 'store';
=======
import AppDispatcher from "../AppDispatcher"
import Constants from "../service/constant";
import LocalStorage from 'store';
import {addEventListener} from "history/DOMUtils";
>>>>>>> 56ad3414070df1a40a83b29ade5f3de3de246162

export const  USER_STORAGE_KEY = 'myuser'

interface userInterface {
    [key: string]: any;
    [index: number]: any;
}

<<<<<<< HEAD
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
=======
class UserStore extends Store {

    fetching: object = {};
    _users: object = {};
    _userIds: Array<string> = [];
    _currentUser: Object;
>>>>>>> 56ad3414070df1a40a83b29ade5f3de3de246162

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
<<<<<<< HEAD
    __onDispatch(payload: any) {
        const {type, fetchStatus} = payload
        this._lastAction = {
            type,
            status: fetchStatus
        }
=======
    __onDispatch(payload) {
        const {type, fetchStatus} = payload
>>>>>>> 56ad3414070df1a40a83b29ade5f3de3de246162
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
<<<<<<< HEAD
            case Constants.CREATE_USER:
                if (fetchStatus === Constants.FETCH_SUCCESS) {
                    // this.handleFetchUsers(payload.data)
                }
                break;
            case Constants.DELETE_USER:
                break;
=======
>>>>>>> 56ad3414070df1a40a83b29ade5f3de3de246162
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
<<<<<<< HEAD

    get lastAction() {
        return this._lastAction;
    }
=======
>>>>>>> 56ad3414070df1a40a83b29ade5f3de3de246162
}


export default new UserStore()