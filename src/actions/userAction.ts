import AppDispatcher from "../dispatcher/AppDispatcher"
import Constants from "../service/constant"
import Http from "../service/http"

export const login = (data: any) => {
    AppDispatcher.dispatch({
        type: Constants.LOGIN,
        fetchStatus: Constants.FETCH_SENDING
    })
    Http.login(data).then((res: any) => {
        AppDispatcher.dispatch({
            type: Constants.LOGIN,
            fetchStatus: Constants.FETCH_SUCCESS,
            user: res
        })
    })
}

export const getUsers = (data = {}) => {
    AppDispatcher.dispatch({
        type: Constants.FETCH_USERS,
        fetchStatus: Constants.FETCH_SENDING
    })
    Http.fetchUsers(data).then((res: any) => {
        const data = res.data;
        AppDispatcher.dispatch({
            type: Constants.FETCH_USERS,
            fetchStatus: Constants.FETCH_SUCCESS,
            data
        })
    })
}

export const updateUser = (data = {} ) => {
    AppDispatcher.dispatch({
        type: Constants.UPDATE_USER,
        fetchStatus: Constants.FETCH_SENDING
    })
    Http.updateUser(data).then((res: any) => {
        const data = res.data;
        AppDispatcher.dispatch({
            type: Constants.UPDATE_USER,
            fetchStatus: Constants.FETCH_SUCCESS,
            data
        })
    })
}

export const createUser = (data = {} ) => {
    AppDispatcher.dispatch({
        type: Constants.CREATE_USER,
        fetchStatus: Constants.FETCH_SENDING
    })
    Http.cretaeUser(data).then((res: any) => {
        const data = res.data;
        AppDispatcher.dispatch({
            type: Constants.CREATE_USER,
            fetchStatus: Constants.FETCH_SUCCESS,
            data
        })
    })
}

export const deleteUser = (id: number) => {
    AppDispatcher.dispatch({
        type: Constants.DELETE_USER,
        fetchStatus: Constants.FETCH_SENDING
    })
    Http.deleteUser(id).then((res: any) => {
        const data = res.data;
        AppDispatcher.dispatch({
            type: Constants.DELETE_USER,
            fetchStatus: Constants.FETCH_SUCCESS,
            data
        })
    })
}