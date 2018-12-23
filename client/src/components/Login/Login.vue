<template>
    <div class="login">
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Impulze
            </h1>
            <h2 class="subtitle">
              Log in or register to never forget anything.
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
import LoginForm from './LoginForm'
export default {
  components: {
    LoginForm
  }
}
</script>
