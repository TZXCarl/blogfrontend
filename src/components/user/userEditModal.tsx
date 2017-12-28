import * as React from 'react';
// import { Map, OrderedMap, List}  from 'immutable'
import {Form, Modal, Radio, Input} from 'antd'

const RadioGroup = Radio.Group;

import {FormComponentProps} from 'antd/lib/form/Form'


import {updateUser, createUser} from '../../actions/userAction';
import UserStore from '../../stores/userStore';
import Contants from '../../service/constant'

interface UserProps extends FormComponentProps {
    onOk: any,
    onCancel: any,

    [index: string]: any
}

const formItemCol = {
    labelCol: {span: 6},
    wrapperCol: {span: 16}
}

class UserEditModal extends React.Component<UserProps, any> {
    subscript: any

    state = {
        user: {}
    }

    constructor(props: UserProps) {
        super(props)
        if (this.props.user) {
            this.state.user = this.props.user;
        }
    }

    componentDidMount(): void {
        this.subscript = UserStore.addListener(this.onChange)
    }

    componentWillUnmount(): void {
        this.subscript.remove();
        this.subscript = null;
    }

    onChange = () => {
        const {type, status} = UserStore.lastAction;
        switch (type) {
            case Contants.UPDATE_USER:
                if (status === Contants.FETCH_SUCCESS){
                    this.props.onOk("success")
                }
                break;
            case Contants.CREATE_USER:
                if (status === Contants.FETCH_SUCCESS){
                    this.props.onOk("success")
                }
                break;
        }
    }

    handleOk = (evt: any) => {
        evt.preventDefault();
        this.props.form.validateFieldsAndScroll((error: any, values: any) => {
            if (!error) {
                this.state.user["id"] ? updateUser({...this.state.user, ...values}) : createUser({...values});
            }
        })
    }

    handleCancel = () => {
        this.props.onCancel();
    }

    render() {
        const {form: {getFieldDecorator}} = this.props;
        // const {user} = this.state;
        return (
            <Modal
                title={this.state.user ? "编辑" : "新建"}
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}>
                <Form>
                    <Form.Item
                        label="用户名"
                        {...formItemCol}>
                        {getFieldDecorator('username', {})(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        {...formItemCol}>
                        {getFieldDecorator('password', {})(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="昵称"
                        {...formItemCol}>
                        {getFieldDecorator('name', {})(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        {...formItemCol}>
                        {getFieldDecorator('sex', {})(
                            <RadioGroup>
                                <Radio value="1">男</Radio>
                                <Radio value="2">女</Radio>
                            </RadioGroup>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="年龄"
                        {...formItemCol}>
                        {getFieldDecorator('age', {})(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="电话"
                        {...formItemCol}>
                        {getFieldDecorator('phone', {})(
                            <Input/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default Form.create({
    mapPropsToFields: ({user = {}}) => {
        const vals = {};
        Object.keys(user).map(key => vals[key] = Form.createFormField({value: user[key]}));
        return vals;
    }
})(UserEditModal)