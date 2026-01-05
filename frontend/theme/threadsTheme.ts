import { config as defaultConfig } from "@gluestack-ui/config";

export const threadsTheme = {
  ...defaultConfig,

  tokens: {
    ...defaultConfig.tokens,

    colors: {
      ...defaultConfig.tokens.colors,

      // Core Threads colors
      backgroundDark: "#000000",
      textPrimary: "#FFFFFF",
      textSecondary: "#A1A1A1",
      borderDark: "#2A2A2A",

      // Buttons
      buttonPrimary: "#FFFFFF",
      buttonPrimaryPressed: "#E5E5E5",
      buttonText: "#000000",
    },
  },
};
