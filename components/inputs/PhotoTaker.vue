<template>
  <div>
    <ValidationProvider v-slot="{ validate, errors }" :name="name" :rules="close ? '' : 'required'">
      <center v-show="!isCameraOpen">
        <span :class="errors[0] ? 'text-red-600' : '' ">{{ srcPhoto ? '1 imagen': 'Sin imagen' }}  ({{ sizeImage }} en total)</span>
        <br>
        <img
          style="border-style: groove; cursor: pointer;"
          :src="srcPhoto || imgDefault"
          alt="Foto de perfil PDF Ecuador"
          :class="errors[0] ? 'border-2 border-red-600' : '' "
          :width="srcPhoto ? '300' : '300'"
          :height="srcPhoto ? '157.5' :'300'"
          @click="toggleCamera"
        >
      </center>
      <center>
        <div v-show="isCameraOpen && isLoading" class="camera-loading">
          <ul class="loader-circle">
            <li />
            <li />
            <li />
          </ul>
        </div>
        <input v-show="false" :value="model" name="foo" @input="validate($event)">
        <p class="text-red-600 text-xs dark:text-red-500">
          {{ errors[0] }}
        </p>
        <div v-show="!isLoading">
          <div v-show="isCameraOpen" class="camera-box" :class="{ 'flash' : isShotPhoto }">
            <div class="camera-shutter" :class="{'flash' : isShotPhoto}" />
            <video
              v-show="!isPhotoTaken"
              :ref="`camera${id}`"
              :class="errors[0] ? 'border-2 border-red-600' : '' "
              :width="300"
              :height="157.5"
              autoplay
            />
            <canvas v-show="isPhotoTaken" :id="name" :ref="`canvas${id}`" :width="450" :height="337.5" />
          </div>
        </div>
        <br>
        <div v-if="isCameraOpen && !isLoading">
          <a-tooltip placement="right">
            <template slot="title">
              <span>{{ isPhotoTaken && isCameraOpen ? 'Volver a tomar' : 'Capturar' }}</span>
            </template>
            <vs-button
              circle
              icon
              border
              @click="takePhoto"
            >
              <a-icon type="camera" />
            </vs-button>
          </a-tooltip>
        </div>
        <a-button v-if="!isCameraOpen" type="secondary" @click="toggleCamera">
          <span v-if="!srcPhoto">Activar cámara</span>
          <span v-else>Volver a tomar</span>
        </a-button>
        <div v-if="isPhotoTaken && isCameraOpen">
          <a-button text type="secondary" class="mt-4" @click="saveImage">
            Guardar imagen
          </a-button>
        </div>
      </center>
    </ValidationProvider>
  </div>
</template>

<script>
import { b64toblob } from '@/assets/utils'

export default {
  name: 'PhotoTaker',
  props: {
    value: {
      type: undefined,
      default: undefined
    },
    name: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    close: {
      type: Boolean,
      default: false
    },
    imgDefault: {
      type: String,
      default: '/default.jpg'
    }
  },
  data: () => ({
    model: null,
    isCameraOpen: false,
    sizeImage: '0 Kb',
    isLoading: false,
    srcPhoto: '',
    isPhotoTaken: false,
    isShotPhoto: false,
    errorPhoto: false
  }),
  watch: {
    value (val) {
      this.model = val
      if (!val && this.isCameraOpen) {
        this.isCameraOpen = false
        this.isPhotoTaken = false
        this.isShotPhoto = false
        this.stopCameraStream()
        this.srcPhoto = ''
        this.sizeImage = '0 Kb'
      }
    },
    close (val) {
      if (val) {
        this.isPhotoTaken = false
        this.isShotPhoto = false
        this.model = null
        this.$emit('input', null)
        if (this.isCameraOpen) {
          this.stopCameraStream()
        }
        this.isCameraOpen = false
        this.srcPhoto = ''
        this.sizeImage = '0 Kb'
      }
    }
  },
  mounted () {
    this.model = this.value
  },
  methods: {
    shutDown () {
      this.isCameraOpen = false
      this.isPhotoTaken = false
      this.isShotPhoto = false
      this.stopCameraStream()
      this.srcPhoto = ''
      this.sizeImage = '0 Kb'
    },
    toggleCamera () {
      if (this.isCameraOpen) {
        this.isCameraOpen = false
        this.isPhotoTaken = false
        this.isShotPhoto = false
        this.stopCameraStream()
      } else {
        this.isCameraOpen = true
        this.createCameraElement()
      }
    },
    createCameraElement () {
      this.isLoading = true
      const constraints = (window.constraints = {
        audio: false,
        video: true
      })
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          this.isLoading = false
          this.$refs[`camera${this.id}`].srcObject = stream
        }).catch(error => {
          this.isLoading = false
          this.$error({
            title: 'Ha ocurrido un error',
            content: 'Es posible que su navegador no soporte esta opción' + error,
            okText: 'Aceptar'
          })
        })
    },
    stopCameraStream () {
      if (this.$refs[`camera${this.id}`]) {
        const tracks = this.$refs[`camera${this.id}`].srcObject.getTracks()
        tracks.forEach(track => {
          track.stop()
        })
      }
    },
    takePhoto () {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true
        const FLASH_TIMEOUT = 50
        setTimeout(() => {
          this.isShotPhoto = false
        }, FLASH_TIMEOUT)
      }

      this.isPhotoTaken = !this.isPhotoTaken
      const context = this.$refs[`canvas${this.id}`].getContext('2d')
      context.drawImage(this.$refs[`camera${this.id}`], 0, 0, 450, 337.5)
      this.saveImage()
    },
    async saveImage () {
      const file = document.getElementById(`${this.name}`).toDataURL('image/jpeg').replace('data:', '').replace(/^.+,/, '')
      const blob = await b64toblob(file, 'image/jpeg')
      blob.document = file
      blob.id = this.id
      this.model = blob
      this.$emit('input', this.model)
      this.sizeImage = blob.size > 999999 ? blob.size / 1000000 + 'Mb' : blob.size / 1000 + 'Kb'
      this.srcPhoto = URL.createObjectURL(blob)
      this.toggleCamera()
    },
  }
}
</script>

<style scoped>

</style>
