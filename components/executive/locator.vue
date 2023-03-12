<template>
  <a-modal
    visible
    title="Agregue un nuevo localizador"
    @cancel="$emit('close')"
  >
    <template slot="footer">
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
        :disabled="!locator"
        @click="changelocator"
      >
        Guardar
      </a-button>
    </template>
    <h3 style="margin: 10px 0">
      Localizador
    </h3>
    <a-input
      v-model="locator"
      placeholder="Ingrese el nuevo localizador"
    />
    <h3 style="margin: 10px 0">
      Observación
    </h3>
    <a-input
      v-model="observation"
      placeholder="Ingrese una observación del cambio"
    />
  </a-modal>
</template>

<script>

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      locator: '',
      observation: '',
      isLoading: false
    }
  },
  methods: {
    async changelocator () {
      try {
        this.isLoading = true
        const endpoint = `/api/executives/anf/change-locator/${this.id}`
        await this.$axios.$post(endpoint, { locator: this.locator, observation: this.observation })
        this.closeThis()
        this.$message.success('Se cambio correctamente el localizador')
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
    closeThis () {
      this.$emit('closes')
    }
  }
}
</script>
