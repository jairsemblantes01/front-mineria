<template>
  <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
    <file-render
      v-model="model"
      :accept="accept"
      :label-accept="labelAccept"
      name="id-doc"
      :errors="errors"
      :description="description"
    />
  </ValidationProvider>
</template>
<script>
import { filetob64 } from '~/assets/utils'

export default {
  props: {
    accept: {
      type: String,
      default: '.pdf,.jpeg,.jpg,.png,.jfif'
    },
    description: {
      type: String,
      default: 'Documento'
    },
    labelAccept: {
      type: String,
      default: 'PDF, PNG , JPG o JFIF'
    },
    ids: {
      type: Number,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    rules: {
      type: String,
      default: ''
    },
    errors: {
      type: undefined,
      default: undefined
    },
    value: {
      type: undefined,
      default: undefined
    }
  },
  data: () => ({
    model: null
  }),
  watch: {
    async model (val) {
      if (val) {
        val.id = this.ids
        val.document = await filetob64(val)
      }
      this.$emit('input', val)
    },
    value (val) {
      this.model = val
    }
  },
  methods: {

  }
}
</script>
