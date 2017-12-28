import * as React from 'react';
import {Table, Button, Divider} from 'antd'
import {getUsers, deleteUser} from '../../actions/userAction'
import UserStore from '../../stores/userStore'

import Modals from '../common/modals'
import UserEditModal from './userEditModal'
import Constants from '../../service/constant';

import './style.scss';

interface IUser {
    [index: string]: any;

    [num: number]: any;
}

const getSexStr = (sex: string) :string => {
    switch (sex) {
        case "1":
            return "男";
        case "2":
            return "女";
        default:
            return "未知";
    }
}

class UserTable extends Table<IUser> {}

class UserList extends React.Component {

    state = {
        users: []
    }

    subcript: any;

    componentDidMount() {
        this.subcript = UserStore.addChangeListener(this.onChange)
        getUsers()
    }

    onChange = () => {
        const {type, status} = UserStore.lastAction;
        switch (type) {
            case Constants.FETCH_USERS:
                if (status === Constants.FETCH_SUCCESS) {
                    this.setState({
                        users: UserStore.users
                    })
                }
                break;
            case Constants.DELETE_USER:
                if (status === Constants.FETCH_SUCCESS) {
                    let timer = setTimeout(() => {
                        getUsers({})
                        clearTimeout(timer);
                    }, 10)
                }
                break;
        }
    }

    handleCreate = () => {
        this.handleEidt({});
    }

    handleEidt = (user: IUser): void => {
        Modals.show(UserEditModal, {user})
            .then((data: any) => {
                data === "success" && getUsers()
            })
    }

    handleDelete = (user: IUser): void => {
        user.id && deleteUser(user.id)
    }

    render() {
        return (
            <div id="user" className="user">
                <div className="header">
                    <Button onClick={this.handleCreate}>新建</Button>
                </div>
                <UserTable
                    rowKey="id"
                    dataSource={this.state.users}
                    columns={this.columns}
                />
            </div>)
    }

    columns: IUser[] = [
        {
            title: "username",
            dataIndex: "username",
            key: "username"
        },
        {
            title: "name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "age",
            dataIndex: "age",
            key: "age"
        },
        {
            title: "sex",
            dataIndex: "sex",
            key: "sex",
            render: (text: string) => (<span>{getSexStr(text)}</span>)
        },
        {
            title: "phone",
            dataIndex: 'phone',
            key: "phone"

        },
        {
            title: "action",
            dataIndex: "action",
            render: (text: any, record: IUser) => (
                <span>
                    <Button onClick={this.handleEidt.bind(this, record)}>编辑</Button>
                    <Divider type="vertical"/>
                    <Button onClick={this.handleDelete.bind(this, record)}>删除</Button>
                </span>
            )
        }
    ]
}

export default UserList;