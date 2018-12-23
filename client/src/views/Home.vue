<template>
  <div class="home container">
    <impulze-list v-if="user"/>
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
