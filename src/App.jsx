import React from 'react';
import ctdLogo from './assets/icons/mono-blue-logo.svg';
import './App.css';

function App() {
  return React.createElement(
    'div',
    {
      className: 'coming-soon',
    },
    React.createElement('h1', null, 'CTD Swag'),
    React.createElement(
      'div',
      {
        className: 'siteBranding',
      },
      React.createElement('img', {
        src: ctdLogo,
        alt: 'Code The Dream Logo',
      })
    ),
    React.createElement('h2', null, 'Coming Soon...')
  );
}
export default App;
