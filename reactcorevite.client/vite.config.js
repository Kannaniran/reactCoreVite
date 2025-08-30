import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'https://localhost:7270/',
                changeOrigin: true,
                secure: false
            }
        }
    },
    resolve: {
        alias: {
            '@views': path.resolve(__dirname, 'src/Views'),
            '@': path.resolve(__dirname, './src'), // for src/
            'assets': path.resolve(__dirname, './src/assets') // for direct assets access
        }
    }
});
