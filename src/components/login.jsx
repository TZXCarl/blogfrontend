import qs from 'qs';
import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Alert,
} from 'antd';

import UserStore from '../stores/UserStore'
import * as UserActions from '../actions/UserAction'

import style from './style.scss'

import Constants from '../service/constant'

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};

class Login extends Component {
    state = {
        error: '',
    }

    componentWillMount() {
        this.subscription = UserStore.addListener(this.handleChange);
    }

    componentWillUnmount() {
        this.subscription.remove()
        this.subscription = null
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return

            const { username, password } = this.props.form.getFieldsValue()
            UserActions.login({username, password})
        });
    }

    handleChange = () => {
        // this.setState({
        //     error: UserStore.loginError
        // })
        if (UserStore.currentUser) {
            setTimeout(() => {
                const { location: { search }  } = this.props;
                const query = qs.parse(search.slice(1))
                // query.redirect && query.redirect.indexOf('orders/') !== -1 && (query.redirect = '/orders')
                // this.props.history.push(query.redirect || '/')
                this.props.history.push('/')
            }, 0);
        }
    }

    render(){
        const { intl: { formatMessage }, form: { getFieldDecorator } } = this.props;
        const { error } = this.state;
        return (
			<div className={style.loginBg}>
				<Form className={style.loginForm} onSubmit={this.handleSubmit}>
					<h1 className={style.loginHeader}>{formatMessage({ id:__('欢迎来到xxxxx系统') })}</h1>
					<FormItem
                        {...formItemLayout}
						label={formatMessage({ id: __('用户名') })}
					>
                        {getFieldDecorator('username', {
                            rules: [{
                                required: true,
                                message: formatMessage({ id: __('必填项不能为空') })
                            }]
                        })(
							<Input />
                        )}
					</FormItem>
					<FormItem
                        {...formItemLayout}
						label={formatMessage({ id: __('密码') })}
					>
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true,
                                message: formatMessage({ id: __('必填项不能为空') })
                            }]
                        })(
							<Input type="password" />
                        )}
					</FormItem>
                    {error ? <Alert message={error} type="error" showIcon /> : null}
					<FormItem  justify="center">
						<Row type="flex" justify="center">
							<Col span={4}>
								<Button type="primary" htmlType="submit" size="large" loading={UserStore.logining}>
                                    {formatMessage({id: __('登录')})}
								</Button>
							</Col>
						</Row>
					</FormItem>
				</Form>
			</div>
        );
    }
}

export default injectIntl(Form.create()(Login))
