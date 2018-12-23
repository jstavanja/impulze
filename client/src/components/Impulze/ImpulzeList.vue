<template>
  <div class="impulzes">
    <section class="section" v-if="hasIntervalsRunning">
      <article class="message is-info currently-active-impulzes">
        <div class="message-body">
          <strong>Currently active Impulzes:</strong>
          <span class="tag is-success active-impulze" v-for="(intervalName, idx) in Object.values(intervalNames)" :key="idx">{{ intervalName }}</span>
        </div>
      </article>
    </section>
    <div class="container">
      <a class="button is-success" @click="applyNotificationTimers">Start all impulzes</a>
      <a class="btn-stop-all-impulzes button is-danger" @click="stopNotificationTimers">Stop all impulzes</a>
    </div>
    <section class="section">
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
            {{ props.row.formattedPeriod }}
          </b-table-column>

          <b-table-column label="Actions" centered>
            <div class="button is-small is-danger" @click="props.row.delete">X</div>
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
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      impulzes: [],
      isLoading: true,
      intervalsRunning: false
    }
  },
  computed: {
    ...mapGetters([
      'intervals',
      'intervalNames',
      'hasIntervalsRunning'
    ])
  },
  async mounted () {
    let allImpulzes = []
    this.isLoading = true
    try {
      allImpulzes = await axios.get('/impulze/')
      this.impulzes = allImpulzes.data.map(impulze => {
        impulze['formattedPeriod'] = this.formatTimeString(impulze['period'])
        impulze['delete'] = () => {
          axios.delete(`/impulze/${impulze['_id']}`)
        }
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
    },
    applyNotificationTimers () {
      this.impulzes.filter(impulze => impulze.active)
        .forEach(impulze => {
          if (!this.intervals[impulze._id]) {
            const intervalID = setInterval(() => {
              this.$notification.show(impulze['name'], {
                body: impulze['description']
              }, {})
            }, impulze['period'])
            this.$store.commit('addInterval', { id: impulze._id, interval: intervalID, name: impulze['name'] })
            this.successNotification(`Successfully started Impulze: ${impulze['name']}`)
          }
        })
    },
    stopNotificationTimers () {
      for (const id of Object.keys(this.intervals)) {
        this.$store.commit('removeInterval', { id })
      }
      this.dangerNotification('Stopped all Impulzes')
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

<style lang="scss">
  .impulzes {
    .btn-stop-all-impulzes {
      margin-left: 10px;
    }
    .currently-active-impulzes {
      .active-impulze {
        margin-left: 10px;
      }
    }
  }
</style>
