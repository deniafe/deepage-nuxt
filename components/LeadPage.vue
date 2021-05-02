<template>
  <div>
    <div v-if="template">
      <v-runtime-template :template="template" />
    </div>
    <div v-if="!template">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/plugins/firebase'
import { mapGetters } from 'vuex'
import tinyurl from 'tinyurl'
import VRuntimeTemplate from 'v-runtime-template'
export default {
  name: 'LeadPageComponent',
  components: {
    VRuntimeTemplate,
  },
  data() {
    return {
      form: {
        email: 'debby@email.com',
        firstName: '',
        lastName: '',
        phone: '',
        state: '',
        country: '',
        ip: '',
        uniqueLink: '',
        totalPoints: 0,
        referralPoints: 0,
        bonusPoints: 0,
        rewards: [],
        campaignId: '',
        pageId: 'WEnDEj5cYmSy0Cy0J4VV',
      },
      alert: {
        status: false,
        message: 'Hey there. This is a very nice and beautiful alert!!!',
      },
    }
  },
  computed: {
    ...mapGetters({
      user: 'app/user',
      campId: 'app/campId',
      body: 'app/body',
    }),
    template() {
      return this.body.html
    },
  },
  created() {},
  methods: {
    async save() {
      // Code to get the user unique link
      // TODO: YOU NEED TO COME BACK AND MAKE SURE THE ID IS UNIQUE
      const hostname = window.location.hostname
      this.form.uniqueLink = 'https://' + hostname + '?ref='

      this.campaignId = this.campId
      const data = { ...this.form }
      data.campaignId = this.campId
      data.referredBy = this.user.referredBy
      data.registeredAt = this.$fireModule.firestore.Timestamp.fromDate(
        new Date(),
      )
      const vm = this

      // Check to make sure the lead does not exist in the database
      try {
        const query = await db
          .collection('leads')
          .where('email', '==', data.email)
          .get()

        if (!query.empty) {
          vm.alert.status = true
          vm.alert.message = `Uh oh!! You have already registered for this contest! You can't register twice`
          this.closeAlert()
        } else {
          saveLead()
        }
      } catch (error) {
        console.log(error)
        vm.body = `<h1>An Error occured. Please try again!</h1>`
      }

      async function saveLead() {
        try {
          const doc = await db.collection('leads').add(data)
          tinyurl.shorten('https://' + hostname + '?ref=' + doc.id).then(
            async (res) => {
              await db.collection('leads').doc(doc.id).update({
                uniqueLink: res,
              })
              vm.$router.push({
                name: 'share',
                params: { lead: doc.id, campaignId: vm.campId },
                // props: { campaignId: vm.campId },
              })
            },
            function (err) {
              console.log(err)
            },
          )
        } catch (error) {
          console.log({ error: 'Something went wrong' }, error)
        }
      }
    },
    closeAlert() {
      console.log('I am inside the close alert function')
      setTimeout(
        function () {
          this.alert.status = false
          this.alert.message = ''
        }.bind(this),
        3000,
      )
    },
  },
}
</script>

<style>
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: rgb(167, 158, 158);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
