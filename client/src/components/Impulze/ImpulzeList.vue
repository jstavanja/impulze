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
      <a class="button is-success" @click="startNotificationTimers" v-if="Object.keys(intervals).length < impulzes.length">
        Start all
        <span v-if="Object.keys(intervals).length > 0">&nbsp;remaining&nbsp;</span>
        impulzes
      </a>

      <a class="btn-stop-all-impulzes button is-danger" @click="stopNotificationTimers" v-if="Object.keys(intervals).length > 0">Stop all impulzes</a>
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

          <b-table-column label="Period">
            {{ props.row.formattedPeriod }}
          </b-table-column>

          <b-table-column label="Actions" centered class="actions-column">
            <div class="button is-success" @click="startNotificationTimer(props.row)" v-if="!Object.keys(intervals).includes(props.row._id)">Activate</div>
            <div class="button is-warning" @click="stopNotificationTimer(props.row._id)" v-else>Deactivate</div>
            <div class="button is-small is-danger" @click="props.row.delete">Remove</div>
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
      isLoading: true,
      intervalsRunning: false
    }
  },
  computed: {
    ...mapGetters([
      'impulzes',
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
      const impulzes = allImpulzes.data.map(impulze => {
        impulze['formattedPeriod'] = this.$formatTimeString(impulze['period'])
        impulze['delete'] = () => {
          axios.delete(`/impulze/${impulze['_id']}`)
          this.$store.commit('removeImpulze', impulze._id)
        }
        return impulze
      })
      this.$store.commit('setImpulzes', impulzes)
    } catch (err) {
      alert(err)
    }
    this.isLoading = false
  },
  methods: {
    startNotificationTimer (impulze) {
      if (!this.intervals[impulze._id]) {
        const intervalID = setInterval(() => {
          this.$notification.show(impulze['name'], {
            body: impulze['description']
          }, {})
        }, impulze['period'])
        this.$store.commit('addInterval', { id: impulze._id, interval: intervalID, name: impulze['name'] })
        this.$successNotification(`Successfully started Impulze: ${impulze['name']}`)
      }
    },
    startNotificationTimers () {
      this.impulzes.forEach(impulze => {
        this.startNotificationTimer(impulze)
      })
      this.$successNotification('Successfully started all Impulzes')
    },
    stopNotificationTimer (impulzeId) {
      if (this.intervals[impulzeId]) {
        this.$dangerNotification(`Stopped Impulze ${this.intervalNames[impulzeId]}`)
        this.$store.commit('removeInterval', { id: impulzeId })
      }
    },
    stopNotificationTimers () {
      for (const id of Object.keys(this.intervals)) {
        this.stopNotificationTimer(id)
      }
      this.$dangerNotification('Stopped all Impulzes')
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

    .actions-column {
      span { // span element added by buetify inside b-table-column
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .button:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
</style>
