import { defineNuxtPlugin } from '#app'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger)

  nuxtApp.provide('gsap', gsap)
  nuxtApp.provide('scrollTrigger', ScrollTrigger)
})