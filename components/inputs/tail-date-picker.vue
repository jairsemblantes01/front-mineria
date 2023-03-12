<template>
  <div class="">
    <ValidationProvider v-slot="slotProps" :name="name" :rules="rules">
      <label v-if="label" class="text-sm leading-none text-gray-800"><b v-if="rules.includes('required')" style="color: red">*</b> {{ label }}</label>
      <div>
        <a-form-item
          class="flex items-end pt-3 mb-0 mb-0"
          has-feedback
          :validate-status="resolveState(slotProps)"
          :help="slotProps.errors[0]"
        >
          <a-date-picker
            id="calendar"
            v-model="model"
            type="date"
            :disabledDate="disabledDate"
            style="margin-top: 10px; width: 100%; padding: 0px"
            class="focus:outline-none focus:border-gray-600 text-sm font-medium mt-5 pt-5 leading-none text-gray-800"
            placeholder="Escoja la fecha"
          />
        </a-form-item>
      </div>
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
    }
  },
  data: () => ({
    model: undefined
  }),
  computed: {
    normal () {
      return 'bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800'
    },
    error () {
      return 'block bg-gray-100 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-red-400 focus:ring focus:ring-opacity-40'
    }
  },
  watch: {
    model (val) {
      this.$emit('input', val)
    },
    value (val) {
      setTimeout(() => this.model = val, 300)
    }
  },
  mounted() {
    this.model = this.value
  },
  created () {
    // this.model = this.value
  },
  methods: {
    disabledDate (current) {
      return current && current.valueOf() > Date.now()
    },
    resolveState ({ errors, pending, valid }) {
      if (errors[0]) {
        return 'error'
      }

      if (pending) {
        return 'validating'
      }

      if (valid) {
        return 'success'
      }

      return ''
    }
  }
}
</script>
<style scoped>
#calendar >>> .ant-calendar-picker-input.ant-input {
  padding-top: 22px;
  padding-bottom: 22px;
  padding-right: 40px;
  background-color: #F3F4F6;
}
</style>
