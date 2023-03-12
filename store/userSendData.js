export const state = () => ({
  certData: {},
  userInfo: {},
  payment: {},
  options: {},
  selectProducts: [],
  photo: {},
  categories: {},
  foreing: false
})

export const mutations = {
  addCertInfo (state, data) {
    state.certData = data
  },
  addUserInfo (state, data) {
    state.userInfo = data
  },
  addPaymentInfo (state, data) {
    state.payment = data
  },
  addOptions (state, data) {
    state.options = data
  },
  addPhoto (state, data) {
    state.photo = data
  },
  addCategories (state, data) {
    state.categories = data
  },
  addSelectProducts (state, data) {
    state.selectProducts = data
  },
  clearSelectProducts (state) {
    state.selectProducts = []
  },
  isForeing (state) {
    state.foreing = !state.foreing
  }
}
