<template>
  <div class="pt-8 pb-4 lg:pt-2">
    <Leaderboard v-for="(user, i) in winners" :key="i" :user="user" />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    winners() {
      return [
        {
          points: 126,
          comments: 'Hope to be a winner someday',
          image:
            'https://s3-us-west-1.amazonaws.com/vyper-assets/contest_cta.fa9b75917e0cc486contest_cta1.jpg',
          rank: 1,
        },
        {
          points: 300,
          comments: 'Love you guys so much',
          image:
            'https://s3-us-west-1.amazonaws.com/vyper-assets/contest_cta.fa9b75917e0cc486contest_cta1.jpg',
          rank: 2,
        },
        {
          points: 475,
          comments: 'Thank you guys so much for this awesomeness',
          image:
            'https://s3-us-west-1.amazonaws.com/vyper-assets/contest_cta.fa9b75917e0cc486contest_cta1.jpg',
          rank: 3,
        },
      ]
    },
  },
}
</script>

<style></style>
