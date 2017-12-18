import * as React from 'react';
// import {injectIntl, FormattedMessage} from 'react-intl';
import {Table, Button} from 'antd';

import {getUsers} from "../../../actions/userAction"
import Store from '../../../stores/userStore';

import Modals from '../../common/modals';
import UserEditModal from './userEditModal';
// import {TableProps} from 'antd/lib/table/Table'


// import style from './style.scss';
interface componentProps {};
interface componentState {}

interface UserProps {}

class User extends React.Component<UserProps, any>{

    subscript: any;

    state = {
        users: []
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.subscript = Store.addChangeListener(this.onChange);
        getUsers();
    }

    componentWillUnmount() {
        this.subscript.remove();
        this.subscript = null;
    }

    onChange = () => {
        this.setState({
            users: Store.users
        });
    }


    getSexText = (sex) => {
        switch (sex) {
            case '1':
                return '男';
            case '2':
                return '女'
            default:
                return '未知'
        }
    }

    showEditModal = (user) => {
        Modals.show(UserEditModal, {user});
    }

    render() {
        return (
            <div>
                <Table
                    rowKey="id"
                    columns={this.columns}
                    dataSource={this.state.users}/>
            </div>
        );
    }

    columns = [
        {
            title: "name",
            key: "name",
            dataIndex: "name"
        },
        {
            title: "sex",
            key: "sex",
            dataIndex: "sex",
            render: (text, record) => (
                <span>{this.getSexText(text)}</span>
            )
        },
        {
            title: "age",
            key: "age",
            dataIndex: "age"
        },
        {
            title: "phone",
            key: "phone",
            dataIndex: "phone"
        },
        {
            title: 'isAdmin',
            key: 'isAdmin',
            dataIndex: "isAdmin",
            render: text => text ? "YES": "NO"
        },
        {
            title: "Action",
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button onClick={this.showEditModal.bind(this, record)}>Edit</Button>
                    &nbsp;&nbsp;
                    <Button>Delete</Button>
                </span>
            )
        }
    ]
}

export default User