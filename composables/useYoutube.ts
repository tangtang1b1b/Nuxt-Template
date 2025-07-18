// 定義 YouTube IFrame API 的類型
export declare namespace YT {
  interface PlayerOptions {
    height?: string | number
    width?: string | number
    videoId?: string
    playerVars?: Record<string, any>
    events?: {
      onReady?: (event: { target: Player }) => void
      onStateChange?: (event: { data: number; target: Player }) => void
    }
  }

  interface Player {
    playVideo(): void
    pauseVideo(): void
    stopVideo(): void
    destroy(): void
    getVideoData(): any
    getCurrentTime(): number
    getDuration(): number
  }

  interface PlayerConstructor {
    new (elementId: string | HTMLElement, options: PlayerOptions): Player
  }
}

// 擴展全域 Window 介面
declare global {
  interface Window {
    YT: {
      Player: YT.PlayerConstructor
    }
    onYouTubeIframeAPIReady: () => void
  }
}

// 使用正確的 TypeScript 類型
let youtubeAPIReady = ref<boolean>(false)
let youtubeAPIResolve: ((value: typeof window.YT) => void) | null = null

const loadYouTubeAPI = (): Promise<typeof window.YT | null> => {
  if (typeof window === 'undefined') return Promise.resolve(null) // SSR 處理

  if (window.YT && window.YT.Player) {
    return Promise.resolve(window.YT) // API 已載入
  }

  if (youtubeAPIReady.value) {
    return new Promise<typeof window.YT>((resolve) => {
      youtubeAPIResolve = resolve // 等待 API 載入完成
    })
  }

  youtubeAPIReady.value = true

  return new Promise<typeof window.YT>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    script.onerror = reject
    window.onYouTubeIframeAPIReady = () => {
      if (youtubeAPIResolve) {
        youtubeAPIResolve(window.YT)
        youtubeAPIResolve = null
      }
      resolve(window.YT)
    }
    document.head.appendChild(script)
  })
}

export const useYouTubeAPI = () => {
  return { loadYouTubeAPI }
}
