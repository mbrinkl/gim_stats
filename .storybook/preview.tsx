import { MantineProvider } from "@mantine/core";
import type { Preview } from "@storybook/react-vite";
import "@mantine/core/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
  },

  decorators: [(renderStory) => <MantineProvider forceColorScheme="dark">{renderStory()}</MantineProvider>],
};

export default preview;
