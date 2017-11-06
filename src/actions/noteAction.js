import AppDispatcher from "../AppDispatcher"
import Constants from "../service/constant"
import Http from "../service/http"

export const getNote = (data) => {
    AppDispatcher.dispatch({
        type: Constants.GET_NOTE,
        fetchStatus: Constants.FETCH_SENDING
    })

    Http.getNote(data).then((res) => {
        console.log(res)
        AppDispatcher.dispatch({
            type: Constants.GET_NOTE,
            fetchStatus: Constants.FETCH_SUCCESS,
            data: res
        })
    })
}