<template>
  <div data-active-classes="bg-yellow-100 text-yellow-600">
    <div style="overflow-y: auto" class="p-7">
      <div v-for="(r, index) in data" :key="index" class="mt-5 mb-3">
        <h2 @click="select = r">
          <button type="button" class="md:flex bg-gray-200 items-center justify-between w-full p-6 text-xl font-medium border border-gray-200 focus:ring-2 focus:ring-yellow-200 hover:bg-gray-300">
            <span class="flex">
              <a-icon type="file-protect" style="fontSize: '70px'" />
              <p class="ml-5">Solicitud {{ getDateWithHour(r._date) }}</p>
            </span>
            <span class="flex w-15">{{ getTypeOptions('TypesStatusCertificateDirect', r.statusSignature).description }}</span>
            <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          </button>
        </h2>
        <div v-if="r === select">
          <div class="p-5 font-medium border border-gray-200">
            <div class="grid md:grid-cols-2">
              <div class="text-center mt-2">
                <h1 class="text-xl">
                  Proceso de su certificado
                </h1>
                <div class="flex justify-center lg:pt-4 pt-8 pb-0">
                  <div class="p-3 text-center">
                    <a-icon :type="getVerification(r.verification, r.duration).icon" class="block" :style="`color: ${getVerification(r.verification, r.duration).color}; fontSize: 30px`" />
                    <span class="text-sm text-slate-400">{{ getVerification(r.verification, r.duration).status ? 'Validado' : 'En proceso de validación' }}</span>
                  </div>
                  <div class="p-3 text-center">
                    <a-icon :type="r.status === 12 ? 'check-circle' : 'clock-circle'" class="block" :style="`color: ${r.status === 12 ? 'green' : 'gray'}; fontSize: 30px`" />
                    <span class="text-sm text-slate-400">Listo para descarga</span>
                  </div>
                  <div class="p-3 text-center">
                    <a-icon :type="findDownloads(r.movements) ? 'check-circle' : 'clock-circle'" class="block" :style="`color: ${findDownloads(r.movements) ? 'green' : 'gray'}; fontSize: 30px`" />
                    <span class="text-sm text-slate-400">Descargado</span>
                  </div>
                </div>
              </div>
              <div class="text-center mt-2">
                <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">
                  {{ getName(r) }}
                </h3>
                <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                  {{ r.subject && r.subject.id }}
                </div>
                <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                  Ecuador, {{ r.subject && r.subject.state }}
                </div>
                <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                  {{ r.subject && r.subject.address }}
                </div>
              </div>
            </div>
            <div class="flex max-w-1/3 justify-center my-3">
              <div v-if="r.status === 12">
                <vs-alert border>
                  <template #title>
                    <a-icon type="check" /> Su firma electrónica está lista para descargar
                  </template>
                  <p>Su firma electrónica fue generada exitosamente el <b>{{ r.firma && r.firma.fechaRecibido && getDate(r.firma.fechaRecibido) }}</b>.</p>
                  <p>Su firma electrónica temporal fue valida hasta el <b>{{ r.firma && r.firma.fechaExpiracion && getDate(r.firma.fechaExpiracion) }}</b>.</p>
                  <p>Contraseña: <b>{{ r.firma && r.firma.contrasena }}</b></p>
                </vs-alert>
              </div>
            </div>
            <div class="md:flex flex-inline justify-center">
              <nuxt-link :to="`/${typeClient}/request/${r._id}`">
                <a-button type="primary" icon="eye" class="mx-2">
                  Ver estado de solicitud
                </a-button>
              </nuxt-link>
              <a-button
                v-if="r.status === 12"
                icon="download"
                :disabled="r.status !== 12 || loadDownload"
                :loading="loadDownload"
                class="ml-2 mx-2 md:mt-0 mt-3"
                @click="downloadSignature(r._id, '.pfx')"
              >
                Descargar firma electrónica PFX
              </a-button>
              <a-button
                v-if="r.status === 12"
                icon="download"
                :disabled="r.status !== 12 || loadDownload"
                :loading="loadDownload"
                type="danger"
                ghost
                class="ml-2 mx-2 md:mt-0 mt-3"
                @click="downloadSignature(r._id, '.p12')"
              >
                Descargar firma electrónica P12
              </a-button>
              <a-button
                v-if="r.status === 12 && r.duration !== '0.1' "
                icon="lock"
                :loading="spinUp"
                class="ml-2 mx-2 md:mt-0 mt-3"
                @click="changePassword(r._id)"
              >
                Cambiar contraseña
              </a-button>
              <a-button
                v-if="r.status === 12 && $store.state.session.ClientData.signature"
                icon="export"
                :disabled="r.status !== 12 || spinUp"
                :loading="spinUp"
                class="ml-2 mx-2 md:mt-0 mt-3"
                @click="goToUpconta"
              >
                Ir a facturar
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vs-pagination v-if="data.length > 0 && totalPages > 1" v-model="pagination.actual" color="rgb(255, 191, 0)" class="mt-10" :length="totalPages" />
    <div v-show="!isLoadingTable && data.length === 0" class="p-7">
      <h1 class="mb-4 text-4xl font-extrabold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        No existen solicitudes actualmente
      </h1>
      <p class="mb-6 text-lg font-normal text-center text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Al parecer no se han creado solicitudes o sus solicitudes han sido eliminadas, para más ayuda contacte a firmaselectronicas.com
      </p>
    </div>
    <ChangePassword
      v-if="showChangePassword"
      :id-request="requestId"
      @close="showChangePassword = false"
      @closes="() => {showChangePassword = false
                      init()}"
    />
  </div>
</template>

<script>
import moment from 'moment'
import ChangePassword from '@/components/help/ChangePassword'
import Main from 'assets/mixin-tables'
import { downloadInB64 } from 'assets/utils'

export default {
  components: {
    ChangePassword
  },
  mixins: [Main],
  data: () => ({
    showChangePassword: false,
    select: 1,
    data: [],
    loadDownload: false,
    endpoint: '/api/clients/me',
    params: {
      typeRequest: ''
    },
    spinUp: false,
    requestId: '',
  }),
  computed: {
    upEndpoint () {
      return this.$config.BACKEND_HELP === 'https://api-tocdesk-firmas-dev.toc.com.ec' ? 'https://next-test.upconta.com' : 'https://next.upconta.com'
    },
    typeClient () {
      return this.$store.state.session.ClientData && this.$store.state.session.ClientData.role === 'manager' ? 'manager' : 'help'
    },
  },
  created () {
    this.params.typeRequest = this.typeClient === 'manager' ? '{$in}fast, convenio' : ''
  },
  methods: {
    changePassword (id) {
      this.requestId = id
      this.showChangePassword = true
    },
    async goToUpconta () {
      try {
        this.spinUp = true
        const { token } = await this.$axios.$get('/api/clients/me/upconta/auth')
        if (token) {
          window.open(`${this.upEndpoint}/login?yplrm=${token}&redirect=/administrative/facturacion-rapida`, '_blank')
          this.spinUp = false
        }
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      } finally {
        this.spinUp = false
      }
    },
    async downloadSignature (id, ext) {
      try {
        this.loadDownload = true
        const { b64 } = await this.$axios.$get('/api/clients/me/signatures/download-signature/' + id)
        await downloadInB64(b64, 'firma-electronica-' + this.getDate(new Date()) + ext, 'application/x-pkcs12')
        this.loadDownload = false
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      } finally {
        this.loadDownload = false
      }
    },
    getVerification (verification, duration) {
      return verification.civilRegistration.value && verification.dataProvided.value && (duration === '0.1' ? true : verification.ruc.value)
        ? { icon: 'check-circle', color: 'green', status: true }
        : { icon: 'clock-circle', color: 'gray', status: false }
    },
    getDate (date) {
      return moment(date).format('DD/MM/YYYY hh:mm')
    },
    findDownloads (mov) {
      return (mov && mov.find(x => x.status === 9)) || false
    }
  }
}
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
  overflow: hidden;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
}
.file {
  width: 80px;
  height: auto;
  margin: 20px;
  * {
    transform-origin: center;
  }
  &:last-child {
    margin-right: 120px;
  }
}
.file-body {
  fill: #d7d7d7;
}
.file-bend {
  fill: #848484;
}
.file-check {
  fill: #53a21e;
}
.file-loading {
  fill: none;
  stroke: #848484;
  stroke-width: 3px;
  stroke-dasharray: 49;
  stroke-linecap: round;
  transform: rotate(-90deg);
}
.move {
  animation: move 2.5s infinite;
}
.load {
  animation: load 2.5s infinite;
}
.done {
  animation: done 2.5s infinite;
}
.fadein{
  animation: fadein 2.5s infinite;
}
.fadeout{
  animation: fadeout 2.5s infinite;
}
.zoomin{
  animation: zoomin 2.5s infinite;
}
.zoomout{
  animation: zoomout 2.5s infinite;
}
@keyframes move {
  0% {
    transform: translate(0);
  }
  60% {
    transform: translate(0);
  }
  90% {
    transform: translate(124px);
  }
  100% {
    transform: translate(124px);
  }
}
@keyframes load {
  0% {
    stroke-dashoffset: 49;
    opacity: 1;
  }
  30% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  35% {
    opacity: 0;
  }
  100% {
    stroke-dashhoffset: 0;
    opacity: 0;
  }
}
@keyframes done {
  0% {
    transform: scale(0);
  }
  35% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes fadein{
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeout{
  0% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
@keyframes zoomin{
  0% {
    transform: scale(1);
  }
  60% {
    transform: scale(1);
  }
  90% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1.5);
  }
}
@keyframes zoomout{
  0% {
    transform: scale(1.5);
  }
  60% {
    transform: scale(1.5);
  }
  90% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
