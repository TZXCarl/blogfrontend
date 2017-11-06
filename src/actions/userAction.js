import AppDispatcher from "../AppDispatcher"
import Constants from "../service/constant"
import Http from "../service/http"

export const login = (data) => {
    AppDispatcher.dispatch({
        type: Constants.LOGIN,
        fetchStatus: Constants.FETCH_SENDING
    })
    Http.login(data).then((res) => {
        AppDispatcher.dispatch({
            type: Constants.LOGIN,
            fetchStatus: Constants.FETCH_SUCCESS,
            user: res
        })
    })
}