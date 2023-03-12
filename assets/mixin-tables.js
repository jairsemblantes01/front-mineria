import debounce from 'debounce'
import moment from 'moment'

const $limit = 10

export default {
  data () {
    const $page = parseInt(this.$route.query.$page) || 1
    const $q = this.$route.query.$q
    return {
      total: null,
      data: [],
      filter: $q,
      certs: [],
      options: [],
      optionsObject: {},
      states: [],
      persons: [],
      isLoadingTable: false,
      params: { $q, $page, $limit },
      pagination: {
        total: 0,
        defaultPageSize: $limit,
        defaultCurrent: $page,
        actual: $page
      },
      localeTable: {
        filterConfirm: 'Aceptar',
        filterReset: 'Limpiar',
        emptyText: 'No existen registros',
      },
      noOptions: ['executive-renovations-clients', 'executive-convenios-clients',
        'executive-convenios-clients-removed', 'fedotaxi-help-request',
        'convenio-help-request', 'help-request', 'executive-clients', 'executive-webanfcredentials'
      ],
      manualPagination: ['fedotaxi-help-request', 'convenio-help-request', 'help-request']
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    pagination: {
      handler () {
        if (this.manualPagination.includes(this.$route.name)) {
          const pagination = { ...this.pagination }
          pagination.current = this.pagination.actual
          this.changeTable(pagination, [])
        }
      },
      deep: true,
    },
  },
  computed: {
    totalPages () {
      const a = this.pagination.total
      const b = $limit
      const res = a % b
      const total = (a / b)
      if (res !== 0) {
        return parseInt(total + 1)
      }
      return total
    },
  },
  methods: {
    async loadTotal () {
      try {
        const { headers } = await this.$axios.head(this.endpoint)
        this.total = parseInt(headers['x-total-count'])
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
    doFilter: debounce(function (e) {
      this.params.$q = this.filter !== '' ? this.filter : undefined
      const query = { ...this.$router.query, $q: this.params.$q }
      this.params.$page = 1
      if (this.params.$q === undefined) { delete query.$q }
      this.$router.push({ query }, this.init)
    }, 300),
    changeTable (pagination, filters) {
      const query = { ...this.$route.query }
      const page = pagination.current
      if (page !== this.params.page) {
        query.$page = page
        if (query.$page === 1) { delete query.$page }
        this.params.$page = page
      }
      for (const key in filters) {
        const filter = filters[key].join(',')
        if (filter) {
          this.params[key] = query[key] = filter
        } else {
          delete query[key]
          delete this.params[key]
        }
      }
      this.$router.push({ query }, this.init)
    },
    getStates () {
      let text = ''
      let value = ''
      for (const x in this.options) {
        value = this.options[x].id.toString()
        text = this.options[x].description
        this.states[x] = ({
          value,
          text
        })
      }
    },
    getDescription (element, type) {
      return (this.options[type] && this.options[type].find(e => e.id === element) && this.options[type].find(e => e.id === element).description) || ''
    },
    getDate (id) {
      return moment(id).format('DD/MM/YYYY HH:mm:ss')
    },
    getDateWithHour (date) {
      return moment(date).format('DD-MM-YYYY hh:mm:ss')
    },
    getTypeOptions (type, id) {
      return (this.options[type] && this.options[type].find(x => x.id === id)) || { id: '', description: '' }
    },
    getName (form) {
      return form.subject
        ? this.$store.state.session.ClientData && !this.$store.state.session.ClientData.type
          ? `${form.subject.name1} ${form.subject.name2} ${form.subject.surName1}
        ${form.subject.name2}`
          : `${form.subject.name1} ${form.subject.name2} ${form.subject.surName1}
        ${form.subject.name2}`
        : ''
    },
    async init () {
      try {
        this.isLoadingTable = true
        const resp = await this.$axios.$get(this.endpoint, {
          params: this.params
        })
        this.data = resp.data
        if (resp.options) {
          this.options = resp.options
          this.states = await this.options.TypesStatus && this.options.TypesStatus.map(x => { return { value: x.id.toString(), text: x.description } })
        }
        this.pagination.total = resp.total
        this.total = this.pagination.total
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Error al cargar los datos',
          content: message || 'No se pudo recibir los datos'
        })
      } finally {
        this.isLoadingTable = false
      }
    }
  }
}
