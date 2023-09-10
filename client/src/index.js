// jshint ignore:start
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from "react-redux"
import './index.css'
import store from "./store/store"
import AppRoute from "./router/AppRoute"
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppRoute />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
