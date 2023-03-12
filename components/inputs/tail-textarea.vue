<template>
  <div>
    <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
      <div class="block">
        <textarea
          v-model="model"
          rows="4"
          class="w-full p-3 px-9 mt-3"
          :class="!errors[0] ? normal : error"
          :placeholder="placeholder"></textarea>
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
    rules: {
      type: String,
      default: ''
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
    }
  },
  data: () => ({
    model: undefined
  }),
  computed: {
    normal () {
      return 'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-prim-2 focus:ring-prim-2 focus:outline-none focus:shadow-outline focus:border-prim-2 hover:border-prim-2'
    },
    error () {
      return 'block bg-gray-100 text-sm leading-tight text-gray-700 border-2 border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-red-400 focus:ring focus:ring-opacity-40'
    }
  },
  watch: {
    model (val) {
      /* if (val) {
        this.model = val.toUpperCase()
      } */
      this.$emit('input', val)
    }
  },
  created () {
    this.model = this.value
  },
  methods: {
  }
}
</script>
