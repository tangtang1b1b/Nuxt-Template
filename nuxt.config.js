// https://nuxt.com/docs/api/configuration/nuxt-config
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-04-03',
  head: {
    title: '超速柴柴',
    htmlAttrs: {
        lang: 'zh-TW'
    },
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:title', content: '超速柴柴' },
        { property: 'og:description', content: '超速柴柴' },
        { property: 'og:site_name', content: '超速柴柴' },
        { property: 'og:locale', content: 'zh_TW' }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' },
    ],
    noscript: [
      // <noscript>JavaScript is required</noscript>
      { children: 'JavaScript is required' }
    ]
  },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      }
    ],
    '@vite-pwa/nuxt'
  ],
  pinia: {
    autoImports: [
      'defineStore',
    ],
  },
  pwa: {
    manifest: {
      name: '超速柴柴',
      short_name: '超速柴柴',
      description: '不要看路看儀表',
      theme_color: '#fff',
      icons: [
        {
          src: 'dog64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'dog144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: 'dog192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'dog512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
  vite: {
    plugins:  [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'assets/icons')],
        symbolId: '[dir]/[name]',
        customDomId: '__svg__icons__dom__',
      })
    ]
  },
  workbox: {
    workboxOptions: {
      runtimeCaching: [],
    }
  },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    APP_URL: process.env.APP_URL,
    API_URL: process.env.API_URL,
    public: {
      APP_URL: process.env.APP_URL,
      API_URL: process.env.API_URL
    }
  },
  devtools: { enabled: true },
})
