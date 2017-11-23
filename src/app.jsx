import ReactDom from 'react-dom';
import React from 'react';
import Routes from './routes'
import Store from 'store';
import { BrowserRouter } from 'react-router-dom'
// import Modals from 'components/common/modals.jsx';

import { addLocaleData, IntlProvider } from 'react-intl';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';


// import './assets/stylesheets'

import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'

addLocaleData([...en, ...zh])
addLocaleData({
  "locale": "zh-CN",
  "parentLocale": "zh"
}, {
    "locale": "en-US",
    "parentLocale": "en"
  });

function transfromLanguageJson(messageJson) {
  let json = {};
  for (let key in messageJson) {
    if (!key) {
      continue;
    }
    json[key] = messageJson[key][1];
  }

  return json;
}

export function setMomentLocale(_moment, localeCode) {
  const _momentLocaleMap = { 'zh-CN': 'zh-cn', 'en-US': 'en-gb' }
  _moment.locale && _moment.locale(_momentLocaleMap[localeCode] || _momentLocaleMap['zh-CN'])
}

export function getLanguageCode() {

  if (!Store.get('languageCode')) {
    Store.set('languageCode', navigator.language);
  }

  return Store.get('languageCode');
}

let messageMap = {
  "zh-CN": zh_CN,
  "en-US": en_US
}
const antdLocaleMap = {
  "zh-CN": null,
  "en-US": enUS
}

export let messages = transfromLanguageJson(messageMap[getLanguageCode()]);

const render = Component => {
  ReactDom.render(
      <LocaleProvider locale={antdLocaleMap[getLanguageCode()]}>
        <IntlProvider
            locale={getLanguageCode()}
            messages={messages}
        >
          <div>
            <BrowserRouter>
              <Component/>
            </BrowserRouter>
            {/* <Modals /> */}
          </div>
        </IntlProvider>
      </LocaleProvider>,
      document.getElementById('app')
  );
}

render(Routes)

if (module.hot) module.hot.accept('./routes', () => render(require('./routes').default))
