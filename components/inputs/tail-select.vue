<template>
  <div>
    <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
      <label
        v-if="label"
        class="text-sm leading-none text-gray-800"
      >
        <b v-if="rules.includes('required')" style="color: red">*</b> {{ label }}
        <a-tooltip v-if="info" :title="info">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </label>
      <div>
        <select
          v-model="model"
          class="w-full p-3 mt-3"
          :class="!errors[0] ? normal : error"
        >
          <option v-for="(x, i) in options" :key="i" :value="x.id || x">
            <p class="p-4">
              {{ x.description || x }}
            </p>
          </option>
        </select>
      </div>
      <p class="text-red-600 text-xs dark:text-red-500">
        {{ errors[0] }}
      </p>
    </ValidationProvider>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    rules: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: undefined,
      default: undefined
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    info: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    model: null
  }),
  computed: {
    normal () {
      return 'bg-gray-100 border rounded border-gray-200 p-2.5 focus:outline-none focus:border-gray-600 text-sm font-medium text-gray-800'
    },
    error () {
      return 'p-2.5 bg-gray-100 text-sm leading-tight text-gray-700 border border-red-500 rounded focus:outline-none focus:shadow-outline focus:ring-red-400 focus:ring focus:ring-opacity-40'
    }
  },
  watch: {
    model (val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    value (val) {
      setTimeout(() => this.model = val, 300)
    }
  },
  created () {
    this.model = this.value
  }
}
</script>

<style>
</style>
