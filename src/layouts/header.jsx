import React, {Component} from 'react'
import {
  Avatar,
  Layout,
  Form,
  Input,
  Button,
  Row,
  Col,
  Alert,
  Dropdown,
  Icon,
  Menu,
} from 'antd';

import style from "./style.scss"

class Header extends Component {

  render() {
    return (
        <Layout.Header>
          <div className={style.logo} />
        </Layout.Header>
    )
  }
}


export default Header;
