declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default defineNuxtPlugin(() => {
  const { GA_ID } = useRuntimeConfig().public
  if (!GA_ID) {
    return
  }
  if (import.meta.client) {
    // 加載 gtag.js
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)

    // 初始化 gtag
    script.onload = () => {
      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments)
      }

      // 將 gtag 函數附加到 window 物件
      window.gtag = gtag

      gtag('js', new Date())
      gtag('config', GA_ID)
    }
  }
})
