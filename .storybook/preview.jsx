import React from 'react';

// Load the app's design tokens + global styles so components render exactly as
// they do in the product. Mirrors the import order in src/main.jsx.
import '../src/styles/tokens.css';
import '../src/styles/global.css';
import '../src/styles/layout.css';
import '../src/styles/components.css';
import '../src/styles/wizard.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    layout: 'centered',

    backgrounds: {
      options: {
        primary: { name: 'Primary', value: '#ffffff' },
        secondary: { name: 'Secondary (canvas)', value: '#f9fafb' },
        overlay: { name: 'Overlay', value: '#131316' },
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    options: {
      storySort: {
        order: ['Foundations', 'Design System', 'Components', '*'],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  initialGlobals: {
    backgrounds: { value: 'primary' },
  },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-primary-2)' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
