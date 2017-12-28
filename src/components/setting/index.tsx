import * as React from 'react';
import {Route} from 'react-router-dom';
// import {injectIntl, FormattedMessage} from 'react-intl';
import {Layout, Menu, Icon} from 'antd';
import User from './user';


class Setting extends React.Component<any, any> {

    state = {
        settingType: 'user'
    }

    handleMenuChange = ({ key }) => {

        this.setState({
            settingType: key
        })
    }

    render() {
        // const { intl: { formatMessage } } = this.props
        // const { settingType = 'user' } = this.state;

        return (<User/>)
    }
}

export default Setting