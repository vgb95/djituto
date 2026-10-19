import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: process.env.DEPLOY_BASE ?? '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'logo.svg',
        'apple-touch-icon-180x180.png',
        'pwa-64x64.png',
      ],
      manifest: {
        name: 'TUTO — Pocket 3 Field OS',
        short_name: 'TUTO',
        description:
          'Aprende la DJI Osmo Pocket 3, prepara tu viaje a China y construye una voz propia como creador.',
        lang: 'es',
        dir: 'ltr',
        theme_color: '#F2EFE6',
        background_color: '#F2EFE6',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: './',
        start_url: './#/',
        categories: ['education', 'photo', 'travel'],
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        shortcuts: [
          {
            name: 'Misión de hoy',
            short_name: 'Hoy',
            url: './#/',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
          },
          {
            name: 'Plan de rodaje China',
            short_name: 'Rodar',
            url: './#/rodar',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
          },
          {
            name: 'Máquina de ideas',
            short_name: 'Ideas',
            url: './#/crear?tab=ideas',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        navigateFallback: 'index.html',
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
})
