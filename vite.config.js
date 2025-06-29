import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
      '@css': path.resolve(__dirname, 'src/CSS'),
      '@js': path.resolve(__dirname, 'src/Js'),
    },
  },
  server: {
    host: true,// escucha en 0.0.0.0
    port: 5173,
    strictPort: true
  }

})
