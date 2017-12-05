import React from 'react';
import {Route} from 'react-router-dom';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Layout, Menu} from 'antd';

import {getUsers} from "../../../actions/userAction"
import Store from '../../../stores/userStore';

class User extends React.Component {

    componentWillMount() {
        this.subscript = Store.addListener(this.onChange)
        getUsers();
    }

    componentWillUnmount() {
        this.subscript.remove();
        this.subscript = null;
    }

    onChange = () => {
        const users = Store.users
        console.log(users)

    }

    render() {
        return (<div>hello</div>);
    }
}

export default injectIntl(User)