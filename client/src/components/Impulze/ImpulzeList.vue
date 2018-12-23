<template>
  <div class="impulzes">
    <section>
      <b-table
        :data="impulzes"
        :hoverable="true"
        :loading="isLoading"
        :mobile-cards="true">

        <template slot-scope="props">
          <b-table-column field="name" label="Name">
            {{ props.row.name }}
          </b-table-column>

          <b-table-column field="description" label="Description">
            {{ props.row.description }}
          </b-table-column>

          <b-table-column field="status" label="Status" centered>
            <span class="tag is-success" v-if="props.row.active">
              Active
            </span>
            <span class="tag is-danger" v-else>
              Deactivated
            </span>
          </b-table-column>

          <b-table-column label="Period">
            {{ props.row.period }}
          </b-table-column>
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon
                  icon="emoticon-sad"
                  size="is-large">
                </b-icon>
              </p>
              <p>No Impulzes found. Perhaps you want to add one?</p>
            </div>
          </section>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      impulzes: [],
      isLoading: true
    }
  },
  async mounted () {
    let allImpulzes = []
    this.isLoading = true
    try {
      allImpulzes = await axios.get('/impulze/')
      this.impulzes = allImpulzes.data.map(impulze => {
        impulze['period'] = this.formatTimeString(impulze['period'])
        return impulze
      })
    } catch (err) {
      alert(err)
    }
    this.isLoading = false
  },
  methods: {
    formatTimeString (millisec) {
      const seconds = (millisec / 1000).toFixed(1)
      const minutes = (millisec / (1000 * 60)).toFixed(1)
      const hours = (millisec / (1000 * 60 * 60)).toFixed(1)
      const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1)

      if (seconds < 60) {
        return seconds + ' seconds'
      } else if (minutes < 60) {
        return minutes + ' minutes'
      } else if (hours < 24) {
        return hours + ' hours'
      } else {
        return days + ' days'
      }
    }
  }
}
</script>

<style>

</style>
