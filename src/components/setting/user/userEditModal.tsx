import * as React from 'lodash';
import {
    Modal,
    Form,
    Button
} from 'antd'

import { FormComponentProps } from "antd/lib/form/Form";

const formItemCol = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
}

interface UserEditModalProps extends FormComponentProps {
    onOk: any
    onCancel: any
    [index: string]: any
}

class UserEditModal extends React.Component<UserEditModalProps, any> {

    constructor(props: UserEditModalProps){
        super(props);
    }

    handleSubmit = (evt: any): void => {
        evt.preventDefault();

        this.props.form.validateFieldsAndScroll((values: any, error: any) => {
            if (!error) {


                this.props.onOk()
            }
        })
    }

    render() {
        const {form: {getFieldDecorator }, onCancel} = this.props;
        return (
            <Modal
                title="用户信息">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="姓名"
                        {...formItemCol}>
                        {getFieldDecorator('name', {})(
                            <input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        {...formItemCol}>
                        {getFieldDecorator('sex', {})(
                            <input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="年龄"
                        {...formItemCol}>
                        {getFieldDecorator('age', {})(
                            <input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="电话"
                        {...formItemCol}>
                        {getFieldDecorator('phone', {})(
                            <input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="电话"
                        labelCol={{span: 4}}>
                        <Button onClick={onCancel}>取消</Button>
                        <Button type="primary" htmlType="submit">确定</Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default UserEditModal

// export default Form.create({
//     mapPropsToFields: ({user}) => {
//         const vals = {};
//         if (user) {
//             const keys = user.keys || [];
//
//             keys.forEach(key => vals[key] = {value: user[keys]});
//         }
//         return vals;
//     }
// })(UserEditModal)
