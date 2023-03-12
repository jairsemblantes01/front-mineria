<template>
  <div class="w-full">
    <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
      <label v-if="label" class="text-sm leading-none text-gray-800">
        <b v-if="rules.includes('required')" style="color: red">*</b> {{ label }}
        <a-tooltip v-if="info" :title="info">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </label>
      <div class="relative mb-2">
        <input
          id="password"
          v-model="password"
          maxlength="20"
          :type="!showPassword?'password':'text'"
          class="w-full pl-3 pr-10 py-2 bg-gray-100 border-2 border-gray-200 rounded-md text-sm font-medium focus:outline-none focus:border-grey-600 transition-colors"
          :placeholder="placeholder"
          @input="checkStrength"
        >
        <button class="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors" @click.prevent="showPassword=!showPassword">
          <svg
            v-if="showPassword"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <svg
            v-if="!showPassword"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
          <!--          <i class="mdi" :class="`mdi-${showPassword?'eye-outline':'eye-off-outline'}`" />-->
        </button>
      </div>
      <div v-if="!confirm" class="flex -mx-1">
        <template v-for="(v,i) in 5">
          <div :key="i" class="w-1/5 px-1">
            <div class="h-2 rounded-xl transition-colors" :class="i<passwordScore?(passwordScore<=2?'bg-red-400':(passwordScore<=4?'bg-green-400':'bg-green-600')):'bg-gray-200'" />
          </div>
        </template>
      </div>
      <div v-if="!confirm">
        <p v-if="passwordScore > 0" class="text-red-600 text-xs font-bold" :class="passwordScore <= 2 ? 'text-red-400' : passwordScore <= 4 ? 'text-green-500' : 'text-green-600'">
          {{ passwordScore === 5 ? 'Su contraseña es segura' : passwordScore === 4 ? 'Contraseña suficiente' : 'La contraseña debe tener 8 caracteres entre números y letras' }}
        </p>
        <p v-if="passwordScore === 4" class="text-green-500 text-xs font-semibold">
          - Si desea puede aumentar la seguridad agregando un caracter especial, mayúsculas y números
        </p>
      </div>
      <p class="text-red-600 text-xs dark:text-red-500 font-bold">
        {{ errors[0] }}
      </p>
    </ValidationProvider>
  </div>
</template>

<script>
export default {
  name: 'TailPassword',
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
    confirm: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    showPassword: false,
    password: '',
    passwordScore: 0,
  }),
  methods: {
    checkStrength (val) {
      const strongPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
      const mediumPassword = /(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9])))/
      this.passwordScore = strongPassword.test(val.target.value) ? 5 : mediumPassword.test(val.target.value) ? 4 : 2
      if (!val.target.value) {
        this.passwordScore = 0
      }
      this.$emit('input', val.target.value)
    }
  }
}
</script>

<style scoped>

</style>
