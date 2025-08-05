import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/resumes': 'http://localhost:8000',
      '/api/jobs': 'http://localhost:5000',
      '/api/auth': 'http://localhost:5000'
    },
  },
});
