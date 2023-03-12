<template>
  <vs-switch v-if="type" :disabled="disabled" class="w-1/3" v-model="check" :val="`${type}`">
    <template v-if="!disabled" #off>
      <a-icon slot="unCheckedChildren" type="close" />
    </template>
    <template v-if="!disabled" #on>
      <a-icon slot="checkedChildren" type="check" />
    </template>
  </vs-switch>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: true
    },
    value: {
      type: undefined,
      default: undefined
    },
    type: {
      type: String,
      required: true
    }
  },
  data: () => ({
    check: []
  }),
  watch: {
    type (val) {
      alert('val')
    },
    /*value (val) {
      alert(this.val)
      this.check = val
    },*/
    check (val) {
      alert(JSON.stringify(val))
     this.$emit('input', this.check.push(val[0]))
    },
  }
}
</script>

<style scoped>

</style>
