import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter} from 'react-router-dom'
import Routes from './routes'
import Modals from './components/common/modals'

const render = () => {
    ReactDOM.render(
        <div>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
            <Modals/>
        </div>,
        document.getElementById('root')
    )
}

render()


registerServiceWorker();
