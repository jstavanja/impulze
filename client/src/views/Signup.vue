<template>
    <div class="signup" v-if="!user">
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Sign up
            </h1>
            <h2 class="subtitle">
              How does it feel to be just a few clicks away from a never forgetting anything again?
            </h2>
          </div>
        </div>
      </section>
      <section class="section">
        <signup-form />
      </section>
    </div>
</template>

<script>
import SignupForm from '../components/Signup/SignupForm'
import { mapGetters } from 'vuex'
export default {
  components: {
    SignupForm
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  watch: {
    user (currValue, oldValue) {
      if (currValue !== undefined) {
        this.$router.push({ name: 'home-app' })
      }
    }
  },
  mounted () {
    if (this.user) {
      this.$router.push({ name: 'home-app' })
    }
  }
}
</script>
