import * as _ from 'lodash';
import * as React from 'react';
// import PropTypes from 'prop-types';

let Single: any

export class Deferred {
    promise: any;
    resolve: any;
    reject: any

    constructor() {
        this.promise = new Promise((resolve: any, reject: any) => {
            this.resolve = resolve
            this.reject = reject
        })
    }
}

interface ModalProps {
    [index: string]: any;
    [num: number]: any
}

export default class Modals extends React.Component<any, any> {
    state = {
        modals: []
    }

    static show = (component: any, props: ModalProps) => {
        const key = _.uniqueId('modal');
        const deferred = new Deferred();
        const {modals} = Single.state;

        props.visible = true
        props.onOk = (val: any) => {
            deferred.resolve(val);
            _.remove(modals, (m: any) => m.key === key)
            Single.setState({modals});
        }

        props.onCancel = () => {
            deferred.reject();
            _.remove(modals, (m: any) => m.key === key)
            Single.setState({modals});
        }

        modals.push({key, component, props})
        Single.setState({modals});
        return deferred.promise;
    }

    constructor(props: any) {
        super(props);
        Single = this;
        return Single;
    }

    render() {
        return (
            <div>
                {this.state.modals.map((m: any) => <m.component key={m.key} {...m.props} />)}
            </div>
        )
    }
}
