
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  // Determine if we're building the widget
  const isWidget = process.env.WIDGET === 'true';
  
  // Base configuration
  const config = {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
  
  // Add widget-specific configuration when building the widget
  if (isWidget && command === 'build') {
    return {
      ...config,
      build: {
        outDir: 'widget-dist',
        lib: {
          entry: path.resolve(__dirname, 'src/widget.tsx'),
          name: 'CasinoChatWidget',
          formats: ['umd'],
          fileName: () => 'casino-chat-widget.js',
        },
        rollupOptions: {
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
          external: ['react', 'react-dom'],
        },
      },
    };
  }
  
  return config;
});
