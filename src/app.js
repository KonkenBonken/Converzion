import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';

import Group from './Group';
import groups from './groups.mjs';

const root = createRoot(document.querySelector('#root'));

root.render(<div>
  {groups.map(group=><Group key={group.map(u=>u.unit).join('>')}>{group}</Group>)}
</div>);