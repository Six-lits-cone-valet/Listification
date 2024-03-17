export default defineNuxtConfig({
  devtools: { enabled: false },
  css: [
    '~/css/main.css',
    '~/css/utility.css'
  ],
app: {
    head: {
        charset: 'utf-8', // default
        viewport: 'width=device-width, user-scalable=no', // default,
        title: 'Listification',
        htmlAttrs: {
            lang: 'en'
        },
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/web-assets/favicon.ico' },
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/web-assets/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/web-assets/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/web-assets/favicon-16x16.png' },
            { rel: 'manifest', href: '/web-assets/site.webmanifest' },
            { rel: 'mask-icon', href: '/web-assets/safari-pinned-tab.svg', color: '#5bbad5' },
            { rel: 'shortcut icon', href: '/web-assets/favicon.ico' }
        ],
        meta: [
            { name: 'theme-color', content: '#013657' },
            { name: 'og:title', property: 'og:title', content: 'Listification'},
            { name: 'og:description', property: 'og:description', content: 'Listification is a web app that allows you to create list locally, without the need of an internet connection.' },
            { name: 'og:image' , property: 'og:image', content: '/web-assets/banner.png' },
            { name: 'og:image:width' , property: 'og:image:width', content: '1200' },
            { name: 'og:image:height' , property: 'og:image:height', content: '630' },
            { name: 'og:image:alt' , property: 'og:image:alt', content: 'Listification' },
            { name: 'og:image:type' , property: 'og:image:type', content: 'image/png' },
            { name: 'og:image:secure_url' , property: 'og:image:secure_url', content: 'https://listification.netlify.app/webContent/banner.png' },
            { name: 'og:type', property: 'og:type', content: 'webapp' },
            { name: 'fb:app_id', property: 'fb:app_id', content: '3436291' },
        ]
    }
}
})