<template>
  <div>
    <leadPage
      :referred-by="referredBy"
      :template="body"
      :camp-id="campaignId"
    />
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from 'axios's
import { parse } from 'node-html-parser'
import leadPage from '@/components/leadPage'
import { db } from '@/plugins/firebase'

export default {
  name: 'Home',
  components: {
    leadPage,
  },
  // head: {
  //   title: {
  //     inner: 'It will be a pleasure',
  //   },
  //   // Meta tags
  //   meta: [
  //     { name: 'application-name', content: 'Name of my application' },
  //     { name: 'description', content: 'A description of the page', id: 'desc' }, // id to replace intead of create element
  //     // ...
  //     // Twitter
  //     { name: 'twitter:title', content: 'Content Title' },
  //     // with shorthand
  //     {
  //       n: 'twitter:description',
  //       c: 'Content description less than 200 characters',
  //     },
  //     // ...
  //     // Google+ / Schema.org
  //     { itemprop: 'name', content: 'Content Title' },
  //     { itemprop: 'description', content: 'Content Title' },
  //     // ...
  //     // Facebook / Open Graph
  //     { property: 'og:title', content: 'Deeviral Viral Contest' },
  //     {
  //       property: 'og:description',
  //       content: 'The most comprehensive viral contest online',
  //     },
  //     { property: 'og:type', content: 'article' },
  //     { property: 'og:url', content: 'https://instagram.devrl.link' },
  //     {
  //       property: 'og:image',
  //       content: 'https://app.truepush.com/assets/images/no_data.jpg',
  //     },
  //     // with shorthand
  //     { p: 'og:image', c: 'https://example.com/image.jpg' },
  //     // ...
  //   ],
  //   // link tags
  //   link: [
  //     {
  //       rel: 'canonical',
  //       href: 'http://example.com/#!/contact/',
  //       id: 'canonical',
  //     },
  //     { rel: 'author', href: 'author', undo: false }, // undo property - not to remove the element
  //     {
  //       rel: 'icon',
  //       // href: require('./path/to/icon-16.png'),
  //       sizes: '16x16',
  //       type: 'image/png',
  //     },
  //     // with shorthand
  //     // { r: 'icon', h: 'path/to/icon-32.png', sz: '32x32', t: 'image/png' },
  //     // ...
  //   ],
  //   script: [
  //     {
  //       type: 'text/javascript',
  //       src: 'cdn/to/script.js',
  //       async: true,
  //       body: true,
  //     }, // Insert in body
  //     // with shorthand
  //     { t: 'application/ld+json', i: '{ "@context": "http://schema.org" }' },
  //     // ...
  //   ],
  //   style: [
  //     {
  //       type: 'text/css',
  //       inner: 'body { background-color: #000; color: #fff}',
  //       undo: false,
  //     },
  //     // ...
  //   ],
  // },
  data() {
    return {
      body: '',
      campaignId: '',
      subDomain: '',
    }
  },
  head: {
    titleTemplate: '%s - Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { property: 'og:url', content: 'http://instagram.devrl.link' },
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: 'Deeviral Page' },
      {
        property: 'og:description',
        content: 'The best Viral marketing platform to use',
      },
      {
        property: 'og:image',
        content:
          'https://firebasestorage.googleapis.com/v0/b/telephy-147d6.appspot.com/o/PzJDgebXYOZNbdWE20sOOHhXyYF2%2F342d947fa1e53-A%20whole%20new%20look.jpg?alt=media&token=7b75766f-4786-40b4-bd9e-1c11526e8e32',
      },
    ],
  },
  computed: {
    referredBy() {
      // return this.getParams(window.location.href).ref
      return 'yes'
    },
  },
  created() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    if (process.browser) {
      console.log('The window object:', window)
      // eslint-disable-next-line nuxt/no-globals-in-created
      this.subDomain = this.getSubdomain(window.location.hostname)
      console.log(
        'This is the current subdomain name in created: ',
        // eslint-disable-next-line nuxt/no-globals-in-created
        this.getSubdomain(window.location.hostname),
      )
    }
    this.getPage()
    this.getIp()
  },
  methods: {
    getIp() {
      fetch('https://api.ipify.org?format=json')
        .then((x) => x.json())
        .then((res) => {
          console.log(`Getting user's ip address: `, res)
        })
    },
    getSubdomain(hostname) {
      let subDomain
      // eslint-disable-next-line no-useless-escape
      const regexParse = /[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$/
      const urlParts = regexParse.exec(hostname)
      if (urlParts) {
        subDomain = hostname.replace(urlParts[0], '').slice(0, -1)
      }
      return subDomain
    },
    // console.log(getSubdomain(window.location.hostname))
    getParams(url) {
      const params = {}
      const parser = document.createElement('a')
      parser.href = url
      const query = parser.search.substring(1)
      const vars = query.split('&')
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=')
        params[pair[0]] = decodeURIComponent(pair[1])
      }
      return params
    },
    // var referredBy = getParams(window.location.href).ref
    vueCode(rawHtml) {
      const root = parse(rawHtml)
      // const inputs = root.querySelectorAll('input')
      // const buttons = root.querySelectorAll('.button')
      // const forms = root.querySelectorAll('form')

      const newHtml = root.toString()
      // const changeElement = ({ oldEl, newEl, elements }) => {
      //   let rawElement
      //   let newElement
      //   elements.forEach((element) => {
      //     rawElement = element.toString()
      //     newElement = rawElement.replace(oldEl, newEl)
      //     newHtml = newHtml.replace(rawElement, newElement)
      //   })
      // }

      // changeElement({
      //   oldEl: '<input ',
      //   newEl: '<input v-model="form.email" ',
      //   elements: inputs,
      // })

      // changeElement({
      //   oldEl: '<a href="#" class="button w-button">',
      //   newEl: '<a @click.stop="save" class="button w-button">',
      //   elements: buttons,
      // })

      // changeElement({
      //   oldEl: '<form ',
      //   newEl: '<form @submit.prevent="save" ',
      //   elements: forms,
      // })

      // return newHtml
      return newHtml
    },
    async getPage() {
      const vm = this
      const subDomain = this.subDomain || 'facebook'
      try {
        const query = await db
          .collection('pages')
          .where('subDomain', '==', subDomain)
          .where('type', '==', 'leadPage')
          .get()

        if (!query.empty) {
          const data = query.docs[0].data()
          const rawHtml = data.html
          vm.body = `<div>${vm.vueCode(rawHtml)}</div>`
          vm.campaignId = data.campaignId
          const style = document.createElement('style')
          style.innerHTML = data.css
          document.head.appendChild(style)
        } else {
          vm.body = `<h1>Page Not found</h1>`
        }
      } catch (error) {
        console.log('There was an error loading the web page', error)
        vm.body = `<h1>There was an error loading this webpage</h1>`
      }
    },
  },
}
</script>
