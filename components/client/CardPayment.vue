<template>
  <div>
    <div class="steps-content">
      <div v-if="!isLoadingPayment">
        <h1 class="mb-4 text-3xl leading-tight font-bold tracking-tighter text-center">
          Complete su pago con tarjeta de crédito
        </h1>
        <center v-if="flagError === 1" class="mb-5">
          <a-alert
            v-if="flagError === 1"
            style="width: 600px; margin-bottom: 25px"
            message="Error"
            description="El numero de cédula ingresado no es correcto por favor verifíquelo"
            type="error"
            show-icon
          />
        </center>
        <div style="text-align: center">
          <a-button
            v-if="flagError === 1"
            @click="$store.commit('navigation/correction')"
          >
            Corregir datos
          </a-button>
        </div>
        <a-row v-if="paymentLink.url">
          <a-col>
            <iframe :src="paymentLink.url" style="width: 65vw; height: 60vh" />
          </a-col>
        </a-row>
        <p style="margin-top: 15px">
          <strong>Nota:</strong> Para dudas y consultas envíenos un correo a atencionalcliente@firmaselectronicas.ec
        </p>
      </div>
      <div v-else style="width: 65vw; height: 60vh">
        <a-spin tip="Iniciando pago...">
          <div class="spin-content">
            Pago con tarjeta de crédito o débito.
          </div>
        </a-spin>
      </div>
    </div>
    <a-modal v-model="showWarning" :footer="null">
      <h2><a-icon style="font-size: 25px; margin-right: 10px" type="warning" theme="twoTone" two-tone-color="#ffcc00" />Tome en cuenta esta información</h2>
      <p>
        Para un correcto registro de su pago complete todos los pasos
        que se indica a continuación.
        <strong style="color: red">Si no realiza todos los pasos no quedará registrada su solicitud.</strong>
      </p>
      <div style="text-align: right">
        <a-button type="primary" @click="closeWarning">
          Aceptar
        </a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>

export default {
  props: {
    user: {
      type: Object,
      default: null
    },
    payment: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    paymentLink: {
      url: '',
      token: ''
    },
    isLoadingPayment: false,
    flagPagomedios: 0,
    flagError: 0,
    showWarning: false,
  }),
  mounted () {
    this.createPaymentRequest()
  },
  methods: {
    closeWarning () {
      this.showWarning = false
      this.showModalPayment = true
    },
    async createPaymentRequest () {
      if (this.flagPagomedios === 1) {
        this.showModalPayment = true
      } else {
        try {
          this.isLoadingPayment = true
          let files = {
            ...this.user.files
          }
          const requestData = { ...this.user }
          requestData.files = []
          for (const x in files) {
            if (files[x]) {
              requestData.files.push({ document: files[x].document, id: files[x].id })
            }
          }
          files = []
          requestData.verification = {}
          requestData.verification.payment = this.payment
          requestData.paymentMethod = this.payment.type
          requestData.verification.payment.observation = 'Esperando confirmación de pago'
          requestData.verification.payment.holder = 'Esperando confirmación de pago'
          if (requestData.coupon && !requestData.coupon.flagPay) {
            delete requestData.coupon
          }
          if (requestData.subject.businessName && requestData.subject.businessName === 'OTRA') {
            requestData.subject.businessName = requestData.subject.businessNameOther
          }
          const request = await this.$axios.$post('/api/anf-requests/user?version=2', requestData)
          requestData.idRequest = request._id
          requestData.infoSubject = requestData.subject
          requestData.typeSubject = requestData.certType
          requestData.typeCert = requestData.type
          delete requestData.type
          delete requestData.subject
          delete requestData.certType
          delete requestData.verification
          delete requestData.infoBilling
          delete requestData.certificateAuthorization
          delete requestData.files
          delete request.contract
          if (requestData.coupon && requestData.coupon.flagPay) {
            requestData.coupon = requestData.coupon.code
          }
          this.paymentLink = await this.$axios.$post('/api/anf-requests/user/medio-pagos/create-link', requestData)
          await this.$axios.$post(`/api/_path/payment-card/save-token/${requestData.idRequest}`, {
            token: this.paymentLink.token
          })
          this.flagPagomedios = 1
          this.isLoadingPayment = false
          // const routeData = this.$router.resolve({ name: '/payment', path: '/payment', query: { url: this.paymentLink.url } })
          // window.open(routeData.href, '_blank')
          this.$emit('end')
        } catch (err) {
          const message = err.response ? err.response.data.message : err.message
          const code = err.response ? err.response.data.typeCode : ' '
          if (code === 'PagoMediosCreateLink') {
            this.flagError = 1
          }
          if (message.includes('Identificación incorrecta')) {
            this.$emit('changeId')
            this.$emit('error')
            return
          }
          this.$error({
            title: 'Ha ocurrido un error',
            content: `${code} :: ${message}`,
            okText: 'Aceptar'
          })
          this.$emit('error')
        } finally {
          setTimeout(() => {
            this.isLoadingPayment = false
          }, 2000)
        }
      }
    },
  }
}
</script>
