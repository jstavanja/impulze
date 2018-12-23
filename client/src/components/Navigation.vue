<template>
  <nav class="navbar" :class="{'is-primary': user}" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item">
          Impulze
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            Home
          </a>
          <a class="navbar-item" @click="openAddImpulzeModal" v-if="user">
            Add an Impulze
          </a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary" v-if="!user">
                <strong>Sign up</strong>
              </a>
              <router-link to="/login" class="button is-light" tag="a" v-if="!user">
                Log in
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
    ])
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
