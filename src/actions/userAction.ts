<<<<<<< HEAD
import AppDispatcher from "../dispatcher/AppDispatcher"
import Constants from "../service/constant"
import Http from "../service/http"

export const login = (data: any) => {
=======
import AppDispatcher from "../AppDispatcher"
import Constants from "../service/constant"
import Http from "../service/http"

export const login = (data) => {
>>>>>>> 56ad3414070df1a40a83b29ade5f3de3de246162
    AppDispatcher.dispatch({
        type: Constants.LOGIN,
        fetchStatus: Constants.FETCH_SENDING
    })
<<<<<<< HEAD
    Http.login(data).then((res: any) => {
=======
    Http.login(data).then((res) => {
>>>>>>> 56ad3414070df1a40a83b29ade5f3de3de246162
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
<<<<<<< HEAD
    Http.fetchUsers(data).then((res: any) => {
        const data = res.data;
=======
    Http.fetchUsers(data).then(({data}) => {
>>>>>>> 56ad3414070df1a40a83b29ade5f3de3de246162
        AppDispatcher.dispatch({
            type: Constants.FETCH_USERS,
            fetchStatus: Constants.FETCH_SUCCESS,
            data
        })
    })
<<<<<<< HEAD
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
=======
>>>>>>> 56ad3414070df1a40a83b29ade5f3de3de246162
}