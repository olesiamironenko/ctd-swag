import React from 'react';
import ctdLogo from './assets/icons/mono-blue-logo.svg';
import './App.css';

// Component1 uses a function declaration
function Component1() {
  return <p>Component1 uses a function declaration</p>;
}

//or
// Component2 uses a function expression
const Component2 = function () {
  return <p>Component2 uses a function expression</p>;
};

//or
// Component3 uses an arrow function
const Component3 = () => {
  return <p>Component3 uses an arrow function</p>;
};

//or
// Component4 uses an arrow function with implicit return
const Component4 = () => (
  <>
    <p>We have merch!!!</p>
    <ul>
      <li>tee shirt</li>
      <li>bucket hat</li>
      {/*valid JSX*/}
      <img src="../public/product-images/bucket-hat-peach.png" width={100} />
      <br />
      <input val="" />
    </ul>
  </>
);

const message = 'Coming Soon...'; //This is outside the function definition for App

function App() {
  const title = ' CTD Swag'; // This is inside the Component before the return

  return React.createElement(
    'div',
    {
      className: 'coming-soon',
    },
    React.createElement('h1', null, title),
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

    React.createElement('h2', null, message)
  );
}

export default App;
