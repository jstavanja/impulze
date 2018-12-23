<template>
  <div class="home container">
    <section class="section">
      <div class="content">
        <h1>Your Impulzes</h1>
        <p>Below is a list of all your Impulzes along with their descriptions, statuses and period data.</p>
      </div>
      <impulze-list v-if="user"/>
    </section>
  </div>
</template>

<script>
import ImpulzeList from '../components/Impulze/ImpulzeList'
import { mapGetters } from 'vuex'

export default {
  components: {
    ImpulzeList
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created () {
    if (!this.user) {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
