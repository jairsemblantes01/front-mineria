<template>
  <div class="modal">
    <a-modal
      visible
      title="Reporte de cupones generados"
      @cancel="$emit('closes')"
    >
      <template slot="footer">
        <a-button
          key="back"
          @click="$emit('closes')"
        >
          Cerrar
        </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="isLoading"
          :disabled="!dates"
          @click="getReport"
        >
          Descargar
        </a-button>
      </template>
      <h3>Seleccione el rango de fechas :</h3>
      <a-range-picker
        v-model="dates"
        format="DD-MM-YYYY "
      />
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'

const endDate = moment()
const startDate = endDate.clone().subtract(1, 'months')

export default {
  props: {
    data: { type: Object, required: true }
  },
  data () {
    return {
      dates: [startDate, endDate],
      isLoading: false,
      token: this.$cookies.get('M42s9'),
      endpoint: undefined
    }
  },
  methods: {
    getReport () {
      try {
        this.isLoading = true
        const start = this.dates[0].toISOString()
        const end = this.dates[1].toISOString()
        this.endpoint = `/api/executives/coupons/report?startDate=${start}&endDate=${end}&token=${this.token}`
        window.open(this.endpoint, '_self')
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Ha ocurrido un error',
          content: message,
          okText: 'Aceptar'
        })
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.ant-modal-body h3{
  padding: 5px;
}
.ant-checkbox-wrapper{
  padding: 10px;
}
</style>
