<template>
  <Html lang="en" :class="[ darkMode ? 'dark' : 'light']">
    <Head>
      <Meta charset="utf-8" />
      <Meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <Meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      <Link rel="icon" type="image/png" href="/mkt/ICON.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    </Head>
  
    <Body class="body-class hide-scrollbar">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script setup>

  import '@/src/styles/main.scss'

  import { CommonHelpers } from '@igortrindade/lazyfy'
  import { storeToRefs } from 'pinia'

  const route = useRoute()
  const { darkMode } = storeToRefs(useAppSharedStore())
  
  const title = ''
  const description = 'AI prompt made easy'
  const url = route.fullPath
  const image = ''

  useHead({
    titleTemplate: '%s ProjectMonkey',
    title,
    description,
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: title,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: image,
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: url,
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: title,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description,
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: image,
      },
    ],
  })

  onMounted(() => {
    useEmitter().on('clearLocalCache', () => {
      clearLocalCache()
    })

    if(typeof window !== 'undefined') {
      window.addEventListener('keydown', eventListenerAltArrowUp)
      initListenerClearCacheAndIndexedDb()
    }
  })
  
  onBeforeUnmount(() => {
    if(typeof window !== 'undefined') {
      window.removeEventListener('keydown', eventListenerAltArrowUp)
    }
    useEmitter().off('clearLocalCache')
  })

  const initListenerClearCacheAndIndexedDb = () => {
    CommonHelpers.clearBrowserCacheListener('KeyX', true, clearLocalCache)
  }

  const clearLocalCache = () => {
    CommonHelpers.clearBrowserCache()
    document.cookie.replace(/(?:\/)([^#]+)(?=#|$)/g, name => location.hostname.split('.').reverse().reduce(domain => (domain=domain.replace(/^\.?[^.]+/, ''),document.cookie=`${name}=;max-age=0;path=/;domain=${domain}`,domain), location.hostname));
    window.location.reload()
  }

  const eventListenerAltArrowUp = (e) => {
    if(e.altKey && e.key === 'ArrowUp') {
      useAppSharedStore().toggleDarkMode()
    }
  }

</script>


<style lang="scss">

  .body-class {
    @apply
      flex
      justify-center
      w-screen
      h-auto
      relative
      antialiased
      overflow-x-hidden
      scroll-smooth
      overflow-y-auto
      max-h-none;
  }



</style>
