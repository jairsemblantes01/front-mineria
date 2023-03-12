import Vue from 'vue'

Vue.directive('uppercase', {
  bind (el) {
    el.value = el.value.toUpperCase()
  },
  update (el) {
    el.value = el.value.toUpperCase()
  }
})
Vue.filter(
  'currency',
  value => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(value)
)
