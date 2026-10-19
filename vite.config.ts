import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// Plugin to completely silence and eliminate Vite client WebSocket attempts in cloud/container reverse-proxy environments
const disableHmrClientPlugin = {
  name: 'disable-hmr-client',
  enforce: 'pre' as const,
  transform(code: string, id: string) {
    if (id.includes('vite/dist/client/client.mjs') || id.includes('@vite/client')) {
      return code.replace(
        /async connect\(handlers\)\s*\{[\s\S]*?async disconnect\(\)/,
        'async connect() { return; }, async disconnect()'
      );
    }
  },
};

export default defineConfig(() => {
  const isHmrDisabled = true;
  const port = Number(process.env.PORT) || 3000;
  const host = process.env.HOST || '0.0.0.0';

  return {
    plugins: [disableHmrClientPlugin, react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host,
      port,
      strictPort: true,
      allowedHosts: true as const,
      hmr: false,
      watch: null,
    },
  };
});

