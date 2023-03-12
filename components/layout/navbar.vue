<template>
  <div class="bg-white-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex justify-between items-center py-6 md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <nuxt-link :to="`/${typeClient}`">
            <img class="h-8 w-auto sm:h-10" src="/login-logo.png" alt="">
          </nuxt-link>
        </div>
        <nav class="hidden md:flex space-x-10">
          <a-menu v-if="$route.name !== 'help'" style="width: 100%" mode="horizontal">
            <a-menu-item>
              <nuxt-link :to="`/${typeClient}`">
                <span>Inicio</span>
              </nuxt-link>
            </a-menu-item>
            <a-sub-menu v-if="typeClient !== 'manager'" key="sub2">
              <span slot="title"><span>Procesos</span></span>
              <a-menu-item key="7">
                <nuxt-link :to="`/${typeClient}/process/validation`">
                  <span> Validación</span>
                </nuxt-link>
              </a-menu-item>
              <a-menu-item key="8">
                <nuxt-link :to="`/${typeClient}/process/activation`">
                  <span>Activación</span>
                </nuxt-link>
              </a-menu-item>
              <a-menu-item key="9">
                <nuxt-link :to="`/${typeClient}/process/download`">
                  <span>Descarga</span>
                </nuxt-link>
              </a-menu-item>

              <a-menu-item key="19">
                <nuxt-link :to="`/${typeClient}/process/use`">
                  <span>Uso de firma electrónica</span>
                </nuxt-link>
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="11">
              <span slot="title"><span>Aplicativos</span></span>
              <a-menu-item v-if="!typeClient" key="12">
                <nuxt-link :to="`/${typeClient}/process/use#aplicatives`">
                  <span>Todos</span>
                </nuxt-link>
              </a-menu-item>
              <a-menu-item-group title="Firmar documentos">
                <a-menu-item key="13">
                  <nuxt-link :to="`/${typeClient}/aplications/pdf-ecuador`">
                    <span> PDF Ecuador</span>
                  </nuxt-link>
                </a-menu-item>
                <a-menu-item key="14">
                  <nuxt-link :to="`/${typeClient}/aplications/adobe-reader`">
                    <span>Adobe Acrobat Reader</span>
                  </nuxt-link>
                </a-menu-item>
                <a-menu-item key="s10">
                  <nuxt-link :to="`/${typeClient}/aplications/firma-ec`">
                    <span>Firma EC</span>
                  </nuxt-link>
                </a-menu-item>
              </a-menu-item-group>
              <a-menu-item-group title="Facturación electrónica">
                <a-menu-item key="133">
                  <nuxt-link :to="`/${typeClient}/aplications/upconta`">
                    <span>UpConta</span>
                  </nuxt-link>
                </a-menu-item>
                <a-menu-item key="24">
                  <nuxt-link :to="`/${typeClient}/aplications/sri`">
                    <span>SRI</span>
                  </nuxt-link>
                </a-menu-item>
              </a-menu-item-group>
            </a-sub-menu>
            <a-sub-menu key="5">
              <span slot="title"><span>Servicios</span></span>
              <a-menu-item key="51">
                <nuxt-link :to="`/${typeClient}/revocation`">
                  <span>Revocación</span>
                </nuxt-link>
              </a-menu-item>
              <a-menu-item key="52">
                <nuxt-link :to="`/${typeClient}/extention`">
                  <span>Cambio de extensión a p12</span>
                </nuxt-link>
              </a-menu-item>
              <a-menu-item key="55">
                <nuxt-link :to="`/${typeClient}/tickets`">
                  <span>Mis tickets</span>
                </nuxt-link>
              </a-menu-item>
            </a-sub-menu>
            <!--            <a-menu-item key="6">
              <nuxt-link :to="`/${typeClient}/faqs`">
                <span>Quejas y sugerencias</span>
              </nuxt-link>
            </a-menu-item>-->
          </a-menu>
        </nav>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <a class="whitespace-nowrap truncate text-base font-medium text-gray-500 hover:text-gray-900">{{ $store.state.session.ClientData && $store.state.session.ClientData.names }}</a>
          <a-badge :count="noRead">
            <a-button shape="circle" icon="bell" class="ml-3" @click="TOGGLE_NOTI" />
          </a-badge>
          <a class="text-black ml-4 whitespace-nowrap inline-flex items-center justify-center  py-2 bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded hover:bg-primh" @click="logout"> Salir <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 ml-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg> </a>
        </div>
      </div>
    </div>
    <a-drawer
      title="Notificaciones"
      placement="right"
      width="400px"
      :visible="NOTI_STATE"
      @close="$store.commit('navigation/closeNotifier')"
    >
      <div
        class="header-notifications w-full
          bg-gray-50
          overflow-y-auto
          p-3
          absolute
          h-screen
          right-0
        "
      >
        <div
          v-for="(i, index) in notifications"
          :key="index"
          :class=" i.read ? 'w-full p-3 mt-4 bg-white rounded shadow flex flex-shrink-0 cursor-pointer' : 'w-full p-3 mt-4 bg-white bg-blue-100 rounded shadow flex flex-shrink-0 cursor-pointer'"
          @click="openNotification(i)"
        >
          <div
            tabindex="0"
            aria-label="group icon"
            role="img"
            class="
                focus:outline-none
                w-8
                h-8
                border
                rounded-full
                border-gray-200
                flex flex-shrink-0
                items-center
                justify-center
              "
          >
            <svg
              v-if="i.type === 'createdTicket'"
              id="Layer_1"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="17px"
              height="17px"
              viewBox="0 0 502.111 502.111"
              style="enable-background:new 0 0 502.111 502.111;"
              xml:space="preserve"
            >
              <g>
                <polygon
                  style="fill:#00EED1;"
                  points="145.188,290.593 145.188,250.593 251.056,250.593 251.053,220.593 145.188,220.593
		145.188,180.593 251.05,180.593 251.048,150.593 145.188,150.593 145.188,110.593 251.045,110.593 251.036,0.001 220.706,18.872
		190.375,0 160.048,18.871 129.718,0.001 97.336,20.147 49.056,1.251 49.056,500.857 97.346,481.963 129.736,502.109
		160.071,483.238 190.406,502.11 220.74,483.239 251.075,502.11 251.059,290.593 	"
                />
                <path
                  style="fill:#00DDC2;"
                  d="M404.765,20.148l-32.39-20.146L342.04,18.873L311.706,0.001l-30.334,18.871L251.036,0.001
		l0.009,110.592h35.879v40h-35.875l0.002,30h35.873v40h-35.87l0.002,30h35.868v40h-35.865l0.016,211.518l30.33-18.871l30.331,18.872
		l30.327-18.871l30.331,18.87l32.381-20.146l48.281,18.896V1.254L404.765,20.148z M356.923,410.391h-40v-40h40V410.391z
		 M356.923,290.593h-40v-40h40V290.593z M356.923,220.593h-40v-40h40V220.593z M356.923,150.593h-40v-40h40V150.593z"
                />
                <rect x="316.923" y="370.391" style="fill:#00AA95;" width="40" height="40" />
                <rect x="316.923" y="110.593" style="fill:#00AA95;" width="40" height="40" />
                <rect x="145.188" y="110.593" style="fill:#00AA95;" width="141.735" height="40" />
                <rect x="316.923" y="180.593" style="fill:#00AA95;" width="40" height="40" />
                <rect x="145.188" y="180.593" style="fill:#00AA95;" width="141.735" height="40" />
                <rect x="316.923" y="250.593" style="fill:#00AA95;" width="40" height="40" />
                <rect x="145.188" y="250.593" style="fill:#00AA95;" width="141.735" height="40" />
              </g>
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
            </svg>

            <svg
              v-else-if="i.type === 'finishedTicket'"
              id="Uploaded to svgrepo.com"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="32px"
              height="32px"
              viewBox="0 0 32 32"
              style="enable-background:new 0 0 32 32;"
              xml:space="preserve"
            ><style type="text/css">
               .cubies_veertien{fill:#BCD269;}
               .cubies_dertien{fill:#A4C83F;}
               .cubies_vijftien{fill:#D1DE8B;}
               .st0{fill:#2EB39A;}
               .st1{fill:#EC9B5A;}
               .st2{fill:#A5C64A;}
               .st3{fill:#65C3AB;}
               .st4{fill:#EDB57E;}
               .st5{fill:#F9E0BD;}
               .st6{fill:#98D3BC;}
               .st7{fill:#CCE2CD;}
               .st8{fill:#D97360;}
               .st9{fill:#E69D8A;}
               .st10{fill:#F2C99E;}
               .st11{fill:#4C4842;}
               .st12{fill:#67625D;}
               .st13{fill:#C9483A;}
               .st14{fill:#FFF2DF;}
               .st15{fill:#C9C6C0;}
               .st16{fill:#725A48;}
               .st17{fill:#8E7866;}
               .st18{fill:#EDEAE5;}
               .st19{fill:#837F79;}
               .st20{fill:#A5A29C;}
               .st21{fill:#E3D4C0;}
               .st22{fill:#A4C83F;}
               .st23{fill:#E8E8B5;}
               .st24{fill:#AB9784;}
             </style>
              <g>
                <path
                  className="cubies_veertien"
                  d="M29,32H3c-1.657,0-3-1.343-3-3V3c0-1.657,1.343-3,3-3h26c1.657,0,3,1.343,3,3v26
                      C32,30.657,30.657,32,29,32z"
                />
                <path
                  className="cubies_vijftien"
                  d="M27,32H3c-1.657,0-3-1.343-3-3V3c0-1.657,1.343-3,3-3h24c1.657,0,3,1.343,3,3v26
                      C30,30.657,28.657,32,27,32z"
                />
                <path
                  className="cubies_dertien"
                  d="M25,28H5c-0.552,0-1-0.448-1-1V5c0-0.552,0.448-1,1-1h20c0.552,0,1,0.448,1,1v22
                      C26,27.552,25.552,28,25,28z"
                />
                <path
                  className="cubies_veertien"
                  d="M5,27V5c0-0.552,0.448-1,1-1H5C4.448,4,4,4.448,4,5v22c0,0.552,0.448,1,1,1h1
                      C5.448,28,5,27.552,5,27z"
                />
                <path
                  className="cubies_vijftien"
                  d="M12.293,23.121l-5-5c-0.39-0.391-0.39-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0
                      L13,18.171l7.879-7.878c0.391-0.391,1.024-0.39,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-10,10
                      C13.317,23.512,12.683,23.512,12.293,23.121z"
                />
              </g>
            </svg>

            <svg
              v-else-if="i.type === 'respondTicket'"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z"
                fill="#4338CA"
              />
            </svg>

            <svg
              v-else-if="i.type === 'system'"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99992 1.33333C8.17673 1.33333 8.3463 1.40357 8.47132 1.52859C8.59635 1.65361 8.66659 1.82318 8.66659 1.99999V3.99999C8.66659 4.17681 8.59635 4.34638 8.47132 4.4714C8.3463 4.59642 8.17673 4.66666 7.99992 4.66666C7.82311 4.66666 7.65354 4.59642 7.52851 4.4714C7.40349 4.34638 7.33325 4.17681 7.33325 3.99999V1.99999C7.33325 1.82318 7.40349 1.65361 7.52851 1.52859C7.65354 1.40357 7.82311 1.33333 7.99992 1.33333ZM7.99992 11.3333C8.17673 11.3333 8.3463 11.4036 8.47132 11.5286C8.59635 11.6536 8.66659 11.8232 8.66659 12V14C8.66659 14.1768 8.59635 14.3464 8.47132 14.4714C8.3463 14.5964 8.17673 14.6667 7.99992 14.6667C7.82311 14.6667 7.65354 14.5964 7.52851 14.4714C7.40349 14.3464 7.33325 14.1768 7.33325 14V12C7.33325 11.8232 7.40349 11.6536 7.52851 11.5286C7.65354 11.4036 7.82311 11.3333 7.99992 11.3333ZM14.6666 8C14.6666 8.17681 14.5963 8.34638 14.4713 8.4714C14.3463 8.59642 14.1767 8.66666 13.9999 8.66666H11.9999C11.8231 8.66666 11.6535 8.59642 11.5285 8.4714C11.4035 8.34638 11.3333 8.17681 11.3333 8C11.3333 7.82318 11.4035 7.65361 11.5285 7.52859C11.6535 7.40357 11.8231 7.33333 11.9999 7.33333H13.9999C14.1767 7.33333 14.3463 7.40357 14.4713 7.52859C14.5963 7.65361 14.6666 7.82318 14.6666 8ZM4.66659 8C4.66659 8.17681 4.59635 8.34638 4.47132 8.4714C4.3463 8.59642 4.17673 8.66666 3.99992 8.66666H1.99992C1.82311 8.66666 1.65354 8.59642 1.52851 8.4714C1.40349 8.34638 1.33325 8.17681 1.33325 8C1.33325 7.82318 1.40349 7.65361 1.52851 7.52859C1.65354 7.40357 1.82311 7.33333 1.99992 7.33333H3.99992C4.17673 7.33333 4.3463 7.40357 4.47132 7.52859C4.59635 7.65361 4.66659 7.82318 4.66659 8ZM12.7139 12.714C12.5889 12.839 12.4194 12.9092 12.2426 12.9092C12.0658 12.9092 11.8963 12.839 11.7713 12.714L10.3573 11.3C10.2358 11.1743 10.1686 11.0059 10.1701 10.8311C10.1717 10.6563 10.2418 10.4891 10.3654 10.3654C10.489 10.2418 10.6562 10.1717 10.831 10.1702C11.0058 10.1687 11.1742 10.2359 11.2999 10.3573L12.7139 11.7707C12.7759 11.8326 12.8251 11.9061 12.8586 11.987C12.8922 12.068 12.9094 12.1547 12.9094 12.2423C12.9094 12.3299 12.8922 12.4167 12.8586 12.4976C12.8251 12.5786 12.7759 12.6521 12.7139 12.714ZM5.64259 5.64266C5.51757 5.76764 5.34803 5.83785 5.17125 5.83785C4.99448 5.83785 4.82494 5.76764 4.69992 5.64266L3.28659 4.22933C3.16149 4.10432 3.09118 3.93474 3.09112 3.7579C3.09105 3.58105 3.16125 3.41142 3.28625 3.28633C3.41126 3.16123 3.58084 3.09092 3.75768 3.09086C3.93453 3.0908 4.10416 3.16099 4.22925 3.28599L5.64259 4.7C5.76757 4.82501 5.83778 4.99455 5.83778 5.17133C5.83778 5.3481 5.76757 5.51764 5.64259 5.64266ZM3.28659 12.714C3.1616 12.589 3.09139 12.4194 3.09139 12.2427C3.09139 12.0659 3.1616 11.8963 3.28659 11.7713L4.70059 10.3573C4.76208 10.2937 4.83565 10.2429 4.91698 10.2079C4.99832 10.173 5.0858 10.1546 5.17432 10.1538C5.26284 10.1531 5.35062 10.1699 5.43256 10.2034C5.51449 10.237 5.58892 10.2865 5.65152 10.3491C5.71411 10.4117 5.76361 10.4861 5.79713 10.568C5.83065 10.65 5.84752 10.7377 5.84675 10.8263C5.84598 10.9148 5.82759 11.0023 5.79265 11.0836C5.75771 11.1649 5.70693 11.2385 5.64325 11.3L4.22992 12.714C4.168 12.776 4.09448 12.8252 4.01355 12.8587C3.93261 12.8923 3.84586 12.9095 3.75825 12.9095C3.67064 12.9095 3.58389 12.8923 3.50296 12.8587C3.42203 12.8252 3.3485 12.776 3.28659 12.714ZM10.3573 5.64266C10.2323 5.51764 10.1621 5.3481 10.1621 5.17133C10.1621 4.99455 10.2323 4.82501 10.3573 4.7L11.7706 3.28599C11.8956 3.1609 12.0652 3.09059 12.242 3.09053C12.4189 3.09046 12.5885 3.16066 12.7136 3.28566C12.8387 3.41067 12.909 3.58025 12.9091 3.75709C12.9091 3.93394 12.8389 4.10357 12.7139 4.22866L11.2999 5.64266C11.1749 5.76764 11.0054 5.83785 10.8286 5.83785C10.6518 5.83785 10.4823 5.76764 10.3573 5.64266Z"
                fill="#F59E0B"
              />
            </svg>

            <svg
              v-else
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z"
                fill="#4338CA"
              />
            </svg>
          </div>
          <div class="pl-3 w-full">
            <div class="flex items-center justify-between w-full">
              <p tabindex="0" class="focus:outline-none text-sm leading-none">
                {{ getAllOption(i.type).description }} <span v-if="i.type === 'new-comment'"><span> en ticket</span> <span class="text-indigo-700">{{ i.ticket }}</span> </span>
              </p>
              <div
                tabindex="0"
                aria-label="close icon"
                role="button"
                class="focus:outline-none cursor-pointer"
              >
                <!--                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5 3.5L3.5 10.5"
                    stroke="#4B5563"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3.5 3.5L10.5 10.5"
                    stroke="#4B5563"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>-->
              </div>
            </div>
            <p
              tabindex="0"
              class="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
            >
              {{ getDateAgo(i.date) }}
            </p>
          </div>
        </div>
      </div>
      <div
        :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          padding: '10px 16px 25px',
          left: 0,
          background: '#fff',
        }"
      >
        <center>
          <a-popconfirm placement="top" ok-text="Aceptar" cancel-text="Cancelar" @confirm="deleteNotifications">
            <template slot="title">
              <p>¿Está seguro de eliminar todas sus notificaciones leídas?</p>
            </template>
            <a-button icon="delete" block>
              Eliminar notificaciones
            </a-button>
          </a-popconfirm>
        </center>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { mapState, mapActions } from 'vuex'

require('dayjs/locale/es')

export default {
  name: 'NabAsd',
  data () {
    return {
      show: true,
      noRead: 0,
      notifications: [],
      options: []
    }
  },

  sockets: {
    newNotificationClient (data) {
      const key = `open${Date.now()}`
      this.getNotifications()
      this.$notification.open({
        message: data.message,
        icon: <a-icon type="bell" style="color: #108ee9" />,
        btn: (h) => {
          return h(
            'a-button',
            {
              props: {
                type: 'info',
                size: 'small'
              },
              on: {
                click: async () => {
                  try {
                    await this.$axios.$post(`/api2/clients/read-notifications/${data.notification._id}`)
                    this.$router.push(this.typeClient + data.notification.link)
                    this.getNotifications()
                    this.$notification.close(key)
                  } catch (err) {
                    const message = err.response ? err.response.data.message : err.message
                    this.$error({
                      title: 'Ha ocurrido un error',
                      content: message,
                      okText: 'Aceptar'
                    })
                  }
                }
              }
            },
            'Ver'
          )
        },
        key
      })
    }
  },
  computed: {
    ...mapState({ notifier: state => state.navigation.notifier }),
    NOTI_STATE: {
      get () {
        return this.notifier
      }
    },
    typeClient () {
      return this.$store.state.session.ClientData && this.$store.state.session.ClientData.role === 'manager' ? 'manager' : 'help'
    },
  },
  created () {
    dayjs.locale('es')
    dayjs.extend(relativeTime)
    this.getNotifications()
  },
  methods: {
    async openNotification (not) {
      try {
        this.TOGGLE_NOTI()
        await this.$axios.$post(`/api2/clients/read-notifications/${not._id}`)
        this.getNotifications()
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Ha ocurrido un error',
          content: message,
          okText: 'Aceptar'
        })
      }
      this.$router.push(this.typeClient + not.link)
    },
    getAllOption (type) {
      return this.options.typesNotifications && this.options.typesNotifications.find((item) => {
        return item.id === type
      })
    },
    getDate (date) {
      return dayjs(date).format('DD/MM/YYYY HH:mm')
    },
    getDateAgo (date) {
      return dayjs(date).fromNow()
    },
    async deleteNotifications () {
      try {
        await this.$axios.$post('/api2/clients/delete-notifications')
        await this.getNotifications()
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Ha ocurrido un error',
          content: message,
          okText: 'Aceptar'
        })
      }
    },
    async getNotifications () {
      try {
        /*const resp = await this.$axios.$get('/api2/clients/get-notifications')
        this.notifications = resp.notifications
        this.noRead = resp.noRead
        this.options = resp.options*/
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Ha ocurrido un error',
          content: message,
          okText: 'Aceptar'
        })
      }
    },
    ...mapActions({ TOGGLE_NOTI: 'navigation/TOGGLE_NOTI' }),
    logout () {
      localStorage.removeItem('active')
      this.$router.push({ path: `/${this.typeClient}/login` })
      this.$store.dispatch('session/clientLogout')
    },
    scrollMeTo (refName) {
      const element = this.$refs[refName]
      const top = element.offsetTop

      window.scrollTo(0, top)
    }
  }
}
</script>

<style scoped>
.ant-menu-horizontal {
  line-height: 46px;
  white-space: nowrap;
  border: 0;
  border-bottom: none;
  box-shadow: none;
}
.header-notifications {
  overflow: auto;
  max-height: 85vh;
  width: 100%;
}

.ant-drawer-body {
  padding: 0;
}
</style>
