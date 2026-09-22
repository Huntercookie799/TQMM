import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['kirby.png'],
      manifest: {
        name: 'Flores Amarillas',
        short_name: 'Para Eli',
        description: 'Una sorpresa de flores amarillas para Eli',
        theme_color: '#78d2f6',
        background_color: '#a4e5fb',
        display: 'standalone',
        icons: [
          {
            src: 'kirby.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'kirby.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'kirby.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
