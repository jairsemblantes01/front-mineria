<template>
  <div class="grid grid-cols-1">
    <div class="flex justify-center items-center w-full">
      <div class="flex md:flex-col">
        <label
          v-if="files.length === 0"
          class="md:flex md:flex-col md:justify-center md:items-center md:w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          :class="!errors[0] ? '' : error"
          @click="openFile"
        >
          <div class="flex flex-col justify-center items-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              class="mb-3 w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <p class="mb-2 mx-5 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click aquí</span> para subir el archivo de su {{ description }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ labelAccept }} (MAX. 2MB)</p>
          </div>
          <!--                            <input id="dropzone-file" type="file" >-->
        </label>
        <div v-else>
          <a-card :title="files[0].name" style="width: 300px; min-height: 350px">
            <center>
              <vue-pdf
                v-if="files[0].type === 'application/pdf'"
                :src="files[0].blob"
                :page="1"
                :style="`display: inline-block; height: 90%`"
              />
              <video v-else-if="files[0].type.includes('video')" :src="files[0].blob" controls>
                <p>Tu navegador no soporta HTML5 video.</p>
              </video>
              <img
                v-else
                alt="fotografía"
                style="position:relative; width: auto; max-height: 300px"
                :src="files[0].blob"
              >
            </center>
          </a-card>
        </div>
        <p class="text-red-600 text-xs dark:text-red-500">
          {{ errors[0] }}
        </p>
      </div>
    </div>
    <a-upload
      :remove="handleRemove"
      :multiple="false"
      :accept="accept"
      :file-list="files"
      :before-upload="x => beforeUpload(x, 'id')"
    >
      <a-button v-show="false" ref="fileInput">
        Click to Upload
      </a-button>
    </a-upload>
  </div>
</template>
<script>
import { message } from 'ant-design-vue'

export default {
  props: {
    description: {
      type: String,
      default: 'Documento'
    },
    accept: {
      type: String,
      default: '.pdf,.jpeg,.jpg,.png,.jfif'
    },
    labelAccept: {
      type: String,
      default: 'PDF,JPG,PNG o JFIF'
    },
    errors: {
      type: undefined,
      default: undefined
    },
    width: {
      type: String,
      default: ''
    },
    value: {
      type: undefined,
      default: undefined
    }
  },
  data: () => ({
    files: []
  }),
  computed: {
    error () {
      return 'border border-red-500 bg-red-100 rounded shadow focus:outline-none focus:shadow-outline focus:ring-red-400 focus:ring focus:ring-opacity-40 '
    }
  },
  watch: {
    value (val) {
      if (!val) {
        this.files = []
      }
    }
  },
  methods: {
    openFile () {
      const ref = this.$refs.fileInput
      ref.$refs.buttonNode.click()
    },
    handleRemove () {
      this.files = []
      this.$emit('input', null)
    },
    beforeUpload (file) {
      let acceptFile = this.accept.replace(/\*|\./g, '').replace(/\/|,/g, ' ').split(' ')
      acceptFile = acceptFile.filter(x => x)
      let contain = true
      for (const x of acceptFile) {
        contain = file.type.includes(x)
        if (contain) { break }
      }
      acceptFile = !contain
      if (acceptFile) {
        message.error('El formato ingresado no es permitido')
      }
      const size = file.size / 1024 / 1024 > 2
      if (size) {
        message.error('El documento pesa más de 2 Mb')
      }
      if (acceptFile || size) {
        this.files = []
        this.$emit('input', null)
      } else {
        file.blob = URL.createObjectURL(file)
        this.files = [file]
        this.$emit('input', file)
      }
      return acceptFile && size
    }
  }
}
</script>
