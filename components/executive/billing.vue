<template>
  <a-modal visible :centered="true" width="800px" @cancel="closeThis">
    <a-row :gutter="16">
      <a-col
        v-if="data.type === 'edit'"
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
      >
        <div v-if="data">
          <a-form-model ref="ruleForm" :model="form" :rules="validations">
            <div class="line">
              <h3 class="element">
                Datos Facturación
              </h3>
              <div v-if="data.type === 'edit' && data.billing && !data.billing.billing" class="element">
                <a-switch v-model="edit" style="margin: 5px">
                  <a-icon slot="checkedChildren" type="check" />
                  <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
              </div>
            </div>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <a-form-model-item label="Tipo identificación" required prop="idType">
                <a-select
                  v-model="form.idType"
                  class="select"
                  :disabled="!edit"
                  placeholder="Seleccione su tipo de identificación"
                >
                  <a-select-option
                    v-for="d in data.options"
                    :key="d.id"
                    :value="d.id"
                  >
                    {{ d.description }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <a-form-model-item label="Identificación" required prop="id" has-feedback>
                <a-input
                  v-model="form.id"
                  :disabled="!edit"
                  placeholder="Ingrese la identificacion"
                />
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <a-form-model-item label="Nombre y apellido" required prop="name" has-feedback>
                <a-input
                  v-model="form.name"
                  type="text"
                  :disabled="!edit"
                  placeholder="Ingrese el nombre y apellido"
                />
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <a-form-model-item label="Ciudad" required prop="city" has-feedback>
                <a-input
                  v-model="form.city"
                  :disabled="!edit"
                  placeholder="Ingrese la ciudad"
                />
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <a-form-model-item label="Dirección" required prop="address" has-feedback>
                <a-input
                  v-model="form.address"
                  :disabled="!edit"
                  placeholder="Ingrese la direccion"
                />
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <a-form-model-item label="E-mail" required prop="email" has-feedback>
                <a-input
                  v-model="form.email"
                  :disabled="!edit"
                  placeholder="Ingrese el E-mail"
                />
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <a-form-model-item label="E-mail opcional" prop="optionalEmail" has-feedback>
                <a-input
                  v-model="form.optionalEmail"
                  :disabled="!edit"
                  placeholder="Ingrese un E-mail opcional"
                />
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <a-form-model-item label="Teléfono" required prop="phone" has-feedback>
                <a-input
                  v-model="form.phone"
                  :disabled="!edit"
                  placeholder="Ingrese el teléfono convencional"
                />
              </a-form-model-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <a-form-model-item label="Celular" required prop="cellphone" has-feedback>
                <a-input
                  v-model="form.cellphone"
                  :disabled="!edit"
                  placeholder="Ingrese el numero de celular"
                />
              </a-form-model-item>
            </a-col>
          </a-form-model>
        </div>
        <div v-else style="margin: 15px">
          <a-divider orientation="left">
            <h3 align="left">
              Datos Facturación
            </h3>
          </a-divider>
          <p>
            Este certificado se facturará con los <strong>mismos</strong> datos
            personales ingresados.
          </p>
        </div>
      </a-col>
      <a-col
        v-else
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
      >
        <a-divider orientation="left">
          <h3 align="left">
            Listado Errores
          </h3>
        </a-divider>
        <a-list item-layout="horizontal" :data-source="data.billing.errs">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta>
              <h4 slot="title" style="color: red;">
                {{ item.code }}
              </h4>
              <template slot="description" style="color: red;">
                <p><strong>Mensaje:</strong> {{ item.message }}</p>
                <p><strong>Fecha:</strong> {{ item.date }}</p>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
    <template slot="footer">
      <a-button key="back" @click="closeThis">
        Cerrar
      </a-button>
      <a-button
        v-if="data.type === 'edit' && data.billing && !data.billing.billing"
        key="submit"
        :disabled="!edit"
        :loading="isLoading"
        type="primary"
        @click="sendEditBilling"
      >
        Editar
      </a-button>
    </template>
  </a-modal>
</template>

<script>

export default {
  props: {
    data: { type: Object, required: true }
  },
  data () {
    return {
      edit: false,
      validations: {
        idType: [
          {
            required: true, message: 'Seleccione la identificación ', trigger: 'blur'
          }
        ],
        id: [
          { required: true, message: 'Ingrese el id ', trigger: 'blur' }
        ],
        name: [
          { required: true, message: 'Ingrese el nombre y apellido' }
        ],
        phone: [
          { required: true, message: 'Ingrese el teléfono' }
        ],
        email: [
          { required: true, message: 'Ingrese el E-mail' }
        ],
        address: [
          { required: true, message: 'Ingrese la dirección' }
        ],
        cellphone: [
          { required: true, message: 'Ingrese el teléfono de su empresa' }
        ],
        optionalEmail: [
          { required: false, message: 'Ingrese el E-mail opcional' }
        ],
        city: [
          { required: true, message: 'Ingrese la ciudad' }
        ]
      },
      description: undefined,
      isLoading: false,
      options: undefined,
      id: undefined,
      form: {
        idType: '',
        id: '',
        name: '',
        phone: '',
        email: '',
        address: '',
        cellphone: '',
        optionalEmail: '',
        city: ''
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm()
  },
  mounted () {
    if (this.data.billing.withSubject && this.data.type === 'edit') {
      this.form.idType = this.data.subject.type === 'ci' ? '05' : (this.data.subject.type === 'ruc' ? '04' : '06')
      this.form.id = this.data.subject.id
      this.form.name = this.data.subject.name1 + ' ' + this.data.subject.surName1
      this.form.phone = this.data.subject.telphone ? this.data.subject.telphone : this.data.subject.cellphone
      this.form.email = this.data.subject.mail
      this.form.address = this.data.subject.address
      this.form.cellphone = this.data.subject.cellphone
      this.form.city = this.data.subject.city
    } else {
      this.form.idType = this.data.billing.idType
      this.form.id = this.data.billing.id
      this.form.name = this.data.billing.name
      this.form.phone = this.data.billing.phone
      this.form.email = this.data.billing.email
      this.form.address = this.data.billing.address
      this.form.cellphone = this.data.billing.cellphone
      this.form.optionalEmail = this.data.billing.mail
      this.form.city = this.data.billing.city
    }
  },
  methods: {
    closeThis () {
      this.$emit('closeBilling')
    },
    sendEditBilling () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          try {
            this.isLoading = true
            await this.$axios.$post(`/api/executives/anf/edit-info-billing/${this.data._id}`, this.form)
            this.$message.success('Se editó correctamente la informacion de facturación')
          } catch (err) {
            const message = err.response ? err.response.data.message : err.message
            this.$error({
              title: 'Ha ocurrido un error',
              content: message,
              okText: 'Aceptar'
            })
          } finally {
            this.isLoading = false
            this.$emit('reload')
            this.closeThis()
          }
        } else {
          this.$message.error('Corrija los datos del formulario para continuar')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.border {
  border-right: 1px solid #e8e8e8;
  background: slateblue;
}
.element{
  display: inline-block;
  width: auto;
}
</style>
