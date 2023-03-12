<template>
  <div>
    <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
      <label v-if="label" class="text-sm leading-none text-gray-800">
        <b v-if="rules.includes('required')" style="color: red">*</b> {{ label }}
        <a-tooltip v-if="info" :title="info">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </label>
      <div class="block">
        <input
          v-model="model"
          class="w-full p-3 px-9 mt-3"
          :class="!errors[0] ? defaultStyle : error"
          :placeholder="placeholder"
          autocomplete="off"
          :type="type"
          :maxlength="max"
          @input="inputChange"
          @change="$emit('onChange', value)"
        >
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
    errors: {
      type: undefined,
      default: undefined
    },
    value: {
      type: undefined,
      default: undefined
    },
    max: {
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
    },
    normal: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    model: undefined
  }),
  computed: {
    defaultStyle () {
      return 'bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800'
    },
    error () {
      return 'block bg-gray-100 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-red-400 focus:ring focus:ring-opacity-40'
    }
  },
  watch: {
    value (val) {
      if (val) { val = this.type === 'email' ? val.toLowerCase() : this.normal ? val : val.toUpperCase() }
      this.model = val
      this.$emit('input', val)
    }
  },
  created () {
    if (this.value) {
      this.model = this.type === 'email' ? this.value.toLowerCase() : this.normal ? this.value : this.value.toUpperCase()
      this.$emit('input', this.model)
    }
  },
  methods: {
    inputChange (val) {
      this.model = val.target.value ? this.type === 'email' ? this.model.toLowerCase() : this.normal ? val.target.value : this.model.toUpperCase() : val.target.value
      this.$emit('input', val.target.value)
    }
  }
}
</script>
