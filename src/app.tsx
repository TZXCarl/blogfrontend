import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import Routes from './routes';
// import Modals from './components/common/modals';

const render = () => {
    return ReactDOM.render(
        <BrowserRouter>
            <div>
                <Routes/>
                {/*<Modals/>*/}
            </div>
        </BrowserRouter>,
        document.getElementById('app')
    );
}

render();