<template>
  <div id="app">
    <navigation />
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import Navigation from './components/Navigation'
export default {
  components: {
    Navigation
  },
  created () {
    axios.defaults.baseURL = 'http://localhost:3000/api/'
  }
}
</script>
