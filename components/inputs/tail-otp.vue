<template>
  <div class="flex-inline">
    <div class="flex md:w-70 mb-2">
      <v-otp-input
        ref="otpInput"
        input-classes="otp-input"
        separator=""
        :num-inputs="6"
        type="number"
        is-input-num
        @on-change="handleOnChange"
        @on-complete="handleOnComplete"
      />
    </div>
    <CountDown v-if="count && timer" :seconds="time" />
  </div>
</template>
<script>
import CountDown from '@/components/inputs/CountDown'
export default {
  components: { CountDown },
  props: {
    refresh: {
      type: Boolean,
      default: false,
    },
    timer: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    time: 302,
    count: true
  }),
  watch: {
    refresh (val) {
      if (val) {
        if (this.count) {
          this.count = false
          setTimeout(() => {
            this.count = true
            this.$emit('update:refresh', !this.refresh)
          }, 200)
        }
      }
    }
  },
  methods: {
    handleOnChange (value) {
      this.$emit('input', value)
    },
    handleOnComplete (value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style lang="less">
.otp-input {
  width: 90%;
  height: 40px;
  padding: 5px;
  margin: 0 3px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  &.error {
    border: 1px solid red !important;
  }
}
</style>
