import { defineConfig } from 'vite'
import { vitePluginTevm as tevm } from 'tevm/bundler/vite-plugin'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tevm()],
})
