<template>
  <div>
    <a-row
      style="height: 100vh"
      type="flex"
      justify="space-around"
      align="middle"
      class="app-background"
    >
      <a-col v-if="type === 'executive' || type === 'administrator'" :md="12" :xs="0" :sm="0">
        <a-card class="client">
          <div class="text-xl">
            <img style="width:200px" src="/login-logo.png" alt="logo">
            <h2 v-if="type === 'executive'">Accede a <br><b>Firma Electrónica</b> y administra todos tus registros</h2>
            <h2 v-else>Acceda y cree los <br><b>Distribuidores de Firma Electrónicas</b> y administra todos tus
              registros</h2>
            <a-divider />
            <div>
              <p>
                <!-- <a-icon class="icons" type="minus" /> -->
                Gestión y administración de {{ type === 'executive' ? 'solicitudes de firma electrónica' : 'distribuidores' }}.
              </p>
              <p>
                <a-icon class="icon-client" type="copy" />
                {{ type === 'executive' ? 'Firmas Longevas' : 'Distribuidores'}}
              </p>
              <p>
                <a-icon class="icon-client" type="video-camera" />
                {{ type === 'executive' ? 'Firmas rápidas' : 'Permisos' }}
              </p>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :md="12" :xs="24" :sm="24"  justify="center" align="center">
        <a-card id="card" class="border-main size">
          <h1 class="mb-10 text-3xl leading-tight font-bold tracking-tighter">
            {{ title }}
          </h1>
          <a-form
            :form="form"
            @submit="onSubmit"
            layout="vertical"
          >
            <a-form-item v-if="$route.name.startsWith('executive')">
              <a-input
                v-decorator="validation.ruc"
                placeholder="R.U.C"
                size="large"
              >
                <a-icon slot="prefix" type="audit" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="validation.username"
                :placeholder="useCi ? 'Cédula de identidad' : 'Nombre de usuario'"
                size="large"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input-password
                v-decorator="validation.password"
                placeholder="Contraseña"
                type="password"
                size="large"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input-password>
            </a-form-item>
            <div class="principal">
              <a-button
                :loading="isLoading"
                block
                size="large"
                type="primary"
                html-type="submit"
              >
                Ingresar
              </a-button>
            </div>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent',
  props: {
    type: { type: String, required: true }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      useCi: false,
      isLoading: false,
      validation: {
        ruc: [
          'ruc',
          {
            rules: [
              {
                required: true,
                message: 'Ingrese el ruc de su empresa'
              }
            ]
          }
        ],
        username: [
          'id',
          {
            rules: [
              {
                required: true,
                message: 'Ingrese el nombre de usuario'
              }
            ]
          }
        ],
        password: [
          'password',
          {
            rules: [
              { required: true, message: 'Ingrese la contraseña' }
            ]
          }
        ]
      }
    }
  },
  head () {
    return {
      title: 'Ingrese por favor'
    }
  },
  computed: {
    title () {
      switch (this.type) {
        case 'banks':
          return 'Bienvenido'
        case 'executive':
          return 'Ejecutivo'
        case 'administrator':
          return 'Administrador'
      }
      return 'Ejecutivo'
    },
    dispatch () {
      if (this.type === 'banks') {
        return 'session/banksLogin'
      } else if (this.type === 'executive') {
        return 'session/executiveLogin'
      } else if (this.type === 'administrator') {
        return 'session/administratorLogin'
      }
      return 'session/executiveLogin'
    },
    mainroute () {
      return '/' + this.type
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (error, values) => {
        if (error) { return }
        try {
          this.isLoading = true
          await this.$store.dispatch(this.dispatch, values)
          await this.$router.replace({ path: this.mainroute })
        } catch (err) {
          if (err && err.response && err.response.data) {
            this.$message.warning(err.response.data.message)
          } else {
            this.$message.error(err.message)
          }
        } finally {
          this.isLoading = false
        }
      })
    }
  }
}
</script>

<style>
.logo-client {
  display: none
}
.size {
  height: 375px;
  width: 405px;
}
.client {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
h2 {
  font-size: 24px;
}
.icon-client{
  margin: 15px;
  color: #10265c;

}
@media screen and (max-width: 576px){
  .size {
    height: 100%;
    width: 100%;
  }
  .logo-client {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5px;
    width: 80px;
  }
}
</style>
