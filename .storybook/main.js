

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/react-vite",
  "core": { "disableTelemetry": true },
  // Allow Storybook's Vite preview to be served through public dev tunnels.
  async viteFinal(config) {
    config.server = config.server || {};
    config.server.allowedHosts = ['.trycloudflare.com', '.loca.lt', '.ngrok-free.app', '.ngrok.io'];
    return config;
  },
};
export default config;