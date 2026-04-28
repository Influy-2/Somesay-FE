import type { Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';

import '../src/styles/global.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div
          style={{
            width: '440px',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    backgrounds: {
      options: {
        // 👇 Default options
        light: { name: 'Light', value: '#ffffff' },
        dark: { name: 'Dark', value: '#333' },
        // 👇 Add your own
        // maroon: { name: 'Maroon', value: '#400' },
      },
    },
    initialGlobals: {
      // 👇 Set the initial background color
      backgrounds: { value: 'light' },
    },
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
