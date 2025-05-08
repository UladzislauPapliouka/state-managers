'use client';

import {
  ChakraProvider,
  defaultConfig,
  defineConfig,
  createSystem
} from '@chakra-ui/react';
import {
  ColorModeProvider,
  type ColorModeProviderProps
} from './color-mode.tsx';

const config = defineConfig({
  theme: {
    recipes: {
      button: {
        base: {
          borderRadius: 'md'
        }
      }
    }
  },
  globalCss: {
    html: {
      colorPalette: 'purple' // Change this to any color palette you prefer
    }
  }
});

export const system = createSystem(defaultConfig, config);

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
