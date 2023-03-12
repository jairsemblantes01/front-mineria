<template>
  <div style="text-align: left">
    <h1>
      Debemos verificar que eres quien dices ser.
    </h1>
    <div>
      <p>
        Toda persona natural o juridica (representante legal o apoderado) debe demostrar su identidad a través de una fotografía en la cual se aprecie claramente su rostro
        junto a su documento de identificación (cédula o pasaporte). Con este procedimiento se verifica que la persona que realizó la solicitud es dueña y titular de los documentos
        suministrados, evitando asi una posible suplantación de identidad.<br>
      </p>
      <h3>
        Características de la fotografía de rostro y documento de identificación:
      </h3>
      <ul>
        <li>
          Sostener el documento de identificación junto a su rostro según lo muestra la fotografía de ejemplo.
        </li>
        <li>Tomar la fotografia en una habitación con suficiente luz.</li>
        <li>No utilizar flash ya que puede generar reflejo en su documento de identificación.</li>
        <li>
          Seleccionar de su dispositivo la foto de mayor claridad de su rostro y documento de identificación.
        </li>
        <li>
          Ni su rostro ni su documento de identificación puede estar cubierto o censurado en la imagen.
        </li>
        <li>
          Formatos aceptados JPG, JPGE, PNG y archivos PDF.
        </li>
      </ul>
      <p>
        Si la foto no cumple con las características anteriormente indicadas le solicitaremos una nueva fotografía.
      </p>
      <a-row>
        <a-col :md="12" :lg="12" :xs="24">
          <div align="center">
            <h2>Ejemplo de fotografía</h2>
            <img
              src="~/assets/imgs/cedula-info.jpeg"
              width="350px"
            >
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img width="100%" :src="compareImage">
            </a-modal>
          </div>
        </a-col>
        <a-col :md="12" :lg="12" :xs="24">
          <div>
            <h2>Fotografía cargada (máximo 2MB)</h2>
            <a-col v-if="compareImage" :span="24">
              <div align="left">
                <a-button icon="delete" @click="handleRemove" />
                <a-button v-if="!isPdf" icon="eye" @click="handlePreview(fileList[0])" />
              </div>
            </a-col>
            <a-upload
              :show-upload-list="false"
              list-type="picture-card"
              accept=".jpg, .png, .pdf"
              :file-list="fileList"
              :before-upload="
                file => beforeUploads(file)
              "
              :remove="file => handleRemove(file)"
              @preview="handlePreview"
            >
              <div :style="isPdf && compareImage ? 'width: 400px; height: 25px' : 'width: 350px; height: 350px' ">
                <center>
                  <img
                    v-if="!isPdf && compareImage"
                    id="compare"
                    :src="compareImage"
                    style="margin: 15px 0 15px 0; max-width:500px"
                    width="350"
                    height="320"
                  >
                  <div style="width: 100%">
                    Hacer click aqui para subir la fotografía
                  </div>
                  <img v-if="fileList.length === 0" src="https://www.firmaselectronicas.ec/app-imagenes/Upload.png" style="margin: 30px 0 30px 0; max-width:200px" width="100%">

                  <p v-if="fileList.length === 0">
                    <strong>Aun no has seleccionado ninguna imagen</strong>
                  </p>
                </center>
              </div>
            </a-upload>
            <object v-if="isPdf && compareImage" :data="compareImage" style="margin-top: 25px" width="100%" height="500px" />
          </div>
        </a-col>
      </a-row>
    </div>
    <div align="center" style="margin-top: 30px">
      <a-popconfirm
        title="¿Esta seguro que desea retroceder?"
        cancel-text="Cancelar"
        @confirm="$store.commit('navigation/prev')"
      >
        <a-button>
          Regresar
        </a-button>
      </a-popconfirm>
      <a-button
        type="primary"
        :disabled="fileList.length < 1"
        @click="goToPayment"
      >
        Continuar
      </a-button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isPdf: false,
      previewVisible: false,
      previewImage: '',
      base64: {
        id: 6,
        document: null
      },
      fileList: [],
      compareImage: null
    }
  },
  head () {
    return {
      title: 'Firmaselectronicas.ec'
    }
  },
  methods: {
    goToPayment () {
      const data = JSON.parse(JSON.stringify(this.base64))
      this.$store.commit('userSendData/addPhoto', data)
      this.$store.commit('navigation/next')
    },
    async toBase64 (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      const result = await new Promise((resolve, reject) => {
        reader.onload = function (event) {
          resolve(reader.result.replace('data:', '').replace(/^.+,/, ''))
        }
      })
      return result
    },
    async beforeUploads (file) {
      if (file.size < 2000000) {
        if (file.type === 'application/pdf') {
          this.isPdf = true
          this.compareImage = URL.createObjectURL(file)
          this.base64.document = await this.toBase64(file)
          if (this.fileList[0]) {
            this.fileList[0] = file
          } else {
            this.fileList.push(file)
          }
        } else if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
          this.compareImage = URL.createObjectURL(file)
          this.base64.document = await this.toBase64(file)
          this.isPdf = false
          if (this.fileList[0]) {
            this.fileList[0] = file
          } else {
            this.fileList.push(file)
          }
        } else {
          this.fileList = []
          this.$error({
            title: 'Error en el formato de archivo',
            content: 'El archivo que desea agregar no esta en el formato aceptado (Imagen o Pdf)',
            okText: 'Aceptar'
          })
        }
      } else {
        this.$error({
          title: 'Tamaño maximo exedido',
          content: (
            <div>
              <p>El archivo que desea agregar supera el tamaño maximo de 2MB</p>
              <p>Si desea comprimir su imagen presione click en el siguiente link:<a href="https://compressnow.com/es/" target="_blank"> Compressnow.com </a></p>
            </div>
          ),
          okText: 'Aceptar'
        })
      }
    },
    handleRemove () {
      this.compareImage = null
      this.fileList = []
      this.isPdf = false
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.fileList = fileList
    }
  }
}
</script>

<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
