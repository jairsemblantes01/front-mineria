<template>
  <div class="px-7 pb-7">
    <div>
      <a-spin :spinning="loading" tip="Iniciando...">
        <div class="flex items-center">
          <h1 class="text-lg font-light pr-2 leading-5 text-gray-800 mb-2">
            Este método seleccionado agilitará la validación de su solicitud por lo cual,
            debe grabar su video con el siguiente diálogo. <br> <b>Máximo 20 segundos</b>
          </h1>
        </div>
        <p class="mb-3 font-medium text-center leading-5 text-gray-800 border-2 border-gray-400 p-3">
          Yo, <b>{{ `${form.subject.name1} ${form.subject.name2} ${form.subject.surName1} ${form.subject.surName2}` }}</b>
          con cédula de identidad <b>{{ form.subject.id }}</b>, autorizo a la empresa ANFAC a realizar mi firma electrónica.
        </p>
        <div v-if="model && model.blob">
          <div class="flex" style="width: 540px; height: 220px">
            <video class="w-full" :src="model.blob" controls>
              <p>Tu navegador no soporta HTML5 video.</p>
            </video>
          </div>
        </div>
        <div v-show="openCamera && !model" class="flex" style="width: 540px; height: 220px">
          <video id="video" class="w-full" muted="muted" />
        </div>
        <ValidationProvider v-slot="{ validate, errors }" name="videoTake" rules="required">
          <label v-if="!model && !openCamera" :class="errors[0] ? 'border-red-600 text-red-600' : 'border-blue-600 text-blue-600'" class="inline-flex w-full h-full p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 peer-checked:text-gray-600">
            <div class="w-full">
              <div class="w-full text-lg font-semibold">Video</div>
              <div class="w-full text-sm">De click en el botón <b>Comenzar video</b></div>
              <div class="w-full">
                <center>
                  <img src="/rec2.png" width="25%">
                </center>
              </div>
            </div>
          </label>
          <input v-show="false" :value="model" name="foo" @input="validate($event)">
          <p class="text-red-600 text-xs dark:text-red-500">
            {{ errors[0] }}
          </p>
        </ValidationProvider>
      </a-spin>
    </div>
    <p>
      {{ duration }}
    </p>
    <a-button v-if="!openCamera" class="mt-3" @click="startRecord">
      <a-icon type="play-circle" />
      {{ model && model.blob ? 'Grabar otro video' : 'Comenzar video' }}
    </a-button>
    <a-button v-if="video && !model" type="secondary" @click="stopRecord">
      Detener y guardar
    </a-button>
  </div>
</template>
<script>
import { filetob64 } from 'assets/utils'
export default {
  props: {
    form: {
      type: Object,
      default: {
        subject: { name1: '', name2: '', surName1: '', surName2: '', id: '' }
      }
    }
  },
  data: () => ({
    startTime: null,
    idInterval: undefined,
    mediaRecorder: null,
    duration: undefined,
    audioDispositive: [],
    videoDispositive: [],
    video: null,
    model: null,
    openCamera: false,
    loading: false,
  }),
  mounted () {
    const tieneSoporteUserMedia = () =>
      !!(navigator.mediaDevices.getUserMedia)
    if (typeof MediaRecorder === 'undefined' || !tieneSoporteUserMedia()) { return alert('Tu navegador web no cumple los requisitos; por favor, actualiza a un navegador decente como Firefox o Google Chrome') }
    this.fillList()
  },
  destroyed () {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop()
    }
  },
  methods: {
    fillList () {
      navigator
        .mediaDevices
        .enumerateDevices()
        .then(devices => {
          this.audioDispositive = []
          this.videoDispositive = []
          devices.forEach(device => {
            if (device.kind === 'audioinput') {
              this.audioDispositive.push(device.deviceId)
            } else if (device.kind === 'videoinput') {
              this.videoDispositive.push(device.deviceId)
            }
          })
        })
    },
    startCount () {
      this.startTime = Date.now()
      this.idInterval = setInterval(this.refresh, 500)
    },
    secondsTime (seconds) {
      let hours = Math.floor(seconds / 60 / 60)
      seconds -= hours * 60 * 60
      let minutes = Math.floor(seconds / 60)
      seconds -= minutes * 60
      seconds = parseInt(seconds)
      if (hours < 10) { hours = '0' + hours }
      if (minutes < 10) { minutes = '0' + minutes }
      if (seconds < 10) { seconds = '0' + seconds }
      if (seconds > 20) {
        this.stopRecord()
      }
      return `${hours}:${minutes}:${seconds}`
    },
    refresh () {
      this.duration = this.secondsTime((Date.now() - this.startTime) / 1000)
    },
    startRecord () {
      this.loading = true
      this.$emit('input', null)
      this.model = null
      this.fillList()
      this.video = document.querySelector('#video')
      if (!this.audioDispositive.length) {
        this.loading = false
        this.video = null
        this.stopRecord()
        return alert('Su dispositivo no cuenta con micrófono')
      }
      if (!this.videoDispositive.length) {
        this.loading = false
        this.video = null
        this.stopRecord()
        return alert('Su dispositivo no cuenta con cámara')
      }
      if (this.mediaRecorder) { return }
      navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: this.audioDispositive[0],
        },
        video: {
          deviceId: this.audioDispositive[0],
        }
      })
        .then(stream => {
          this.loading = false
          this.video.srcObject = stream
          this.openCamera = true
          this.video.play()
          this.mediaRecorder = new MediaRecorder(stream)
          this.mediaRecorder.start()
          this.startCount()
          const fragmentosDeAudio = []
          this.mediaRecorder.addEventListener('dataavailable', evento => {
            fragmentosDeAudio.push(evento.data)
          })
          this.mediaRecorder.addEventListener('stop', async () => {
            this.video.pause()
            stream.getTracks().forEach(track => track.stop())
            this.detenerConteo()
            if (fragmentosDeAudio.length !== 0) {
              this.model = new Blob(fragmentosDeAudio, { type: 'video/webm' })
              this.model.blob = URL.createObjectURL(this.model)
              this.model.document = await filetob64(this.model)
              this.model.id = 6
              this.$emit('input', this.model)
              /* const urlParaDescargar = URL.createObjectURL(blobVideo)
              // Crear un elemento <a> invisible para descargar el audio
              const a = document.createElement('a')
              document.body.appendChild(a)
              a.style = 'display: none'
              a.href = urlParaDescargar
              a.download = 'grabacion_parzibyte.me.webm'
              // Hacer click en el enlace
              a.click()
              // Y remover el objeto
              window.URL.revokeObjectURL(urlParaDescargar) */
            }
          })
        })
        .catch(error => {
          this.loading = false
          this.openCamera = false
        })
    },
    detenerConteo () {
      clearInterval(this.idInterval)
      this.startTime = null
    },
    stopRecord () {
      if (!this.mediaRecorder) { return }
      this.mediaRecorder.stop()
      this.mediaRecorder = null
      this.openCamera = false
    }
  }
}
</script>
<style scoped>
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
</style>
