import React from 'react';
import {Route} from 'react-router-dom';
import {injectIntl, FormattedMessage} from 'react-intl';
import {Layout, Menu, Icon} from 'antd';
import User from './user';


class Setting extends React.Component {

    state = {
        settingType: 'user'
    }

    handleMenuChange = ({ key }) => {

        this.setState({
            settingType: key
        })
    }

    render() {
        const { intl: { formatMessage } } = this.props
        const { settingType = 'user' } = this.state;
        return (
            <User/>
        )
    }
}

export default injectIntl(Setting)

//
// <Layout>
// <Layout.Sider width={200}>
//     <Menu mode="inline"
// // className={style.menu}
// onSelect={this.handleMenuChange}
// defaultOpenKeys={['basic']}
// defaultSelectedKeys={[settingType]}
//     >
//     <Menu.SubMenu key="basic" title={(
//     <span>
//                               <Icon type="home"/>
//         {formatMessage({id: __('信息')})}
//                             </span>
// )}>
// <Menu.Item key="user">{formatMessage({id: __('用户管理')})}</Menu.Item>
// </Menu.SubMenu>
// </Menu>
// </Layout.Sider>
// <Layout.Content>
// {/*<Route path="setting/user" component={User}/>*/}
// <User/>
// </Layout.Content>
// </Layout>