import * as React from 'react';
import {Route, Switch, BrowserRouterProps} from 'react-router-dom';
import * as PropTypes from 'prop-types';
import {Layout} from 'antd'

const {Content} = Layout;
import Nav from './layout/nav';

import UserList from './components/user';
import Chart from './components/chart';

interface RoutesProps extends BrowserRouterProps {
    [index: string]: any;
    [num: number]: any;
}

class Routes extends React.Component<RoutesProps, any> {
    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.object.isRequired,
            route: PropTypes.object.isRequired,
            staticContext: PropTypes.object,
        })
    }

    constructor(props: RoutesProps) {
        super(props)
    }

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Nav/>
                <Layout>
                    {/*<Header>header</Header>*/}
                    <Content>
                        <Switch>
                            <Route exact path="/user" component={UserList}/>
                            <Route exact path="/chart" component={Chart}/>
                            <Route component={UserList}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Routes;