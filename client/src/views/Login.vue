<template>
    <div class="login" v-if="!user">
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Log in
            </h1>
            <h2 class="subtitle">
              You're just a click away from never forgetting anything anymore.
            </h2>
          </div>
        </div>
      </section>
      <section class="section">
        <login-form />
      </section>
    </div>
</template>

<script>
import LoginForm from '../components/Login/LoginForm'
import { mapGetters } from 'vuex'
export default {
  components: {
    LoginForm
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
