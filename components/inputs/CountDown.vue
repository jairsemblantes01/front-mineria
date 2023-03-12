<template>
  <div v-if="show">
    <div v-if="seconds" class="mb-3">
      <div>
        <p>{{ countdown }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'CountDown',
  props: {
    seconds: {
      type: Number,
      required: true,
    }
  },
  data () {
    return {
      countdown: null,
      expires_in: null,
      interval: null,
      show: true
    }
  },
  mounted () {
    this.countdown = moment.utc(this.seconds).format('mm:ss')
    this.expires_in = this.seconds
    this._setInterval()
  },
  destroyed () {
    clearInterval(this.interval)
  },
  methods: {
    _setInterval () {
      this.interval = setInterval(() => {
        if (this.expires_in === 1) {
          this.$emit('clear')
          clearInterval(this.interval)
        } else {
          this.expires_in -= 1
          this.countdown = moment.utc(this.expires_in * 1000).subtract(1, 'seconds').format('mm:ss')
        }
      }, 1000)
    },
  }
}
</script>
