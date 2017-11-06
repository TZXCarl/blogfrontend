import {Store} from "flux/utils"
import AppDispatcher from "../AppDispatcher"
import Constants from "../service/constant";
import LocalStorage from 'store';

export const  USER_STORAGE_KEY = 'myuser'

class NoteStore extends Store {

    constructor() {
        super(AppDispatcher);
        this.fetching = {};
        this.currentNote = {};
        this.notes = {};
        this.noteIds = {};
    }

    __onDispatch(payload) {
        const {type, fetchStatus} = payload
        this.lastAction = {
            type: type,
            status: fetchStatus
        }
        switch (type) {
            case Constants.GET_NOTE:
                this.fetching[Constants.GET_NOTE] = fetchStatus === Constants.FETCH_SENDING
                if (fetchStatus === Constants.FETCH_SUCCESS) {
                    const {data} = JSON.parse(payload.data);
                    debugger
                    this.currentNote = data;
                    this.noteIds[data.id] = data;
                }
                break;
        }
        this.__emitChange()
    }


    getCurrentNote = () => {
        return this.currentNote
    }

    getLastAction = () => {
        return this.lastAction
    }

}


export default new NoteStore()