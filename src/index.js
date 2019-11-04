import React from 'react';
import ReactDOM from 'react-dom';

import App from 'src/demo/App';

import 'src/demo/demo.css';
import '../index.css';

ReactDOM.hydrate(
  <App />,
  document.getElementById('app')
);
