import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages path:
  // - username.github.io reposu üçün → '/'
  // - username.github.io/sanan/ üçün → '/sanan/'
  base: '/me/',
});
