import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import { Layout, Spin, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Sider, Content } = Layout;

import UserStore from "./stores/userStore"

import Header from './layouts/header'
import Markdown from "./components/markdown"
import Login from "./components/login"
import Calendar from "./components/calendar"
import Test from './components/test'
import Nav from './layouts/nav'
import Setting from './components/setting';


class Routes extends Component {
    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.object.isRequired,
            route: PropTypes.object.isRequired,
            staticContext: PropTypes.object
        })
    }

    componentWillMount() {
        this.subscription = UserStore.addListener(this.routeLogin)
        this.routeLogin();
    }

    componentWillUnmount() {
        this.subscription = null;
        this.subscription.remove();
    }

    routeLogin = () => {
        return;
        const {history, route: {location}} = this.context.router
        if (!UserStore.currentUser && location.pathname !== '/login') {
            const redirect = location.pathname + location.search
            history.push(`/login?redirect=+${encodeURIComponent(redirect)}`)
        }
    }


  render() {
      return (
          <Switch>
              <Route path="/login" component={Login}/>
              <Route>
                  <Layout style={{"height": "100vh"}}>
                      <Header />
                      <layout style={{"display": "flex", "height": "100%", "background": "#ffffff"}}>
                          <Sider>
                              <Nav/>
                          </Sider>
                          <Content style={{"padding": "4px", "borderLeft": '1px solid #cfcfcf'}}>
                              <Switch>
                                  <Route exact path="/" component={Markdown} />
                                  <Route exact path="/calendar" component={Calendar} />
                                  <Route path="/test" component={Test} />
                                  <Route exact path="/setting" component={Setting}/>
                              </Switch>
                          </Content>
                      </layout>
                  </Layout>
              </Route>
          </Switch>
    )
  }
}

export default Routes;
