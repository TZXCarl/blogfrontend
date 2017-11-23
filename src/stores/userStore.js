import {Store} from "flux/utils"
import AppDispatcher from "../AppDispatcher"
import Constants from "../service/constant";
import LocalStorage from 'store';

export const  USER_STORAGE_KEY = 'myuser'

class UserStore extends Store {

    constructor() {
        super(AppDispatcher);
        this.fetching = {};
    }
    _currentUser = LocalStorage.get(USER_STORAGE_KEY);

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
        }
        this.__emitChange()
    }

    get currentUser() {
        return this._currentUser
    }

}


export default new UserStore()