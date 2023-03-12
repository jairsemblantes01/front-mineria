export const state = () => ({
  primaryColor: '#000000',
  primaryColor2: '#000000',
  primaryColor3: '#000000',
  secondaryColor: '#ffffff',
})

export const mutations = {
  setTheme (state, theme) {
    console.log('guardando nuevo tema en store', theme)
    state.primaryColor = theme.primaryColor
    state.primaryColor2 = theme.primaryColor2
    state.primaryColor3 = theme.primaryColor3
    state.secondaryColor = theme.secondaryColor
  },
  setprimaryColor (state, color) {
    state.primaryColor = color
  },
  setprimaryColor2 (state, color) {
    state.primaryColor2 = color
  },
  setprimaryColor3 (state, color) {
    state.primaryColor3 = color
  },
  setsecondaryColor (state, color) {
    state.secondaryColor = color
  }
}
export const actions = {
  loadTheme ({ commit }, theme) {
    commit('setTheme', theme)
  }
}
