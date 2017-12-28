import * as React from 'react';
import {Layout, Menu, Icon} from 'antd'

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;

import { withRouter} from 'react-router-dom';

class Nav extends React.Component<any, any> {
    state = {
        collapsed: false,
        selectedKeys: ['1']
    }

    constructor(props: any) {
        super(props)
    }

    handleToggleCollapse = (): void => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    handleMenu = (data: object): void => {
        this.setState({
            selectedKeys: [data["key"]]
        })
        this.props.history.push(data["key"])
    }

    render() {
        return (
            <Sider
                collapsible={true}
                collapsed={this.state.collapsed}
                onCollapse={this.handleToggleCollapse}>
                <Menu theme="dark"
                      mode="inline"
                      defaultSelectedKeys={['user']}
                      inlineCollapsed={this.state.collapsed}
                      onSelect={this.handleMenu}
                >
                    <Menu.Item key="user">
                        <Icon type="user"/>
                        <span>用户</span>
                    </Menu.Item>
                    <Menu.Item key="chart">
                        <Icon type="desktop"/>
                        <span>SVG</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="inbox"/>
                        <span>Option 3</span>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="mail"/><span>Navigation One</span></span>}>
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore"/><span>Navigation Two</span></span>}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}
export default withRouter(Nav)