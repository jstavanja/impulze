<template>
  <div class="home-logged-out">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Welcome to Impulze!
          </h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container content">
        <p>Hello and welcome to Impulze.</p>
        <div class="greeting">
          To use the app please <router-link to="/login" tag="button" class="btn-login button is-dark">Log in</router-link> or <router-link to="/signup" tag="button" class="btn-signup button is-primary">Sign up</router-link> if you don't yet have an account.
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>

<style lang="scss">
  .greeting {
    display: flex;
    align-items: center;
    .btn-login, .btn-signup {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
</style>
