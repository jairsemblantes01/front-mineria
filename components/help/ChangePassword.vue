<template>
  <div class="center">
    <vs-dialog v-model="active" @close="$emit('close')">
      <template #header>
        <h4 class="text-2xl mt-5 leading-tight font-bold tracking-tighter">
          Cambio de contraseña de <b>firma electrónica</b>
        </h4>
      </template>

      <div class="con-form p-5">
        <ValidationObserver ref="form">
          <h1 class="mb-2 leading-tight font-bold tracking-tighter">
            <span class="text-red-600">*</span> Contraseña actual
          </h1>
          <tail-password
            v-model="form.password"
            :confirm="true"
            name="actualPassword"
            rules="required"
            max="40"
            placeholder="Ingrese la contraseña actual de su firma electrónica"
          />
          <p class="mt-3 text-gray-500">
            En este apartado deberá ingresar la contraseña actual que tiene su firma electrónica.
          </p>
          <a-divider />
          <h1 class="mb-2 leading-tight font-bold tracking-tighter">
            <span class="text-red-600">*</span> Contraseña nueva
          </h1>
          <tail-password
            v-model="form.newPassword"
            max="15"
            name="newPassword"
            rules="required|secure|size:15"
            placeholder="Ingrese una contraseña para sus cuentas"
          />
          <p class="mt-3 text-gray-500">
            Ingrese una nueva contraseña de al menos 8 caracteres entre números y letras.
          </p>
          <h1 class="mb-2 leading-tight font-bold tracking-tighter mt-10">
            <span class="text-red-600">*</span> Repita su contraseña
          </h1>
          <tail-password
            v-model="form.confirmPassword"
            name="confirmPassword"
            max="15"
            :rules="`required|samepass:${form.newPassword}|size:15`"
            :confirm="true"
            placeholder="Repita su contraseña"
          />
          <vs-alert color="#DA6E38" class="mt-7">
            <template #title>
              Importante
            </template>
            Recuerde que usted es el único responsable de su contraseña, por lo que se recomienda respaldarla ya que al cambiar la contraseña no se guardará ningún registro
            de la misma en nuestros sistemas.
          </vs-alert>
        </ValidationObserver>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button color="#083c7c" block type="primary" :loading="isLoading" @click="changePassword">
            Cambiar contraseña
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
<script>

export default {
  name: 'ChangePassword',
  props: {
    idRequest: {
      type: String,
      required: true
    }
  },
  data: () => ({
    active: true,
    isLoading: false,
    form: {},
  }),
  methods: {
    changePassword () {
      this.$refs.form.validate().then(async success => {
        if (success) {
          try {
            this.isLoading = true
            await this.$axios.$post(`/api/clients/me/change-password-sign/${this.idRequest}`, this.form)
            this.$vs.notification({
              color: 'success',
              position: 'top-center',
              text: `Su contraseña se cambió correctamente`
            })
            this.$emit('closes')
          } catch (err) {
            const message = err.response ? err.response.data.message : err.message
            this.$vs.notification({
              icon: `<i class='bx bxs-bug' ></i>`,
              color: '#E05757',
              duration: 'none',
              position: 'top-center',
              text: `Ocurrio un error:  ${message}`
            })
          } finally {
            this.isLoading = false
          }
        } else {
          this.$vs.notification({
            icon: `<i class='bx bxs-bug' ></i>`,
            color: '#E05757',
            position: 'top-center',
            text: 'Corrija los datos del formulario para continuar'
          })
        }
      })
    }
  }
}
</script>
