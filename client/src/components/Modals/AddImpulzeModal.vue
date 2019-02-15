<template>
  <div class="add-impulze-modal container modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Add a new Impulze</p>
    </header>
    <section class="modal-card-body">
      <div class="content is-small">
        <p>To add a new Impulze reminder fill in the form below and press on <i>Create Impulze</i>.</p>
      </div>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Name for the Impulze" v-model="name">
        </div>
      </div>

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="textarea" placeholder="What does this Impulze need to remind you about?" v-model="description"></textarea>
        </div>
      </div>

      <div class="field">
        <label class="label">
          Period
        </label>
        <div class="control">
          <vue-ctk-date-time-picker
            v-model="period"
            formatted="HH [hours and] mm [minutes]"
            format="HH:mm"
            time-format="HH:mm"
            label="Select time between alerts"
            :minute-interval="1"
            disable-date
          ></vue-ctk-date-time-picker>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" @click="addImpulze">Create Impulze</button>
        </div>
        <div class="control">
          <button class="button is-text" @click="$parent.close()">Cancel</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: '',
      description: '',
      period: '01:00:00'
    }
  },
  methods: {
    addImpulze () {
      axios.post('/impulze', {
        name: this.name,
        description: this.description,
        period: this.getMillisecondsFromPeriodString(this.period)
      })
      this.$parent.close()
    },
    getMillisecondsFromPeriodString (periodString) {
      const hms = periodString.split(':')
      const hours = hms[0]
      const minutes = hms[1]
      return (minutes * 60 * 1000) + (hours * 60 * 60 * 1000)
    }
  }
}
</script>

<style>

</style>
