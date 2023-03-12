<template>
  <a-modal
    visible
    :title="type === 'delete' ? 'Razón de eliminación' : 'Duplicado de certificado' "
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
        v-if="type === 'delete'"
        key="submit"
        type="primary"
        :loading="isLoading"
        :disabled="!description"
        @click="sendRemove"
      >
        Eliminar
      </a-button>
      <a-button
        v-if="type === 'duplicate'"
        key="submit"
        type="primary"
        :loading="isLoading"
        @click="copyCertificate"
      >
        Duplicar
      </a-button>
    </template>
    <div v-if="type === 'delete'">
      <a-input
        v-model="description"
        placeholder="Ingrese el motivo de eliminación"
      />
    </div>
    <div v-if="type === 'duplicate'">
      <p>Duración: </p>
      <a-select
        v-model="duplicate.duration"
        style="width: 100%"
        placeholder="Tags Mode"
      >
        <a-select-option v-for="d in options" :key="d.id" :value="d.id">
          {{ d.description }}
        </a-select-option>
      </a-select>
    </div>
  </a-modal>
</template>

<script>

export default {
  props: {
    type: { type: String, required: true },
    data: undefined,
    url: { type: String, default: 'executives/anf/remove-certificate' },
    options: { type: Array, required: false, default: () => [] }
  },
  data () {
    return {
      test: this.type,
      description: undefined,
      isLoading: false,
      duplicate: {
        duration: ''
      }
    }
  },
  methods: {
    async sendRemove () {
      try {
        this.isLoading = true
        const reason = { reason: this.description }
        if (this.url.startsWith('clients')) {
          await this.$axios.$delete(`/api/${this.url}/${this.data}?reason=${this.description}`)
        } else {
          await this.$axios.$post(`/api/${this.url}/${this.data}`, reason)
        }
        this.$emit('closes')
        this.$message.success('Se elimino correctamente')
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
    async copyCertificate () {
      this.isLoading = true
      try {
        await this.$axios.$post(`/api/executives/anf/duplicate-registry/${this.data}`, {
          duration: this.duplicate.duration
        })
        this.$message.success('El registro se duplicó correctamente')
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
        this.$emit('closes')
      }
    },
    closeThis () {
      this.$emit('close')
    }
  }
}
</script>
