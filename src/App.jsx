import React from 'react';
import ctdLogo from './assets/icons/mono-blue-logo.svg';
import './App.css';

function Component1() {
  return <p>Component1 uses a function declaration</p>;
}

//or

const Component2 = function () {
  return <p>Component2 uses a function expression</p>;
};

//or

const Component3 = () => {
  return <p>Component3 uses an arrow function</p>;
};

//or

const Component4 = () => (
  <p>Component4 uses an arrow function with implicit return</p>
);

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
    // Inserted components
    React.createElement(Component1), // using function declaration
    React.createElement(Component2), // using function expression
    React.createElement(Component3), // arrow function
    React.createElement(Component4), // arrow function with implicit return

    React.createElement('h2', null, 'Coming Soon...')
  );
}

export default App;
