import Vue from 'vue'
// // import VueSocketIO from 'vue-socket.io'
import { io } from 'socket.io-client'
import VueSocketIO from 'vue-socket.io-extended'

export default ({ $config: { BACKEND_HELP } }) => {
  const transports = BACKEND_HELP === 'https://release-dot-pdf-ecuador-303618.uc.r.appspot.com' ? ['polling'] : ['websocket']
  Vue.use(VueSocketIO, io(BACKEND_HELP,
    {
      withCredentials: true,
      transports
    })
  )
}
