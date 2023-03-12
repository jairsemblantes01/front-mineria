<template>
  <div class="h-full">
    <div class="mx-auto h-full">
      <div class="md:flex md:flex-col lg:flex-row h-full">
        <div class="relative hidden md:block w-full bg-cover lg:w-6/12 xl:w-7/12 bg-gradient-to-r from-white via-white to-gray-100">
          <div class="relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0">
            <div class="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
              <div class="relative">
                <a>
                  <img width="500px" src="https://socialdigital.iadb.org/sites/default/files/2021-02/Imagenes-Post_GS-POSTEO-copy-06.png" alt="">
                </a>
                <h2 v-if="!manager" class="text-5xl font-bold text-prim xl:text-6xl mt-10">
                  Sistema de gestion biometrica empresarial
                </h2>
                <h2 v-if="manager" class="text-5xl font-bold text-prim xl:text-6xl">
                  Administrador de firmas electrónicas
                </h2>
              </div>
              <p class="text-2xl text-gray-700">
                Nuestro sistema de control de asistencia basado en <b>biometráa</b> ayduara a tu empresa a lleavr un control completo
                de los horarios de tus trabajadores.
              </p>
            </div>
          </div>
        </div>

        <div class="w-full bg-white lg:w-6/12 xl:w-5/12 h-full">
          <div class="md:flex md:flex-col md:items-start justify-center w-full h-full p-10 lg:p-16 xl:p-24">
            <div v-if="manager" class="flex justify-center w-full visible md:invisible">
              <img src="/deal.svg" width="200">
            </div>
            <template v-if="!reset">
              <h2 class="w-full text-lg text-gray-500 text-center">
                Bienvenido
              </h2>
              <h4 class="w-full text-3xl font-bold text-prim text-center">
                Panel administrativo
              </h4>
            </template>
            <div class="w-full mt-10 space-y-8">
              <form v-if="!reset" @submit="login">
                <div class="relative">
                  <label class="font-medium text-gray-900">Nombre de usuario</label>
                  <input v-model="ci" type="text" class="block w-full px-4 py-4 mt-2 mb-5 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50" placeholder="Ingrese su número de identificación">
                  <label class="font-medium text-gray-900">Contraseña</label>
                  <input v-model="password" :type="!showPassword?'password':'text'" class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50" placeholder="Ingrese su contraseña">

                  <div v-if="manager">
                    <label class="font-medium text-gray-900">Contraseña registrada</label>
                    <div class="relative">
                      <input v-model="password" :type="!showPassword?'password':'text'" class="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50" placeholder="Ingrese su contraseña">
                      <button class="block w-7 h-7 mt-2 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors" type="button" @click.prevent="showPassword=!showPassword">
                        <svg
                          v-if="!showPassword"
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
                          v-if="showPassword"
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
                  </div>
                </div>
                <div class="relative">
                  <button type="submit" :disabled="!ci" class="inline-block w-full px-5 mt-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-prim rounded-lg hover:bg-primh">
                    Ingresar
                  </button>
                  <a v-if="manager" class="flex text-md justify-center text-blue-700 underline hover:underline mt-4" @click="reset = true">
                    ¿Has olvidado tu contraseña?
                  </a>
                </div>
              </form>
              <form v-else @submit="sendRestore">
                <validation-observer ref="reset">
                  <div>
                    <h3 class="text-3xl font-bold text-prim text-center">
                      Restablezca su contraseña
                    </h3>
                    <p class="mt-3 text-center">
                      Ingrese su número de identificación, posteriormente le será enviado un email al correo registrado
                    </p>
                    <div v-if="authenticate.showError || authenticate.showLock">
                      <vs-alert :color="authenticate.showLock ? '#FF8000' : 'danger'" class="mt-3 py-3">
                        <template #title>
                          Ocurrió un error
                        </template>
                        <span v-if="!authenticate.showLock">
                          No se logro encontrar un registro con el número de identificación ingresado, por favor póngase
                          en contacto con el siguiente
                          correo electrónico <b>atencionalcliente@firmaselectronicas.ec</b>
                        </span>
                        <span v-else>
                          Usted ha ingresado el código de verificación incorrecto 3 veces, por lo que su generación
                          ha sido bloqueada, intente más tarde
                        </span>
                      </vs-alert>
                    </div>
                    <tail-input v-model="authenticate.id" name="restablecer" type="number" rules="required|typeId:ci" max="10" />
                  </div>
                  <div>
                    <button
                      type="submit"
                      :disabled="!authenticate.id || isLoading"
                      class="inline-block w-full px-5 mt-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-prim rounded-lg hover:bg-primh"
                      @click="sendRestore"
                    >
                      <svg
                        v-if="isLoading"
                        aria-hidden="true"
                        class="inline mr-3 w-4 h-4 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                      </svg>
                      Siguiente
                    </button>
                  </div>
                  <a
                    class="flex justify-start text-blue-600 underline hover:underline mt-4"
                    @click="reset = false"
                  >
                    <svg
                      class="ml-2 w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    Regresar
                  </a>
                </validation-observer>
              </form>
              <p class="text-lg text-gray-500">
                Forma parte de nuestro gran comunidad empresarial, pregunta por nuestros planes de suscripción.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data () {
    return {
      ci: '',
      password: '',
      showPassword: false,
      date: undefined,
      isLoading: false,
      reset: false,
      authenticate: {
        id: '',
        errorCode: '',
        errorMessage: '',
        showError: false,
        showLock: false
      },
    }
  },
  computed: {
    manager () {
      return this.$route.path.startsWith('/manager')
    }
  },
  methods: {
    /* opemDataPicker () {
      const ref = this.$refs.dateRef
      console.log(this.$refs.dateRef.input)
      // ref.$refs.input.click()
    }, */
    async sendRestore (e) {
      e.preventDefault()
      try {
        this.authenticate.showLock = false
        this.isLoading = true
        if (await this.$refs.reset.validate()) {
          const { token, email } = await this.$axios
            .$get('/api/clients/sent-restore-password/' + this.authenticate.id)
          token
            ? await this.$router.push('/reset-password/' + token + '?pwd=' + this.authenticate.id + '&hide=' + email)
            : this.authenticate.showError = true
        }
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
        if (code && code === 'TokenBlocked') {
          this.authenticate.showLock = true
        }
      } finally {
        this.isLoading = false
      }
    },
    login (e) {
      e.preventDefault()
      try {
        this.$router.push('/admin')
      } catch (err) {
        if (err && err.response && err.response.data) {
          this.$message.warning(err.response.data.message)
        } else {
          this.$message.error(err.message)
        }
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>



<div class="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
<div class="relative">
  <a>
    <img width="500px" src="https://socialdigital.iadb.org/sites/default/files/2021-02/Imagenes-Post_GS-POSTEO-copy-06.png" alt="">
  </a>
  <h2 v-if="!manager" class="text-5xl font-bold text-prim xl:text-6xl mt-10">
    Sistema de gestion biometrica empresarial
  </h2>
  <h2 v-if="manager" class="text-5xl font-bold text-prim xl:text-6xl">
    Administrador de firmas electrónicas
  </h2>
</div>
<p class="text-2xl text-gray-700">
  Nuestro sistema de control de asistencia basado en <b>biometráa</b> ayduara a tu empresa a lleavr un control completo
  de los horarios de tus trabajadores.
</p>
</div>
