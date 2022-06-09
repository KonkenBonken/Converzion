import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';

import Group from './Group';

const root = createRoot(document.querySelector('#root'));

root.render(<div>
  <Group>{[{
    name: 'meter',
    unit: 'm'
  },
  {
    name: 'foot',
    unit: 'ft',
    fromRoot: m=>m*3.2808399,
    toRoot: ft=>ft/3.2808399
  },
  {
    name: 'inch',
    unit: 'in',
    fromRoot: m=>m*3.2808399*12,
    toRoot: ft=>ft/3.2808399/12
  }]}</Group>
</div>);