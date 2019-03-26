import React from 'react';
import ReactDOM from 'react-dom';
import Catalog from './Catalog';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Catalog />, div);
  ReactDOM.unmountComponentAtNode(div);
});
