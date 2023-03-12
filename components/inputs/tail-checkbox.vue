<template>
  <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
    <a-checkbox v-model="model" @change="changeCheck">
      <span :style="errors[0] ? 'color: red' : ''">Acepto que ha leído los términos y condiciones del servicio de gestión para la emisión de firmas electrónicas.</span>
    </a-checkbox>
    <p class="text-red-600 text-xs dark:text-red-500">
      {{ errors[0] }}
    </p>
  </ValidationProvider>
<!--  <div class="flex items-center">
    <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    <label for="link-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</a>.</label>
  </div>-->
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
    placeholder: {
      type: String,
      default: ''
    },
    desactive: {
      type: undefined,
      default: undefined
    }
  },
  data: () => ({
    model: false
  }),
  watch: {
    value (val) {
      if (!this.desactive) {
        this.model = val
      }
    },
  },
  methods: {
    changeCheck (val) {
      setTimeout(() => {
        if (this.desactive) {
          this.model = false
        } else {
          this.model = val.target.checked
          this.$emit('change', this.model)
        }
        this.$emit('input', this.model)
      }, 200)
    }
  }
}
</script>
