
const Administrator = {
  endpoint: '/api/administrators/auth',
  type: 'Administrator'
}

const Executive = {
  endpoint: '/api/executives/auth',
  type: 'Executive'
}

const Client = {
  endpoint: '/api/clients/auth?simple=true',
  type: 'Client'
}

const ClientPro = {
  endpoint: '/api/clients/auth',
  type: 'ClientPro'
}

const Banks = {
  endpoint: '/api/auth',
  type: 'Banks'
}

const Cookies = {
  Banks: 'p45zf1',
  Executive: 'M42s9',
  Administrator: 'Ad23ds',
  Client: 'i2d12k',
  ClientPro: 'nbvc2d',
  Path: 'plkf3',
}

export const state = () => ({
  BanksToken: undefined,
  BanksData: undefined,
  ExecutiveToken: undefined,
  ExecutiveData: undefined,
  ClientToken: undefined,
  ClientData: undefined,
  AdministratorToken: undefined,
  AdministratorData: undefined,
  path: undefined
})

export const getters = {
  getPermissions:
  state => (module, submodule, permission) => {
    if (state.ExecutiveData.administrator) {
      return true
    }
    const currentModule = state.ExecutiveData.modules?.find(
      item => item.key === `/${module || ''}`
    )
    if (!currentModule) {
      return false
    }

    if (currentModule.permissions && currentModule.permissions.length > 0) {
      return currentModule.permissions?.includes(permission)
    }

    const currentSubmodule = currentModule.children?.find(x => x.key === `/${module}${submodule ? `/${submodule}` : ''}`)
    if (!currentSubmodule) {
      return false
    }
    return currentSubmodule.permissions?.includes(permission)
  },
}

export const mutations = {
  setPath (state, data) {
    state.path = data
    this.$cookies.set(Cookies.Path, data)
  },
  setToken (state, { type, token }) {
    if (type === 'ClientPro') { type = 'Client' }
    this.$axios.setToken(token)
    state[`${type}Token`] = token
  },
  setData (state, { type, data }) {
    if (type === 'ClientPro') { type = 'Client' }
    state[`${type}Data`] = data
  }
}

export const actions = {
  checkToken ({ commit }, { type }) {
    if (!state[`${type}Token`]) {
      const token = this.$cookies.get(Cookies[type])
      if (!token) { return false }
      commit('setToken', { type, token })
    }
    return true
  },
  checkAdmin (state) {
    return state.state.ExecutiveData && state.state.ExecutiveData.administrator
  },
  async loadData ({ commit }, { endpoint, type }) {
    try {
      const data = await this.$axios.$get(endpoint)
      if (type === 'Executive') {
        const theme = data.theme
          ? data.theme
          : {
            primaryColor: '#254394',
            primaryColor2: '#2F4D98',
            primaryColor3: '#4B69A4',
            secondaryColor: '#BBDBD1'
          }

        console.log('tema del getLoad data', data)
        commit('theme/setTheme', theme, { root: true })
      }
      delete data.theme
      commit('setData', { type, data })
      return true
    } catch (error) {
      commit('setToken', { type })
      commit('setData', { type })
      return false
    }
  },
  async login ({ commit }, { endpoint, type, data }) {
    const token = await this.$axios.$post(endpoint, data)
    // const options = { maxAge: 60 * 60 * 24 * 7 }
    this.$cookies.set(Cookies[type], token)
    commit('setToken', { type, token })
  },
  logout ({ commit }, { type }) {
    commit('setData', { type })
    commit('setToken', { type })
    this.$cookies.remove(Cookies[type])
  },
  // Client
  clientLogin ({ dispatch }, data) {
    const clientChosse = data.internal ? ClientPro : Client
    return dispatch('login', { ...clientChosse, data })
  },
  clientLogout ({ dispatch }) {
    const typeClient = this.$cookies.get(Cookies.ClientPro) ? ClientPro : Client
    return dispatch('logout', { type: typeClient.type })
  },
  loadClientData ({ dispatch }) {
    const typeClient = this.$cookies.get(Cookies.ClientPro) ? ClientPro : Client
    return dispatch('loadData', { ...typeClient })
  },
  async checkClientToken ({ dispatch }) {
    const typeClient = this.$cookies.get(Cookies.ClientPro) ? ClientPro : Client
    let response = await dispatch('checkToken', { type: typeClient.type })
    if (response === true) {
      response = await dispatch('loadClientData')
      return response
    } else {
      return false
    }
  },

  // Administrator
  administratorLogin ({ dispatch }, data) {
    return dispatch('login', { ...Administrator, data })
  },
  administratorLogout ({ dispatch }) {
    return dispatch('logout', { type: 'Administrator' })
  },
  loadAdministratorData ({ dispatch }) {
    return dispatch('loadData', Administrator)
  },
  async checkAdministratorToken ({ dispatch }) {
    let response = await dispatch('checkToken', { type: 'Administrator' })
    if (response === true) {
      response = await dispatch('loadAdministratorData')
      return response
    } else {
      return false
    }
  },

  // banks
  banksLogin ({ dispatch }, data) {
    return dispatch('login', { ...Banks, data })
  },
  banksLogout ({ dispatch }) {
    return dispatch('logout', { type: 'Banks' })
  },
  loadBanksData ({ dispatch }) {
    return dispatch('loadData', Banks)
  },
  checkBanksToken ({ dispatch }) {
    return dispatch('checkToken', { type: 'Banks' })
  },
  // executive
  executiveLogin ({ dispatch }, data) {
    return dispatch('login', { ...Executive, data })
  },
  executiveLogout ({ dispatch }) {
    return dispatch('logout', { type: 'Executive' })
  },
  loadExecutiveData ({ dispatch }) {
    return dispatch('loadData', Executive)
  },
  async checkIsAdmin ({ dispatch }) {
    return await dispatch('checkAdmin')
  },
  async checkExecutiveToken ({ dispatch }) {
    let response = await dispatch('checkToken', { type: 'Executive' })
    if (response === true) {
      response = await dispatch('loadExecutiveData')
      return response
    } else {
      return false
    }
  },
  async init ({ dispatch }) {
    if (await dispatch('checkExecutiveToken')) {
      await dispatch('loadExecutiveData')
    }
  }
}
