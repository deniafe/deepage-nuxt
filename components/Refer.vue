<template>
  <div class="pt-6 pb-8 border-t-2 mt-4 border-gray-300">
    <div class="h-14 bg-gray-300 rounded-md grid grid-cols-4 items-center px-3">
      <div
        class="col-span-3 lg:text-sm border-transparent"
        contenteditable="true"
      >
        {{ uniqueLink }}
      </div>
      <i
        :class="copied ? 'fa fa-check' : 'far fa-copy'"
        class="col-span-1 justify-self-end text-primary"
        @click.stop.prevent="copyLink"
      ></i>
      <input id="ref-link" type="hidden" :value="link" />
    </div>
    <div class="grid grid-cols-6 mt-6 mx-4 md:grid-cols-12 lg:grid-cols-7">
      <a
        v-for="(social, i) in socials"
        :key="i"
        target="_blank"
        :href="social.href"
        style="color: rgb(255, 26, 64)"
      >
        <i :class="social.icon" class="text-base pb-2"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Refer',
  data() {
    return {
      socials: [
        {
          href:
            'http://www.facebook.com/sharer/sharer.php?u=https://instagram.devrl.link',
          icon: 'fab fa-facebook-f',
        },
        {
          href:
            'https://www.pinterest.com/pin/create/button/?url=https://vy.tc/jMcJj83&amp;media=https://cdn.vyper.io/0952f47a-f6f9-4c59-aa62-558054c9d691/-/quality/lighter/-/format/auto/null',
          icon: 'fab fa-pinterest',
        },
        {
          href:
            'https://web.whatsapp.com/send?text=https://vy.tc/jMcJj83 This%20contest%20is%20amazing!',
          icon: 'fab fa-whatsapp',
        },
        {
          href:
            'https://telegram.me/share/url?url=https://vy.tc/jMcJj83&amp;text=This%20contest%20is%20amazing!',
          icon: 'fab fa-telegram',
        },
        {
          href: 'https://twitter.com/intent/tweet?url=https://vy.tc/jMcJj83',
          icon: 'fab fa-twitter',
        },
        {
          href:
            'fb-messenger://share/?link=https://vy.tc/jMcJj83&amp;app_id=1011451708909975',
          icon: 'fab fa-facebook-messenger',
        },
        {
          href:
            'mailto:?body=This%20contest%20is%20amazing! https://vy.tc/jMcJj83',
          icon: 'fas fa-envelope-open text-primary col-span-1',
        },
      ],
      link: ' http://instagram.devrl.link',
      copied: false,
    }
  },
  computed: {
    ...mapGetters({
      uniqueLink: 'share/uniqueLink',
    }),
  },
  methods: {
    copyLink() {
      const refLinkToCopy = document.querySelector('#ref-link')
      refLinkToCopy.setAttribute('type', 'text') // 不是 hidden 才能複製
      refLinkToCopy.select()
      try {
        document.execCommand('copy')
        this.copied = true
      } catch (err) {
        alert('Oops, unable to copy')
      }
      /* unselect the range */
      refLinkToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
      setTimeout(() => (this.copied = false), 3000)
    },
  },
}
</script>

<style scoped>
.fa-facebook-messenger {
  color: #00c6ff;
}
.fa-twitter {
  color: #1da1f2;
}
.fa-facebook-f {
  color: #3c5a99;
}
.fa-pinterest {
  color: #c8232c;
}
.fa-whatsapp {
  color: #25d366;
}
.fa-telegram {
  color: #0088cc;
}
</style>
