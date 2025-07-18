<script setup lang="ts">
interface Props {
  videoId: string
  autoplay?: boolean
  id: string
}
import { useYouTubeAPI } from '@/composables/useYoutube'
import type { YT } from '@/composables/useYoutube'

const props = withDefaults(defineProps<Props>(), {
  videoId: '',
  autoplay: false,
  id: '',
})
const { videoId, autoplay, id } = toRefs(props)

const { loadYouTubeAPI } = useYouTubeAPI()
const player = ref<YT.Player | null>(null)

onMounted(async () => {
  try {
    const YT = await loadYouTubeAPI()
    
    // 檢查 YT 是否存在，避免 null 錯誤
    if (!YT) {
      console.error('YouTube API 加載失敗')
      return
    }

    player.value = new YT.Player(id.value, {
      videoId: videoId.value,
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: autoplay.value ? 1 : 0,
        controls: 0,
      },
      events: {
        // onReady: () => console.log("播放器已就緒"),
        // onStateChange: (event) => console.log("狀態改變:", event.data),
      },
    })
  } catch (error) {
    // console.error(`播放器 ${id.value} 初始化失敗:`, error)
  }
})

// 控制影片
const isPlay = ref<boolean>(false)
const playVideo = () => {
  isPlay.value = true
  player.value?.playVideo()
}
const pauseVideo = () => {
  isPlay.value = false
  player.value?.pauseVideo()
}

// 暴露方法給父組件使用
defineExpose({
  playVideo,
  pauseVideo,
  player,
  isPlay
})
</script>

<template>
  <div class="relative">
    <div class="absolute top-0 size-full bg-transparent" @click="isPlay ? pauseVideo() : playVideo()"></div>
    <div :id="id" :style="{ aspectRatio: '16/9', pointerEvents: 'none' }" class="youtube-player"></div>
  </div>
</template>

<style scoped>
.youtube-player {
  max-width: 100%;
  margin: auto;
}
</style>
