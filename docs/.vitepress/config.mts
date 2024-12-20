import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Taskify",
  head: [
    [
      'link',
      { rel: 'icon', href: '/taskify/favicon.ico' } 
    ]
  ],
  description: "Taskify documentation",
  base: '/taskify/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      {
        text: 'Installation',
        items: [
          {
            text: 'Linux',
            link: '/install/linux'
          },
          {
            text: 'Windows',
            link: '/install/windows'
          }
        ]
      },
      {
        text: 'Basic',
        items: [
          {
            text: 'Syntax',
            link: '/basic/syntax'
          },
          {
            text: 'Ignore files',
            link: '/basic/ignore'
          },
          {
            text: 'CLI tool',
            link: '/basic/cli'
          },
          {
            text: 'Server',
            link: '/basic/server'
          }
        ]
      }
    ],
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
