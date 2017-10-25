const Constants = {
    //http method
    GET: 'get',
    POST: 'post',
    PUT: Symbol('put'),
    DELETE: Symbol('delete'),
    //http status
    FETCH_SENDING: 1,
    FETCH_SUCCESS: 2,
    FETCH_FAILED: 3,

    //
    LOGIN: Symbol('login'),
    LOGIN_OUT:Symbol('loginout'),

    //note

    GET_NOTE: Symbol('getNote'),
    UPDATE_NOTE: Symbol('updateNote'),

}


export default Constants