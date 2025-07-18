<script setup lang="ts">
interface Props {
  title?: string
  desc?: string
  image?: string | undefined
  url?: string
  keywords?: string
}

const config = useRuntimeConfig()

const props = withDefaults(defineProps<Props>(), {
  title: '',
  desc: '',
  image: '',
  url: '',
  keywords: '',
})

useServerSeoMeta({
  title: props.title || config.public.APP_TITLE,
  description: props.desc || config.public.APP_DESC,
  ogTitle: props.title || config.public.APP_TITLE,
  ogSiteName: props.title || config.public.APP_TITLE,
  ogDescription: props.desc || config.public.APP_DESC,
  keywords: props.keywords || config.public.APP_KEYWORDS,
  ogImage: props.image || `${config.public.APP_URL}/og_image.jpg`,
})
useSeoMeta({
  title: props.title || config.public.APP_TITLE,
  description: props.desc || config.public.APP_DESC,
  ogTitle: props.title || config.public.APP_TITLE,
  ogSiteName: props.title || config.public.APP_TITLE,
  ogDescription: props.desc || config.public.APP_DESC,
  keywords: props.keywords || config.public.APP_KEYWORDS,
  ogImage: props.image || `${config.public.APP_URL}/og_image.jpg`,
})
</script>

<template>
  <Head>
    <Title>{{ props.title || config.public.APP_TITLE }}</Title>
    <Meta hid="description" name="description" :content="props.desc || config.public.APP_DESC" />
  </Head>
</template>
