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
        switch (type) {
            case Constants.GET_NOTE:
                this.fetching[Constants.GET_NOTE] = fetchStatus === Constants.FETCH_SENDING
                if (fetchStatus === Constants.FETCH_SUCCESS) {
                    const {data} = payload;
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

}


export default new NoteStore()