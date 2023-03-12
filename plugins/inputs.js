import Vue from 'vue'
import VueOtpInput from '@bachdgvn/vue-otp-input'
import TailSelect from '@/components/inputs/tail-select'
import TailInput from '@/components/inputs/tail-input'
import TailDatePicker from '@/components/inputs/tail-date-picker'
import FileRender from '~/components/inputs/FileRender'
import TailFileInput from '~/components/inputs/tail-file-input'
import TailCheckbox from '~/components/inputs/tail-checkbox'
import TailTextarea from '~/components/inputs/tail-textarea'
import TailOtp from '~/components/inputs/tail-otp'
import TailPassword from '~/components/inputs/tail-password'
import TailTimeline from '~/components/inputs/tail-timeline'
import Tbutton from '~/components/Tailwind/t-button'

Vue.component('TailSelect', TailSelect)
Vue.component('TailInput', TailInput)
Vue.component('TailDatePicker', TailDatePicker)
Vue.component('FileRender', FileRender)
Vue.component('TailFileInput', TailFileInput)
Vue.component('TailCheckbox', TailCheckbox)
Vue.component('TailTextarea', TailTextarea)
Vue.component('VOtpInput', VueOtpInput)
Vue.component('TailOtp', TailOtp)
Vue.component('TailPassword', TailPassword)
Vue.component('TailTimeline', TailTimeline)
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('TButton', Tbutton)
