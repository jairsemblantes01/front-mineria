<template>
  <div class="cuadro">
    <center>
      <img
        class="resp"
        src="~/assets/imgs/logo.png"
        style="margin: 40px"
      >
    </center>
    <h3 style="text-align: center">
      Bienvenido a
      <b>FirmasElectronicas.ec</b> la forma mas sencilla de obtener su firma electrónica.<br>
      <br>
      Firma Electrónica
    </h3>
    <a-col :span="24">
      <label>Tipo de persona:</label>
      <a-select
        v-model="certData.certType"
        class="selected"
        placeholder="Seleccione su tipo de persona"
        @change="newCalc"
      >
        <a-select-option v-for="d in data.TypesCertificates" :key="d.id">
          {{ d.description || '' }}
        </a-select-option>
      </a-select>
    </a-col>
    <!--  <a-col v-if="certData.certType" :span="24">
      <label>Tipo de contenedor:</label>
      <a-select
        v-model="certData.type"
        class="selected"
        placeholder="Seleccione el tipo de contenedor"
        @change="newCalc"
      >
        <a-select-option v-for="d in data.Types" :key="d.id" :value="d.id">
          {{ d.description || '' }}
        </a-select-option>
      </a-select>
    </a-col> -->
    <a-col v-if="certData.certType && certData.type" :span="24">
      <label>Duración y precio:</label>
      <!-- <a-select
        v-if="certData.certType === 1"
        v-model="certData.duration"
        class="selected"
        placeholder="Seleccione la duración y precio"
        @select="newCalc"
      >
        <a-select-option :value="data.Duration[0].id">
          {{ data.Duration[0].description }}
          <span>
            <b>{{ ' - $'+totals[0].value+' Inc. IVA' }}</b>
          </span>
        </a-select-option>
        <a-select-option :value="data.Duration[1].id">
          {{ data.Duration[1].description }}
          <span>
            <b>{{ ' - $'+totals[1].value+' Inc. IVA' }}</b>
          </span>
        </a-select-option>
      </a-select> -->
      <a-select
        v-model="certData.duration"
        class="selected"
        placeholder="Seleccione la duración y precio"
        @select="selectPrice"
      >
        <a-select-option v-for="d in newTotals" :key="d._id" :value="d.duration">
          {{ d.duration }} {{ d.duration === '1' ? 'año' : 'años' }}<span><b>{{ ' - $'+d.value+' Inc. IVA' }}</b></span>
        </a-select-option>
      </a-select>
      <div v-if="certData.certType && certData.type && certData.duration">
        <a-row type="flex" justify="center">
          <a-col :md="14" :xs="24">
            <a-card style="max-width: 100%; margin-top: 30px">
              <p style="text-align: justify">
                <strong>Importante:</strong>
                La entrega de su firma electrónica se realiza por defecto en archivo (*.pfx), si desea en TOKEN puede seleccionarlo en la sección de <b>productos adicionales</b> caso contrario dar click en continuar.
                <br><br><b>Recuerde:</b> La firma electrónica en TOKEN podrá ser utilizado para firmar documentos desde aplicativos como Adobe Reader, Firmar EC y Quipux, por
                el momento no funciona para facturación electrónica y en aplicativos como Ecuapass (SENAE - Aduana) y eSIGEF( Ministerio de Finanzas).
              </p>
            </a-card>
          </a-col>
        </a-row>
        <h3 style="text-align: center; margin-top: 30px">
          Productos adicionales
        </h3>
        <div v-if="flagCategories">
          <div v-for="(i, index) in categories" :key="i._id">
            <!-- <a-col>
              <a-checkbox @change="activeCategorie(index, $event.target.checked)">
               {{i.name}}
              </a-checkbox>
            </a-col> -->
            <a-checkbox v-if="!i.noShow" @change="activeCategorie(index, $event.target, i)">
              {{ i.name }}
            </a-checkbox>
            <a-select
              v-if="i.selected && !i.noShow"
              class="selected"
              :placeholder="i.description"
              @change="selectProduct(index, $event, i.id,)"
            >
              <a-select-option v-for="d in i.products" :key="d.id" :value="d._id">
                {{ d.name }} <span><b>{{ ' - $'+d.price.value+' Inc. IVA' }}</b></span>
              </a-select-option>
            </a-select>

            <div v-if="i.id === 'delivery' && i.selected">
              <a-col>
                <p v-if="!i.noShow && showAddresss" style="text-align: center">
                  Dirección:
                </p>
              </a-col>
              <a-textarea
                v-if="!i.noShow && showAddresss"
                style="max-width: 700px"
                placeholder="Ingrese la dirección de entrega de su TOKEN."
                :rows="4"
                @input="insertDescription(index, $event, i.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </a-col>
    <a-modal
      v-if="img"
      width="80%"
      centered
      visible
      :footer="null"
      :closable="false"
      @cancel="img = false"
      @ok="img = false"
    >
      <img width="100%" src="https://firmaselectronicas.ec/app-imagenes/Info_PasosRegistro.png">
      <center style="margin-top: 15px">
        <h2>Si desea realizar el proceso dar click en <strong>Iniciar</strong>:</h2>
        <img width="250px" style="cursor: pointer" src="https://firmaselectronicas.ec/app-imagenes/boton_iniciar.jpg" @click="img = false">
        <h2 style="margin: 10px 10px 0 80px">
          Si desea información adicional haga clic sobre las siguientes opciones:
        </h2>
        <a href="https://firmaselectronicas.ec/preguntas-frecuentes/" target="_blank">
          <img width="150px" src="https://firmaselectronicas.ec/app-imagenes/boton_preguntas.jpg">
        </a>
        <a href="https://firmaselectronicas.ec/#requisitos" target="_blank">
          <img width="150px" src="https://firmaselectronicas.ec/app-imagenes/boton_requisitos.jpg">
        </a>
      </center>
    </a-modal>
    <a-modal :centered="true" :closable="false" :visible="visible" title="Importante" @ok="okModal">
      <template slot="footer">
        <a-button key="submit" type="primary" @click="okModal">
          Entendido
        </a-button>
      </template>
      <p style="text-align: justify">
        <!-- Estimado cliente de acuerdo a la gran demanda
        de certificados, indicamos que desde la recepción de su solicitud
        tenemos una demora de entrega de <strong>3 dias laborables</strong>, si desea
        ejecutar el proceso con esta demora por favor continuar con los pasos.
        <br> -->
        Estimado(a) cliente le informamos que el uso de este aplicativo es <strong>24h/7d</strong> y la gestión de las solicitudes ingresadas es en el horario de 9:00 am a 17:00 pm en dias laborables (Lunes a Viernes).
      </p>
      <!--<p>Informamos que la atención al cliente y gestión de solicitudes este 12 de Agosto será de la siguiente forma: </p>
        <ul>
          <li>Viernes 12 - Feriado Nacional, No habrá gestión de solicitudes y atención al cliente.</li>
          <li>Las solicitudes que ingresen en el horario de no atención y gestión serán tramitadas paulatinamente el día lunes 15 de agosto de 2022.</li>
        </ul>-->
      <p />
      <p>
        Atentamente<br>
        Firmas Electrónicas - ANF AC
      </p>
    </a-modal>
    <div class="boot">
      <a-button
        size="large"
        @click="$emit('prev')"
      >
        Regresar
      </a-button>
      <a-button
        :disabled="!(certData.certType && certData.type && certData.duration)"
        type="primary"
        size="large"
        @click="save"
      >
        Continuar
      </a-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'WelcomeCom',
  props: {
    data: { type: Object, required: true }
  },
  data () {
    return {
      visible: true,
      total: {},
      certData: {
        type: 'file'
      },
      noShow: false,
      flagCategories: true,
      categories: [],
      selectedProduct: [],
      products: [],
      adressDelivery: '',
      img: false,
      newTotals: [],
      showAddresss: false
    }
  },
  head () {
    return {
      title: 'Firmaselectronicas.ec'
    }
  },
  computed: {
    showDelivery () {
      return true
    },
    flagDesc () {
      return this.products.length > 0
    }
  },
  created () {
    this.$store.commit('userSendData/clearSelectProducts')
    if (this.$store.state.userSendData.certData && this.$store.state.userSendData.certData.total) {
      // this.certData = JSON.parse(JSON.stringify(this.$store.state.userSendData.certData))
      this.products = []
      this.total = JSON.parse(JSON.stringify(this.$store.state.userSendData.certData.total))
    }
    this.getOptions()
  },
  methods: {
    save () {
      this.certData.products = this.clearUndefined(this.products)
      let yesToken = false
      for (const i of this.selectedProduct) {
        if (i && i.id === 'usbToken') {
          yesToken = true
        }
      }
      const noUSB = this.selectedProduct.filter(e => e.id !== 'usbToken')
      if (noUSB.length === 0 && this.certData.products.length > 0) {
        this.$error({
          title: 'Ha ocurrido un error',
          content: 'Seleccione una forma de entrega',
          okText: 'Aceptar'
        })
        return
      }
      if (yesToken) {
        for (const i of this.selectedProduct.filter(e => e.id !== 'usbToken')) {
          if (i && (i.id !== 'presential' && !i.description)) {
            this.$error({
              title: 'Ha ocurrido un error',
              content: 'Ingrese su dirección de entrega del token',
              okText: 'Aceptar'
            })
            return
          }
        }
      }
      this.$emit('loadUser')
      this.$store.commit('navigation/next')
      this.$store.commit('userSendData/addCertInfo', this.certData)
      this.$store.commit('userSendData/addSelectProducts', this.clearUndefined(this.selectedProduct))
    },
    activeCategorie (index, event, i) {
      this.flagCategories = false
      this.categories[index].selected = event.checked
      this.flagCategories = true
      if (!event.checked) {
        delete this.products[index]
        delete this.selectedProduct[index]
      }
      if (!event.checked && i.id === 'container') {
        const i = this.selectedProduct.map(e => e.categorie).indexOf('Entrega del certificado')
        delete this.products[i]
        delete this.selectedProduct[i]
        this.categories.forEach((e) => {
          if (e.id === 'delivery') {
            e.noShow = true
          }
        })
      }
    },
    selectProduct (index, e, id) {
      this.flagCategories = false
      let price = ''
      for (const i of this.categories) {
        for (const j of i.products) {
          if (j._id === e) {
            price = j.price._id
            this.selectedProduct[index] = j
            this.selectedProduct[index].categorie = i.name
            this.selectedProduct[index].description = ''
            if (j.id !== 'presential') {
              this.showAddresss = true
            } else {
              this.showAddresss = false
            }
            if (j.id === 'usbToken') {
              this.categories.forEach((e) => {
                if (e.id === 'delivery') {
                  e.noShow = false
                }
              })
            }
          }
        }
      }

      if (id === 'delivery') {
        this.products[index] = {
          id: e,
          description: '',
          price
        }
      } else {
        this.products[index] = {
          id: e,
          price
        }
      }
      this.flagCategories = true
    },
    insertDescription (index, e, id) {
      if (id === 'delivery') {
        this.products[index].description = e.target.value
        this.selectedProduct[index].description = e.target.value
      }
    },
    async newCalc () {
      this.newTotals = []

      try {
        if (this.certData.type && this.certData.certType) {
          const resp = await this.$axios.$get(`/api/anf-requests/user/valid-price?typeCert=${this.certData.type}&typeSubject=${this.certData.certType}`)
          for (const i of resp) {
            if (i) {
              this.newTotals.push(i)
            }
          }
        }
        delete this.certData.duration
        this.selectedProduct = []
        this.products = []
        for (const i of this.categories) {
          i.selected = false
        }
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      }
    },
    okModal () {
      this.visible = false
      this.img = true
    },
    totales (value) {
      this.certData.total = value
    },
    openNotificationWithIcon () {
      this.$warning({
        title: 'Importante',
        content: (
          <img src="~/assets/imgs/mod.png" />
        )
      })
    },
    async selectPrice (duration) {
      try {
        const endpoint = `/api/anf-requests/user/valid-price?typeCert=${this.certData.type}&duration=${duration}&typeSubject=${this.certData.certType}`
        const resp = await this.$axios.$get(endpoint)
        this.total = resp
        this.certData.total = this.total
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      }
    },
    clearUndefined (array) {
      const productsReal = []
      for (const i of array) {
        if (i !== undefined) {
          productsReal.push(i)
        }
      }
      return productsReal
    },

    async getOptions () {
      try {
        this.categories = await this.$axios.$get('/api/anf-requests/user/categories-with-products')
        this.categories.forEach((e) => {
          if (e.id === 'delivery') {
            e.noShow = true
          }
        })
        this.categories.sort()
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      }
    }
  }
}
</script>

<style>

.cuadro {
  text-align: center;
  margin-bottom:20px;
  margin-right:15px;
  margin-left:15px;
}
.cuadro h3 {
  text-align:left;
  padding: 5px 5px 5px 5px;
}
.cuadro .selected{
  width: 50%;
  padding: 10px 10px 10px 10px;
}
.cuadro .boot button{
  margin: 20px 0px 0px 0px;
}

.resp {
  width: 25%;
  height: auto;
}

@media screen and (max-width: 768px){
  .resp {
    min-width: 200px;
    width: 50%;
    height: auto;
  }
  .cuadro .selected{
  width: 100%;
  padding: 10px 10px 10px 10px;
}
.cuadro {
  min-height: 600px;
}
}
</style>
