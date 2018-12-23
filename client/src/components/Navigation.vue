<template>
  <nav class="navbar" :class="{'is-primary': inApp}" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/app" tag="a" class="navbar-item" v-if="inApp">
          <img src="../assets/logos/white.png" alt="Impulze logo">
        </router-link>
        <router-link to="/" tag="a" class="navbar-item" v-else>
          <img src="../assets/logos/primary.png" alt="Impulze logo">
        </router-link>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" v-if="user && inApp">
            <a class="button is-success" @click="openAddImpulzeModal">
              <strong>Add an Impulze</strong>
            </a>
          </a>
        </div>

        <div class="navbar-end">

          <div class="navbar-item" v-if="user">
            Welcome back, {{ user.username }}!
          </div>

          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary" v-if="!user">
                <strong>Sign up</strong>
              </a>
              <router-link to="/login" class="button is-light" tag="a" v-if="!user">
                Log in
              </router-link>
              <router-link to="/app" class="button is-light" tag="a" v-if="!inApp && user">
                Back to app
              </router-link>
              <a class="button is-danger" v-if="user" @click="logout">
                Log out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
import { mapGetters } from 'vuex'
import AddImpulzeModal from './Modals/AddImpulzeModal'
export default {
  computed: {
    ...mapGetters([
      'user'
    ]),
    inApp () {
      return this.$route.path === '/app'
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('user-token')
      this.$store.commit('logout')
      this.$router.push({ name: 'home-logged-out' })
    },
    openAddImpulzeModal () {
      this.$modal.open({
        parent: this,
        component: AddImpulzeModal,
        hasModalCard: true
      })
    }
  }
}
</script>

<style>

</style>
