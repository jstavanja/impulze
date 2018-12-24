<template>
  <div class="column is-half is-offset-one-quarter">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="email" placeholder="Email" v-model="email">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Username" v-model="username">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="password" placeholder="Password" v-model="password">
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="password" placeholder="Password (again)" v-model="passwordConf">
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <button class="button is-success" @click="login">
          Sign up
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      username: '',
      password: '',
      passwordConf: ''
    }
  },
  methods: {
    login () {
      axios.post('/auth/register', { email: this.email, username: this.username, password: this.password, passwordConf: this.passwordConf })
        .then((res) => {
          this.successNotification('You have successfully registered your account. You can now log in!')
          this.$router.push({ name: 'login' })
        })
        .catch((err) => {
          this.dangerNotification(err.response.data.error)
        })
    },
    successNotification (message) {
      this.$toast.open({
        message,
        type: 'is-success'
      })
    },
    dangerNotification (message) {
      this.$toast.open({
        message,
        type: 'is-danger'
      })
    }
  }
}
</script>
