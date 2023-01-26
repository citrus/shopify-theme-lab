import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './css/index.css'

const apps = import.meta.glob('./apps/*.vue')
const pinia = createPinia()

const mount = async (el: Element, appImport: any) => {

  const module = await appImport()
  const app = createApp(module.default)
  app.use(pinia)
  app.mount(el)
}

const vueElements = document.querySelectorAll('[vue-app]')
if (vueElements) {
  vueElements.forEach(el => {
    const name = el.getAttribute('vue-app')
    const app = apps[`./apps/${name}.vue`]
    if (name && app) {
      mount(el, app)
    }
  })
}

/**
 * fixes for Shopify sections
 * 1. properly render vue components on user insert in the theme editor
 * 2. reload the current page to rerender async inserted sections with vue components
 *
 * add the 'vue' keyword to the section's wrapper classes if the section uses any vue functionality e.g.:
 * {% schema %}
 * {
 *   "class": "vue-section"
 * }
 * {% endschema %}
 */
// if (typeof window.Shopify !== undefined) {
//   if (Shopify && Shopify.designMode) {
//     document.addEventListener('shopify:section:load', (event) => {
//       if (event.target.classList.value.includes('vue')) {
//         createVueApp().mount(event.target)
//       }
//     })
//   } else if (!Shopify.designMode && process.env.NODE_ENV === 'development') {
//     new MutationObserver((mutationsList) => {
//       mutationsList.forEach(record => {
//         const vue = Array.from(record.addedNodes).find(node => node.classList && node.classList.value.includes('vue'))
//         if (vue) window.location.reload()
//       })
//     }).observe(document.body, {
//       childList: true,
//       subtree: true
//     })
//   }
// }
