import * as React from "react"
import {
    Menu,
    Icon
} from 'antd'
import {
    NavLink,
} from 'react-router-dom';

const {SubMenu} = Menu;

class Nav extends React.Component {

    state = {
        defaultSelectedKeys: '1',
        defaultOpenKeys: 'sub1'

    }

    handleSelect = ({item, key, selectedKeys}) => {
        this.setState({
            defaultSelectedKeys: item.key
        })
    }

    render() {
        const {defaultSelectedKeys, defaultOpenKeys} = this.state;
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={[defaultSelectedKeys]}
                defaultOpenKeys={['sub1']}
                style={{height: '100%', borderRight: 0}}
                onSelect={this.handleSelect}
            >
                <SubMenu key="sub1" title={<span><Icon type="mail"/><span>My Demo</span></span>}>
                    <Menu.Item key="1">
                        <NavLink to="/">
                            Markdown
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink to="/calendar">
                            Calendar
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <NavLink to="/test">
                            Test
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <NavLink to="/loader">
                            自定义loader编写示例
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <NavLink to="/setting">
                            设置
                        </NavLink>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}

export default Nav;
