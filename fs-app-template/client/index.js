import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import CssBaseline from '@material-ui/core/CssBaseline'

ReactDOM.render(
  <CssBaseline>
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  </CssBaseline>,
  document.getElementById('app')
)
