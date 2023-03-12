<template>
  <a-modal
    visible
    title="Ingrese un nuevo Operador"
    :width="650"
    @cancel="$emit('close')"
  >
    <template slot="footer">
      <a-form-model-item>
        <a-button
          key="back"
          @click="$emit('close')"
        >
          Cancelar
        </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="isLoading"
          :disabled="!hideButton || !form.name || !form.mail || !form.id || !form.phone || !form.address || !form.administrator ? !form.role : false "
          @click="handleSave"
        >
          Guardar
        </a-button>
      </a-form-model-item>
    </template>
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
    >
      <div class="grid gap-6 w-full md:grid-cols-2">
        <a-form-model-item ref="id" label="Usuario" prop="id">
          <a-input
            v-model="form.id"
            placeholder="Ingrese el usuario del operador"
          />
        </a-form-model-item>
        <a-form-model-item ref="name" label="Nombre" prop="name">
          <a-input
            v-model="form.name"
            placeholder="Ingrese el nombre del operador"
          />
        </a-form-model-item>
        <a-form-model-item ref="mail" label="Correo Electronico" prop="mail">
          <a-input
            v-model="form.mail"
            placeholder="Ingrese el correo del operador"
          />
        </a-form-model-item>
        <a-form-model-item ref="phone" label="Teléfono" prop="phone">
          <a-input-number
            v-model="form.phone"
            style="width: 100%"
            placeholder="Ingrese Teléfono del operador"
          />
        </a-form-model-item>
        <a-form-model-item ref="address" label="Dirección" prop="address">
          <a-input
            v-model="form.address"
            placeholder="Ingrese la dirección del operador"
          />
        </a-form-model-item>
        <a-form-model-item ref="administrator" label="Tipo de Operador" prop="administrator">
          <a-checkbox v-model="form.administrator">
            Administrador
          </a-checkbox>
        </a-form-model-item>
        <a-form-model-item v-if="!form.administrator" ref="role" label="Rol" prop="role">
          <a-select v-model="form.role">
            <a-select-option v-for="i in roles" :key="i._id" :value="i._id">
              {{ i.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </div>
    </a-form-model>
  </a-modal>
</template>

<script lang="js">
export default {
  props: {
    datos: {
      type: Object,
      default: null,
      required: false,
    }
  },
  data () {
    const validateEmail = (rule, value, callback) => {
      const expresion = (/([\w\.]+)@([\w\.]+)\.(\w+)/g)
      if (!expresion.test(value)) {
        // eslint-disable-next-line n/no-callback-literal
        callback(new Error('El correo ingresado es incorrecto'))
      } else {
        callback()
      }
    }
    const compareid = async (rule, val, callback) => {
      if (!this.datos || this.datos.id !== this.form.id) {
        const { data } = await this.$axios.get('/api/executives/operators', {
          params: {
            $q: val
          }
        })
        if (data.total > 0) {
          callback('Ya existe un registro con el usuario proporcionado') // eslint-disable-line
        } else {
          callback()
        }
      }
    }
    return {
      rules: {
        name: [
          { required: true, message: 'El campo de nombre es obligatorio', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'El campo de teléfono es obligatorio', trigger: 'blur' }
        ],
        address: [
          { required: true, message: 'El campo de dirección es obligatorio', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: 'El campo de correo electrónico es obligatorio', trigger: 'blur' }, { validator: validateEmail }
        ],
        id: [
          { required: true, message: 'El campo de usuario es obligatorio', trigger: 'blur' }, { validator: compareid }
        ],
        role: [
          { required: true, message: 'El campo de rol es obligatorio', trigger: 'blur' }
        ],
      },
      isLoading: false,
      form: {
        name: '',
        mail: '',
        id: '',
        phone: '',
        address: '',
        administrator: false,
        role: '',
      },
      roles: [],
    }
  },
  computed: {
    hideButton () {
      return this.$store.getters['session/getPermissions'](this.$route.name.split('-')[1],
        this.$route.name.split('-')[2], 'edit') ||
        (this.$store.getters['session/getPermissions'](this.$route.name.split('-')[1],
          this.$route.name.split('-')[2], 'insert') && !this.datos)
    }
  },
  async mounted () {
    await this.getRoles()
    if (this.datos) {
      this.form = JSON.parse(JSON.stringify(this.datos))
      if (this.form.role) { this.form.role = this.form.role._id }
    }
  },
  methods: {
    async handleSave () {
      try {
        this.isLoading = true
        this.datos
          ? await this.$axios.$put(`/api/executives/operators/${this.datos._id}`, this.form)
          : await this.$axios.$post('/api/executives/operators', this.form)
        this.$emit('closes')
        this.$message.success('Operación realizada correctamente')
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      } finally {
        this.isLoading = false
      }
    },
    async getRoles () {
      try {
        this.isLoading = true
        const { data } = await this.$axios.$get('/api/executives/roles',
          { params: { $fields: 'name' } })
        this.roles = data
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
