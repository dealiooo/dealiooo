import React from 'react';
import { configure, addDecorator } from '@storybook/react';

import App from '../src/App';

const req = require.context('../src', true, /.story\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => <App story={story} />);

configure(loadStories, module);
