<template>
  <a-modal
    visible
    title="Retroceso de estado"
    @cancel="closeThis"
  >
    <template slot="footer">
      <a-button
        key="back"
        @click="closeThis"
      >
        Cancelar
      </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="isLoading"
        :disabled="!description"
        @click="sendReturn"
      >
        Guardar
      </a-button>
    </template>
    <a-input
      v-model="description"
      placeholder="Ingrese el motivo de retroceso de estado"
    />
  </a-modal>
</template>

<script>

export default {
  props: {
    data: undefined
  },
  data () {
    return {
      description: null,
      isLoading: false
    }
  },
  methods: {
    async sendReturn () {
      try {
        this.isLoading = true
        const endpoint = '/api/executives/anf/roll-back-status'
        await this.$axios.$post(endpoint, {
          id: this.data,
          observation: this.description
        })
        this.closeThis()
        this.$message.success('Retroceso realizado correctamente')
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
      this.$emit('closes')
    }
  }
}
</script>
