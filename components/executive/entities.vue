<template>
  <div class="modal">
    <a-modal
      visible
      title="Asignación de operadores"
      @cancel="closeThis"
    >
      <template slot="footer">
        <a-button key="back" @click="closeThis">
          Cerrar
        </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="isLoading"
          :disabled="!id"
          @click="sendEntitie"
        >
          Guardar
        </a-button>
      </template>
      <h3>Ingrese el operador que desea asignar:</h3>
      <!-- <a-select
        :value="value"
        show-search
        :filter-option="false"
        :show-arrow="false"
        placeholder="Ingrese el numero de cedula del cliente"
        style="width: 100%;"
        @search="handleSearch"
        @change="handleChange"
      >
        <a-select-option
          v-for="opt in dataSource"
          :key="opt._id"
          :value="opt._id"
        >
          <span class="certain-search-item-count">{{ opt.name }}</span>
        </a-select-option>
        <input />
      </a-select> -->
      <a-auto-complete
        option-label-prop="text"
        style="width: 100%"
        placeholder="Ingrese el patron de búsqueda"
        @search="handleSearch"
        @select="handleSelect"
      >
        <a-spin v-if="loading" slot="notFoundContent" size="small" />
        <template slot="dataSource">
          <a-select-option v-for="x in dataSource" :key="x._id" :text="x.name" :value="x._id">
            {{ x.name }}
          </a-select-option>
        </template>
        <a-input>
          <a-icon slot="suffix" type="search" class="certain-category-icon" />
        </a-input>
      </a-auto-complete>
      <div v-if="name" style="margin-top: 5px">
        <h3>Operador selccionado</h3>
        <p style="margin-left: 5px">
          {{ name }}
        </p>
      </div>
    </a-modal>
  </div>
</template>

<script>
import debounce from 'debounce'

export default {
  props: {
    data: { type: String, required: true },
    requests: { type: Array, required: false, default: () => [] }
  },
  data () {
    return {
      entitie: undefined,
      loading: false,
      id: undefined,
      value: undefined,
      dataSource: [],
      isLoading: false,
      name: ''
    }
  },
  methods: {
    async sendEntitie () {
      this.entitie = {
        request: this.data,
        operator: this.id
      }
      this.isLoading = true
      try {
        if (this.requests.length > 0) {
          const resume = await this.$axios.$post('/api/executives/anf/assigned-operators', {
            requests: this.requests,
            operator: this.id
          })
          if (resume.requestsFail.length > 0) {
            this.$message.error(`No se pudo asignar el operador a ${resume.requestsFail.length} solicitudes`)
            this.$emit('loadFailed', resume.requestsFail)
          }
          this.$emit('closeReport')
        } else {
          await this.$axios.$post('/api/anf-requests/assigned-operator', this.entitie)
          this.$message.success('Se asignó correctamente')
          this.$emit('closeReport')
          this.$emit('loadFailed')
        }
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Ha ocurrido un error',
          content: message,
          okText: 'Aceptar'
        })
      } finally {
        this.isLoading = false
      }
    },
    handleSelect (value) {
      this.id = value
      const select = this.dataSource.find(i => i._id === value)
      this.name = select.name
    },
    handleSearch: debounce(async function (value) {
      let id = value
      const params = {
        params: {
          $fields: 'name',
          $q: id,
          $limit: 3
        }
      }
      if (!value || value === ' ') {
        id = undefined
        this.value = undefined
        this.id = undefined
        this.dataSource = []
      }
      if (id) {
        try {
          const resp = await this.$axios.$get('/api/executives/operators', params)
          this.dataSource = resp.data
          this.loading = false
        } catch (err) {
          const message = err.response ? err.response.data.message : err.message
          this.$error({
            title: 'Ha ocurrido un error',
            content: message,
            okText: 'Aceptar'
          })
        } finally {
          this.loading = false
        }
      } else {
        this.dataSource = []
      }
    }, 300),
    closeThis () {
      this.$emit('closeReport')
    }
  }
}
</script>

<style scoped>
.modals {
  height: 350px;
}
.ant-modal-body h3{
  padding: 5px;
}
.ant-checkbox-wrapper{
  padding: 10px;
}
</style>
