/* eslint-disable global-require */
// As of Babel 7.4.0, this package has been deprecated in favor of directly
// including core-js/stable (to polyfill ECMAScript features)
// and regenerator-runtime/runtime (needed to use transpiled generator functions):
// import 'core-js/stable'
// import 'regenerator-runtime/runtime'
// ref: https://babeljs.io/docs/en/babel-polyfill
import 'regenerator-runtime/runtime'
import 'core-js/stable/object/keys'
import 'core-js/stable/array/is-array'
import 'core-js/stable/array/for-each'
import 'core-js/stable/array/sort'
import 'core-js/stable/array/filter'
import 'core-js/stable/array/map'
import 'core-js/stable/array/reduce'
import 'core-js/stable/string/replace'
import 'core-js/stable/string/split'
import 'core-js/stable/string/includes'
import 'core-js/stable/string/starts-with'
import 'core-js/stable/number/to-fixed'
import 'core-js/stable/date/now'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './configureStore'

const store = configureStore()
const App = React.lazy(() => import('./components/App'))

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
