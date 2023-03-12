<template>
  <div>
    <a-row style="margin-bottom: 0.7em;">
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <h1 class="mb-4 text-3xl leading-tight font-bold tracking-tighter">
          Usuarios
        </h1>
        <h1>Total: {{ pagination ? pagination.total : '' }}</h1>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="flex md:space-between">
          <div class="flex md:w-1/3 justify-end mr-2">
            <div>
              <a-button
                type="primary"
                @click="addUser = true"
              >
                Insertar
              </a-button>
            </div>
          </div>
          <div class="md:w-2/3">
            <a-input
              v-model="filter"
              placeholder="Ingrese el patrón de búsqueda"
              enter-button
              @change="$emit('search', filter)"
            >
              <a-icon slot="prefix" type="search" />
            </a-input>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-table
      :columns="columns"
      :data-source="data"
      :row-key="record => record.id"
      :pagination="pagination"
      :loading="isLoadingTable"
      :locale="localeTable"
      bordered
      @change="changeTable"
    >
      <template slot="date" slot-scope="record">
        <a-tag color="blue">
          {{ getDateWithHour(record) }}
        </a-tag>
      </template>
      <template slot="action" slot-scope="record">
        <a-button-group>
          <a-tooltip placement="top">
            <template slot="title">
              <span>Registrar</span>
            </template>
            <a-button
              size="small"
              type="primary"
              icon="eye"
              :loading="isLoading"
              @click="aprender(record)"
            />
          </a-tooltip>
          <a-tooltip placement="top">
            <template slot="title">
              <span>Editar</span>
            </template>
            <a-button
              size="small"
              icon="edit"
              :loading="isLoading"
              @click="editUserFunc(record)"
            />
          </a-tooltip>
        </a-button-group>
      </template>
      <template slot="procesado" slot-scope="record">
        <a-tag
          v-if="record"
          color="green"
        >
          Procesado
        </a-tag>
        <a-tag
          v-else
          color="red"
        >
          No Procesado
        </a-tag>
      </template>
    </a-table>

    <a-modal
      v-model="addUser"
      title="Ingrese un nuevo usuario"
      :width="650"
      @cancel="() => {
        addUser = false
        this.form = {}
        this.id = ''
      }"
    >
      <template slot="footer">
        <a-form-model-item>
          <a-button
            key="back"
            @click="() => {
              addUser = false
              this.form = {}
              this.id = ''
            }"
          >
            Cancelar
          </a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="isLoading"
            @click="id ? editar() : onSubmit()"
          >
            Guardar
          </a-button>
        </a-form-model-item>
      </template>
      <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
      >
        <div class="grid gap-6 w-full md:grid-cols-2">
          <a-form-model-item ref="nombre" label="Nombre" prop="nombre">
            <a-input
              v-model="form.nombre"
              placeholder="Ingrese el nombre del usuario"
            />
          </a-form-model-item>

          <a-form-model-item ref="id" label="Identificacion" prop="identificacion">
            <a-input
              v-model="form.identificacion"
              placeholder="Ingrese el id del usuario"
            />
          </a-form-model-item>
          <a-form-model-item ref="correo" label="Correo Electronico" prop="correo">
            <a-input
              v-model="form.correo"
              placeholder="Ingrese el correo del usuario"
            />
          </a-form-model-item>
          <a-form-model-item ref="telefono" label="Teléfono" prop="telefono">
            <a-input-number
              v-model="form.telefono"
              style="width: 100%"
              placeholder="Ingrese Teléfono del operador"
            />
          </a-form-model-item>
          <a-form-model-item ref="entrada" label="Hora entrada" prop="entrada">
            <a-date-picker placeholder="Hora de entrada" v-model="form.entrada" />
          </a-form-model-item>
          <a-form-model-item ref="salida" label="Hora salida" prop="salida">
            <a-date-picker placeholder="Hora de salida" v-model="form.salida" />
          </a-form-model-item>
          <a-form-model-item v-if="!id" label="Firma electrónica" prop="firma">
            <div class="dropbox">
              <a-upload-dragger
                nombre="files"
                accept=".pfx, .p12"
                :before-upload="file => loadSign(file)"
              >
                <p class="ant-upload-drag-icon">
                  <a-icon type="file-zip" />
                </p>
                <p class="ant-upload-text">
                  De click o arrastre la firma del usuario
                </p>
                <p class="ant-upload-hint">
                  Unicamente archivos PFX o P12
                </p>
              </a-upload-dragger>
            </div>
          </a-form-model-item>
          <a-form-model-item v-if="!id" label="Video" prop="video">
            <div class="dropbox">
              <a-upload-dragger
                nombre="files"
                accept=".mp4"
                :before-upload="file => loadVideo(file)"
              >
                <p class="ant-upload-drag-icon">
                  <a-icon type="inbox" />
                </p>
                <p class="ant-upload-text">
                  De click o arrastre el video del usuario
                </p>
                <p class="ant-upload-hint">
                  Unicamente archivos mp4
                </p>
              </a-upload-dragger>
            </div>
          </a-form-model-item>
        </div>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import Main from '~/assets/mixin-tables'

export default {
  mixins: [Main],
  layout: 'executive',
  data () {
    const validateEcorreo = (rule, value, callback) => {
      const expresion = (/([\w\.]+)@([\w\.]+)\.(\w+)/g)
      if (!expresion.test(value)) {
        // eslint-disable-next-line n/no-callback-literal
        callback(new Error('El correo ingresado es incorrecto'))
      } else {
        callback()
      }
    }
    return {
      addUser: false,
      loadingReset: false,
      endpoint: '/api/',
      params: {
        $fields: 'personalData',
        type: 'anf'
      },
      rules: {
        nombre: [
          { required: true, message: 'El campo de nombre es obligatorio', trigger: 'blur' }
        ],
        telefono: [
          { required: true, message: 'El campo de teléfono es obligatorio', trigger: 'blur' }
        ],
        address: [
          { required: true, message: 'El campo de dirección es obligatorio', trigger: 'blur' }
        ],
        correo: [
          { required: true, message: 'El campo de correo electrónico es obligatorio', trigger: 'blur' }, { validator: validateEcorreo }
        ],
        id: [
          { required: true, message: 'El campo de identificación es obligatorio', trigger: 'blur' },
        ],
        firma: [
          { required: true, message: 'El campo de firma es obligatorio', trigger: 'blur' }
        ],
        video: [
          { required: true, message: 'El campo de video es obligatorio', trigger: 'blur' }
        ],
        entrada: [
          { required: true, message: 'El campo de hora de entrada es obligatorio', trigger: 'blur' }
        ],
        salida: [
          { required: true, message: 'El campo de hora de salida es obligatorio', trigger: 'blur' }
        ]
      },
      form: {},
      isLoading: false,
      couponData: null,
      id: undefined,
      showModalReport: false,
      showModal: false
    }
  },
  head () {
    return {
      title: 'Usuarios'
    }
  },
  computed: {
    columns () {
      const columns = [
        {
          title: 'Nombre',
          key: 'nombre',
          dataIndex: 'nombre',
          scopedSlots: { customRender: 'nombres' },
        },
        {
          title: 'Identificación',
          key: 'identificacion',
          dataIndex: 'identificacion'
        },
        {
          title: 'Correo',
          key: 'correo',
          dataIndex: 'correo'
        },
        {
          title: 'Teléfono',
          key: 'telefono',
          dataIndex: 'telefono'
        },
        {
          title: 'Estado',
          dataIndex: 'aprendido',
          key: 'xs',
          scopedSlots: { customRender: 'procesado' },
          align: 'center'
        },
        {
          title: 'Opciones',
          dataIndex: '',
          key: 'x',
          scopedSlots: { customRender: 'action' },
          align: 'center'
        }
      ]
      return columns
    }
  },
  methods: {
    editUserFunc (record) {
      this.addUser = true
      this.form = record
      this.id = record.id
    },
    async editar () {
      try {
        this.isLoading = true
        await this.$axios.$put('/api/edit-user' + '/' + this.id, this.form)
        this.form = {}
        this.$vs.notification({
          icon: `<i class='bx bxs-bug' ></i>`,
          color: '#69e057',
          position: 'top-center',
          text: 'Se ha editado correctamente'
        })
        this.init()
        this.id = ''
        this.addUser = false
      } catch (error) {
        const message = error.message && error.response.data.message
        this.$vs.notification({
          icon: `<i class='bx bxs-bug' ></i>`,
          color: '#E05757',
          position: 'top-center',
          text: 'Ha ocurrido un error al guardar el usuario'
        })
      } finally {
        this.isLoading = false
      }
    },
    async aprender (record) {
      try {
        this.isLoading = true
        const resp = await this.$axios.$get('/api/aprender' + '/' + record.identificacion)
        this.$vs.notification({
          icon: `<i class='bx bxs-bug' ></i>`,
          color: '#69e057',
          position: 'top-center',
          text: 'Se ha registró correctamente'
        })
        this.init()
      } catch (error) {
        const message = error.message && error.response.data.message
        this.$vs.notification({
          icon: `<i class='bx bxs-bug' ></i>`,
          color: '#E05757',
          position: 'top-center',
          text: 'Ha ocurrido un error al guardar el usuario'
        })
      } finally {
        this.isLoading = false
      }
    },
    onSubmit () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          console.log(this.form)
          this.isLoading = true
          try {
            const resp = await this.$axios.$post('/api/save-user', this.form)
            this.addUser = false
            this.id = ''
            this.form = {}
          } catch (error) {
            const message = error.message && error.response.data.message
            this.$vs.notification({
              icon: `<i class='bx bxs-bug' ></i>`,
              color: '#E05757',
              position: 'top-center',
              text: 'Ha ocurrido un error al guardar el usuario' + message
            })
          } finally {
            this.isLoading = false
          }
        }
      })
    },
    loadSign (file) {
      console.log(file)
      if (file.type === 'application/x-pkcs12' || file.type === 'application/x-pkcs12') {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const base64 = reader.result
          this.form.firma = base64.split(',')[1]
        }
      } else {
        this.$vs.notification({
          icon: `<i class='bx bxs-bug' ></i>`,
          color: '#E05757',
          position: 'top-center',
          text: 'El archivo ingresado no es una imagen'
        })
      }
    },
    loadVideo (file) {
      console.log(file)
      if (file.type === 'video/mp4') {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const base64 = reader.result
          this.form.video = base64.split(',')[1]
        }
      } else {
        this.$vs.notification({
          icon: `<i class='bx bxs-bug' ></i>`,
          color: '#E05757',
          position: 'top-center',
          text: 'El archivo ingresado no es video con formato válido'
        })
      }
    },
  }
}
</script>

<style scoped>

.created {
  width: 15%
}
.search {
  width:100%
}

.outer {
  display: block;
}
.buttons {
  margin-right: 0px;
}
@media screen and (max-width: 768px){
  .created {
    width: 100%
  }
  .search {
    width: 100%
  }
}

</style>
