export const state = () => ({
  current: 0,
  notifier: false
})

export const getters = {
  NOTI_STATE (state) {
    return state.notifier
  }
}

export const mutations = {
  toggleNotifier (state) {
    state.notifier = !state.notifier
  },
  closeNotifier (state) {
    state.notifier = false
  },
  next (state) {
    state.current++
  },
  prev (state) {
    state.current--
  },
  correction (state) {
    state.current = 1
  }
}

export const actions = {
  TOGGLE_NOTI ({ commit }) {
    commit('toggleNotifier')
  },
  CLOSE_NOTI ({ commit }) {
    commit('closeNotifier')
  }
}
