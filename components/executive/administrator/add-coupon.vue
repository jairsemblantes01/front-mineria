<template>
  <a-modal
    visible
    title="Ingrese un nuevo cupón"
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
          :disabled="!hideButton || !form.code || !form.value || !form.dateEnd || !form.dateStart || !form.quantity || !form.description"
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
        <a-form-model-item ref="code" label="Codigo de cupón" prop="code">
          <a-input
            v-model="form.code"
            placeholder="Ingrese el código de cupón"
          />
        </a-form-model-item>
        <a-form-model-item ref="description" label="Descripción" prop="description">
          <a-input
            v-model="form.description"
            placeholder="Ingrese la descripción"
          />
        </a-form-model-item>
        <a-form-model-item ref="dateStart" label="Fecha de inicio" prop="dateStart">
          <a-date-picker v-model="form.dateStart" placeholder="Seleccione la fecha de inicio del cupón" style="width: 100%" />
        </a-form-model-item>
        <a-form-model-item
          ref="dateEnd"
          label="Fecha de expiración"
          prop="dateEnd"
        >
          <a-date-picker v-model="form.dateEnd" placeholder="Seleccione la fecha de expiración del cupón" style="width: 100%" />
        </a-form-model-item>

        <a-form-model-item
          ref="quantity"
          label="Cantidad"
          prop="quantity"
        >
          <a-input-number v-model="form.quantity" :min="1" :max="100000" :default-value="0" />
        </a-form-model-item>

        <a-form-model-item
          ref="value"
          label="Total de descuento"
          prop="value"
        >
          <a-input-number v-model="form.value" :min="1" :max="100000" :default-value="0" /><span> USD</span>
        </a-form-model-item>
      </div>
    </a-form-model>
  </a-modal>
</template>

<script>

export default {
  props: {
    datos: {
      type: Object,
      default: null,
      required: false,
    }
  },
  data () {
    const compareDate = (rule, value, callback) => {
      if (value < this.form.dateStart) {
        callback('El rango de fechas ingresado es incorrecto') // eslint-disable-line
      } else {
        callback()
      }
    }
    const compareCode = async (rule, val, callback) => {
      const { data } = await this.$axios.get('/api/executives/coupons', {
        params: {
          $q: val
        }
      })
      if (data.total > 0 && !this.datos) {
        callback('Ya existe un registro con este codigo de cupón') // eslint-disable-line
      } else {
        callback()
      }
    }
    return {
      form: {
        code: '',
        description: '',
        dateStart: null,
        dateEnd: null,
        value: 0,
        quantity: 0,
      },
      rules: {
        code: [
          { required: true, message: 'El campo de código es obligatorio', trigger: 'blur' }, { validator: compareCode }
        ],
        description: [
          { required: true, message: 'El campo de descripción es obligatorio', trigger: 'blur' }
        ],
        dateStart: [
          { required: true, message: 'El campo de fecha inicio es obligatorio', trigger: 'blur' }
        ],
        dateEnd: [
          { required: true, message: 'El campo de fecha expiración es obligatorio', trigger: 'blur' }, { validator: compareDate }
        ],
        value: [
          { required: true, message: 'El campo de valor descuento es obligatorio', trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: 'El campo de cantidad es obligatorio', trigger: 'blur' }
        ],
      },
      isLoading: false
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
  mounted () {
    if (this.datos) {
      this.form = this.datos
    }
  },
  methods: {
    handleSave () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            this.isLoading = true
            this.datos
              ? await this.$axios.$put(`/api/executives/coupons/${this.datos._id}`, this.form)
              : await this.$axios.$post('/api/executives/coupons', this.form)
            this.$emit('closes')
            this.$message.success('Cupón de descuento registrado correctamente')
          } catch (err) {
            this.isLoading = false
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
        } else {
          this.$message.error('Corrija los datos ingresados para poder continuar')
        }
      }
      )
    }
  }
}
</script>
