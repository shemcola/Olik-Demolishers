import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig(({ mode }) => {
    // Load env file from the current directory
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        base: '/',
        define: {
            // This maps your .env variable to the code
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            // Adding a fallback so both variable names work in your services
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        resolve: {
            alias: {
                // Since your files are in the root, @ points to the current folder
                '@': path.resolve(__dirname, './'),
            },
        },
        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        build: {
            outDir: 'dist',
            emptyOutDir: true,
        }
    };
});
