import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';

import Group from './Group.jsx';
import groups from './groups.mjs';

const root = createRoot(document.querySelector('#root'));

root.render(<React.StrictMode>
  {groups.map(group=><Group key={group.map(u=>u.unit).filter(Boolean).join('>')} unitDatas={group}></Group>)}
</React.StrictMode>);