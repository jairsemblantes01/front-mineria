import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { email, required } from 'vee-validate/dist/rules'
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', {
  ...required,
  message: 'Este campo es requerido'
})

extend('mail', {
  ...email,
  message: 'Ingrese correo válido'
})

extend('samemail', {
  validate (value, { email }) {
    return value === email
  },
  params: ['email'],
  message: 'Los correos deben ser los mismos'
})

extend('samepass', {
  validate (value, { pass }) {
    return value === pass
  },
  params: ['pass'],
  message: 'Las contraseñas no coinciden'
})

extend('letters', {
  validate (value) {
    return /^[a-z A-Z ñÑáÁíÍéÉóÓúÚ]{2,}\\*$/i.test(value)
  },
  message: 'Ingrese un nombre válido'
})

extend('numbers', {
  validate (value) {
    return /^([0-9])*$/.test(value)
  },
  message: 'Ingrese un número válido'
})

extend('ext-numbers', {
  validate (value) {
    return /^(\+?\d{1,3}()?)?((\(\d{1,3}\))|\d{1,3})?\d{3,4}?\d{4}$/.test(value)
  },
  message: 'Ingrese un número válido'
})

extend('check', {
  validate (value) {
    return !!value
  },
  message: 'Confirmar el check es necesario'
})

extend('size', {
  validate (value, { size = 15 }) {
    return value.length <= size
  },
  params: ['size'],
  message: (fieldName, placeholders) => {
    return `Máximo ${placeholders.size} caracteres`
  }
})

extend('letterNumber', {
  validate (value) {
    return /^[A-Z a-z0-9\t/.]*$/.test(value)
  },
  message: 'Este campo debe contener solo letras y números'
})

extend('typeId', {
  validate (value, { type }) {
    return type === 'ci' ? value.length === 10 : /^[A-Za-z0-9]*$/.test(value)
  },
  params: ['type'],
  message: (fieldName, placeholders) => {
    return `Su ${placeholders.type === 'ci' ? 'cédula debe tener 10 dígitos' : 'pasaporte debe contener solo letras y números'}`
  }
})

extend('typeIdUpconta', {
  validate (value, { type }) {
    return type === '04' ? value.length === 13 : type === '05' ? value.length === 10 : true
  },
  params: ['type'],
  message: (fieldName, placeholders) => {
    return `Su ${placeholders.type === '04' ? 'RUC' : 'cédula'} debe tener ${placeholders.type === '04' ? 13 : 10} dígitos`
  }
})
extend('ruc', {
  validate (value) {
    return value.length === 13
  },
  message: 'Su RUC debe contener 13 dígitos'
})
extend('secure', {
  validate (value) {
    return /(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9])))/.test(value)
  },
  message: 'Contraseña insegura'
})
extend('files', {
  validate (value) {
    return true
  },
  message: 'Este documento es requerido'
})
