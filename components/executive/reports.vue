<template>
  <div class="modal">
    <a-modal
      visible
      :title="data.title"
      @cancel="closeThis"
    >
      <template slot="footer">
        <a-button
          key="back"
          @click="closeThis"
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
      <div v-if="showStatus">
        <a-checkbox
          v-model="checkStatus"
          @change="changeStatus"
        >
          Añadir un estado al reporte
        </a-checkbox>
        <h3 v-if="checkStatus">
          Estados :
        </h3>
        <a-select
          v-if="checkStatus"
          v-model="status"
          placeholder="Seleccione el estado"
          style="width: 84%"
        >
          <a-select-option v-for="x in data.states" :key="x.value" :value="x.value">
            {{ x.text }}
          </a-select-option>
        </a-select>
      </div>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'

const endDate = moment()
const startDate = endDate.clone().subtract(1, 'months')

export default {
  props: {
    showStatus: { type: Boolean, default: true },
    data: { type: Object, required: true }
  },
  data () {
    return {
      dates: [startDate, endDate],
      isLoading: false,
      checkStatus: undefined,
      token: this.$cookies.get('M42s9'),
      endpoint: undefined,
      status: undefined
    }
  },
  methods: {
    changeStatus () {
      if (this.checkStatus === false) {
        this.status = undefined
      }
    },
    getReport () {
      try {
        this.isLoading = true
        const start = this.dates[0].toISOString()
        const end = this.dates[1].toISOString()
        if (this.data.type === 'deletes') {
          if (this.status) {
            this.endpoint = `/api/executives/anf/report-remove?startDate=${start}&endDate=${end}&status=${this.status}&token=${this.token}`
          } else {
            this.endpoint = `/api/executives/anf/report-remove?startDate=${start}&endDate=${end}&token=${this.token}`
          }
        } else if (this.data.type === 'convenio') {
          this.endpoint = `/api/executives/convenios/report-clients?startDate=${start}&endDate=${end}&status=${this.status}&token=${this.token}`
        } else if (this.status) {
          this.endpoint = `/api/executives/anf/report-request?startDate=${start}&endDate=${end}&status=${this.status}&token=${this.token}&type=${this.$route.name === 'executive' ? 'anf' : 'other'}`
        } else {
          this.endpoint = `/api/executives/anf/report-request?startDate=${start}&endDate=${end}&token=${this.token}&type=${this.$route.name === 'executive' ? 'anf' : 'other'}`
        }
        window.open(this.endpoint, '_blank')
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
    },
    closeThis () {
      this.$emit('closeReport')
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
