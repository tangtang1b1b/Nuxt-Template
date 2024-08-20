export const fetchImg = (url) => {
  const { APP_URL } = useRuntimeConfig().public;
  return `${APP_URL}${url}`
}