<template>
  <a-layout :class="showSelection === 0 ? 'app-background-v2 filter-none' : 'app-background filter-none'">
    <!--    <div v-if="!fedotaxi && !convenio">
      <div class="flotante" align="right">
        <a-button v-show="currentProm !== 5" class="parpadea" type="primary" @click="openDrawer('step')">
          <a-icon type="question-circle" /> Guia
        </a-button>
      </div>
      <div class="flotante2" align="right">
        <a-button v-show="currentProm !== 5" class="parpadea" type="primary" @click="openDrawer('video')">
          <a-icon type="video-camera" /> Tutorial
        </a-button>
      </div>
    </div>-->
    <div v-if="showSelection === 0" class="px-4 xl:mx-auto">
      <div class="lg:flex items-center justify-between mt-20">
        <div v-if="fedotaxi || convenio || fast || typesActionToDo[0].select" class="lg:w-1/3 w-full">
          <div class="relative">
            <a>
              <img width="150px" src="/login-logo.png" alt="">
            </a>
            <h2 class="text-xl font-bold text-prim xl:text-4xl mt-3">
              Te ofrecemos la mejor solución para obtener tu firma electrónica.
            </h2>
            <div class="mt-4">
              <span class="inline-block w-40 h-1 bg-prim-3 rounded-full" />
              <span class="inline-block w-3 h-1 mx-1 bg-prim-3 rounded-full" />
              <span class="inline-block w-1 h-1 bg-prim-3 rounded-full" />
            </div>
          </div>
          <!--          <h1 role="contentinfo" class="text-2xl leading-5 mt-5 text-gray-600">
            Además de nuestra nueva promoción para facturación electrónica.
          </h1>-->
          <iframe
            v-if="!fedotaxi && !convenio && !fast"
            class="w-full mt-5 p-3 hidden md:block"
            height="315"
            src="https://www.youtube.com/embed/nbZ7ppP42jc?autoplay=1"
            frameborder="0"
            allowfullscreen
          />
          <div v-if="fast">
            <h2 class="text-xl font-bold text-prim mt-3">
              La forma más rápida de obtener tu firma electrónica, en menos de 3 horas
            </h2>
            <center class="hidden md:block mt-5">
              <img src="/rocket.svg" width="300px">
            </center>
          </div>
          <center v-if="fedotaxi || convenio" class="hidden md:block mt-5">
            <img :src="convenio ? '/deal.svg' : 'https://fedotaxi.com/assets/img/icon/logoicon.jpg'" width="300px">
          </center>
        </div>
        <div class="relative w-full lg:mt-0 md:mt-12 mt-5 md:px-2 content-center" :class="fedotaxi || convenio || fast ? 'xl:w-2/3' : 'xl:w-2/3 mx-auto justify-items-center'" role="list">
          <h1 class="mb-5 text-center font-extrabold tracking-tight leading-none text-prim lg:text-4xl text-xl">
            {{ fast ? 'Firma rápida' : typesActionToDo[0].select ? 'Solicitud de Firma Electrónica' : 'Bienvenido a FirmasElectrónicas.ec' }}
          </h1>
          <p v-if="fedotaxi || convenio || fast" class="mb-6 text-lg font-normal text-gray-500 lg:text-xl text-center">
            {{ fedotaxi || convenio ? 'Realice el proceso de verificación de identidad y obtenga su firma electrónica' : fast ? 'Recuerde que la emisión de estos certificados se realizará de forma directa y tendrá un plazo más corto de hasta 3 horas.' : 'Seleccione la firma electrónica que se acople a sus necesidades y usos: ' }}
          </p>
          <div v-if="typesActionToDo[0].select && (!fedotaxi && !convenio)" class="md:flex md:items-start">
            <center>
              <svg
                :fill="$store.state.theme.primaryColor"
                class="cf-icon-svg"
                width="82px"
                height="82px"
                viewBox="-1 0 19 19"
                xmlns="http://www.w3.org/2000/svg"
              >

                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                <g id="SVGRepo_iconCarrier">

                  <path d="M10.594 1.975a8 8 0 0 1 1.895.795 7.857 7.857 0 0 1 1.604 1.237 8.05 8.05 0 0 1 1.241 1.6 7.909 7.909 0 0 1 0 7.991 8.021 8.021 0 0 1-2.845 2.845 7.888 7.888 0 0 1-4.007 1.082 7.825 7.825 0 0 1-3.985-1.082 8.039 8.039 0 0 1-1.599-1.241 7.848 7.848 0 0 1-1.237-1.604 8 8 0 0 1-.795-1.895 7.86 7.86 0 0 1-.283-2.112 7.782 7.782 0 0 1 .283-2.098 7.902 7.902 0 0 1 5.518-5.518 7.764 7.764 0 0 1 2.098-.283 7.848 7.848 0 0 1 2.112.283zM6.682 3.043A6.793 6.793 0 0 0 1.933 7.79a6.688 6.688 0 0 0-.241 1.8 6.764 6.764 0 0 0 .242 1.815 6.915 6.915 0 0 0 .685 1.634 6.775 6.775 0 0 0 1.063 1.378 6.975 6.975 0 0 0 1.38 1.071 6.822 6.822 0 0 0 5.235.686 6.789 6.789 0 0 0 3.012-1.757 6.925 6.925 0 0 0 1.07-1.382 6.785 6.785 0 0 0 .93-3.445 6.722 6.722 0 0 0-.929-3.42 6.967 6.967 0 0 0-1.07-1.38 6.77 6.77 0 0 0-1.38-1.063 6.936 6.936 0 0 0-1.633-.685A6.775 6.775 0 0 0 8.482 2.8a6.695 6.695 0 0 0-1.8.243zm2.84 10.095V6.58H8.106L5.948 8.164l.806 1.103 1.222-.945v4.816z" />

                </g>

              </svg>
            </center>
            <div class="mt-4 md:mx-4 md:mt-0">
              <h1 class="text-2xl mt-3 md:text-left text-center pb-0 mb-0 font-semibold text-prim capitalize">
                Primer paso
              </h1>
              <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl text-center">
                Seleccione la firma electrónica, vigencia y costo
              </p>
            </div>
          </div>
          <template v-if="false">
            <a
              v-if="typesActionToDo[0].select || fast"
              class="inline-flex items-center text-prim-2 underline hover:underline mt-0"
              @click="returnMenuPrincipal"
            >
              <svg
                class="ml-2 w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Regresar al menu principal
            </a>
          </template>
          <img src="/bubles.png" class="absolute w-full " alt="background circle images">
          <div v-if="fedotaxi || convenio">
            <div class="bg-white shadow rounded-lg mt-3 m-1 md:m-6 md:min-h-96 flex relative z-30">
              <div class="w-2.5 h-auto bg-prim rounded-tl-md rounded-bl-md" />
              <div class="w-full p-8">
                <div class="items-center">
                  <div>
                    <h2 class="text-2xl mb-4 font-semibold leading-6 text-gray-800">
                      {{ !authenticate.activeCode ? 'Número de identificación' : 'Ingresar código enviado' }}
                    </h2>
                    <p class="mt-1">
                      {{ !authenticate.activeCode ? `Ingrese su número de identificación para verificar que pertenece a ${fedotaxi ? 'FEDOTAXI' : 'su institución'}:` :
                        `Hemos enviado un código de verificación a su Correo electrónico y WhatsApp registrado por ${fedotaxi ? 'FEDOTAXI' : 'su institución'} con
                      duración de 5 minutos, por lo cual, debe ingresarlo` }}
                    </p>
                  </div>
                  <div v-if="noRegister">
                    <vs-alert :color="alreadyExist ? '#FF8000' : 'danger'" class="mt-5 py-3">
                      <template #title>
                        {{ !alreadyExist ? 'Ocurrió un error' : 'Solicitud existente' }}
                      </template>
                      <span v-if="!alreadyExist">
                        No se logro encontrar un registro con el número de identificación ingresado, por favor póngase en contacto con el siguiente
                        correo electrónico <b>atencionalcliente@firmaselectronicas.ec</b>
                      </span>
                      <span v-else>
                        Usted ya cuenta con una solicitud ingresada para su firma electrónica, actualmente su solicitud se encuentra en
                        proceso de validación por un operador, por lo cual, debe estar pendiente de su correo electrónico.
                      </span>
                    </vs-alert>
                  </div>
                  <div class="mt-5">
                    <div class="w-full flex-inline">
                      <center>
                        <div class="md:w-1/3">
                          <tail-input
                            v-if="!authenticate.activeCode"
                            v-model="authenticate.id"
                            name="ideFedo"
                            max="10"
                            label="Identificación"
                            placeholder="Ejm: 1707321568"
                            rules="required|typeId:ci"
                          />
                          <tail-otp v-show="authenticate.activeCode" v-model="authenticate.code" :refresh.sync="authenticate.refresh" class="mt-4" />
                          <button
                            :disabled="!authenticate.activeCode ? (!authenticate.id || authenticate.id && authenticate.id.length !== 10) : (!authenticate.code || (authenticate.code && authenticate.code.length < 6))"
                            class="next-form w-full flex mt-5 justify-center bg-prim  hover:bg-blue-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500 disabled:cursor-not-allowed"
                            @click="!authenticate.activeCode ? showInfoCode = true : confirmCode()"
                          >
                            <svg
                              v-if="loadButton"
                              aria-hidden="true"
                              class="inline mr-3 w-4 h-4 text-white animate-spin"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                            {{ !authenticate.activeCode ? 'Confirmar número de identificación' : 'Confirmar código' }}
                          </button>
                          <a
                            v-if="authenticate.activeCode"
                            class="flex w-full p-1 pt-3 font-medium text-prim-2 underline hover:underline hover:text-yellow-500"
                            @click="verifyIdentification(true)"
                          >
                            Si no has recibido un código, solicitar uno nuevo aquí
                          </a>
                        </div>
                      </center>
                    </div>
                  </div>
                </div>
                <a
                  v-if="authenticate.activeCode"
                  class="inline-flex items-center text-prim-2 underline hover:underline mt-4"
                  @click="() => {
                    authenticate = { id: '', activeCode: false, refresh: false, code: '',errorCode: '', errorMessage: '', showError: false }
                    alreadyExist = false
                  }"
                >
                  <svg
                    class="ml-2 w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Cambiar cédula
                </a>
              </div>
            </div>
          </div>
          <div v-if="!fedotaxi && !convenio">
            <div v-if="!fast">
              <div v-if="!typesActionToDo[0].select" class="bg-white blur-sm shadow rounded-lg mt-3 relative z-30" style="background-image: url(https://firmaselectronicas.ec/wp-content/uploads/2020/09/back-encabezado-firmas.jpg)">
                <div class="relative group w-full h-22 flex justify-center items-center">
                  <div>
                    <h2 class="text-2xl font-semibold leading-6 text-gray-800 mt-8">
                      ¿Qué desea realizar?
                    </h2>
                    <p class="mt-3">
                      Seleccione la acción que desea realizar
                    </p>
                  </div>
                </div>
                <div class="w-full px-8 pb-8">
                  <div class="md:flex items-center justify-center">
                    <ul class="grid gap-6 md:grid-cols-3 w-full md:w-3/4 sm:mt-5">
                      <li v-for="(x, index) in typesActionToDo" :key="x.id">
                        <input id="react-option" type="radio" class="hidden peer" required="">
                        <label for="react-option" :class="x.select ? 'border-prim-2 text-prim-2 ' : ''" class="inline-flex h-full justify-between items-center p-5 w-full bg-white rounded-lg border-2 cursor-pointer hover:text-gray-600 hover:bg-gray-50" @click="chooseActionToDo(index)">
                          <div class="block">
                            <img class="mb-2 w-7 h-7 text-sky-500" fill="currentColor" aria-hidden="true" :src="x.icon">
                            <div class="w-full text-lg font-semibold">{{ x.name }}</div>
                            <div class="w-full text-sm">{{ x.description }}</div>
                          </div>
                        </label>
                      </li>
                      <div class="mx-auto my-auto">
                        <img src="/selectoptions.svg" width="70%">
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
              <div v-show="typesActionToDo[0].select === true" class="bg-white shadow rounded-lg mt-3 flex relative z-30">
                <div class="w-2.5 h-auto bg-prim rounded-tl-md rounded-bl-md" />
                <div class="w-full p-8">
                  <div class="md:flex items-center justify-between">
                    <div>
                      <h2 class="text-2xl font-semibold leading-6 text-gray-800">
                        Escoja el tipo de persona
                      </h2>
                    </div>
                    <ul class="grid gap-6 w-full md:grid-cols-3">
                      <template v-if="loadOptions">
                        <a-skeleton
                          v-for="i in 3"
                          :key="i"
                          :loading="loadOptions"
                          active
                          avatar
                        />
                      </template>
                      <template v-if="!loadOptions">
                        <li v-for="x in option.TypesCertificates" :key="x.id">
                          <input id="react-option" type="radio" class="hidden peer" required="">
                          <label for="react-option" :class="form.certType === x.id ? 'border-2 border-prim-2 text-prim hover:text-prim-2' : ''" class="inline-flex h-full justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 cursor-pointer hover:text-gray-600 hover:bg-gray-50" @click="chooseTypeCert(x.id)">
                            <div class="block">
                              <img class="mb-2 w-7 h-7 text-sky-500" fill="currentColor" aria-hidden="true" :src="certTypeObject(x.id).icon">
                              <div class="w-full text-lg font-semibold">{{ x.description }}</div>
                              <div class="w-full text-sm">{{ certTypeObject(x.id).description }}</div>
                            </div>
                          </label>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
              </div>
              <div v-if="form.certType && form.type" class="bg-white shadow rounded-lg mt-3 flex relative z-30">
                <div class="w-2.5 h-auto bg-prim rounded-tl-md rounded-bl-md" />
                <div class="w-full p-8">
                  <div class="md:flex items-center">
                    <div>
                      <h2 class="text-2xl font-semibold leading-6 text-gray-800">
                        Escoja la duración y precio
                      </h2>
                    </div>
                    <div class="w-full grid gap-6 md:grid-cols-2 md:px-2">
                      <template v-if="loadPrices">
                        <a-skeleton
                          v-for="i in 4"
                          :key="i"
                          class="flex items-center w-8/12 mx-auto"
                          :loading="loadPrices"
                          active
                          avatar
                        />
                      </template>
                      <div v-for="(x, i) in prices" :key="i + x.duration">
                        <div v-if="x" :class="form.duration === x.duration ? 'border-prim-2 text-prim-2 hover:text-prim-2' : ''" class="flex items-center w-full justify-between max-w-2xl md:px-8 py-2 mx-auto border-2 cursor-pointer rounded-xl" @click="chooseDuration(x)">
                          <div v-if="x.duration" class="flex items-center grid md:grid-cols-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 sm:h-9 sm:w-9" viewBox="0 0 20 20" :fill="form.duration === x.duration ? $store.state.theme.primaryColor : 'currentColor'">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>

                            <div class="items-center mx-5 space-y-1">
                              <h2 v-if="x.duration" class="text-lg font-medium text-gray-700 sm:text-2xl dark:text-gray-200">
                                {{ x.duration }} {{ x.duration === '1' ? 'año' : 'años' }}
                              </h2>
                            </div>
                          </div>
                          <div class="flex flex-col items-center mx-5 space-y-1">
                            <h2  :class="form.duration === x.duration ? 'text-prim ' : ''" class="text-2xl font-semibold w-full text-gray-500 dark:text-gray-300">
                              {{ x.value | currency }}
                            </h2>
                            <div class="px-2 text-xs text-prim bg-gray-100 rounded-full sm:px-4 sm:py-1 dark:bg-gray-700 ">
                              Incluye iva
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="fast">
              <div class="bg-white shadow rounded-lg mt-3 flex relative z-30">
                <div class="w-2.5 h-auto bg-prim rounded-tl-md rounded-bl-md" />
                <div class="w-full p-8">
                  <div class="md:flex items-center md:space-x-4 justify-between">
                    <div>
                      <h2 class="text-2xl font-semibold leading-6 text-gray-800">
                        Emisión de firmas rápidas
                      </h2>
                      <p class="mt-3">
                        Seleccione la firma que más se acople a sus necesidades
                      </p>
                    </div>
                    <div>
                      <ul class="grid gap-6 w-full md:grid-cols-2 md:w-2/3 md:ml-7">
                        <li v-for="x in fastOptions" :key="x.id">
                          <input id="react-option" type="radio" class="hidden peer" required="">
                          <label for="react-option" :class="form.certType === x.id ? 'border-prim-2 text-prim-2 hover:text-prim-2' : ''" class="inline-flex h-full justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50" @click="chooseTypeCert(x.id)">
                            <div class="block">
                              <img class="mb-2 w-7 h-7 text-sky-500" fill="currentColor" aria-hidden="true" :src="certFastObject(x.id).icon">
                              <div class="w-full text-lg font-semibold">{{ x.description }}</div>
                              <div class="w-full text-sm">{{ certFastObject(x.id).description }}</div>
                            </div>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="form.certType && form.duration" class="bg-white shadow rounded-lg mt-3 flex relative z-30">
                <div class="w-2.5 h-auto bg-prim rounded-tl-md rounded-bl-md" />
                <div class="w-full p-8">
                  <div class="md:flex items-center space-x-4 justify-between">
                    <div>
                      <h2 class="text-2xl font-semibold leading-6 text-gray-800">
                        Firma electrónica actual
                      </h2>
                      <p class="mt-3">
                        {{ form.certType === 2 ? 'Firma electrónica Persona natural con RUC, duración 2 años' : 'Firma electrónica Persona natural, duración 1 día' }}
                      </p>
                    </div>
                    <div>
                      <p class="text-xl font-bold text-prim mb-3">
                        Combo actualmente seleccionado para emisión rápida, escoja el formato de entrega de su firma
                      </p>
                      <ul class="grid gap-6 w-full md:grid-cols-2">
                        <template v-if="loadOptions">
                          <a-skeleton
                            v-for="i in 2"
                            :key="i"
                            :loading="loadOptions"
                            active
                            avatar
                          />
                        </template>
                        <template v-if="!loadOptions">
                          <li>
                            <input id="react-option" type="radio" class="hidden peer" required="">
                            <label for="react-option" :class="false ? 'border-prim-2 text-prim-2 hover:text-prim-2' : ''" class="inline-flex h-full justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg hover:text-gray-600">
                              <div class="block">
                                <div class="w-full text-lg font-semibold">{{ form.certType === 2 ? 'Persona Natural con RUC' : 'Persona Natural 24 horas' }}</div>
                                <div class="w-full text-sm">{{ form.certType === 2 ? 'Usuario que requiere una firma electrónica para su empresa' : 'Usuario que requiere una firma electrónica natural de 24 horas' }}</div>
                              </div>
                            </label>
                          </li>
                          <li>
                            <input id="react-option" type="radio" class="hidden peer" required="">
                            <label for="react-option" :class="false ? 'border-prim-2 text-prim-2 hover:text-prim-2' : ''" class="mt-2 inline-flex h-full justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg hover:text-gray-600">
                              <div class="block">
                                <div class="mt-3">
                                  <div class="w-full text-lg font-semibold">Duración del certificado</div>
                                </div>
                                <div class="grid gap-5 md:grid-cols-3 mt-3">
                                  <h2 class="text-lg font-medium text-gray-700 sm:text-2xl">
                                    {{ form.certType === 2 ? '2 años' : '1 día' }}
                                  </h2>
                                  <div v-if="prices">
                                    <h2 class="text-2xl font-semibold w-full text-gray-500 sm:text-4xl">
                                      {{ prices.value | currency }}
                                    </h2>
                                    <div class="px-2 text-xs text-center text-primh bg-gray-100 rounded-full">
                                      Incluye iva
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label>
                          </li>
                        </template>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ValidationObserver ref="formDelivery">
              <div v-if="(form.certType && form.duration && categories && categories.length > 0) && !fast">
                <span>
                  <h2 class="text-2xl font-bold text-prim mt-3">
                    Tipo de Contenedor
                  </h2>
                  <p class="my-6 text-md font-normal text-gray-500 sm:px-16 xl:px-20 relative z-30">
                    <strong>Importante:</strong>
                    La entrega de su firma electrónica se puede realizar mediante descarga en formato (.p12) sin ningún costo adicional,
                    si desea en TOKEN puede seleccionarlo como <b>adicional</b> caso contrario dar click en Archivo.
                  </p>
                </span>
                <div v-for="(cat, iCat) in categories" :key="iCat">
                  <div v-if="cat.id === 'container' || (cat.id === 'delivery' && product.container._id)" class="bg-white shadow rounded-lg mt-3 flex relative z-30">
                    <div class="w-2.5 h-a40 bg-prim rounded-tl-md rounded-bl-md" />
                    <div class="w-full p-8">
                      <div class="md:flex items-center justify-between">
                        <div>
                          <h2 class="text-2xl font-semibold leading-6 w-2/3 text-gray-800">
                            {{ cat.id === 'container' ? 'Seleccione el tipo de contenedor para su firma electrónica' : 'Seleccione como desea su entrega' }}
                          </h2>
                        </div>
                        <ul class="grid gap-6 w-full" :class="cat.id === 'delivery' ? 'md:grid-cols-3' : 'md:grid-cols-2'">
                          <div v-if="loadOptions">
                            <a-skeleton
                              v-for="(x, i) in 3"
                              :key="i"
                              :loading="loadOptions"
                              active
                              avatar
                            />
                          </div>
                          <li v-if="cat.id === 'container'">
                            <label for="react-option" :class="virtual ? 'border-prim-2 text-prim hover:text-prim' : ''" class="inline-flex h-full justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 cursor-pointer hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50" @click="chooseVirtual">
                              <div class="block">
                                <span class="flex">
                                  <img class="mb-2 mr-4 w-7 h-7 text-sky-500" fill="currentColor" aria-hidden="true" src="/virtual.svg"> <a-icon :style="{ fontSize: '20px' }" class="text-primh mt-1 mr-1" sy type="plus" /> <h2 class="mb-2 text-xl font-semibold text-gray-500">{{ 0 | currency }}</h2>
                                </span>
                                <div class="w-full text-lg font-semibold"><span>Archivo</span></div>
                                <div class="w-full text-sm">
                                  Archivo (*.pfx) que contiene su firma electronica
                                </div>
                              </div>
                            </label>
                          </li>
                          <div v-for="(prod, i) in cat.products" v-if="form.duration !== '0.1'" :key="i">
                            <li>
                              <label for="react-option" :class="prod._id === product[cat.id]._id ? 'border-prim-2 text-prim hover:text-prim' : ''" class="inline-flex h-full justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 cursor-pointer hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50" @click="chooseProduct(prod, cat.id)">
                                <div class="block">
                                  <div class="px-2 mb-2 text-lg text-primh bg-gray-100 rounded-full sm:px-4 sm:py-1 dark:bg-gray-700 ">
                                    Adicional
                                  </div>
                                  <span class="flex"><img class="mb-2 mr-4 w-7 h-7 text-sky-500" fill="currentColor" aria-hidden="true" :src="cat.id === 'delivery' ? 'delivery.svg' : '/token.svg'"> <a-icon :style="{ fontSize: '20px' }" class="text-primh mt-1 mr-1" sy type="plus" />  <h2 class="mb-2 text-xl font-semibold text-gray-500">{{ prod.price.value | currency }}</h2></span>
                                  <div class="w-full text-lg font-semibold"><span>{{ prod.name }}</span></div>
                                  <div class="w-full text-sm">
                                    {{ cat.id === 'container' ?
                                      'Dispositivo físico que contiene su firma electrónica en todos los lugares'
                                      : cat.id !== 'container' && Number(prod.price.value) === 0 ? 'Retirar en Quito - Av. 12 de Octubre N24-739 y Av. Colón Edificio Torre Boreal, Piso 6. Of. 603, Quito 170523' : 'Escoja el lugar de entrega deseado' }}
                                  </div>
                                </div>
                              </label>
                            </li>
                            <div v-if="(cat.id === 'delivery') && (prod._id === product[cat.id]._id) && (prod.price.value > 0)" class="mt-3">
                              <label
                                class="text-sm leading-none text-gray-800"
                              >
                                Digite la dirección para su entrega
                              </label>
                              <tail-textarea v-model="product.delivery.address" rules="required" placeholder="Ingrese su domicilio" name="addressDelivery" />
                            </div>
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <p v-if="cat.id === 'container' && product.container._id" class="my-6 text-md font-normal text-gray-500 sm:px-16 xl:px-20">
                    <b>Recuerde:</b> La firma electrónica en TOKEN podrá ser utilizado para firmar documentos desde aplicativos como Adobe Reader, Firmar EC y Quipux, por
                    el momento no funciona para facturación electrónica y el aplicativo eSIGEF( Ministerio de Finanzas).
                  </p>
                </div>
              </div>
              <div v-if="(form.certType && form.duration && !product.container._id && virtual) || (form.certType && form.duration && product.container._id && product.delivery._id) || (form.certType && form.duration && fast)">
                <h2 class="relative z-30 text-2xl font-bold text-prim  mt-3">
                  Ahora usted ya puede solicitar su firma y llenar el formulario
                </h2>
                <button
                  class="relative z-30 next-form w-full flex mt-5 justify-center bg-prim  hover:bg-prim-3 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                  @click="goToForm()"
                >
                  Siguiente paso
                </button>
              </div>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showSelection === 1" class="min-h-max border-1 md:p-12 pb-10 px-10 xl:mx-auto bg-white h-full">
      <div class="md:flex md:justify-between">
        <div v-if="currentProm === 0" class="w-3/12 px-5 hidden lg:block">
          <div class="relative">
            <center>
              <img width="150px" src="/login-logo.png" alt="">
            </center>
          </div>
          <div v-if="false">
            <p class="my-5">
              Adquiere esta promoción de firma electronica mas 70 comprobantes de forma inmediata completando todos los pasos de este formulario.
            </p>
            <strong>Incluye:</strong>
            <ul class="list-disc ml-10">
              <li>1 Firma electrónica.</li>
              <li>1 año de duración.</li>
              <li>Subscripción al aplicativo UpConta para facturación electrónica.</li>
              <li>Emisión de 70 comprobantes contables.</li>
              <!-- ... -->
            </ul>
          </div>
          <p v-else class="my-5">
            En el registro, el solicitante llenará un formulario con todos los datos necesarios
            para la emisión de una firma electrónica.
          </p>
          <center>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              width="350"
              height="200"
              viewBox="0 0 928.75816 567.73661"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path d="M857.74388,569.26443a10.05579,10.05579,0,0,0,.80113-15.39851l14.4116-32.69992L854.648,524.26882l-10.87859,30.5767a10.11028,10.11028,0,0,0,13.9745,14.41891Z" transform="translate(-135.62092 -166.13169)" fill="#a0616a" />
              <path d="M885.32645,424.37639l-5.24589-1.04918s-7.34424,3.14754-6.29506,12.59013S859.097,495.72047,859.097,495.72047l-14.1639,41.9671,19.93438,4.19671,13.11472-48.26217Z" transform="translate(-135.62092 -166.13169)" fill="#ccc" />
              <path d="M909.12092,584.86831h-114a8.50982,8.50982,0,0,1-8.5-8.5v-11a8.50981,8.50981,0,0,1,8.5-8.5h114a8.51013,8.51013,0,0,1,8.5,8.5v11A8.51014,8.51014,0,0,1,909.12092,584.86831Z" transform="translate(-135.62092 -166.13169)" :fill="$store.state.theme.primaryColor2" />
              <polygon points="766.749 539.503 755.248 543.748 733.399 501.407 750.374 495.141 766.749 539.503" fill="#a0616a" />
              <path d="M883.747,707.64942h23.64386a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H868.86015a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,883.747,707.64942Z" transform="translate(-328.29968 185.66124) rotate(-20.26053)" fill="#2f2e41" />
              <polygon points="788.731 557.111 776.483 556.555 772.799 509.051 790.875 509.872 788.731 557.111" fill="#a0616a" />
              <path d="M767.55224,552.84974h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H752.66539a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,767.55224,552.84974Z" fill="#2f2e41" />
              <path d="M869.58878,529.29415v0a64.582,64.582,0,0,0-15.886,39.06045l-4.04838,75.29989,35.672,62.95065,19.93437-10.49177-24.13108-47.213,14.68848-45.11464L935.687,572.31043l-3.14753-45.11464Z" transform="translate(-135.62092 -166.13169)" fill="#2f2e41" /><polygon points="789.574 401.982 800.066 406.179 791.673 550.965 767.542 547.818 760.197 437.654 789.574 401.982" fill="#2f2e41" /><path d="M902.86853,553.89864A10.05579,10.05579,0,0,1,916.249,546.2358l22.67947-27.61559,5.49195,17.739-22.37878,23.50466a10.11027,10.11027,0,0,1-19.17309-5.96523Z" transform="translate(-135.62092 -166.13169)" fill="#a0616a" /><circle cx="775.61928" cy="216.38257" r="24.56103" fill="#a0616a" /><path d="M947.75252,429.09769s-28.3278-26.754-67.14737-6.29507c0,0-9.96719,101.24564-16.26225,111.73742,0,0,54.55723-7.34425,69.24572-3.14754,0,0,0-44.06545,9.4426-60.8523S947.75252,429.09769,947.75252,429.09769Z" transform="translate(-135.62092 -166.13169)" fill="#ccc" /><path d="M936.73615,431.72063l11.512-2.12727a29.45574,29.45574,0,0,1,12.61905,14.7174c4.19671,10.49178,15.73766,61.90148,15.73766,61.90148l-45.11464,45.11464-9.4426-13.63931,28.3278-37.77039L935.687,468.44185Z" transform="translate(-135.62092 -166.13169)" fill="#ccc" /><path d="M932.24851,395.65565a2.13479,2.13479,0,0,0-1.85636-2.81905,4.93046,4.93046,0,0,0-3.4761,1.715,13.8334,13.8334,0,0,1-3.07115,2.63711c-1.18812.59889-2.79953.51354-3.47685-.62824-.63605-1.07221-.20023-2.508.18482-3.75347a36.9067,36.9067,0,0,0,1.62991-9.77c.11092-3.70032-.41115-7.562-2.45972-10.44807-2.64387-3.72475-7.37142-5.13883-11.84544-5.0363s-8.87547,1.48362-13.30713,2.35665c-1.52992.30139-3.32826.4555-4.35153-.73025-1.08805-1.26082-.68844-3.3014-.22563-5.00376,1.20094-4.41743,2.475-8.98461,5.26525-12.55224a18.89839,18.89839,0,0,1,12.06081-6.79014,28.93848,28.93848,0,0,1,13.46236,1.52838,36.09628,36.09628,0,0,1,17.68285,12.3186A29.23592,29.23592,0,0,1,944.04269,380.28a26.66715,26.66715,0,0,1-9.88578,16.85462" transform="translate(-135.62092 -166.13169)" fill="#2f2e41" /><path d="M677.62092,588.13169h-533a9.01016,9.01016,0,0,1-9-9v-404a9.01047,9.01047,0,0,1,9-9h533a9.01016,9.01016,0,0,1,9,9v404A9.00984,9.00984,0,0,1,677.62092,588.13169Zm-533-420a7.00786,7.00786,0,0,0-7,7v404a7.00817,7.00817,0,0,0,7,7h533a7.00849,7.00849,0,0,0,7-7v-404a7.00818,7.00818,0,0,0-7-7Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6" /><path d="M625.62092,262.13169h-429a9.01047,9.01047,0,0,1-9-9v-31a9.01047,9.01047,0,0,1,9-9h429a9.01016,9.01016,0,0,1,9,9v31A9.01015,9.01015,0,0,1,625.62092,262.13169Zm-429-47a7.00786,7.00786,0,0,0-7,7v31a7.00785,7.00785,0,0,0,7,7h429a7.00818,7.00818,0,0,0,7-7v-31a7.00818,7.00818,0,0,0-7-7Z" transform="translate(-135.62092 -166.13169)" :fill="$store.state.theme.primaryColor3" /><path d="M366.62092,345.13169h-170a9.01047,9.01047,0,0,1-9-9v-31a9.01047,9.01047,0,0,1,9-9h170a9.01047,9.01047,0,0,1,9,9v31A9.01047,9.01047,0,0,1,366.62092,345.13169Zm-170-47a7.00786,7.00786,0,0,0-7,7v31a7.00785,7.00785,0,0,0,7,7h170a7.00786,7.00786,0,0,0,7-7v-31a7.00787,7.00787,0,0,0-7-7Z" transform="translate(-135.62092 -166.13169)" :fill="$store.state.theme.primaryColor3" /><path d="M625.62092,345.13169h-170a9.01047,9.01047,0,0,1-9-9v-31a9.01047,9.01047,0,0,1,9-9h170a9.01016,9.01016,0,0,1,9,9v31A9.01015,9.01015,0,0,1,625.62092,345.13169Zm-170-47a7.00786,7.00786,0,0,0-7,7v31a7.00785,7.00785,0,0,0,7,7h170a7.00818,7.00818,0,0,0,7-7v-31a7.00818,7.00818,0,0,0-7-7Z" transform="translate(-135.62092 -166.13169)" :fill="$store.state.theme.primaryColor3" /><path d="M626.12092,541.13169h-114a8.50981,8.50981,0,0,1-8.5-8.5v-11a8.50982,8.50982,0,0,1,8.5-8.5h114a8.51014,8.51014,0,0,1,8.5,8.5v11A8.51013,8.51013,0,0,1,626.12092,541.13169Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6" /><path d="M215.62092,397.13169a8,8,0,1,1,8-8A8.00916,8.00916,0,0,1,215.62092,397.13169Zm0-14a6,6,0,1,0,6,6A6.00656,6.00656,0,0,0,215.62092,383.13169Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6" /><path d="M215.62092,423.13169a8,8,0,1,1,8-8A8.00916,8.00916,0,0,1,215.62092,423.13169Zm0-14a6,6,0,1,0,6,6A6.00656,6.00656,0,0,0,215.62092,409.13169Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6" /><path d="M215.62092,449.13169a8,8,0,1,1,8-8A8.00916,8.00916,0,0,1,215.62092,449.13169Zm0-14a6,6,0,1,0,6,6A6.00656,6.00656,0,0,0,215.62092,435.13169Z" transform="translate(-135.62092 -166.13169)" :fill="$store.state.theme.primaryColor3" /><path d="M254.62092,382.63169a6.5,6.5,0,0,0,0,13h93a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6" /><path d="M254.62092,408.63169a6.5,6.5,0,0,0,0,13h93a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6" /><path d="M254.62092,434.63169a6.5,6.5,0,0,0,0,13h93a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6" /><path d="M475.12092,397.13169a8,8,0,1,1,8-8A8.00916,8.00916,0,0,1,475.12092,397.13169Zm0-14a6,6,0,1,0,6,6A6.00656,6.00656,0,0,0,475.12092,383.13169Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6" /><path d="M475.12092,423.13169a8,8,0,1,1,8-8A8.00916,8.00916,0,0,1,475.12092,423.13169Zm0-14a6,6,0,1,0,6,6A6.00656,6.00656,0,0,0,475.12092,409.13169Z" transform="translate(-135.62092 -166.13169)" :fill="$store.state.theme.primaryColor3" /><path d="M475.12092,449.13169a8,8,0,1,1,8-8A8.00916,8.00916,0,0,1,475.12092,449.13169Zm0-14a6,6,0,1,0,6,6A6.00656,6.00656,0,0,0,475.12092,435.13169Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6" /><path d="M475.12092,475.13169a8,8,0,1,1,8-8A8.00916,8.00916,0,0,1,475.12092,475.13169Zm0-14a6,6,0,1,0,6,6A6.00656,6.00656,0,0,0,475.12092,461.13169Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6" /><path d="M513.12092,382.63169a6.5,6.5,0,1,0,0,13h93a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6" /><path d="M513.12092,408.63169a6.5,6.5,0,1,0,0,13h93a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6" /><path d="M513.12092,434.63169a6.5,6.5,0,1,0,0,13h93a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6" /><path d="M513.12092,460.63169a6.5,6.5,0,1,0,0,13h93a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6" /><path d="M215.74787,314.13169a6.5,6.5,0,1,0,0,13h111a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6" /><path d="M215.74787,231.13169a6.5,6.5,0,1,0,0,13h111a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" :fill="$store.state.theme.primaryColor" /><path d="M345.00373,316.45616a.5.5,0,0,0-.43311.75l4.24414,7.35107a.50016.50016,0,0,0,.86621,0l4.24414-7.35107a.5.5,0,0,0-.4331-.75Z" transform="translate(-135.62092 -166.13169)" :fill="$store.state.theme.primaryColor" /><path d="M474.74787,314.13169a6.5,6.5,0,0,0,0,13h111a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6" /><path d="M604.00373,316.45616a.5.5,0,0,0-.43311.75l4.24414,7.35107a.50016.50016,0,0,0,.86621,0l4.24414-7.35107a.5.5,0,0,0-.4331-.75Z" transform="translate(-135.62092 -166.13169)" :fill="$store.state.theme.primaryColor" /><circle cx="339.5" cy="249" r="4" :fill="$store.state.theme.primaryColor" /><circle cx="80" cy="275" r="4" :fill="$store.state.theme.primaryColor" /><path d="M1063.1884,733.86831h-320.294a1.19068,1.19068,0,0,1,0-2.38137h320.294a1.19068,1.19068,0,0,1,0,2.38137Z" transform="translate(-135.62092 -166.13169)" :fill="$store.state.theme.primaryColor3" /></svg>
          </center>
        </div>
        <div v-if="currentProm === 1" class="w-3/12 px-5 hidden lg:block">
          <div class="relative mt-14">
            <center>
              <img width="150px" src="/login-logo.png" alt="">
            </center>
          </div>
          <p class="my-5">
            Debe adjuntar los documentos necesarios para esta solicitud.
          </p>
          <center class="mt-10">
            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="300" viewBox="0 0 777.69685 613.28514" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M352.94583,215.69156a10.05577,10.05577,0,0,0-8.543,12.83638l-29.07453,20.7762,17.33071,6.66935,24.95268-20.75192a10.11027,10.11027,0,0,0-4.66584-19.53Z" transform="translate(-211.15157 -143.35743)" fill="#ffb8b8" /><path d="M350.24195,246.986l-36.06422,36.28719a29.89622,29.89622,0,0,1-18.41948,8.62953l-44.5634,4.066a12.27993,12.27993,0,0,1-9.11541-2.8646,11.99558,11.99558,0,0,1,5.29328-20.95052l45.52648-9.69376,41.44849-30.5531a3.79287,3.79287,0,0,1,3.76933.0281l11.27183,9.23372a3.70275,3.70275,0,0,1,1.86773,3.88642A3.618,3.618,0,0,1,350.24195,246.986Z" transform="translate(-211.15157 -143.35743)" fill="#2f2e41" /><path d="M782.628,266.48724a12.13173,12.13173,0,0,0-6.71771-12.199L551.46863,144.59115a12.0995,12.0995,0,0,0-16.18578,5.55125l-.00411.00842L451.09862,322.3844a12.12136,12.12136,0,0,0,5.55968,16.18989L681.09991,448.27138a12.12137,12.12137,0,0,0,16.1899-5.55968l84.18011-172.23357A12.01171,12.01171,0,0,0,782.628,266.48724Z" transform="translate(-211.15157 -143.35743)" fill="#f2f2f2" /><path d="M651.14179,648.76059H359.91726a13.84469,13.84469,0,0,1-13.8291-13.8291V239.582a13.84469,13.84469,0,0,1,13.8291-13.8291H651.14179a13.84469,13.84469,0,0,1,13.8291,13.8291v395.3495A13.84469,13.84469,0,0,1,651.14179,648.76059Z" transform="translate(-211.15157 -143.35743)" fill="#fff" /><circle cx="226.0083" cy="181.28514" r="19" fill="#e6e6e6" /><path d="M408.20138,376.57177a54.43119,54.43119,0,0,0,8.39893,3.8706l.51318.17774A54.76653,54.76653,0,0,0,435.32,383.71239c1.24756,0,2.44922-.04345,3.572-.12842a54.13483,54.13483,0,0,0,8.12305-1.12011c1.46826-.3208,2.93188-.70459,4.34814-1.13916.34253-.10108.65967-.2002,1.00684-.30908a55.18285,55.18285,0,0,0,16.052-8.31788,24.80532,24.80532,0,0,0-1.279-2.14892,27.42455,27.42455,0,0,0-22.98315-12.40625h-10a27.516,27.516,0,0,0-25.0254,16.08789A24.98384,24.98384,0,0,0,408.20138,376.57177Z" transform="translate(-211.15157 -143.35743)" fill="#e6e6e6" /><path d="M443.60748,381.99078a3.61841,3.61841,0,0,0-1.7801.6245,53.17031,53.17031,0,0,0,7.97082-1.10638Z" transform="translate(-211.15157 -143.35743)" fill="#2f2e41" /><path d="M438.31173,273.08257a55.56576,55.56576,0,0,0-27.72021,103.72,54.6388,54.6388,0,0,0,8.83007,4.11005l.52.18a55.25847,55.25847,0,0,0,18.37012,3.12c1.21,0,2.41992-.04,3.60986-.13a54.65,54.65,0,0,0,8.19-1.13c1.51025-.33,2.99023-.72,4.39013-1.15.33985-.1.65967-.2,1.00977-.31a55.57115,55.57115,0,0,0-17.19971-108.41Zm32.23975,97.19a52.68148,52.68148,0,0,1-15.94971,8.41c-.31006.1-.63037.2-.9502.3-1.33007.41-2.73.76995-4.16992,1.07995a51.23077,51.23077,0,0,1-7.75,1.08c-1.12988.08-2.28027.12-3.41992.12a52.5441,52.5441,0,0,1-17.39014-2.95l-.48974-.17a51.23572,51.23572,0,0,1-8.76026-4.12,52.57628,52.57628,0,1,1,58.87989-3.75Z" transform="translate(-211.15157 -143.35743)" fill="#ccc" /><path d="M364.67642,494.92223" transform="translate(-211.15157 -143.35743)" fill="#f2f2f2" /><path d="M651.14179,648.76059H359.91726a13.84469,13.84469,0,0,1-13.8291-13.8291V239.582a13.84469,13.84469,0,0,1,13.8291-13.8291H651.14179a13.84469,13.84469,0,0,1,13.8291,13.8291v395.3495A13.84469,13.84469,0,0,1,651.14179,648.76059ZM359.91726,227.37984A12.216,12.216,0,0,0,347.71512,239.582v395.3495a12.216,12.216,0,0,0,12.20214,12.20215H651.14179a12.216,12.216,0,0,0,12.20215-12.20215V239.582a12.216,12.216,0,0,0-12.20215-12.20215Z" transform="translate(-211.15157 -143.35743)" fill="#ccc" /><path d="M594.7642,328.43312H512.35768a6.51929,6.51929,0,1,1,0-13.03858H594.7642a6.51929,6.51929,0,1,1,0,13.03858Z" transform="translate(-211.15157 -143.35743)" fill="#e6e6e6" /><path d="M621.65628,350.43573H512.35768a6.51929,6.51929,0,1,1,0-13.03858h109.2986a6.51929,6.51929,0,0,1,0,13.03858Z" transform="translate(-211.15157 -143.35743)" fill="#e6e6e6" /><path d="M594.64422,434.82487H389.40277a6.51929,6.51929,0,1,1,0-13.03858H594.64422a6.51929,6.51929,0,1,1,0,13.03858Z" transform="translate(-211.15157 -143.35743)" fill="#e6e6e6" /><path d="M621.5363,456.82748H389.40277a6.51929,6.51929,0,1,1,0-13.03858H621.5363a6.51929,6.51929,0,0,1,0,13.03858Z" transform="translate(-211.15157 -143.35743)" fill="#e6e6e6" /><path d="M594.64422,507.39792H389.40277a6.51929,6.51929,0,1,1,0-13.03858H594.64422a6.51929,6.51929,0,1,1,0,13.03858Z" transform="translate(-211.15157 -143.35743)" fill="#e6e6e6" /><path d="M621.5363,529.40053H389.40277a6.51929,6.51929,0,0,1,0-13.03858H621.5363a6.51929,6.51929,0,1,1,0,13.03858Z" transform="translate(-211.15157 -143.35743)" fill="#e6e6e6" /><path d="M594.64422,579.971H389.40277a6.51929,6.51929,0,0,1,0-13.03859H594.64422a6.51929,6.51929,0,1,1,0,13.03859Z" transform="translate(-211.15157 -143.35743)" fill="#e6e6e6" /><path d="M621.5363,601.97358H389.40277a6.51929,6.51929,0,0,1,0-13.03859H621.5363a6.5193,6.5193,0,0,1,0,13.03859Z" transform="translate(-211.15157 -143.35743)" fill="#e6e6e6" /><path d="M772.628,379.48724a12.13173,12.13173,0,0,0-6.71771-12.199L541.46863,257.59115a12.0995,12.0995,0,0,0-16.18578,5.55125l-.00411.00842L441.09862,435.3844a12.12136,12.12136,0,0,0,5.55968,16.18989L671.09991,561.27138a12.12137,12.12137,0,0,0,16.1899-5.55968l84.18011-172.23357A12.01171,12.01171,0,0,0,772.628,379.48724Z" transform="translate(-211.15157 -143.35743)" fill="#fff" /><path d="M772.628,379.48724a12.13173,12.13173,0,0,0-6.71771-12.199L541.46863,257.59115a12.0995,12.0995,0,0,0-16.18578,5.55125l-.00411.00842L441.09862,435.3844a12.12136,12.12136,0,0,0,5.55968,16.18989L671.09991,561.27138a12.12137,12.12137,0,0,0,16.1899-5.55968l84.18011-172.23357A12.01171,12.01171,0,0,0,772.628,379.48724ZM686.01043,555.0864a10.69317,10.69317,0,0,1-14.28521,4.9056L447.2836,450.29492a10.69321,10.69321,0,0,1-4.90557-14.28521l84.18011-172.23357a10.69317,10.69317,0,0,1,14.28518-4.90559L765.28494,368.56764a10.69321,10.69321,0,0,1,4.90561,14.28519Z" transform="translate(-211.15157 -143.35743)" :fill="$store.state.theme.secondaryColor" /><path d="M748.14785,387.3187,689.36749,507.58406a3.369,3.369,0,0,1-4.50563,1.549l-.00011,0-204.16-99.78435a2.83892,2.83892,0,0,1-.41747-.24582,3.367,3.367,0,0,1-1.13054-4.26189l58.78038-120.26542a3.369,3.369,0,0,1,4.50569-1.54893h0L746.59984,382.811a3.369,3.369,0,0,1,1.549,4.50565l0,.00009Z" transform="translate(-211.15157 -143.35743)" fill="#e6e6e6" /><circle cx="357.75864" cy="208.28689" r="29.56668" ::fill="$store.state.theme.primaryColor" /><path d="M612.20158,474.21733,481.88833,410.526a2.95392,2.95392,0,0,1-.46807-.2766l113.80964-76.6327a4.80317,4.80317,0,0,1,7.51178,3.67142l6.34775,91.85777.30612,4.39658Z" transform="translate(-211.15157 -143.35743)" :fill="$store.state.theme.secondaryColor" /><polygon points="401.05 330.86 356.558 309.114 393.905 288.064 396.594 286.548 397.938 285.789 398.244 290.185 401.05 330.86" opacity="0.2" style="isolation:isolate" /><path d="M684.75906,509.6802,572.0488,454.59244l37.34677-21.05,2.68877-1.51719L660.75207,404.592c3.19024-1.7977,7.76143.22749,8.79816,3.667a5.71792,5.71792,0,0,1,.16006.71138Z" transform="translate(-211.15157 -143.35743)" :fill="$store.state.theme.secondaryColor" /><polygon points="125.844 376.82 138.103 376.819 143.936 329.531 125.841 329.532 125.844 376.82" fill="#ffb8b8" /><path d="M333.86788,516.1748l24.1438-.001h.001a15.38605,15.38605,0,0,1,15.38647,15.38623v.5l-39.53051.00146Z" transform="translate(-211.15157 -143.35743)" fill="#2f2e41" /><polygon points="30.551 369.014 43.253 371.498 58.881 323.688 40.135 320.021 30.551 369.014" fill="#ffb8b8" /><path d="M239.27428,507.59042l25.01436,4.89306.001.0002a16.24294,16.24294,0,0,1,12.82227,19.05981l-.10135.518L236.05472,524.05Z" transform="translate(-211.15157 -143.35743)" fill="#2f2e41" /><path d="M354.8316,357.05617a10.05575,10.05575,0,0,0-14.13593-6.15884l-25.5542-24.97923L311.61562,344.15l24.80726,20.92555a10.11027,10.11027,0,0,0,18.40872-8.01938Z" transform="translate(-211.15157 -143.35743)" fill="#ffb8b8" /><circle cx="48.87092" cy="60.56582" r="24.56103" fill="#ffb8b8" /><path d="M254.865,228.86026c1.30495.571,3.97731-9.82732,2.78024-11.90707-1.78024-3.09293-1.675-3.07071-2.85681-5.117s-1.44623-4.84712.08417-6.64761,5.072-1.56163,5.77042.69581c-.4493-4.2878,3.79189-7.73454,7.993-8.70313s8.63244-.36723,12.85668-1.22917c4.90243-1.00032,10.00316-5.10972,8.04719-10.5007a7.5932,7.5932,0,0,0-1.48106-2.43408c-2.25992-2.54094-5.42117-3.62594-8.512-4.675-6.43006-2.18246-13.036-4.39233-19.82212-4.15141a28.7977,28.7977,0,0,0-25.44625,18.60924,26.156,26.156,0,0,0-1.08344,4.02534c-2.32924,12.52423,4.94368,24.87794,16.75623,29.64715Z" transform="translate(-211.15157 -143.35743)" fill="#2f2e41" /><path d="M248.83468,363.78417a3.75449,3.75449,0,0,1-1.77783-3.7168l-11.083-54.90136-11.23437-42.13477h.00024A21.07382,21.07382,0,0,1,235.291,238.94042l7.427-7.02734,16.20239,6.98047,7.699,7.82812a44.02687,44.02687,0,0,1,22.99316,27.26074L301.9609,316.2373,330.47823,358.664a3.77282,3.77282,0,0,1-.36938,4.67969C326.14157,367.61132,248.83468,363.78417,248.83468,363.78417Z" transform="translate(-211.15157 -143.35743)" fill="#2f2e41" /><path d="M323.54806,359.88378l-42.05078-29.13965A29.89622,29.89622,0,0,1,269.77047,314.124L257.9504,270.96483a12.28,12.28,0,0,1,1.22119-9.47656,11.99558,11.99558,0,0,1,21.5542,1.53613l17.52954,43.12012,37.3501,35.44629a3.79288,3.79288,0,0,1,.63355,3.71582l-7.11328,12.7168a3.70279,3.70279,0,0,1-3.49854,2.52051A3.618,3.618,0,0,1,323.54806,359.88378Z" transform="translate(-211.15157 -143.35743)" fill="#2f2e41" /><path d="M236.188,505.05272a3.74374,3.74374,0,0,1-.44751-3.42285l19.45362-70.71972,1.438-69.29493,65.48633-4.49121.31787-.02148,19.72412,35.749a91.97727,91.97727,0,0,1,11.10035,36.23535l6.5,71.2295a3.71631,3.71631,0,0,1-3.25074,4.06445l-19.7456,1.87793a3.67409,3.67409,0,0,1-4.07886-3.11133l-8.01807-72.38281-28.84961-48.74512-9.68408,51.31836L266.071,504.207a3.7189,3.7189,0,0,1-3.45825,2.42578l-23.40015.00977A3.63923,3.63923,0,0,1,236.188,505.05272Z" transform="translate(-211.15157 -143.35743)" fill="#2f2e41" /><path d="M737.61617,737.64257H244.15157a33.03734,33.03734,0,0,1-33-33v-271a33.03734,33.03734,0,0,1,33-33h60.50269a32.92486,32.92486,0,0,1,22.19507,8.57959l65.61157,46.85107a23.18228,23.18228,0,0,0,15.65869,6.06934H740.68014A33.00029,33.00029,0,0,1,773.67672,495.625l-3.064,209.5A33.13847,33.13847,0,0,1,737.61617,737.64257Z" transform="translate(-211.15157 -143.35743)" fill="#fff" /><path d="M733.23214,721.64257H247.071a15.93751,15.93751,0,0,1-15.91944-15.9195V430.292A15.93754,15.93754,0,0,1,247.071,414.37252a14.09636,14.09636,0,0,1,14.08056,14.08056v258.27A14.9364,14.9364,0,0,0,276.071,701.64251H731.5903a10.12538,10.12538,0,0,1,9.91528,7.5874,9.72,9.72,0,0,1-4.30689,11.18457A7.59512,7.59512,0,0,1,733.23214,721.64257Z" transform="translate(-211.15157 -143.35743)" fill="#f2f2f2" /><path d="M494.57588,589.36994l-1.28-1.28a1.37,1.37,0,0,1-.06356-1.9364q.0307-.03286.06356-.0636l11.23-11.24a1.37,1.37,0,0,1,1.93644-.0636q.03282.03076.06356.0636l11.23,11.23a1.39,1.39,0,0,1,.03454,1.96546l-.03454.03454-1.28,1.28a1.39,1.39,0,0,1-1.96546.03455l-.03454-.03455-6.64-7v16.61a1.37994,1.37994,0,0,1-1.36993,1.38995l-.01007.00006h-1.85a1.39,1.39,0,0,1-1.39-1.39h0V582.38l-6.64,7a1.39,1.39,0,0,1-1.9656.02472Z" transform="translate(-211.15157 -143.35743)" :fill="$store.state.theme.primaryColor" /><path d="M505.50591,564.64a22.79,22.79,0,1,1-22.79,22.79h0a22.81,22.81,0,0,1,22.79-22.79m0-3a25.79,25.79,0,1,0,25.79,25.79h0A25.79,25.79,0,0,0,505.50591,561.64Z" transform="translate(-211.15157 -143.35743)" :fill="$store.state.theme.secondaryColor" /><path d="M737.61617,737.64257H244.15157a33.03734,33.03734,0,0,1-33-33v-271a33.03734,33.03734,0,0,1,33-33h60.50269a32.92486,32.92486,0,0,1,22.19507,8.57959l65.61157,46.85107a23.18228,23.18228,0,0,0,15.65869,6.06934H740.68014A33.00029,33.00029,0,0,1,773.67672,495.625l-3.064,209.5A33.13847,33.13847,0,0,1,737.61617,737.64257Zm-493.4646-335a31.03529,31.03529,0,0,0-31,31v271a31.03529,31.03529,0,0,0,31,31h493.4646a31.12957,31.12957,0,0,0,30.99659-30.54688l3.06421-209.5a31,31,0,0,0-30.99683-31.45312H408.11959a25.17915,25.17915,0,0,1-16.96216-6.55127l-65.61132-46.85108a30.93108,30.93108,0,0,0-20.89185-8.09765Z" transform="translate(-211.15157 -143.35743)" :fill="$store.state.theme.secondaryColor" /><polygon points="568.285 599.561 556.025 599.561 552.193 552.273 568.287 552.274 568.285 599.561" fill="#ffb8b8" /><path d="M782.56291,754.803l-39.53051-.00147v-.5a15.38605,15.38605,0,0,1,15.38647-15.38623h.001l24.1438.001Z" transform="translate(-211.15157 -143.35743)" fill="#2f2e41" /><polygon points="705.285 599.561 693.025 599.561 687.193 552.273 705.287 552.274 705.285 599.561" fill="#ffb8b8" /><path d="M919.56291,754.803l-39.53051-.00147v-.5a15.38605,15.38605,0,0,1,15.38647-15.38623h.001l24.1438.001Z" transform="translate(-211.15157 -143.35743)" fill="#2f2e41" /><path d="M876.1253,596.73307a11.29143,11.29143,0,0,0,.29141-14.3014,9.29926,9.29926,0,0,0-1.071-1.09138l9.234-34.09151-15.39037,5.10584-6.4092,31.5911a11.37213,11.37213,0,0,0,1.01721,12.44942A7.89882,7.89882,0,0,0,876.1253,596.73307Z" transform="translate(-211.15157 -143.35743)" fill="#ffb8b8" /><path d="M875.53292,575.76171a3.90859,3.90859,0,0,1-.57641-.043l-8.01953-1.20947a4.34336,4.34336,0,0,1-3.0127-2.0874,5.60344,5.60344,0,0,1-.70313-3.87256l10.00538-55.88184-6.78565-35.90137c-1.30835-6.90918,2.06665-13.8872,7.85108-16.23193a10.72756,10.72756,0,0,1,10.49316,1.34424,14.31655,14.31655,0,0,1,5.62134,10.20849l4.80249,45.77637-.05738.19922L879.69479,572.311A4.47572,4.47572,0,0,1,875.53292,575.76171Z" transform="translate(-211.15157 -143.35743)" :fill="$store.state.theme.primaryColor" /><circle cx="662.01317" cy="272.83111" r="24.56103" fill="#ffb8b8" /><path d="M860.58956,530.35888a4.97146,4.97146,0,0,1-1.78906-.333l-38.82056-14.93164a4.98327,4.98327,0,0,1-3.16137-5.32764l1.55908-11.69287a26.50127,26.50127,0,0,1,6.24975-23.59033l.94532-1.04,11.48535-20.94385a12.25972,12.25972,0,0,1,16.73071-4.80761l20.28223,11.334a12.238,12.238,0,0,1,5.65014,6.82519,37.406,37.406,0,0,1-.5725,25.19629L865.26193,527.1538A5.03505,5.03505,0,0,1,860.58956,530.35888Z" transform="translate(-211.15157 -143.35743)" :fill="$store.state.theme.primaryColor" /><path d="M758.85177,731.3081l-.05273-.01026a5.0008,5.0008,0,0,1-3.92164-6.05957l29.74854-130.03955a350.67931,350.67931,0,0,1,20.102-60.146l12.65625-28.85644,47.22608,21.56006,6.74291,12.33252a120.69737,120.69737,0,0,1,7.97632,43.02246l47.98658,140.63183a4.99969,4.99969,0,0,1-3.90967,6.54639l-26.269-.29687a4.04456,4.04456,0,0,1-.751.06347,4.96678,4.96678,0,0,1-4.62134-3.13476l-54.85425-142.186a1.0056,1.0056,0,0,0-.96191-.61963.97054.97054,0,0,0-.90283.65674l-52.04761,142.894a4.97557,4.97557,0,0,1-5.58789,3.21Z" transform="translate(-211.15157 -143.35743)" fill="#2f2e41" /><path d="M794.76536,571.39216a10.05576,10.05576,0,0,0,5.36511-14.45584l23.523-26.90067-18.39942-2.50893-19.517,25.93a10.11027,10.11027,0,0,0,9.02832,17.93546Z" transform="translate(-211.15157 -143.35743)" fill="#ffb8b8" /><path d="M805.854,552.44189a5.00894,5.00894,0,0,1-2.34766-.58594l-8.27783-4.415a5.00071,5.00071,0,0,1-1.86865-7.09131l30.57422-48.17725,5.30151-36.35644a14.03461,14.03461,0,1,1,27.52148,5.356l-10.946,44.811-36.06323,44.60449A4.98359,4.98359,0,0,1,805.854,552.44189Z" transform="translate(-211.15157 -143.35743)" :fill="$store.state.theme.primaryColor" /><path d="M851.0572,395.92355c2.841-9.31634,19.25481-13.47286,32.89789-9.60742s23.44419,14.0001,25.72575,23.90877c5.05239,21.9422-21.30043,39.75058-16.525,61.69533,3.15948,14.51885,21.43586,28.24626,42.02041,31.56157-22.68517,4.74615-50.37341.57437-71.41-10.75935-13.09259-7.05379-24.07717-17.69856-23.91119-28.43533.10049-6.501,4.23589-12.24949,9.29313-17.21585s11.11108-9.38126,15.75221-14.56516,7.85664-11.391,6.50229-17.97171-8.23545-13.4434-17.4938-15.35808Z" transform="translate(-211.15157 -143.35743)" fill="#2f2e41" /><path d="M987.84843,756.64257h-381a1,1,0,0,1,0-2h381a1,1,0,0,1,0,2Z" transform="translate(-211.15157 -143.35743)" fill="#ccc" /></svg>
          </center>
        </div>
        <div v-if="currentProm === 2" class="w-3/12 px-5 hidden lg:block">
          <div>
            <h1 class="mb-4 text-3xl leading-tight font-bold tracking-tighter">
              -Indicaciones
            </h1>
            <h1 class="mb-2">
              Debemos verificar que eres quien dices ser.
            </h1>
            <div v-if="tabPhoto === '' || tabPhoto === '1' || tabPhoto === '2'">
              <div>
                <h3>
                  Características de la fotografía de rostro y documento de identificación:
                </h3>
                <ul class="list-disc ml-10 mt-2">
                  <li>
                    Seleccionar la forma en la cual verificará su identidad: fotografía o video
                  </li>
                  <li>
                    Formatos aceptados para su fotografía JPG, JPGE, PNG y archivos PDF.
                  </li>
                  <li>
                    Formatos aceptados para su video WEBM, MP4 y MOV.
                  </li>
                </ul>
                <h1 class="mt-2">
                  Si su documento no cumple con las características requeridas, le solicitaremos una nueva verificación.
                </h1>
              </div>
            </div>
            <div v-else>
              <div>
                <h3 class="mb-2">
                  Usted debe mencionar el siguiente diálogo en su video:
                </h3>
                <ul class="list-disc ml-10">
                  <li>
                    Yo <b>Su nombre</b> confirmo que deseo solicitar una firma electrónica.
                  </li>
                  <li>Con número de identificación <b>Su identificación</b></li>
                  <li>Subir el video.</li>
                  <li>
                    Formatos aceptados .MP4 Y .AVI.
                  </li>
                </ul>
                <p>
                  Si el video no cumple con las características anteriormente indicadas le solicitaremos una nueva verificación.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!fedotaxi && !convenio && currentProm === 3" class="w-2/12 hidden lg:block">
          <div class="relative mt-14">
            <center>
              <img width="150px" src="/login-logo.png" alt="">
            </center>
          </div>
          <p class="my-5">
            Factura tu compra a los datos ingresados o ingresa los datos deseados para la facturación.
          </p>
          <center class="mt-10">
            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="300.11121" viewBox="0 0 598.11121 535.11426" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M304.29593,302.51687a4.59436,4.59436,0,0,0-3.18166,5.65638l76.71619,273.97819a4.59431,4.59431,0,0,0,5.65637,3.1816l282.81481-79.19052a4.59437,4.59437,0,0,0,3.18162-5.65631L592.76707,226.508a4.59434,4.59434,0,0,0-5.65633-3.18168Z" transform="translate(-300.94439 -182.44287)" fill="#e6e6e6" /><path d="M387.04091,572.39573l269.50474-75.46358L583.55634,236.26384,314.0516,311.72742Z" transform="translate(-300.94439 -182.44287)" fill="#fff" /><path d="M349.68366,346.53414c-1.79809.50348-2.53942,3.49029-1.65249,6.6578s3.07152,5.335,4.86961,4.83156L475.8179,323.60568c1.79808-.50348,2.53941-3.4903,1.65248-6.6578s-3.07151-5.335-4.8696-4.83156Z" transform="translate(-300.94439 -182.44287)" fill="#e6e6e6" /><path d="M359.58247,381.886c-1.79808.50348-2.53941,3.49029-1.65248,6.6578s3.07151,5.335,4.8696,4.83156l122.91712-34.41782c1.79809-.50348,2.53942-3.49029,1.65249-6.6578s-3.07152-5.335-4.86961-4.83156Z" transform="translate(-300.94439 -182.44287)" fill="#e6e6e6" /><path d="M369.36719,416.83036c-1.79809.50348-2.53942,3.49026-1.65249,6.6578s3.07152,5.335,4.86961,4.83156L495.50143,393.9019c1.79808-.50348,2.53942-3.49027,1.65248-6.6578s-3.07151-5.335-4.8696-4.83156Z" transform="translate(-300.94439 -182.44287)" fill="#e6e6e6" /><path d="M379.266,452.18218c-1.79809.50348-2.53943,3.49027-1.65249,6.6578s3.07151,5.335,4.8696,4.83156l122.91712-34.41782c1.79809-.50348,2.53943-3.49026,1.65249-6.6578s-3.07152-5.335-4.86961-4.83156Z" transform="translate(-300.94439 -182.44287)" fill="#e6e6e6" /><path d="M534.9799,295.05735a5.96564,5.96564,0,1,0,3.21712,11.48936l22.97873-6.43423a5.96564,5.96564,0,0,0-3.21712-11.48937Z" transform="translate(-300.94439 -182.44287)" fill="#e6e6e6" /><path d="M544.68685,329.724a5.96564,5.96564,0,1,0,3.21712,11.48936l22.97872-6.43423a5.96564,5.96564,0,0,0-3.21712-11.48937Z" transform="translate(-300.94439 -182.44287)" fill="#e6e6e6" /><path d="M554.39379,364.39058a5.96563,5.96563,0,1,0,3.21711,11.48936l22.97873-6.43423a5.96564,5.96564,0,0,0-3.21712-11.48937Z" transform="translate(-300.94439 -182.44287)" fill="#e6e6e6" /><path d="M564.10073,399.05721a5.96564,5.96564,0,0,0,3.21712,11.48936l22.97873-6.43424a5.96564,5.96564,0,0,0-3.21712-11.48936Z" transform="translate(-300.94439 -182.44287)" fill="#e6e6e6" /><path d="M573.37484,459.14634a7.60151,7.60151,0,1,0,4.0993,14.63992l29.27976-8.19858a7.6015,7.6015,0,0,0-4.09929-14.63992h0Z" transform="translate(-300.94439 -182.44287)" :fill="$store.state.theme.primaryColor" /><rect
              x="382.94479"
              y="459.87697"
              width="225"
              height="2"
              transform="translate(-406.86374 -31.78243) rotate(-15.64269)"
              fill="#e6e6e6"
            /><polygon points="520.202 506.072 502.825 510.273 478.352 445.247 503.999 439.047 520.202 506.072" fill="#a0616a" /><path d="M773.78964,717.55713l-.11768-.48584a22.23326,22.23326,0,0,1,16.36792-26.80518l33.99854-8.21924,5.33618,22.07276Z" transform="translate(-300.94439 -182.44287)" fill="#2f2e41" /><polygon points="443.276 517.91 425.399 517.909 416.894 448.953 443.279 448.954 443.276 517.91" fill="#a0616a" /><path d="M748.55062,717.45361l-57.18628-.00244v-.5a22.20823,22.20823,0,0,1,22.20826-22.20752h.001l34.978.00147Z" transform="translate(-300.94439 -182.44287)" fill="#2f2e41" /><path d="M717.824,673.43319,700.46594,466.56191l71.856-13.245.28375-.05127,21.03174,13.5199-7.32031,76.13381,33.70434,118.69857-29.10218,7.65853L757.16116,559.19046,749.4357,525.714l-3.9592,43.50036L748.41573,676.492Z" transform="translate(-300.94439 -182.44287)" fill="#2f2e41" /><path d="M698.24051,471.25415l-.19011-.24067,24.83039-186.9574.0324-.24493.1748-.17516c.366-.366,9.06584-8.96295,18.01419-8.96295,1.29375,0,2.52377-.03276,3.70359-.06266,6.84753-.178,12.25677-.32041,18.68527,6.10916,6.54991,6.54919,27.91987,30.46463,27.91987,63.21913,0,31.70356,2.88689,130.22765,2.91609,131.21879l.04094,1.39129-1.167-.759c-.288-.18513-29.03062-18.487-53.13652-1.47389-7.53321,5.31739-14.30064,7.18147-20.08725,7.18147C706.50924,481.49732,698.3555,471.40083,698.24051,471.25415Z" transform="translate(-300.94439 -182.44287)" :fill="$store.state.theme.primaryColor" /><circle cx="737.30161" cy="227.82042" r="35.81548" transform="translate(-319.86766 199.12975) rotate(-28.66321)" fill="#a0616a" /><path d="M682.47425,511.43267a14.66358,14.66358,0,0,0,.85079-22.46873l20.33939-47.976L677.033,445.88934,661.8012,490.69675a14.743,14.743,0,0,0,20.673,20.73592Z" transform="translate(-300.94439 -182.44287)" fill="#a0616a" /><path d="M662.82375,474.11363l6.54955-13.82749a2.693,2.693,0,0,1-.96728-1.00253c-6.11913-10.60487,30.84271-98.6722,33.30632-104.51364-.3756-3.17705-4.25577-36.84436-1.41871-48.19259,3.33974-13.359,10.19724-19.58491,22.92964-20.81814,14.04146-1.31867,17.82978,17.74932,17.86609,17.943l.01282,49.02-16.11487,56.42786-36.7518,74.97321Z" transform="translate(-300.94439 -182.44287)" :fill="$store.state.theme.primaryColor" /><path d="M741.88113,241.31379c-4.29338.55862-7.532-3.83417-9.03411-7.89482s-2.64661-8.78808-6.37942-10.98156c-5.09979-2.99674-11.62474.60754-17.45662-.38118-6.586-1.11657-10.86811-8.09643-11.20372-14.768s2.31935-13.08815,4.92436-19.23924l.90945,7.64441a15.15938,15.15938,0,0,1,6.62453-13.25057l-1.17219,11.217c.735-6.28405,7.50492-11.15334,13.69633-9.85109l-.1846,6.6835c7.60682-.90452,15.28012-1.81032,22.90947-1.12121s15.312,3.103,21.09438,8.1275c8.64957,7.51589,11.80857,19.89169,10.748,31.30129s-5.77042,22.12808-10.67915,32.48221c-1.23506,2.60513-2.9433,5.54483-5.80719,5.87668-2.57323.29818-4.92778-1.85286-5.72771-4.31671s-.4096-5.14055.06946-7.68631c.72371-3.84576,1.636-7.77663.95558-11.63028s-3.45273-7.66178-7.33739-8.13406-7.85964,3.9681-5.992,7.4069Z" transform="translate(-300.94439 -182.44287)" fill="#2f2e41" /><polygon points="597.729 535.092 339.991 535.092 339.991 532.986 598.111 532.986 597.729 535.092" :fill="$store.state.theme.primaryColor3" /></svg>
          </center>
        </div>
        <div v-if="currentProm === 4" class="w-3/12 hidden lg:block">
          <div class="relative mt-14">
            <center>
              <img width="150px" src="/login-logo.png" alt="">
            </center>
          </div>
          <p class="my-5">
            Completa tu registro pagando con el método de pago de tu preferencia.
          </p>
          <strong>Incluye:</strong>
          <ul class="list-disc ml-10">
            <li>Transferencia bancaria</li>
            <li>Deposito bancario</li>
            <li>Tarjeta de crédito o débito</li>
            <!-- ... -->
          </ul>
          <center class="mt-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="300.56323" viewBox="0 0 545.56323 523.50056" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M491.30435,507.16761c2.06592,.12937,3.20768-2.43737,1.64468-3.93333l-.1555-.61819c.02047-.04951,.04105-.09897,.06178-.14839,2.08924-4.9818,9.16992-4.94742,11.24139,.04177,1.83859,4.42817,4.17942,8.86389,4.75579,13.54594,.25838,2.0668,.14213,4.17236-.31648,6.20047,4.30807-9.41059,6.57515-19.68661,6.57515-30.02077,0-2.59652-.14213-5.19301-.43275-7.78295-.239-2.11854-.56839-4.2241-.99471-6.31034-2.30575-11.2772-7.29852-22.01825-14.50012-30.98962-3.46197-1.89248-6.34906-4.85065-8.09295-8.39652-.62649-1.27891-1.11739-2.65462-1.34991-4.05618,.39398,.05168,1.48556-5.94866,1.18841-6.3168,.54906-.83317,1.53178-1.24733,2.13144-2.06034,2.98232-4.04341,7.0912-3.33741,9.23621,2.15727,4.58224,2.31266,4.62659,6.14806,1.81495,9.83683-1.78878,2.34682-2.03456,5.52233-3.60408,8.03478,.16151,.20671,.32944,.40695,.4909,.61366,2.96106,3.79788,5.52208,7.88002,7.68104,12.16859-.61017-4.76621,.29067-10.50822,1.82641-14.20959,1.74819-4.21732,5.02491-7.76915,7.91045-11.41501,3.46601-4.37924,10.57337-2.46806,11.18401,3.08332,.00591,.05375,.01166,.10745,.01731,.1612-.4286,.24178-.84849,.49867-1.25864,.76992-2.33949,1.54723-1.53096,5.17386,1.24107,5.60174l.06277,.00967c-.15503,1.54366-.41984,3.07444-.80734,4.57937,3.70179,14.31579-4.29011,19.5299-15.70147,19.76412-.25191,.12916-.49738,.25832-.74929,.38109,1.15617,3.25525,2.07982,6.59447,2.76441,9.97891,.61359,2.99043,1.03991,6.01317,1.27885,9.04888,.29715,3.83006,.27129,7.67959-.05168,11.50323l.01939-.13562c.82024-4.21115,3.10671-8.14462,6.4266-10.87028,4.94561-4.06264,11.93282-5.55869,17.26826-8.82425,2.56833-1.57196,5.85945,.45945,5.41121,3.43708l-.02182,.14261c-.79443,.32289-1.56947,.69755-2.31871,1.11733-.4286,.24184-.84848,.49867-1.25864,.76992-2.33949,1.54729-1.53096,5.17392,1.24107,5.6018l.06282,.00965c.0452,.00646,.08397,.01295,.12911,.01944-1.36282,3.23581-3.26168,6.23922-5.63854,8.82922-2.31463,12.49713-12.25603,13.68282-22.89022,10.04354h-.00648c-1.16259,5.06378-2.86128,10.01127-5.0444,14.72621h-18.02019c-.06463-.20022-.12274-.40692-.18089-.60717,1.6664,.10341,3.34571,.00649,4.98629-.29702-1.33701-1.64059-2.67396-3.29409-4.01097-4.93462-.03229-.0323-.05816-.0646-.08397-.09689-.67817-.8396-1.36282-1.67283-2.04099-2.51246l-.00036-.00102c-.04245-2.57755,.26652-5.14662,.87876-7.63984l.00057-.00035Z" fill="#f2f2f2" /><path d="M159.753,522.31056c0,.66003,.53003,1.19,1.19006,1.19h383.28998c.65997,0,1.19-.52997,1.19-1.19,0-.65997-.53003-1.19-1.19-1.19H160.94307c-.66003,0-1.19006,.53003-1.19006,1.19Z" fill="#ccc" /><g><path d="M217.91365,522.99361H41.48886c-21.51191,0-39.01333-17.50142-39.01333-39.01374V104.83075c0-21.51191,17.50142-39.01333,39.01333-39.01333H217.91365c21.51151,0,39.01293,17.50142,39.01293,39.01333V483.97987c0,21.51232-17.50142,39.01374-39.01293,39.01374Z" :fill="$store.state.theme.primaryColor3" /><path d="M256.92674,205.28092c-.91025,0-1.65045,.74021-1.65045,1.65045v52.81453c0,.91025,.74021,1.65045,1.65045,1.65045s1.65045-.74021,1.65045-1.65045v-52.81453c0-.91025-.74021-1.65045-1.65045-1.65045Z" :fill="$store.state.theme.primaryColor3" /><path d="M253.21342,104.83104V483.97336c0,18.7244-14.57349,34.04062-33.00082,35.22894h-.00826c-.27234,.01652-.54463,.03304-.82523,.0413-.48691,.02473-.97376,.03299-1.46888,.03299,0,0-1.81551-.13206-5.13294-.37962-3.35042-.24756-8.22749-.61892-14.30946-1.10578-1.82372-.14032-3.74651-.29712-5.77659-.46213-4.04358-.33011-8.48331-.69321-13.24488-1.10583-1.89801-.1568-3.86206-.33006-5.86735-.50338-10.24931-.883-21.72824-1.91453-33.83431-3.08634-2.04655-.18984-4.10961-.38788-6.1892-.59419-.54463-.05777-1.09757-.10728-1.65045-.16506-8.63189-.84996-125.71564-23.47767-125.71564-27.90092V104.83104c0-19.50007,15.80312-35.30319,35.30324-35.30319h21.07628c3.36694,0,6.07366,2.62422,6.36252,5.9829,.02473,.22283,.04951,.4456,.09076,.66843,.61066,3.3752,3.70526,5.72708,7.13818,5.72708h107.08205c3.43292,0,6.52752-2.35188,7.13818-5.72708,.04125-.22283,.06603-.4456,.09081-.66843,.28881-3.35868,2.99553-5.9829,6.36247-5.9829h21.07633c19.50007,0,35.30319,15.80312,35.30319,35.30319Z" fill="#fff" /><path d="M1.65045,165.67002c-.91025,0-1.65045,.74021-1.65045,1.65045v13.20363c0,.91025,.74021,1.65045,1.65045,1.65045s1.65045-.74021,1.65045-1.65045v-13.20363c0-.91025-.74021-1.65045-1.65045-1.65045Z" :fill="$store.state.theme.primaryColor3" /><path d="M1.65045,205.28092c-.91025,0-1.65045,.74021-1.65045,1.65045v25.58204c0,.91025,.74021,1.65045,1.65045,1.65045s1.65045-.74021,1.65045-1.65045v-25.58204c0-.91025-.74021-1.65045-1.65045-1.65045Z" :fill="$store.state.theme.primaryColor3" /><path d="M1.65045,241.59091c-.91025,0-1.65045,.74021-1.65045,1.65045v25.58204c0,.91025,.74021,1.65045,1.65045,1.65045s1.65045-.74021,1.65045-1.65045v-25.58204c0-.91025-.74021-1.65045-1.65045-1.65045Z" :fill="$store.state.theme.primaryColor3" /><rect
              x="30.12079"
              y="75.30766"
              width="32.18385"
              height="4.12614"
              rx=".31021"
              ry=".31021"
              fill="#e6e6e6"
            /><circle cx="202.04914" cy="76.13289" r="3.30091" fill="#e6e6e6" /><circle cx="211.12664" cy="76.13289" r="3.30091" fill="#e6e6e6" /><circle cx="220.20414" cy="76.13289" r="3.30091" fill="#e6e6e6" /></g><path d="M199.2886,298.51575H59.2886c-2.20557,0-4-1.79443-4-4s1.79443-4,4-4H199.2886c2.20557,0,4,1.79443,4,4s-1.79443,4-4,4Z" fill="#e6e6e6" /><circle cx="129.79071" cy="395.51575" r="58" :fill="$store.state.theme.primaryColor" /><path d="M139.00859,376.57804c-4.89484,.20103-10.42855,.53711-14.04647,4.293-3.14318,3.26305-3.83195,8.10532-.64457,11.58907,3.19575,3.49289,8.16452,3.96549,11.84835,6.69033,4.32554,3.1995,3.69197,9.52925-.49392,12.56163-4.93603,3.57581-11.30911,1.90862-15.82167-1.49356-1.15636-.87182-2.27886,1.08088-1.13562,1.94281,4.04299,3.04815,9.31864,4.74505,14.31748,3.2865,4.51149-1.31636,8.00859-4.995,8.3643-9.77982,.16977-2.28366-.47955-4.60146-1.89955-6.40441-1.499-1.90326-3.65809-3.0743-5.84068-4.02726-3.75733-1.64052-10.22682-3.76303-9.1344-9.10397,1.32412-6.47372,9.20386-7.08735,14.48676-7.30431,1.44277-.05925,1.45029-2.30956,0-2.25h0Z" fill="#fff" /><path d="M129.928,373.51575l-.21574,49.39335c-.00632,1.44801,2.24367,1.44986,2.25,0l.21574-49.39335c.00632-1.44801-2.24367-1.44986-2.25,0h0Z" fill="#fff" /><path d="M437.08565,0H151.12569c-10.48999,0-19.02002,8.52997-19.02002,19.01996V214.97998c0,10.48999,8.53003,19.02002,19.02002,19.02002H437.08565c10.48999,0,19.02002-8.53003,19.02002-19.02002V19.01996c0-10.48999-8.53003-19.01996-19.02002-19.01996Z" fill="#fff" /><circle cx="292.79071" cy="84.51575" r="32" :fill="$store.state.theme.primaryColor" /><path d="M298.86106,70.23584c-3.96096,.16324-8.42022,.41435-11.41661,3.36215-2.48204,2.4418-3.34997,6.24304-1.06925,9.11803,2.40131,3.02702,6.39485,3.6014,9.52957,5.53579,1.94826,1.20224,3.23934,3.0236,3.28121,5.36426,.03919,2.19141-.97209,4.23876-2.6628,5.61221-4.1481,3.36971-9.80485,1.97481-13.72914-.97221-.77211-.57983-1.52056,.72186-.75708,1.29521,3.25012,2.44074,7.43474,3.8583,11.47885,2.80815,3.72256-.96665,6.72131-3.89507,7.12458-7.80812,.42504-4.12426-2.28291-6.93249-5.79432-8.54355-3.2096-1.47258-8.83914-3.04159-8.30843-7.61645,.67475-5.81661,7.79544-6.46889,12.32342-6.6555,.96183-.03964,.96686-1.53985,0-1.5h0Z" fill="#fff" /><path d="M291.97743,67.51575l-.17986,41.15818c-.00422,.96534,1.49578,.96658,1.5,0l.17986-41.15818c.00422-.96534-1.49578-.96658-1.5,0h0Z" fill="#fff" /><path d="M437.08565,0H151.12569c-10.48999,0-19.02002,8.52997-19.02002,19.01996V214.97998c0,10.48999,8.53003,19.02002,19.02002,19.02002H437.08565c10.48999,0,19.02002-8.53003,19.02002-19.02002V19.01996c0-10.48999-8.53003-19.01996-19.02002-19.01996Zm17.02002,214.97998c0,9.39001-7.63,17.02002-17.02002,17.02002H151.12569c-9.39001,0-17.02002-7.63-17.02002-17.02002V19.01996c0-9.38995,7.63-17.01996,17.02002-17.01996H437.08565c9.39001,0,17.02002,7.63,17.02002,17.01996V214.97998Z" :fill="$store.state.theme.primaryColor3" /><g><path d="M261.1357,19.34998h-28.06006c-1.40997,0-2.56,1.15002-2.56,2.56,0,1.41998,1.15002,2.57001,2.56,2.57001h28.06006c1.40997,0,2.56-1.15002,2.56-2.57001,0-1.40997-1.15002-2.56-2.56-2.56Z" fill="#e6e6e6" /><path d="M308.1357,19.34998h-28.06006c-1.40997,0-2.56,1.15002-2.56,2.56,0,1.41998,1.15002,2.57001,2.56,2.57001h28.06006c1.40997,0,2.56-1.15002,2.56-2.57001,0-1.40997-1.15002-2.56-2.56-2.56Z" fill="#e6e6e6" /><path d="M355.1357,19.34998h-28.06006c-1.40997,0-2.56,1.15002-2.56,2.56,0,1.41998,1.15002,2.57001,2.56,2.57001h28.06006c1.40997,0,2.56-1.15002,2.56-2.57001,0-1.40997-1.15002-2.56-2.56-2.56Z" fill="#e6e6e6" /></g><path d="M401.41567,134.51575H186.79567c-8.92999,0-16.19,7.26001-16.19,16.19v14.62c0,8.92999,7.26001,16.19,16.19,16.19h214.62c8.92999,0,16.19-7.26001,16.19-16.19v-14.62c0-8.92999-7.26001-16.19-16.19-16.19Z" :fill="$store.state.theme.primaryColor" /><path d="M73.17926,211.49182l-8.22992-3.89856c3.37555,4.71082,6.28418,12.06805,7.84137,17.92249,2.63654-5.45343,6.88672-12.1261,11.09375-16.11194l-8.69812,2.23767c5.35974-26.26794,25.5191-45.12573,48.60437-45.12573v-2c-24.11316,0-45.13898,19.64758-50.61145,46.97607Z" :fill="$store.state.theme.primaryColor3" /><path d="M111.05843,251.51575H59.05843c-2.20557,0-4-1.79443-4-4s1.79443-4,4-4h52c2.20557,0,4,1.79443,4,4s-1.79443,4-4,4Z" fill="#e6e6e6" /><g><polygon points="456.97872 238.488 456.45423 279.32691 446.29273 315.73235 438.16969 312.70231 441.77632 279.33303 441.30222 234.1757 456.97872 238.488" fill="#ffb6b6" /><ellipse
              cx="440.63007"
              cy="320.57804"
              rx="9.63433"
              ry="5.72038"
              transform="translate(46.30757 696.65636) rotate(-79.68097)"
              fill="#ffb6b6"
            /><path d="M444.64807,189.86134s17.40715,.23962,17.39246,9.48652c-.0083,5.22083-1.1295,52.62318-4.24981,81.41974-2.40625,22.20666-7,28-7,28l-11-25,4.85735-93.90626Z" fill="#e6e6e6" /><path d="M444.20053,273.29856h-58.7876c4.92749-10.99533,7.95685-21.46701,3.22119-29.79648l55.56641-3.22122c-2.77679,11.24445-3.11621,22.27954,0,33.0177Z" fill="#ffb6b6" /><path d="M436.95273,175.85608l-23.35398-1.61062-9.66372,12.07965-4.89907,.89074c-7.34381,1.33524-12.5732,7.8888-12.24512,15.3458l1.9056,43.31268,55.82064,4.07026,13.3737-56.40211-16.10619-6.41205-4.83186-11.27434Z" fill="#e6e6e6" /><g><path d="M294.53066,188.92176c1.65693,1.49058,2.83981,3.2318,3.46456,4.92062l16.68132,13.2027-6.51458,7.75386-16.22013-14.22767c-1.74528-.44324-3.60149-1.436-5.25841-2.92658-3.78524-3.40522-5.0971-8.11837-2.93014-10.52715,2.16696-2.40878,6.99213-1.60101,10.77736,1.8042h0Z" fill="#ffb6b6" /><path d="M412.46752,200.03661v.00003l-63.91645,43.15944-45.81651-31.88401,6.87858-12.45997,36.05991,20.95662,33.25501-25.53436c11.84186-11.12319,26.6836-8.96705,33.53945,5.76225Z" fill="#e6e6e6" /></g><circle cx="423.89065" cy="153.30238" r="17.32595" fill="#ffb6b6" /><path d="M447.44074,149.04572v3.36005l-19.54004-5.5-14.64996,3.06995c-.17004-2.22998-.83002-4.41998-1.92999-6.35999,.76544,3.11154,.85107,5.51877,.03998,6.76001l-1.97003,.40997c-.31995-.87-.94-1.62994-1.75-2.08997-.07996-.04999-.17999-.09003-.26996-.06-.14001,.04999-.15002,.22998-.15002,.37,.02002,.73999,.03998,1.47998,.07001,2.21997l-5.65997,1.18005v-3.36005c-5.43011-12.21786,8.88177-22.79028,22.90997-22.89996,6.32983-.0495,12.04999,2.56,16.20001,6.69995,4.14001,4.15002,6.70001,9.87006,6.70001,16.20001Z" fill="#2f2e41" /><path d="M458.43313,188.44404l-1.4756-.12217c.10507-.48251,.21013-.95895,.30608-1.44147,.81774-4.04957-.9822-9.20467-1.1147-13.09543-.69441,4.11063,.4934,9.16803-.73551,13.07098-.13705,.43368-5.4765,3.23228-5.62268,3.6598-5.90945-2.16102-12.06314-9.06597-19.03157-5.03298-4.12132,2.38522-8.82359,1.33977-13.50285,.24763-1.15832-.27035-1.31925-5.9899-2.46558-6.21465-2.05278-.40246-5.06763,4.79685-7,5l8-31c0-16.86402-1.56207-34.55742,19.80018-28.59431,5.37269,1.49975,10.69018,2.67528,14.65559,7.10965,3.96541,4.44045,6.78871,10.64614,7.7892,17.71303,.60304,4.26333,4.36744,18.73916,.39745,38.69992Z" fill="#2f2e41" /><g><polygon points="444.63823 500.18039 435.10166 500.40544 429.78582 457.56122 443.85939 457.22818 444.63823 500.18039" fill="#ffb7b7" /><path d="M411.91948,520.07655h0c0,1.61103,1.14328,2.91706,2.55362,2.91706h18.92928s1.86279-7.48795,9.4577-10.71043l.52418,10.71043h9.76495l-1.18313-17.22188s2.61217-9.21376-2.81276-13.92358c-5.42499-4.70982-1.03095-4.05417-1.03095-4.05417l-2.13409-10.65904-14.7559,1.7352-.1085,16.7322-7.16093,16.60827-10.50335,5.18849c-.93485,.46179-1.54002,1.51399-1.54002,2.67743l-.00012,.00003Z" fill="#2f2e41" /></g><g><polygon points="415.62444 493.19838 406.45713 495.83604 390.44322 455.74315 403.97162 451.84972 415.62444 493.19838" fill="#ffb7b7" /><path d="M389.02547,520.74594h0c.40881,1.5583,1.84609,2.53146,3.21026,2.17358l18.30968-4.80346s-.09831-7.71555,6.43027-12.75982l3.22488,10.22684,9.44532-2.47794-5.5146-16.35794s.1886-9.57504-6.25391-12.75407c-6.44257-3.17902-2.02599-3.65986-2.02599-3.65986l-4.76906-9.7686-13.83258,5.42284,4.14099,16.21205-2.71205,17.88179-8.84293,7.68397c-.78707,.6839-1.10542,1.85522-.81019,2.98058l-.00011,.00006Z" fill="#2f2e41" /></g><path d="M438.79071,270.7676l6,2c9.38098,17.32587,13.35828,40.3338,12.83124,68.07819l-10.65781,124.61142h-17.43665l-12.76045-138.82181-22.4998,52.1048,16.46225,86.71701-16.46225,1.67839-33.1576-90.1717,23.0919-104.8017,54.58918-1.3946Z" fill="#2f2e41" /></g></svg>
          </center>
        </div>
        <div v-if="currentProm === 5 || ((fedotaxi || convenio) && currentProm === 3)" class="w-2/12 hidden lg:block">
          <div class="relative mt-14">
            <center>
              <img width="150px" src="/login-logo.png" alt="">
            </center>
          </div>
          <p class="my-5">
            Siga los siguientes pasos enviados a su correo para su posterior activación.
          </p>
          <center class="mt-10">
            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="300" viewBox="0 0 574.90338 685.12347" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M535.21353,669.76149C523.7742,657.964,507.197,651.198,489.7324,651.198l-.67366.0018a64.94392,64.94392,0,0,1-32.739-8.84135l-1.03409-.60252.83287-.85816a63.30131,63.30131,0,0,0,11.16314-15.80468,19.14148,19.14148,0,0,1-15.44809,4.99045,19.60034,19.60034,0,0,1-14.3887-9.21623c-6.104-9.9039-13.38014-23.95679-13.38014-34.66239a65.14178,65.14178,0,0,1,21.25244-48.06872,40.5648,40.5648,0,0,0,13.40024-30.24646l-.00339-.81119a92.00118,92.00118,0,0,1,2.73077-22.26282l.18428-.73531.75654.02642a62.19468,62.19468,0,0,0,14.54317-1.21836,49.08873,49.08873,0,0,1-13.04274-3.469l-.8139-.32926.27622-.834c19.04033-11.789,62.0198-5.68406,86.96637-62.76026,20.22826-46.281,91.60044,41.0837,91.60044,91.58261,0,5.15282-5.09952,11.96217-1.282,15.36791,41.26735,36.81648,12.79346,60.45772,3.81611,84.24647-2.13,5.64417,2.48845,11.84039,2.48845,17.94669,0,1.03612-.02642,2.10566-.07859,3.17882l-.07949,1.64993-1.376-.91553a45.57512,45.57512,0,0,1-7.52632-6.17336,39.71824,39.71824,0,0,1-1.2597,34.28909c-4.3247,8.1625-8.5087,14.00614-12.43548,17.36744a64.93049,64.93049,0,0,1-88.96861-4.27456Z" transform="translate(-312.54831 -107.43826)" fill="#e6e6e6" /><path d="M604.30381,792.56174a1.16881,1.16881,0,0,0,1.15574-1.00412c.04966-.3489,4.91374-35.42927.54524-82.05255-4.03433-43.05771-16.99018-105.076-55.80087-156.01058a1.1689,1.1689,0,1,0-1.85945,1.41695c38.47547,50.49476,51.32689,112.058,55.33277,154.81165,4.3431,46.352-.48284,81.15879-.53211,81.505a1.16986,1.16986,0,0,0,1.15868,1.33362Z" transform="translate(-312.54831 -107.43826)" fill="#3f3d56" /><path d="M572.632,625.34009a1.16886,1.16886,0,0,0,.68812-2.11438,161.09887,161.09887,0,0,0-35.56483-18.10445c-19.62175-7.18364-49.45954-13.6961-80.177-3.9198a1.16873,1.16873,0,1,0,.70885,2.22738c30.08815-9.5754,59.38508-3.17062,78.66439,3.88784a158.452,158.452,0,0,1,34.99428,17.80006A1.16421,1.16421,0,0,0,572.632,625.34009Z" transform="translate(-312.54831 -107.43826)" fill="#3f3d56" /><path d="M626.12855,492.10023a1.16886,1.16886,0,0,0-2.05934-.8386,161.09866,161.09866,0,0,0-20.61864,34.1687c-8.578,19.05347-17.22236,48.34479-9.68357,79.68656a1.16873,1.16873,0,1,0,2.27265-.5466c-7.38374-30.69961,1.11423-59.45923,9.54276-78.18016a158.4516,158.4516,0,0,1,20.274-33.62155A1.16426,1.16426,0,0,0,626.12855,492.10023Z" transform="translate(-312.54831 -107.43826)" fill="#3f3d56" /><path d="M851.583,791.32412H758.53414l-.39976-.7256c-1.1897-2.15762-2.33834-4.44394-3.41167-6.79323-9.58472-20.51932-13.63574-43.98758-17.21033-64.6931L734.82082,703.505a9.63638,9.63638,0,0,1,15.16908-9.42728q21.21138,15.43467,42.43919,30.83922c5.35846,3.89906,11.47812,8.41145,17.339,13.288.56542-2.74632,1.15685-5.50085,1.74828-8.217a9.64275,9.64275,0,0,1,17.61009-3.04477l10.88669,17.491c7.94049,12.77323,14.94866,25.36028,13.52074,38.93578a2.1217,2.1217,0,0,1-.037.49286,30.69321,30.69321,0,0,1-1.57988,6.53585Z" transform="translate(-312.54831 -107.43826)" fill="#f0f0f0" /><path d="M808.23232,425.51335l-17.95773-66.46691a11.113,11.113,0,0,0-13.48035-7.8344l0,0a11.113,11.113,0,0,0-7.84261,14.09225l20.77033,68.471,10.867,42.13754a9.69773,9.69773,0,1,0,12.43377.55483Z" transform="translate(-312.54831 -107.43826)" fill="#a0616a" /><path d="M657.12182,411.19825l54.56256-41.99116a11.113,11.113,0,0,0,2.08937-15.451l0,0a11.11306,11.11306,0,0,0-16.01958-1.86315L642.41423,397.249l-34.78838,26.14254a9.69774,9.69774,0,1,0,4.238,11.70239Z" transform="translate(-312.54831 -107.43826)" fill="#a0616a" /><path d="M701.59276,420.85125l-2.405,53.71423,75.516-16.41268c-6.42765-21.58351-10.79819-25.26495-5.96825-40.28567Z" transform="translate(-312.54831 -107.43826)" fill="#a0616a" /><path d="M748.02576,322.37821H722.86345l-10.80585,18.491-5.14893-.28426a18.55018,18.55018,0,0,0-19.57274,18.522v0l6.3442,9.833s-11.346,19.77327,4.99759,29.501c0,0-2.915,18.32813,0,18.13112s9.62932-3.92716,2.915-.197-6.21334,4.23109-5.34477,5.09967l.86858.86857L767.71744,434.198s2.06506-13.68647,2.28762-16.12774-1.26951,3.527.22255-2.44127,3.73015-3.73015,1.49206-5.96824,14.50148-29.96561,7.62376-40.72088l11.027-10.75526v0c0-10.31684-16.5698-18.6803-26.88664-18.6803h-1.32156Z" transform="translate(-312.54831 -107.43826)" fill="#e6e6e6" /><polygon points="374.852 663.178 364.667 663.178 359.822 623.895 374.853 623.896 374.852 663.178" fill="#a0616a" /><path d="M656.66086,785.64314a4.33186,4.33186,0,0,0,4.30438,4.313H680.137l.594-1.231,2.71178-5.5957,1.05024,5.5957.23246,1.231h7.23133l-.1033-1.23967-1.92836-23.12319-2.52236-.155-10.89868-.64566-2.67736-.16357v6.90425C671.79509,773.69416,655.85163,781.86387,656.66086,785.64314Z" transform="translate(-312.54831 -107.43826)" fill="#2f2e41" /><polygon points="526.21 636.502 517.645 642.012 492.317 611.596 504.959 603.465 526.21 636.502" fill="#a0616a" /><path d="M821.03676,773.20854a4.33185,4.33185,0,0,0,5.95346,1.29845l16.12351-10.37248-.16647-1.35669-.74682-6.17316,3.91069,4.13779.86153.90955,6.08158-3.91237-.75757-.98667-14.13209-18.40339-2.20515,1.23436-9.51515,5.3535-2.34017,1.311,3.73541,5.8065C827.3,754.97134,818.3115,770.468,821.03676,773.20854Z" transform="translate(-312.54831 -107.43826)" fill="#2f2e41" /><path d="M886.26723,792.04189l-315.3575.30731a1.19069,1.19069,0,0,1,0-2.38135l315.3575-.30731a1.19069,1.19069,0,0,1,0,2.38135Z" transform="translate(-312.54831 -107.43826)" fill="#cacaca" /><path d="M773.52024,452.085s-48.27126,25.53342-73.8028,8.113c0,0-5.585,27.05-7.82309,29.28806s-5.80381,3.21322-3.27492,5.70978,3.93659,5.86839-.87043,10.15073-9.60041,2.92358-4.96562,7.33311-14.016,112.584-14.016,112.584,2.98413,100.59751,0,103.64-6.97274,3.72368-3.11336,7.48624,3.85939.84436,3.85939,6.03362v5.18925l1.76581,5.1576H695.502s5.84571-6.79064,0-12.6884,1.779-7.5117,3.5619-13.046,4.767.434,1.78287-5.53429-4.41745-4.83269-4.44682-8.75761,43.98646-157.60731,43.98646-157.60731l5.33107,85.06121,64.125,93.15621,18.875-14.15621s-13.74228-19.34521-10.52876-22.00488-9.47124-5.99512-5.47124-8.99512-5.629-6.02313-2-10-5-14-10-14-12.01709-16.70841-12.01709-16.70841l10.47529-131.9923Z" transform="translate(-312.54831 -107.43826)" fill="#2f2e41" /><path d="M722.35745,268.08368c-.34132.4485-3.06321.207-6.33608-.27091-6.471-.94488-7.35288.17793-12.19052,4.57831-7.00766,6.37424-3.02328,45.25286-6.46685,53.6768l-1.11253.81974a40.01837,40.01837,0,0,0,6.47868-1.813c1.18895-3.75151,2.38119-7.5151,3.58145-11.26354a32.98844,32.98844,0,0,1,2.11547,9.09656c1.66578-.65666,3.32192-2.26263,10.2823-4.41641,3.50489-2.37768,28.86151-4.76841,32.12143-5.8145C759.10385,284.52811,745.77151,273.14473,722.35745,268.08368Z" transform="translate(-312.54831 -107.43826)" fill="#2f2e41" /><circle cx="418.37044" cy="179.82014" r="24.23122" fill="#a0616a" /><path d="M746.17433,265.9481a10.8237,10.8237,0,0,1-3.87253-1.35764,3.68188,3.68188,0,0,1-1.76327-3.4845c.29855-1.7217,2.245-2.74968,3.98928-2.64495a10.85037,10.85037,0,0,1,4.80847,1.94592,7.45286,7.45286,0,0,0-6.3486-6.67888c2.29417-.1236,4.67892-.23263,6.80024.64968s3.889,3.067,3.5064,5.33241c3.56639-.45946,7.08337,2.02543,8.55579,5.306s1.18047,7.13312.00412,10.53113a3.71935,3.71935,0,0,1-1.86434,2.46419c-1.20048.45552-2.49186-.30829-3.532-1.06116a84.44809,84.44809,0,0,1-14.729-13.60319" transform="translate(-312.54831 -107.43826)" fill="#2f2e41" /><path d="M756.73936,313.0199c-1.0273.48361-.49236,2.28285-1.29062,3.08858a3.28112,3.28112,0,0,1-1.2235.761,14.72557,14.72557,0,0,0-1.037-4.37174c-.10441-.25367-.276-.53716-.54459-.51476-.31332.03729-.39537.4476-.40284.75345a12.64094,12.64094,0,0,1-.99223,4.40907c-.00747.01494-.01494.0373-.02236.05223-.23131-.00747-.47-.01493-.69385-.0224-1.73075-.06712-5.5654-4.51343-6.41585-3.00648,2.999-5.31916,6.65459-13.31668,7.21411-19.39681a8.60278,8.60278,0,0,0-.276-3.80478,3.36236,3.36236,0,0,0-2.79761-2.31268,2.1406,2.1406,0,0,0-2.21569,2.447l-.43271-.05965c-4.01365-3.26762-.55206-8.945-5.22222-11.19047-1.58158-.761-11.26505,1.783-12.97349,1.33538a14.70456,14.70456,0,0,0-1.08175-5.24457c-.10441-.25368-.276-.53717-.54459-.51477-.31332.03729-.39538.4476-.40284.75345a12.64118,12.64118,0,0,1-.99224,4.40907,18.47866,18.47866,0,0,0-7.09476.373c-2.04412.53712-3.98378,1.46224-6.03536,1.9546a7.80277,7.80277,0,0,1-6.1324-.67145c-2.60364-1.74569-3.05871-5.61012-1.76063-8.46a16.66222,16.66222,0,0,1,3.74509-4.83426c1.17123-1.134,2.38727-2.22321,3.6033-3.31238q1.63383-1.46595,3.26762-2.93194a39.83766,39.83766,0,0,1,4.37173-3.566A21.56979,21.56979,0,0,1,735.194,256.2022c3.43177.82061,8.01983-.33568,11.16064,1.26826,1.64127.843,5.27444,4.07335,6.71428,5.22222,3.68539,2.93194,1.19135.54293,5.22221,2.23809C767.90264,268.97283,763.65244,309.76547,756.73936,313.0199Z" transform="translate(-312.54831 -107.43826)" fill="#2f2e41" /><circle cx="175.8966" cy="232.17014" r="150.2725" fill="#fff" /><path d="M488.445,491.38065c-83.6875,0-151.77246-68.085-151.77246-151.77246s68.085-151.77246,151.77246-151.77246,151.77246,68.085,151.77246,151.77246S572.13248,491.38065,488.445,491.38065Zm0-300.54492c-82.03321,0-148.77246,66.73926-148.77246,148.77246S406.41177,488.38065,488.445,488.38065,637.21744,421.6414,637.21744,339.60819,570.47818,190.83573,488.445,190.83573Z" transform="translate(-312.54831 -107.43826)" :fill="$store.state.theme.primaryColor" /><path d="M467.94463,417.81825a16.71091,16.71091,0,0,1-13.37125-6.68766L413.57674,356.4675A16.71536,16.71536,0,1,1,440.322,336.40994l26.8214,35.75915,68.88731-103.3296a16.71606,16.71606,0,0,1,27.8172,18.5448L481.85459,410.37421a16.72281,16.72281,0,0,1-13.44471,7.4386C468.2548,417.81553,468.09971,417.81825,467.94463,417.81825Z" transform="translate(-312.54831 -107.43826)" :fill="$store.state.theme.primaryColor" /><ellipse
              cx="635.79161"
              cy="197.63686"
              rx="5.25681"
              ry="7.55666"
              transform="translate(36.12401 690.90969) rotate(-81.72174)"
              fill="#e6e6e6"
            /><ellipse
              cx="684.96313"
              cy="192.83881"
              rx="5.2568"
              ry="7.55666"
              transform="matrix(0.14398, -0.98958, 0.98958, 0.14398, 82.96384, 735.46164)"
              fill="#3f3d56"
            /><ellipse
              cx="622.327"
              cy="157.82871"
              rx="5.25681"
              ry="7.55666"
              transform="matrix(0.14398, -0.98958, 0.98958, 0.14398, 63.99142, 643.50882)"
              fill="#ff6584"
            /><ellipse
              cx="605.11644"
              cy="142.58562"
              rx="4.77581"
              ry="3.3223"
              transform="translate(145.41098 639.16833) rotate(-89.56675)"
              fill="#e6e6e6"
            /><ellipse
              cx="597.87072"
              cy="112.21401"
              rx="4.77581"
              ry="3.3223"
              transform="translate(168.59079 601.78086) rotate(-89.56675)"
              fill="#3f3d56"
            /><ellipse
              cx="654.21588"
              cy="165.66592"
              rx="4.77581"
              ry="3.3223"
              transform="translate(171.05951 711.17214) rotate(-89.56675)"
              fill="#e6e6e6"
            /><ellipse
              cx="630.45407"
              cy="177.52991"
              rx="4.77581"
              ry="3.3223"
              transform="translate(135.61373 699.1853) rotate(-89.56675)"
              fill="#ff6584"
            /><ellipse
              cx="663.53134"
              cy="199.45766"
              rx="4.77581"
              ry="3.3223"
              transform="translate(146.51376 754.02355) rotate(-89.56675)"
              fill="#3f3d56"
            /><ellipse
              cx="353.79161"
              cy="553.63686"
              rx="5.25681"
              ry="7.55666"
              transform="translate(-557.5641 716.59087) rotate(-81.72174)"
              fill="#e6e6e6"
            /><ellipse
              cx="402.96313"
              cy="548.83881"
              rx="5.2568"
              ry="7.55666"
              transform="translate(-510.72427 761.14282) rotate(-81.72174)"
              fill="#3f3d56"
            /><ellipse
              cx="340.327"
              cy="513.82871"
              rx="5.25681"
              ry="7.55666"
              transform="translate(-529.69669 669.19) rotate(-81.72174)"
              fill="#ff6584"
            /><ellipse
              cx="323.11644"
              cy="498.58562"
              rx="4.77581"
              ry="3.3223"
              transform="translate(-490.44649 710.48449) rotate(-89.56675)"
              fill="#e6e6e6"
            /><ellipse
              cx="315.87072"
              cy="468.21401"
              rx="4.77581"
              ry="3.3223"
              transform="translate(-467.26668 673.09701) rotate(-89.56675)"
              fill="#3f3d56"
            /><ellipse
              cx="372.21588"
              cy="521.66592"
              rx="4.77581"
              ry="3.3223"
              transform="translate(-464.79796 782.4883) rotate(-89.56675)"
              fill="#e6e6e6"
            /><ellipse
              cx="348.45407"
              cy="533.52991"
              rx="4.77581"
              ry="3.3223"
              transform="translate(-500.24374 770.50145) rotate(-89.56675)"
              fill="#ff6584"
            /><ellipse
              cx="381.53134"
              cy="555.45766"
              rx="4.77581"
              ry="3.3223"
              transform="translate(-489.34371 825.33971) rotate(-89.56675)"
              fill="#3f3d56"
            /></svg>
          </center>
        </div>

        <div :class="`${currentProm === 4 ? 'lg:w-10/12' : 'lg:w-9/12'} xs:w-full lg:mt-0 mt-5 md:px-2`">
          <div>
            <div v-if="!fedotaxi && !convenio" class="md:flex md:items-start">
              <center>
                <svg
                  :fill="$store.state.theme.primaryColor"
                  width="82px"
                  height="82px"
                  viewBox="-1 0 19 19"
                  xmlns="http://www.w3.org/2000/svg"
                  class="cf-icon-svg"
                >

                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                  <g id="SVGRepo_iconCarrier">

                    <path d="M10.594 1.975a8 8 0 0 1 1.895.795 7.857 7.857 0 0 1 1.604 1.237 8.05 8.05 0 0 1 1.241 1.6 7.909 7.909 0 0 1 0 7.991 8.021 8.021 0 0 1-2.845 2.845 7.888 7.888 0 0 1-4.007 1.082 7.825 7.825 0 0 1-3.985-1.082 8.039 8.039 0 0 1-1.599-1.241 7.848 7.848 0 0 1-1.237-1.604 8 8 0 0 1-.795-1.895 7.86 7.86 0 0 1-.283-2.112 7.782 7.782 0 0 1 .283-2.098 7.902 7.902 0 0 1 5.518-5.518 7.764 7.764 0 0 1 2.098-.283 7.848 7.848 0 0 1 2.112.283zM6.682 3.043A6.793 6.793 0 0 0 1.933 7.79a6.688 6.688 0 0 0-.241 1.8 6.764 6.764 0 0 0 .242 1.815 6.916 6.916 0 0 0 .685 1.634 6.775 6.775 0 0 0 1.063 1.378 6.975 6.975 0 0 0 1.38 1.071 6.822 6.822 0 0 0 5.235.686 6.789 6.789 0 0 0 3.012-1.757 6.924 6.924 0 0 0 1.07-1.382 6.785 6.785 0 0 0 .93-3.445 6.722 6.722 0 0 0-.929-3.42 6.967 6.967 0 0 0-1.07-1.38 6.77 6.77 0 0 0-1.38-1.063 6.937 6.937 0 0 0-1.633-.685A6.775 6.775 0 0 0 8.482 2.8a6.695 6.695 0 0 0-1.8.243zm4.176 10.095v-1.352H8.18l1.52-1.353q.222-.203.43-.412a2.996 2.996 0 0 0 .371-.449 2.115 2.115 0 0 0 .255-.523 2.028 2.028 0 0 0 .092-.635 1.89 1.89 0 0 0-.199-.889 1.853 1.853 0 0 0-.532-.63 2.296 2.296 0 0 0-.76-.37 3.23 3.23 0 0 0-.88-.12 2.854 2.854 0 0 0-.912.144 2.376 2.376 0 0 0-.764.42 2.315 2.315 0 0 0-.551.666 2.346 2.346 0 0 0-.273.89l1.491.204a1.232 1.232 0 0 1 .292-.717.893.893 0 0 1 1.227-.057.76.76 0 0 1 .222.57 1 1 0 0 1-.148.535 2.418 2.418 0 0 1-.389.472l-2.556 2.311v1.295z" />

                  </g>

                </svg>
              </center>
              <div class="mt-4 md:mx-4 md:mt-0">
                <h1 class="text-2xl mt-3 md:text-left text-center pb-0 mb-0 font-semibold text-prim capitalize">
                  Segundo paso
                </h1>
                <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl text-center">
                  Registro de solicitud, complete los pasos de a continuación:
                </p>
              </div>
            </div>
            <div class="w-full">
              <div class="py-3 md:flex md:flex-wrap items-center justify-center">
                <a-steps :current="currentProm" color>
                  <a-step title="Información" />
                  <a-step title="Documentos" />
                  <a-step title="Verificación" description="Foto o video" />
                  <a-step v-if="!fedotaxi && !convenio" title="Facturación" />
                  <a-step v-if="!fedotaxi && !convenio" title="Pago" />
                  <a-step title="Finalización" />
                </a-steps>
              </div>
              <div v-show="currentProm === 0">
                <ValidationObserver ref="form">
                  <form>
                    <div
                      v-if="form.certType === 2 || form.certType === 4"
                      class="mt-5 lg:flex justify-between border-b border-gray-200 pb-5"
                    >
                      <div>
                        <div class="flex items-center">
                          <h1 class="text-xl font-medium pr-2 leading-5 text-gray-800 mb-5">
                            Información empresarial
                          </h1>
                        </div>
                        <div class="grid gap-2 md:grid-cols-8 md:ml-4">
                          <tail-input
                            v-model="form.subject.ruc"
                            label="R.U.C"
                            class="md:col-span-2"
                            name="businessRUC"
                            rules="required|numbers|ruc"
                            type="number"
                            max="13"
                            placeholder="Ingrese el RUC"
                          />
                          <tail-input
                            v-model="form.subject.businessName"
                            class="md:col-span-3 col-span-2"
                            label="Nombre de Empresa"
                            name="businessName"
                            rules="required"
                            placeholder="Ingrese nombre de su empresa"
                          />
                          <template v-if="form.certType === 4">
                            <tail-input
                              v-model="form.subject.businessCountry"
                              class="col-span-2"
                              label="País de la Empresa"
                              name="businessCountry"
                              rules="required"
                              placeholder="Ingrese país de su empresa"
                            />
                            <tail-input
                              v-model="form.subject.businessState"
                              class="col-span-2"
                              label="Provincia de la Empresa"
                              name="businessState"
                              rules="required"
                              placeholder="Ingrese provincia de su empresa"
                            />
                            <tail-input
                              v-model="form.subject.businessCity"
                              class="col-span-2"
                              label="Ciudad de la Empresa"
                              name="businessCity"
                              rules="required"
                              placeholder="Ingrese ciudad de su empresa"
                            />
                            <tail-input
                              v-model="form.subject.businessAddress"
                              class="col-span-2"
                              label="Dirección de la Empresa"
                              name="businessAddress"
                              rules="required"
                              placeholder="Ingrese domicilio de su empresa"
                            />
                            <tail-input
                              v-model="form.subject.businessTelphone"
                              class="col-span-2"
                              label="Teléfono de la Empresa"
                              name="businessTelphone"
                              max="15"
                              rules="required|ext-numbers|size:15"
                              placeholder="Ingrese número de su empresa"
                            />
                          </template>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5 lg:flex justify-between border-b border-gray-200 pb-5">
                      <div>
                        <div class="flex items-center">
                          <h1 class="text-xl font-medium pr-2 leading-5 text-gray-800 mb-5">
                            {{ form.certType === 4 ? 'Datos de representante legal' : 'Información personal' }}
                          </h1>
                        </div>
                        <div class=" lg:mt-0 mt-4">
                          <div class="grid gap-2 md:grid-cols-4 md:ml-4">
                            <tail-input v-model="form.subject.name1" :label="fedotaxi || convenio ? 'Nombres' : 'Primer nombre'" name="firstname" rules="required|letters" :placeholder="`Ingrese ${fedotaxi || convenio ? 'sus nombres' : 'su primer nombre'}`" />
                            <tail-input
                              v-if="!fedotaxi && !convenio"
                              v-model="form.subject.name2"
                              label="Segundo Nombre"
                              name="prim-2tname"
                              rules="required|letters"
                              placeholder="Ingrese su segundo nombre"
                            />
                            <tail-input v-model="form.subject.surName1" :label="fedotaxi || convenio? 'Apellidos' : 'Primer apellido'" name="lastname" rules="required|letters" :placeholder="`Ingrese ${fedotaxi || convenio ? 'sus apellidos' : 'su primer apellido'}`" />
                            <tail-input
                              v-if="!fedotaxi && !convenio"
                              v-model="form.subject.surName2"
                              label="Segundo apellido"
                              name="lastname2"
                              rules="required|letters"
                              placeholder="Ingrese su segundo apellido"
                            />
                            <tail-select v-model="form.subject.type" label="Tipo de identificación" name="typesIdT" rules="required" :options="option.TypesId" />
                            <tail-input
                              v-model="form.subject.id"
                              :label="`Número de ${!!form.subject.type ? form.subject.type === 'ci' ? 'cédula' : 'pasaporte' : 'identificación'}`"
                              name="identification"
                              :type="form.subject.type === 'ci' ? 'number' : 'text'"
                              :rules="`required|typeId:${form.subject.type}`"
                              placeholder="Ingrese el número de su identificación"
                              info="Si su tipo de identificación es diferente seleccione el correcto en el apartado de tipo de identificación"
                              @onChange="checkUserId"
                            />
                            <tail-date-picker v-model="form.subject.dateBirth" label="Fecha de nacimiento" name="birthday" rules="required" />
                            <div v-if="!fedotaxi && !convenio">
                              <label
                                id="lastName"
                                class="text-sm leading-none text-gray-800"
                              >Información de nacimiento</label>
                              <a-checkbox v-model="form.subject.foreing" style="margin-top: 20px">
                                Mi lugar de nacimiento es diferente a Ecuador
                              </a-checkbox>
                            </div>
                            <tail-input
                              v-model="form.subject.cellphone"
                              label="Número celular"
                              max="15"
                              name="phone"
                              rules="required|ext-numbers|size:15"
                              placeholder="Ingrese su celular"
                            />
                            <tail-input
                              v-if="!fedotaxi && !convenio"
                              v-model="form.subject.telphone"
                              label="Número convencional"
                              name="telphone"
                              max="15"
                              rules="numbers|size:15"
                              placeholder="Ingrese su teléfono convencional"
                            />
                            <tail-input
                              v-model="form.subject.mail"
                              label="Correo electrónico"
                              type="email"
                              name="mail"
                              rules="required|mail"
                              placeholder="Ingrese su correo electrónico"
                            />
                            <tail-input
                              v-model="form.subject.confirmMail"
                              label="Confirmación de correo"
                              type="email"
                              name="confirmMail"
                              :rules="`required|samemail:${form.subject.mail}|mail`"
                              placeholder="Confirme su correo electrónico"
                            />
                            <template v-if="form.certType === 4">
                              <tail-input v-model="form.subject.businessPosition" label="Cargo empresarial" name="businessPosition" rules="required" placeholder="Ingrese cargo que ocupa" />
                              <tail-input v-model="form.subject.departamentBusiness" label="Departamento" name="departamentBusiness" rules="required" placeholder="Ingrese el departamento empresarial" />
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="mt-5 lg:flex justify-between border-b border-gray-200 pb-5">
                      <div>
                        <div class="flex items-center">
                          <h1 class="text-xl font-medium pr-2 leading-5 text-gray-800 mb-3">
                            Información residencia actual
                          </h1>
                        </div>
                        <div class="grid gap-2 md:grid-cols-3 md:ml-4">
                          <tail-input v-model="form.subject.state" label="Provincia" name="provinceactual" rules="required|letterNumber" placeholder="Ingrese su provicia de residencia" />
                          <tail-input v-model="form.subject.city" label="Ciudad" name="cityactual" rules="required|letterNumber" placeholder="Ingrese su ciudad de residencia" />
                          <tail-input v-model="form.subject.address" label="Domicilio" name="addresactual" rules="required" placeholder="Ingrese su domicilio" />
                        </div>
                      </div>
                    </div>
                    <div v-if="fedotaxi || convenio || (fast && !disabledPassword)" class="mt-5 lg:flex justify-between border-b border-gray-200 pb-5">
                      <div>
                        <div class="flex items-center">
                          <h1 class="text-xl font-medium pr-2 leading-5 text-gray-800 mb-5">
                            Contraseña
                          </h1>
                        </div>
                        <p>Esta contraseña le permitirá tener acceso a la plataforma para descargar su firma electrónica y al sistema de facturación posteriormente.</p>
                        <div class="md:ml-4 mt-3 grid gap-6 md:grid-cols-2">
                          <tail-password
                            v-model="form.password"
                            max="15"
                            label="Contraseña"
                            name="passwordFedo"
                            rules="required|secure|size:15"
                            placeholder="Ingrese una contraseña para sus cuentas"
                          />
                          <tail-password
                            v-model="form.confirmPassword"
                            label="Repita contraseña"
                            name="confirmPasswordFedo"
                            max="15"
                            :rules="`required|samepass:${form.password}|size:15`"
                            :confirm="true"
                            placeholder="Repita su contraseña"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="!fedotaxi && !convenio"
                      class="mt-5 lg:flex justify-between border-b border-gray-200 pb-5"
                    >
                      <div>
                        <div class="flex items-center">
                          <h1 class="text-xl font-medium pr-2 leading-5 text-gray-800 mb-5">
                            Información opcional
                          </h1>
                        </div>
                        <div class="md:flex items-center lg:ml-4 mt-3">
                          <div class="md:w-55 md:mt-0 mt-4">
                            <tail-input
                              v-model="form.subject.distributorInfo"
                              info="Este apartado debe ser completado únicamente por distribuidores autorizados."
                              label="Información de distribuidor"
                              name="distributorform"
                              placeholder="Ingrese esta información únicamente si usted es distribuidor"
                            />
                          </div>
                          <div v-if="form.certType === 1" class="md:w-1/2 md:ml-5 md:mt-0 mt-4">
                            <tail-select
                              v-model="form.subject.businessName"
                              label="Empresa pública"
                              name="businessPublic"
                              :options="businessPublics"
                              info="Importante: Este dato es solo informativo, no se registrará en su firma electrónica"
                            />
                          </div>
                          <tail-input
                            v-if="form.certType === 1 && form.subject.businessName === 'OTRA'"
                            v-model="form.subject.businessNameOther"
                            class="md:w-1/2 md:ml-5 md:mt-0 mt-4"
                            label="Nombre de empresa"
                            placeholder="Ingrese el nombre de su empresa"
                            rules="required"
                            name="bussinesNameOther"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="mt-2 lg:flex justify-between border-b border-gray-200 pb-5">
                      <div>
                        <div class="flex items-center">
                          <h1 class="text-2xl font-medium pr-2 leading-5 text-gray-800 my-3">
                            Términos y condiciones
                          </h1>
                        </div>
                        <div class="md:flex items-center lg:ml-4 mt-0">
                          <tail-checkbox
                            v-model="form.certificateAuthorization"
                            name="condition"
                            rules="check"
                            :desactive="desactive"
                            @change="openLetter"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </ValidationObserver>
              </div>
              <div v-show="currentProm === 1">
                <ValidationObserver ref="form2">
                  <div class=" pb-1">
                    <div>
                      <div class="border-dotted border-4 p-2 mb-2">
                        <h1 class="text-md font-medium pr-2 leading-5 text-gray-800 mb-5">
                          Instrucciones:
                        </h1>
                        <p>
                          Usted debe subir los siguientes documentos requeridos para su solicitud:
                        </p>
                        <ul role="list" class="grid gap-5 grid-cols-1 md:grid-cols-2 my-7">
                          <li class="flex space-x-3" :class="!!form.files.id || (!!form.files.idBack && !!form.files.idFront) ? 'line-through' : ''">
                            <svg
                              v-if="completeId"
                              aria-hidden="true"
                              class="flex-shrink-0 w-5 h-5 text-prim-2 dark:text-primh"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            ><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="orange" class="w-5 h-5">
                              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"><b>1)</b> Cédula <b>(Método 1 o Método 2)</b></span>
                          </li>
                          <li v-if="form.certType === 4" class="flex space-x-3 decoration-gray-500" :class="form.files.appointment ? 'line-through' : ''">
                            <svg
                              v-if="form.files.appointment"
                              aria-hidden="true"
                              class="flex-shrink-0 w-5 h-5 text-prim-2 dark:text-primh"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            ><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="orange" class="w-5 h-5">
                              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-base font-normal leading-tight text-gray-500"><b>3)</b> Nombramiento</span>
                          </li>
                          <li v-if="form.certType >= 2" class="flex space-x-3" :class="form.files.ruc ? 'line-through' : ''">
                            <svg
                              v-if="form.files.ruc"
                              aria-hidden="true"
                              class="flex-shrink-0 w-5 h-5 text-prim-2 dark:text-primh"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            ><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="orange" class="w-5 h-5">
                              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"><b>2)</b> Documento R.U.C</span>
                          </li>
                          <li v-if="form.certType === 4" class="flex space-x-3 decoration-gray-500" :class="form.files.constitution ? 'line-through' : ''">
                            <svg
                              v-if="form.files.constitution"
                              aria-hidden="true"
                              class="flex-shrink-0 w-5 h-5 text-prim-2 dark:text-primh"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            ><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="orange" class="w-5 h-5">
                              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                            </svg>
                            <span class="text-base font-normal leading-tight text-gray-500"><b>4)</b> Constitución</span>
                          </li>
                        </ul>
                      </div>
                      <div class="flex items-center">
                        <h1 class="text-xl font-medium pr-2 leading-5 text-gray-800 my-5">
                          Carga de Documentos personales
                        </h1>
                      </div>
                      <div class="grid gap-5 md:grid-cols-2">
                        <div class="md:col-span-2">
                          <div>
                            <div class="flex">
                              <h5 class="text-md font-bold">
                                1) Cargue su Cédula de identidad
                              </h5><a-icon :type="completeId ? 'check-circle' : 'warning'" class="ml-5" :style="{ fontSize: '25px', color: completeId ? '#228B22' : 'orange' }" />
                            </div>
                            <h1>Seleccione cualquiera de los dos métodos para completar la opción</h1>
                            <div class="grid grid-cols-1">
                              <a-tabs
                                class="mt-5"
                                default-active-key="1"
                                tab-position="top"
                                @change="changeCiType"
                              >
                                <a-tab-pane key="1" tab="(Método 1) Subir cédula desde el ordenador">
                                  <h1 class="mb-5">
                                    <b>Importante:</b> En este apartado usted debe capturar la fotografía de la parte frontal y posterior de su identificación
                                  </h1>
                                  <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
                                    <div>
                                      <h1>Ejemplo de documento</h1>
                                      <div class="flex justify-center items-center">
                                        <img src="/marcocedulaambos.png" width="65%">
                                      </div>
                                    </div>
                                    <tail-file-input
                                      v-if="selectedCi === '1'"
                                      v-model="form.files.id"
                                      name="id-doc"
                                      :ids="2"
                                      class="mt-7"
                                      rules="required"
                                      description="cédula ambos lados"
                                    />
                                  </div>
                                </a-tab-pane>
                                <a-tab-pane key="2" tab="(Método 2) Tomar cédula ambos lados">
                                  <h1 class="mb-5">
                                    <b>Importante:</b> En este apartado usted debe subir desde su dispositivo, la cédula capturando ambas caras
                                  </h1>
                                  <div class="grid gap-5 md:grid-cols-2">
                                    <div>
                                      <h1>Cédula parte frontal</h1>
                                      <PhotoTaker :id="2.1" v-model="form.files.idFront" name="ciFordward" img-default="/ciFordward.jpg" :close="selectedCi !== '2'" />
                                    </div>
                                    <div>
                                      <h1>Cédula parte posterior</h1>
                                      <PhotoTaker :id="2.2" v-model="form.files.idBack" name="ciBackward" img-default="/ciBackward.png" :close="selectedCi !== '2'" />
                                    </div>
                                  </div>
                                </a-tab-pane>
                              </a-tabs>
                            </div>
                          </div>
                        </div>
                        <div v-if="form.certType !== 1" :class="form.certType === 2 ? 'md:col-span-2' : ''">
                          <div class="flex">
                            <h5 class="text-md font-bold">
                              2) Cargue su R.U.C
                            </h5><a-icon :type="form.files.ruc ? 'check-circle' : 'warning'" class="ml-5" :style="{ fontSize: '25px', color: form.files.ruc ? '#228B22' : 'orange' }" />
                          </div>
                          <h1 class="mb-5">
                            Es necesario cargar su registro único de contribuyente
                          </h1>
                          <tail-file-input v-model="form.files.ruc" name="ruc-doc" :ids="7" rules="required" description="documento RUC" />
                        </div>
                        <template v-if="form.certType === 4">
                          <div>
                            <div class="flex">
                              <h5 class="text-md font-bold">
                                3) Cargue su Nombramiento
                              </h5><a-icon :type="form.files.appointment ? 'check-circle' : 'warning'" class="ml-5" :style="{ fontSize: '25px', color: form.files.appointment ? '#228B22' : 'orange'}" />
                            </div>
                            <h1 class="mb-5">
                              Es necesario cargar el nombramiento de su empresa
                            </h1>
                            <tail-file-input v-model="form.files.appointment" name="appointment-doc" :ids="5" rules="required" description="nombramiento" />
                          </div>
                          <div>
                            <div class="flex">
                              <h5 class="text-md font-bold">
                                4) Cargue su Constitución
                              </h5><a-icon :type="form.files.constitution ? 'check-circle' : 'warning'" class="ml-5" :style="{ fontSize: '25px', color: form.files.constitution ? '#228B22' : 'orange' }" />
                            </div>
                            <h1 class="mb-5">
                              Es necesario cargar el acta de constitución de su empresa
                            </h1>
                            <tail-file-input
                              v-model="form.files.constitution"
                              accept=".pdf"
                              name="constitution-doc"
                              :ids="3"
                              rules="required"
                              description="constitución"
                              label-accept="PDF"
                            />
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </ValidationObserver>
              </div>
              <div v-show="currentProm === 2">
                <ValidationObserver ref="formPhoto">
                  <div class="mt-5 pb-10">
                    <div>
                      <div class="flex-inline items-center mb-5">
                        <h1 class="text-xl font-medium pr-2 leading-5 text-gray-800 mb-2">
                          Documento de validación de identidad
                        </h1>
                        <p>Seleccione cualquier método para verificar su identidad</p>
                      </div>
                      <div class="lg:ml-4 mt-3">
                        <center>
                          <a-row class="w-full md:w-2/3">
                            <a-col v-show="!tabPhoto" :xs="24">
                              <ul class="grid gap-6 w-full md:grid-cols-2">
                                <li v-for="(x, index) in typesValidationPhoto" :key="index">
                                  <input id="react-option" type="radio" class="hidden peer" required="">
                                  <label for="react-option" :class="x.select ? 'border-yellow-300 text-yellow-300 hover:text-yellow-300' : ''" class="inline-flex h-full justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50" @click="changeTabPhoto(x.id, index)">
                                    <div class="block">
                                      <img class="mb-2 w-7 h-7 text-sky-500" fill="currentColor" aria-hidden="true" :src="x.icon">
                                      <div class="w-full text-lg font-semibold">{{ x.name }}</div>
                                      <div class="w-full text-sm">{{ x.description }}</div>
                                      <p v-if="x.extra"><b class="w-full font-bold text-sm">{{ x.extra }}</b></p>
                                    </div>
                                  </label>
                                </li>
                              </ul>
                              <p class="flex justify-start mt-3 text-red-600 text-xs dark:text-red-500">
                                * Es necesario elegir un método de validación de identidad
                              </p>
                            </a-col>
                            <a-col v-show="tabPhoto" :xs="24">
                              <div class="md:grid md:grid-cols-3">
                                <div v-if="tabPhoto === '1' || tabPhoto === '2'" class="md:col-span-1">
                                  <h1>Ejemplo de fotografía</h1>
                                  <p class="text-sm mt-5 text-left font-light text-gray-500">
                                    <b>Importante: </b> Es necesario tomar su retrato con su documento de identidad
                                  </p>
                                  <div class="flex justify-center items-center my-5">
                                    <img src="/cedula-info.jpeg" width="90%">
                                  </div>
                                </div>
                                <PhotoTaker
                                  v-show="tabPhoto === '1'"
                                  :id="6"
                                  v-model="form.files.photo"
                                  name="photoTake"
                                  :close="tabPhoto !== '1'"
                                  class="md:col-span-2"
                                />
                                <tail-file-input
                                  v-if="tabPhoto === '2'"
                                  v-model="form.files.photo"
                                  :ids="6"
                                  name="id-photo"
                                  rules="required"
                                  class="md:col-span-2 my-auto"
                                  description="Fotografía"
                                />
                              </div>
                              <VideoRecorder v-if="tabPhoto === '3'" v-model="form.files.photo" :form="form" />
                              <div v-if="tabPhoto === '4'">
                                <div class="mx-7">
                                  <div class="flex items-center">
                                    <h1 class="text-lg font-light pr-2 leading-5 text-gray-800 mb-2">
                                      Este método seleccionado agilitará la validación de su solicitud por lo cual,
                                      debe grabar su video con el siguiente diálogo. <br> <b>Máximo 20 segundos</b>
                                    </h1>
                                  </div>
                                  <p class="mb-3 font-medium text-center leading-5 text-gray-800 border-2 border-gray-400 p-3">
                                    Yo, <b>{{ `${form.subject.name1} ${form.subject.name2} ${form.subject.surName1} ${form.subject.surName2}` }}</b>
                                    con cédula de identidad <b>{{ form.subject.id }}</b>, autorizo a la empresa ANFAC a gestionar mi firma electrónica.
                                  </p>
                                </div>
                                <tail-file-input
                                  v-model="form.files.photo"
                                  :ids="6"
                                  name="id-photo"
                                  rules="required"
                                  description="Video"
                                  accept="video/*"
                                  label-accept="MP4 Y WEBM"
                                />
                              </div>
                              <a
                                class="flex justify-start text-prim-2 underline hover:underline mt-4"
                                @click="returnMethodsPhoto"
                              >
                                <svg
                                  class="ml-2 w-5 h-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                >
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                                Cambiar método para validación de identidad
                              </a>
                            </a-col>
                          </a-row>
                        </center>
                      </div>
                    </div>
                  </div>
                </ValidationObserver>
              </div>
              <div v-if="!fedotaxi && !convenio" v-show="currentProm === 3">
                <div class="mt-5">
                  <div class="overflow-y-hidden">
                    <div class="lg:container lg:mx-auto flex grid md:grid-cols-12">
                      <div class="md:col-span-8 sm:col-span-6 bg-white h-auto relative px-1 mx-6">
                        <h3 class="font-semibold text-gray-800 text-4xl mt-2">
                          Facturación
                        </h3>

                        <div class="mt-5 lg:mt-5 mb-5">
                          <div>
                            <p class="font-normal text-base text-gray-600 mb-3">
                              Si desea emitir su factura con otros datos seleccione la opción
                              <b>Deseo facturar a otro nombre</b>, de lo contrario se facturará con
                              los datos de su solicitud, después elija su método de pago de preferencia.
                            </p>
                          </div>
                          <a-checkbox v-model="billingOther" class="text-base mt-12 prose prose-xl">
                            <b>Deseo facturar a otro nombre</b>
                          </a-checkbox>
                          <div v-if="billingOther">
                            <h3 class="text-2xl text-gray-800 font-medium my-5">
                              Ingrese sus nuevos datos de facturación.
                            </h3>
                            <div>
                              <ValidationObserver ref="form3">
                                <form>
                                  <a-row :gutter="32">
                                    <a-col :xs="24" :md="12">
                                      <tail-select v-model="form.infoBilling.idType" label="Tipo de identificación" name="typesIdInfoBilling" rules="required" :options="option.TypeIdUpconta" />
                                    </a-col>
                                    <a-col :xs="24" :md="12">
                                      <tail-input v-model="form.infoBilling.id" label="Número de identificación" name="idInfoBilling" :rules="`required|typeIdUpconta:${form.infoBilling.idType}`" placeholder="1723432434" />
                                    </a-col>
                                    <a-col :xs="24" :md="12">
                                      <tail-input v-model="form.infoBilling.name" label="Nombres completos" name="nameInfoBilling" rules="required|letters" />
                                    </a-col>
                                    <a-col :xs="24" :md="12">
                                      <tail-input v-model="form.infoBilling.city" label="Ciudad" name="cityInfoBilling" rules="required" />
                                    </a-col>
                                    <a-col :xs="24" :md="12">
                                      <tail-input v-model="form.infoBilling.address" label="Dirección de domicilio" name="addressInfoBilling" rules="required" placeholder="Dirección de domicilio" />
                                    </a-col>
                                    <a-col :xs="24" :md="12">
                                      <tail-input
                                        v-model="form.infoBilling.phone"
                                        label="Número de teléfono convencional"
                                        name="tellphoneInfoBilling"
                                        max="15"
                                        rules="required|numbers|size:15"
                                        placeholder="23435444"
                                      />
                                    </a-col>
                                    <a-col :xs="24" :md="12">
                                      <tail-input
                                        v-model="form.infoBilling.cellphone"
                                        label="Número de celular"
                                        name="phoneInfoBilling"
                                        max="15"
                                        rules="required|ext-numbers|size:15"
                                        placeholder="098743735454"
                                      />
                                    </a-col>
                                    <a-col :xs="24" :md="12">
                                      <tail-input
                                        v-model="form.infoBilling.email"
                                        label="Dirección de correo electrónico"
                                        type="email"
                                        name="mailInfoBilling"
                                        rules="required|mail"
                                        placeholder="youremail@example.com"
                                      />
                                    </a-col>
                                    <a-col :xs="24" :md="12">
                                      <tail-input
                                        v-model="form.infoBilling.optionalEmail"
                                        label="Dirección de correo electrónico opcional"
                                        type="email"
                                        name="opmailInfoBilling"
                                        rules="mail"
                                        placeholder="youremail@example.com"
                                      />
                                    </a-col>
                                  </a-row>
                                </form>
                              </ValidationObserver>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="md:col-span-4 sm:col-span-6 relative bg-gray-100 px-8 py-14 xl:px-12 xl:py-10">
                        <div class="flex flex-1">
                          <h3 class="text-gray-800 font-semibold text-2xl">
                            Productos
                          </h3>
                          <div class="flex-auto" />
                        </div>
                        <div class="mt-7 flex flex-1 justify-between  text-gray-800 text-lg font-normal">
                          <h3>-Firma electronica</h3>
                          <h3>{{ form.total.value | currency }}</h3>
                        </div>
                        <div v-if="product.container._id">
                          <h3 class="text-gray-800 mb-0 pb-0 mt-5 font-semibold text-xl">
                            Productos adicionales
                          </h3>
                          <div class="mt-7 flex flex-1 justify-between  text-gray-800 text-lg font-normal">
                            <h3>-Token físico</h3>
                            <h3>{{ product.container.price.value | currency }}</h3>
                          </div>
                          <div class="mt-7 flex flex-1 justify-between  text-gray-800 text-lg font-normal">
                            <h3>-Entrega</h3>
                            <h3>{{ product.delivery.price.value | currency }}</h3>
                          </div>
                        </div>
                        <div class="-bottom-7 px-8 xl:px-12 pb-5 md:-bottom-96 bg-gray-100 md:pt-80 md:pb-10 lg:pb-10 lg:pt-0 lg:mt-0 lg:bottom-0 absolute left-0 w-full text-lg font-medium text-gray-800">
                          <span aria-label="Total" class="float-left text-2xl text-gray-800 font-normal">Total</span>
                          <span aria-label="Total Price" class="float-right font-semibold text-gray-800 text-2xl mb-3">{{ total | currency }}</span>
                          <div class="clear-both" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="!fedotaxi && !convenio" v-if="currentProm === 4">
                <h3 class="font-semibold text-gray-800 text-4xl mt-2">
                  Pago
                </h3>

                <div class="mt-5 lg:mt-5 mb-5">
                  <p class="font-normal text-base text-gray-600 mb-3">
                    Por favor seleccione el método de pago de su preferencia.
                  </p>
                </div>
                <ValidationObserver ref="form4">
                  <form>
                    <div class="overflow-y-hidden dark:bg-gray-900">
                      <div class="flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                        <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                          <div v-if="!viewPayment" class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            <div class="flex flex-col px-4 pt-6 md:p-6 xl:px-8 pt-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                              <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                                Resumen
                              </h3>
                              <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div class="flex justify-between w-full">
                                  <p class="text-base dark:text-white leading-4 text-gray-800">
                                    Firma electrónica
                                  </p>
                                  <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                                    {{ form.total && form.total.value | currency }}
                                  </p>
                                </div>
                              </div>
                              <div v-if="product.container._id">
                                <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                  <div class="flex justify-between w-full">
                                    <p class="text-base dark:text-white leading-4 text-gray-800">
                                      Producto adicional: {{ product.container.name }}
                                    </p>
                                    <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                                      {{ product.container.price.value | currency }}
                                    </p>
                                  </div>
                                </div>
                                <div class="flex justify-center items-center w-full space-y-4 mt-4 flex-col border-gray-200 border-b pb-4">
                                  <div class="flex justify-between w-full">
                                    <p class="text-base dark:text-white leading-4 text-gray-800">
                                      Entrega
                                    </p>
                                    <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                                      {{ product.delivery.price.value | currency }}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div class="flex justify-between w-full">
                                  <p class="text-base dark:text-white leading-4 text-gray-800">
                                    Código de descuento
                                  </p>
                                  <div>
                                    <div class="sm:flex sm:flex-col md:relative">
                                      <input
                                        id="search"
                                        v-model="form.coupon.code"
                                        :disabled="form.coupon.flagPay"
                                        type="search"
                                        :class="form.coupon.code.length > 0 && !form.coupon.flagPay ? 'border-2 border-red-500 shadow appearance-none focus:outline-none focus:shadow-outline focus:ring-red-400 focus:ring focus:ring-opacity-40' : 'border border-prim-3 focus:ring-prim-3 focus:border-prim-3'"
                                        class="block p-4 md:pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg"
                                        placeholder="Código de promo"
                                        required
                                      >
                                      <button
                                        v-if="!form.coupon.flagPay"
                                        :disabled="search"
                                        class="text-white md:absolute right-2.5 bottom-2.5 bg-prim hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mt-5"
                                        @click="aplyDiscount(form.coupon.code)"
                                      >
                                        <svg v-if="search" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg>
                                        Validar
                                      </button>
                                    </div>
                                    <p v-if="form.coupon.code.length > 0 && !form.coupon.flagPay " class="text-red-600 text-xs dark:text-red-500 mt-3">
                                      Es necesario validar el código para utilizarlo
                                    </p>
                                  </div>
                                  <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                                    {{ form.coupon.value | currency }}
                                  </p>
                                </div>
                              </div>
                              <div class="flex justify-between items-center w-full">
                                <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">
                                  Total
                                </p>
                                <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                                  {{ total | currency }}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div v-if="!viewPayment" class="w-full">
                            <h3 class="text-2xl text-gray-800 font-medium my-5">
                              Seleccione su método de pago:
                            </h3>
                            <tail-select v-model="payment.type" name="paymentType" rules="required" :options="option.TypesPaymentMethod" @change="changeTypePayment" />
                            <div v-if="payment.type && payment.type !== 'card' && payment.type !== 'distributor'">
                              <p class="mt-5">
                                Debe cargar el comprobante del {{ payment.type === 'deposit' ? 'depósito realizado' : 'la transferencia realizada' }} a nombre de ANF
                                AUTORIDAD DE CERTIFICACIÓN ECUADOR C.A. RUC: 1792601215001 a la cuenta  corriente N°
                                <b>0700626089</b> de
                                <b>BANCO INTERNACIONAL</b>
                                por un total de
                                <b>{{ total | currency }} </b>(precio incluye I.V.A.).
                                Un operador revisará y verificará el registro de pago en la cuenta bancaria anteriormente mencionada.
                              </p>
                              <div v-if="payment && payment.type !== 'distributor'" style="margin:20px auto; width: 50% ">
                                <tail-file-input v-model="payment.document" rules="required" name="paymentDoc" description="Comprobante de pago" />
                              </div>
                              <a-col v-if="payment.document && payment.type !== 'distributor'" :span="24">
                                <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800 mb-4">
                                  Detalles del pago
                                </h3>
                                <p class="font-normal text-base text-gray-600 mb-3">
                                  La información que se solicita a continuación es para contrastar con la información entregada por nuestro banco y así agilizar la verificación del pago realizado.
                                </p>
                                <label id="emailAddress" class="text-sm leading-none text-gray-800">
                                  <b style="color: red">*</b> {{ payment.type ==='transfer' ? 'Nombre del titular de la cuenta bancaria desde donde se realizó la transferencia:' : 'Nombre del depositante:' }}
                                </label>
                                <tail-input
                                  v-model="payment.holder"
                                  name="paymentHolder"
                                  rules="required"
                                  class="mb-4"
                                  :placeholder="payment.type ==='transfer' ? 'Ingrese el nombre del titular de la cuenta bancaria desde donde se realizó la transferencia' : 'Ingrese el nombre del depositante'"
                                />
                                <label v-if="payment.type === 'transfer'" id="emailAddress" class="text-sm leading-none text-gray-800">
                                  <b style="color: red">*</b> Nombre del banco desde donde se realizó la transferencia:
                                </label>
                                <tail-input
                                  v-if="payment.type === 'transfer'"
                                  v-model="payment.bank"
                                  name="paymentBank"
                                  rules="required"
                                  class="mb-4"
                                  placeholder="Ingrese el nombre del banco desde donde se realizó la transferencia"
                                />
                                <label v-if="payment.type === 'transfer'" id="emailAddress" class="text-sm leading-none text-gray-800">
                                  <b style="color: red">*</b> Número de cuenta desde donde se realizó la transferencia:
                                </label>
                                <tail-input
                                  v-if="payment.type === 'transfer'"
                                  v-model="payment.account"
                                  name="paymentAccount"
                                  rules="required"
                                  class="mb-4"
                                  placeholder="Ingrese el número de cuenta desde donde se realizó la transferencia"
                                />
                                <div v-if="payment.type !== 'distributor'">
                                  <p style="text-align: center">
                                    <strong>Nota:</strong> Se aceptan pagos de bancos, cooperativas, mutualistas u otras instituciones financieras reguladas por el sistema financiero del Ecuador
                                  </p>
                                </div>
                              </a-col>
                            </div>
                            <div v-if="payment.type === 'distributor'">
                              <label class="text-sm leading-none text-gray-800 mt-3">
                                <b style="color: red">*</b> Ingrese su código de distribuidor:
                              </label>
                              <tail-input v-model="payment.observation" name="numdistributor" rules="required" placeholder="5434343" />
                            </div>
                          </div>
                          <div v-else>
                            <CardPayment
                              v-if="viewPayment"
                              :user="form"
                              :payment="payment"
                              @changeId="viewChangeId = true"
                              @error="() => {
                                viewPayment = false
                                payment.type = 'card'
                              }"
                            />
                          </div>
                        </div>
                        <div v-if="!viewPayment" class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                          <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                            Detalles
                          </h3>
                          <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                            <div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                              <img class="dark:hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg" alt="email">
                              <img class="hidden dark:block" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg" alt="email">
                              <p class="cursor-pointer text-sm leading-5 ">
                                {{ form.subject.mail }}
                              </p>
                            </div>
                          </div>
                          <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                            <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                              <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                                  Información de localidad
                                </p>
                                <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  {{ form.subject.state }} - {{ form.subject.city }} - {{ form.subject.address }}
                                </p>
                              </div>
                              <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                                  Dirección para facturación
                                </p>
                                <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                  {{ billingOther ? form.infoBilling.address : `${ form.subject.state } - ${ form.subject.city } - ${ form.subject.address }` }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </ValidationObserver>
              </div>
              <div v-if="!fedotaxi && !convenio ? currentProm === 5 : currentProm === 3">
                <finish />
              </div>
            </div>
          </div>
          <div>
            <div v-if="!fedotaxi && !convenio" class="flex justify-between items-center mt-6">
              <t-button
                v-if="currentProm !== 5"
                outline
                @click="returnSteps"
              >
                {{ !viewPayment ? 'Regresar' : 'Cambiar método de pago' }}
              </t-button>
              <t-button v-if="currentProm !== 5" type="primary" :disabled="isLoading || (currentProm === 4 && payment.type === '')" :loading="isLoading" @click="goNextCurrent">
                {{ currentProm === 4 && payment.type === 'card' ? 'Pagar' : currentProm === 4 && payment.type !== 'card' && payment.type !== '' ? 'Finalizar' : 'Continuar' }}
              </t-button>
            </div>
            <div v-if="fedotaxi || convenio" class="flex justify-between items-center mt-6">
              <t-button
                v-if="currentProm !== 3"
                @click="returnSteps"
              >
                Regresar
              </t-button>
              <t-button v-if="currentProm !== 3" type="primary" :disabled="currentProm === 2 ? (!tabPhoto || isLoading) : isLoading" :loading="isLoading" @click="goNextCurrent">
                {{ currentProm === 2 ? 'Finalizar' : 'Continuar' }}
              </t-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vs-dialog v-model="viewInformation" not-close auto-width not-padding>
      <div class="flex bg-white" style="max-height:490px; overflow-y: hidden">
        <div class="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2 py-5">
          <div>
            <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl">
              Horarios de <span class="text-prim">Atención</span>
            </h2>
            <p class="mt-2 text-sm text-gray-500 md:text-base">
              Estimado(a) cliente le informamos que el registro de solicitudes en este aplicativo se lo puede
              realizar en cualquier momento <strong>(24 horas - 7 días a la semana)</strong>, pero la gestión
              de las solicitudes ingresadas se realiza durante el horario de 9:00 am a 17:00 pm en dias laborables (Lunes a Viernes).
            </p>
            <p class="text-sm text-gray-500 md:text-base">
              Atentamente<br>
              Firmas Electrónicas - ANF AC
            </p>
            <div class="flex justify-center lg:justify-start my-5">
              <button
                class="w-full flex mt-5 justify-center bg-prim  hover:bg-primh text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                @click="() => {
                  viewInformation = false
                  viewSteps = true
                }"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
        <div class="hidden lg:block lg:w-1/2" style="clip-path:polygon(10% 0, 100% 0%, 100% 100%, 0 100%)">
          <div class="h-screen object-cover m-10">
            <img src="https://goama.com/wp-content/uploads/2022/07/49a86b71-fimale.png" alt="" height="490px">
          </div>
        </div>
      </div>
    </vs-dialog>
    <vs-dialog v-model="viewAlert" width="550px" not-center>
      <template #header>
        <span class="flex pl-5 mt-5 mb-0 pb-0">
          <a-icon :style="{ fontSize: '25px', color: 'orange' }" class="mr-2" type="warning" />
          <h4 class="not-margin text-xl">
            Importante
          </h4>
        </span>
      </template>
      <div class="p-5">
        <p class="mb-2">
          Los documentos que ingrese deben ser vigentes, a color y legibles,
          caso contrario ocasionará demora en su solicitud, el proceso solo continuará
          hasta que se entregue los documentos de acuerdo a los parámetros establecidos.
        </p>
        <p>
          El correo electrónico que proporcione debe estar activo y accesible,
          es el medio donde le llegará notificaciones del proceso{{ fedotaxi || convenio ? '' : ' y factura del pago' }}.
        </p>
      </div>
      <template #footer>
        <div class="mx-5">
          <!--          <vs-button @click="active=false" color="blue" block transparent>
            Entendido
          </vs-button>-->
          <button
            class="w-full flex justify-center bg-prim  hover:bg-primh text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
            @click="viewAlert = false"
          >
            Entendido
          </button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog v-model="showInfoCode" width="550px" not-center>
      <template #header>
        <span class="flex pl-5 mt-5 mb-0 pb-0">
          <a-icon :style="{ fontSize: '25px', color: 'orange' }" class="mr-2" type="warning" />
          <h4 class="not-margin text-xl">
            Verificación de identidad
          </h4>
        </span>
      </template>
      <div class="p-5">
        <p class="mb-2">
          Al dar click en confirmar verificaremos su número de identificación,
          posteriormente, se le enviará un código a su email registrado.
        </p>
        <center>
          <img src="/otp.svg" width="65%">
        </center>
      </div>
      <template #footer>
        <div class="mx-5">
          <button
            :disabled="loadButton"
            class="w-full flex justify-center bg-prim  hover:bg-blue-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
            @click="verifyIdentification"
          >
            <svg
              v-if="loadButton"
              aria-hidden="true"
              class="inline mr-3 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
            Confirmar
          </button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog v-model="authenticate.showError" width="550px" not-center>
      <template #header>
        <span class="flex pl-5 mt-5 mb-0 pb-0">
          <a-icon :style="{ fontSize: '25px', color: 'orange' }" class="mr-2" type="warning" />
          <h4 class="not-margin text-xl">
            Error de confirmación
          </h4>
        </span>
      </template>
      <div class="p-5">
        <p class="mb-2">
          {{ authenticate.errorMessage }}
        </p>
        <center>
          <img :src="authenticate.errorCode === 'TokenBlocked' ? '/time.svg' : '/alert.svg'" width="65%">
        </center>
      </div>
      <template #footer>
        <div class="mx-5">
          <button
            :disabled="loadButton"
            class="w-full flex justify-center bg-prim  hover:bg-blue-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
            @click="authenticate.showError = false"
          >
            <svg
              v-if="loadButton"
              aria-hidden="true"
              class="inline mr-3 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
            Entendido
          </button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog v-model="showDrawer" width="900" not-center>
      <template #header>
        <span class="flex pl-5 mt-5 mb-0 pb-0">
          <a-icon :style="{ fontSize: '25px', color: 'blue' }" class="mr-2" :type="typeDrawer === 'step' ? 'info-circle' : 'youtube'" />
          <h4 class="not-margin text-xl">
            {{ typeDrawer === 'step' ? 'Guía' : 'Video tutorial' }}
          </h4>
        </span>
      </template>
      <div class="p-5">
        <img v-if="typeDrawer === 'step'" :src="`https://firmaselectronicas.ec/app-imagenes/Info_Pasos_Separados_${currentProm + 1}.png`">
        <iframe
          v-else
          src="https://www.youtube.com/embed/nbZ7ppP42jc?start=1&autoplay=1"
          width="700"
          height="410"
          allowfullscreen
        />
      </div>
      <template v-if="typeDrawer === 'step'" #footer>
        <div class="mx-5">
          <center>
            <h2 style="margin: 10px 10px 15px 80px">
              Si desea información adicional haga click sobre las siguientes opciones:
            </h2>
            <a style="margin-right: 15px" href="https://firmaselectronicas.ec/preguntas-frecuentes/" target="_blank">
              <img width="150px" src="https://firmaselectronicas.ec/app-imagenes/boton_preguntas.jpg">
            </a>
            <a href="https://firmaselectronicas.ec/#requisitos" target="_blank">
              <img width="150px" src="https://firmaselectronicas.ec/app-imagenes/boton_requisitos.jpg">
            </a>
          </center>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog
      v-model="showLetter"
      width="800px"
      prevent-close
      @close="closeLetter"
    >
      <template #header>
        <span class="flex pl-5 mb-0 pb-0 bg-grey-100">
          <h4 class="text-xl text-prim not-margin mb-0 pb-0">
            Términos y condiciones
          </h4>
        </span>
      </template>
      <div class="">
        <div v-if="showLetter" style="height: 320px; overflow-y: auto; overflow-x: hidden; border: 1px solid lightgrey;">
          <vue-pdf
            v-for="i in 7"
            :key="i"
            class="pdf-vue"
            :enable-links="false"
            :enable-hyperlink="false"
            :page="i"
            src="/TERMINOS-Y-CONDICIONES-EMISIÓN-DE-FIRMAS-ELECTRONICAS.pdf"
            @link-clicked="clickLinkPdf($event)"
          />
        </div>
        <p class="text-xl text-prim mt-2 mb-0 pb-0">
          <strong>Nota: </strong>Realice el trazo de su firma en el lugar especificado, una vez finalizado de click en  <strong>Guardar </strong>para poder continuar
        </p>
        <a-alert
          v-if="alertSave"
          message="Es necesario realizar una rúbrica manuscrita y dar click en guardar"
          banner
        />
        <div class="flex justify-center mt-2">
          <a-card hoverable style="width: 400px;" :body-style="{padding: '0px'}">
            <div class="flex w-full ma-0 pa-0">
              <VueSignaturePad id="signature" ref="signaturePad" width="100%" />
            </div>
            <ul class="ant-card-actions ma-0 pa-0">
              <li style="width: 50%; padding: 7px 0; margin: 0px 0" @click="undo">
                <span><a-icon style="width: 10%" type="delete" /> Borrar</span>
              </li>
              <li style="width: 50%; padding: 7px 0; margin: 0px 0" @click="saveLetter">
                <span><a-icon style="width: 10%" type="save" /> Guardar</span>
              </li>
            </ul>
          </a-card>
        </div>
      </div>
      <template #footer>
        <div class="flex align-center justify-center">
          <t-button
            class="mt-5"
            :disabled="!form.contract.letter"
            block
            type="primary"
            @click="finishLetter"
          >
            Aceptar y continuar
          </t-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog v-model="viewChangeId" width="550px" not-center>
      <template #header>
        <span class="flex pl-5 mt-5 mb-0 pb-0">
          <a-icon :style="{ fontSize: '25px', color: 'orange' }" class="mr-2" type="warning" />
          <h4 class="not-margin text-xl">
            Identificación inválida
          </h4>
        </span>
      </template>
      <div class="p-5">
        <p class="mb-2">
          Para realizar su pago de tarjeta es necesario que usted ingrese en su solicitud un número de identificación válido.
        </p>
        <div class="grid gap-5 md:grid-cols-2">
          <tail-select v-model="form.subject.type" label="Tipo de identificación" name="typesIdT" rules="required" :options="option.TypesId" />
          <tail-input
            v-model="form.subject.id"
            :label="`Número de ${!!form.subject.type ? form.subject.type === 'ci' ? 'cédula' : 'pasaporte' : 'identificación'}`"
            name="identification"
            :type="form.subject.type === 'ci' ? 'number' : 'text'"
            :rules="`required|typeId:${form.subject.type}`"
            placeholder="Ingrese el número de su identificación"
            info="Si su tipo de identificación es diferente seleccione el correcto en el apartado de tipo de identificación"
          />
        </div>
        <p class="mb-0 pb-0 mt-2">
          De click en corregir y realice su pago con tarjeta nuevamente .
        </p>
      </div>
      <template #footer>
        <div class="mx-5">
          <button
            class="w-full flex justify-center bg-prim  hover:bg-blue-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
            @click="correctId"
          >
            Corregir
          </button>
        </div>
      </template>
    </vs-dialog>
  </a-layout>
</template>

<script>
import Finish from '~/components/client/finish'
import CardPayment from '@/components/client/CardPayment'
import VideoRecorder from '@/components/inputs/VideoRecorder'
import PhotoTaker from '@/components/inputs/PhotoTaker'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
  components: { Finish, CardPayment, VideoRecorder, PhotoTaker },
  props: {
    typeDistributor: {
      type: String,
      default: 'anf-default'
    },
    fedotaxi: {
      type: Boolean,
      default: false
    },
    convenio: {
      type: Boolean,
      default: false
    },
    fast: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      paymentData: {},
      billingOther: false,
      settings: {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 0,
        slidesToScroll: 1,
        touchThreshold: 5
      },
      windowWidth: 1100,
      paymentMethod: '',
      fileList: [],
      currentProm: 2,
      showSelection: 1,
      showPromo: false,
      flagSelector: true,
      showDrawer: false,
      typeDrawer: '',
      showVideo: false,
      option: {},
      categories: [],
      id: undefined,
      isLoading: false,
      endpoint: '/api/anf-requests/user/get-options',
      steps: [
        {
          title: 'Tipo de certificado'
        },
        {
          title: 'Datos y documentos'
        },
        {
          title: 'Verificación de identidad'
        },
        {
          title: 'Forma de pago'
        },
        {
          title: 'Confirmación de ingreso'
        }
      ],
      // empieza nueva version
      alertSave: false,
      viewInformation: false,
      search: false,
      prices: [],
      payment: {
        type: '',
        observation: ''
      },
      discount: {
        code: '',
        value: 0
      },
      showLetter: false,
      form: {
        certificateAuthorization: false,
        certType: 0,
        type: 'file',
        duration: '',
        products: [],
        total: {},
        contract: {
          letter: ''
        },
        coupon: {
          flagPay: false,
          code: '',
          value: 0
        },
        price: '',
        infoBilling: {
          id: undefined,
          name: undefined,
          idType: undefined,
          phone: undefined,
          email: undefined,
          address: undefined,
          cellphone: undefined,
          optionalEmail: undefined,
          city: undefined,
          withSubject: true
        },
        subject: {
          name1: undefined,
          name2: undefined,
          surName1: undefined,
          surName2: undefined,
          type: undefined,
          id: undefined,
          mail: undefined,
          confirmMail: undefined,
          cellphone: undefined,
          telphone: undefined,
          state: undefined,
          city: undefined,
          address: undefined,
          ruc: undefined,
          business: undefined,
          businessName: undefined,
          businessNameOther: undefined,
          businessCountry: undefined,
          businessState: undefined,
          businessCity: undefined,
          businessAddress: undefined,
          businessTelphone: undefined,
          businessMail: undefined,
          confirmationBusinessMail: undefined,
          businessPosition: undefined,
          departamentBusiness: undefined,
          distributorInfo: undefined,
          dateBirth: undefined,
          registryData: 'Sin información',
          foreing: false
        },
        files: {
          id: null,
          idFront: null,
          idBack: null,
          ruc: null,
          photo: null,
          appointment: null,
          constitution: null
        },
        password: '',
        confirmPassword: ''
      },
      businessPublics: [
        'ARCOTEL',
        'ASAMBLEA NACIONAL',
        'AUTORIDAD PORTUARIA GYE',
        'BOMBEROS DE QUITO',
        'CELEC EP',
        'CENACE',
        'CENEL EP',
        'CNT EP',
        'CONSEJO DE LA JUDICATURA',
        'CONSEJO NACIONAL ELECTORAL',
        'ESCUELA POLITECNICA NACIONAL',
        'ESPE INNOVATIVA E.P.',
        'ESPOCH',
        'ESPOL',
        'ETAPA EP',
        'FISCALIA GENERAL DEL ESTADO',
        'FLOPEC EP',
        'FUERZAS ARMADAS DEL ECUADOR',
        'FUERZAS POLICIA NACIONAL',
        'HCAM',
        'Hopital FFAA',
        'IESS',
        'INEVAL',
        'MIN.  DE RELACIONES EXTERIORES',
        'MIN. DE AGRICULTURA Y GANADERIA',
        'MIN. DE CULTURA Y PATRIMONIO',
        'MIN. DE DEFENSA NACIONAL',
        'MIN. DE DESARROLLO URBANO Y VIVIENDA',
        'MIN. DE ECONOMIA Y FINANZAS',
        'MIN. DE EDUCACION',
        'MIN. DE GOBIERNO',
        'MIN. DE INCLUSION ECONOMICA Y SOCIAL',
        'MIN. DE PRODUCCION COMERCIO EXTERIOR',
        'MIN. DE SALUD PUBLICA',
        'MIN. DE TRANSPORTE Y OBRAS PUBLICAS',
        'MIN. DE TURISMO',
        'MIN. DEL AMBIENTE Y AGUA',
        'MIN. DEL DEPORTE',
        'MIN. DEL TRABAJO',
        'MIN. TELECOMUNICACIONES',
        'MINICIPIO CUENCA',
        'MUNICIPIO DM QUITO',
        'MUNICIPIO GUAYAQUIL',
        'MUNICIPIO LATACUNGA',
        'PETROECUADOR EP',
        ' PRESIDENCIA DE LA REPUBLICA',
        'PROCURADURIA GENERAL DEL ESTADO',
        'SECRETARIA NACIONAL DE PLANIFICACION',
        'SENESCYT',
        'SERVICIO DE RENTAS INTERNAS - SRI',
        'SERVICIO NACIONAL DE CONTRATACION PUBLICA - SERCOP',
        'SUPER. DE COMPANIAS VALORES Y SEGUROS',
        'SUPER. DE CONTROL DEL PODER DE MERCADO',
        'SUPER. DE ECONOMIA POPULAR Y SOLIDARIA',
        'UNIVERSIDAD DE LAS FUERZAS ARMADAS - ESPE',
        'NINGUNA',
        'OTRA'
      ],
      viewPayment: false,
      paymentLink: {
        url: '',
        token: ''
      },
      loadPrices: false,
      loadOptions: false,
      flagPagomedios: 0,
      showModalPayment: false,
      viewSteps: false,
      viewAlert: false,
      virtual: false,
      product: {
        container: {
          _id: ''
        },
        delivery: {
          _id: '',
          address: ''
        },
      },
      desactive: false,
      errorPhoto: false,
      tabPhoto: '',
      typesValidationPhoto: [
        {
          id: '1',
          icon: '/camera.svg',
          name: 'Capturar foto',
          select: false,
          description: 'Usted podrá capturar la foto solicitada haciendo uso de su dispositivo'
        },
        {
          id: '2',
          icon: '/upimage.svg',
          name: 'Subir foto',
          select: false,
          description: 'Usted podrá subir la imagen solicitada'
        },
        {
          id: '3',
          icon: '/record.svg',
          name: 'Grabar video',
          select: false,
          description: 'Usted podrá grabar un video corto con lo descrito en el diálogo',
          extra: '(Proceso más rápido)'
        },
        {
          id: '4',
          icon: '/upvideo.svg',
          name: 'Subir video',
          select: false,
          description: 'Usted podrá subir un video con lo descrito en el diálogo',
          extra: '(Proceso más rápido)'
        }
      ],
      typesActionToDo: [
        {
          id: '1',
          icon: '/request.svg',
          name: 'Solicitud de Firma electrónica',
          select: true,
          description: 'Usted puede solicitar firmas electrónicas de Persona natural, Persona natural con RUC y Persona Júridica'
        },
        /* {
          id: '2',
          icon: '/renew.svg',
          name: 'Revovar firma',
          select: false,
          description: 'Usted podrá renovar su firma electrónica de FEDOTAXI'
        }, */
        /* {
          id: '3',
          icon: '/promo.svg',
          name: 'Firma rápida',
          select: false,
          description: 'Usted puede elegir entre nuestras mejores opciones para solicitar su firma de forma rápida'
        } */
      ],
      showInfoCode: false,
      authenticate: {
        id: '',
        activeCode: false,
        refresh: false,
        code: '',
        errorCode: '',
        errorMessage: '',
        showError: false
      },
      loadButton: false,
      selectedCi: '1',
      noRegister: false,
      alreadyExist: false,
      viewChangeId: false,
      fastOptions: [
        {
          id: 1,
          description: 'Persona natural vigencia 24 horas'
        },
        {
          id: 2,
          description: 'Persona natural con RUC vigencia 2 años'
        }
      ],
      fastType: 1,
      disabledPassword: null,
    }
  },
  head () {
    return {
      title: 'Firma'
    }
  },
  computed: {
    count () {
      return this.$store.state.navigation.current
    },
    total () {
      const additional = this.product.container._id ? this.product.container.price.value + this.product.delivery.price.value : 0
      const coupon = this.form.coupon.flagPay ? this.form.coupon.value : 0
      return (this.form.total.value + additional) - coupon
    },
    completeId () {
      return this.selectedCi === '1' ? this.form.files.id : (this.form.files.idBack && this.form.files.idFront)
    },
  },
  watch: {
    count (newValue) {
      newValue === 1 ? this.openNotificationWithIcon() : 0 // eslint-disable-line
    },
    billingOther (val) {
      this.form.infoBilling.withSubject = !val
    },
    'form.total._id' (val) {
      this.form.price = val
    }
  },
  created () {
    this.getOptions()
  },
  async mounted () {
    if (!this.fedotaxi && !this.convenio) {
      if (!this.fast) { this.viewInformation = true }
      await this.getPrices(this.fast ? '0.1' : false)
      if (this.fast) {
        this.form.certType = ''
        // this.chooseDuration(this.prices)
      }
    }
    // this.windowWidth = window.innerWidth
    if (this.windowWidth > 1339) {
      this.settings.slidesToShow = 4.5
    } else if (this.windowWidth > 1079) {
      this.settings.slidesToShow = 3.1
    } else if (this.windowWidth > 767) {
      this.settings.slidesToShow = 2.2
    } else {
      this.settings.slidesToShow = 1
    }
  },
  methods: {
    clickLinkPdf (event) {
      alert(JSON.stringify(event))
    },
    returnMenuPrincipal () {
      if (!this.fast) {
        this.typesActionToDo[0].select = false
        this.form.duration = ''
        this.form.certType = ''
      } else {
        this.$router.push('/v2')
      }
    },
    correctId () {
      this.payment.type = 'card'
      this.viewChangeId = false
    },
    changeTypePayment (val) {
      if (val) {
        if (val === 'card' || val === 'distributor') {
          delete this.payment.holder
        }
        delete this.payment.account
        delete this.payment.bank
        delete this.payment.document
        delete this.payment.observation
      }
    },
    returnMethodsPhoto () {
      this.typesValidationPhoto.forEach(x => x.select = false)
      this.tabPhoto = ''
    },
    returnSteps () {
      if (this.currentProm === 0) {
        this.authenticate.id = ''
        this.authenticate.activeCode = false
        this.alreadyExist = false
        this.clearData()
        this.desactive = false
        setTimeout(() => {
          this.showSelection = 0
        }, 200)
      } else {
        if (!this.fedotaxi && !this.convenio) { this.payment.type = '' }
        !this.viewPayment ? this.currentProm-- : this.viewPayment = false
      }
    },
    clearData () {
      this.form.certificateAuthorization = false
      this.form.subject.ruc = undefined
      this.form.subject.business = undefined
      this.form.subject.businessName = undefined
      this.form.subject.businessCountry = undefined
      this.form.subject.businessState = undefined
      this.form.subject.businessCity = undefined
      this.form.subject.businessAddress = undefined
      this.form.subject.businessTelphone = undefined
      this.form.subject.businessMail = undefined
      this.form.subject.businessPosition = undefined
      this.form.subject.departamentBusiness = undefined
      this.form.files = {
        id: null,
        idFront: null,
        idBack: null,
        ruc: null,
        photo: null,
        appointment: null,
        constitution: null
      }
      this.payment = {
        type: '',
        observation: ''
      }
    },
    changeCiType (val) {
      this.selectedCi = val
      if (val === '2') {
        this.form.files.id = null
      }
    },
    async confirmCode () {
      try {
        this.loadButton = true
        const { data } = await this.$axios.$post('api/clients/validate-code', { id: this.authenticate.id, code: this.authenticate.code })
        await this.buildDataConvenio(data)
        this.showSelection = 1
        this.viewAlert = true
      } catch (err) {
        this.authenticate.errorMessage = err.response ? err.response.data.message : err.message
        this.authenticate.errorCode = err.response ? err.response.data.typeCode : ' '
        this.authenticate.showError = true
      } finally {
        this.loadButton = false
      }
    },
    async buildDataConvenio (data) {
      this.form.certType = 2
      await this.getPrices()
      this.form.duration = '2'
      this.form.total = this.prices.find(x => x.duration === '2')
      this.form.price = this.form.total._id
      this.form.subject.id = data.personalData.id
      this.form.subject.name1 = data.personalData.names
      this.form.subject.surName1 = data.personalData.surnames
      this.form.subject.state = data.personalData.state
      this.form.subject.city = data.personalData.city
      this.form.subject.address = data.personalData.address
      this.form.subject.mail = data.personalData.mail
      this.form.subject.dateBirth = data.personalData.dateBirth
      this.form.subject.confirmMail = data.personalData.mail
      this.form.subject.type = 'ci'
      this.form.subject.cellphone = data.personalData.phone
      this.form.subject.businessName = data.personalData.names + ' ' + data.personalData.surnames
      this.form.subject.ruc = data.personalData.id + '001'
      this.payment.type = 'distributor'
      this.payment.observation = this.convenio ? 'CONVENIO-ANF-2022*' : 'FEDO-ANF-2022*'
    },
    splitName (val) {
      const name = val.split(' ')
      if (name.length > 3) {
        this.form.subject.name1 = name[2] + ' ' + name[3]
        this.form.subject.surName1 = name[0] + ' ' + name[1]
      } else if (name.length <= 3) {
        this.form.subject.name1 = name[2]
        this.form.subject.surName1 = name[0] + ' ' + name[1]
      } else {
        this.form.subject.name1 = val
      }
    },
    async verifyIdentification (refresh) {
      try {
        this.alreadyExist = false
        this.noRegister = false
        if (refresh) {
          this.authenticate.refresh = true
        }
        this.loadButton = true
        const { status, exist } = await this.$axios.$get(`api/clients/${this.authenticate.id}/generate-code/${this.convenio ? 'convenio' : 'fedo'}`)
        if (exist) {
          this.alreadyExist = true
          this.noRegister = true
          return
        }
        this.authenticate.activeCode = status
        this.noRegister = !status
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '

        if (code === 'TokenBlocked') {
          this.authenticate.showError = true
          this.authenticate.errorCode = code
          this.authenticate.errorMessage = message
        } else {
          this.$error({
            title: 'Ha ocurrido un error',
            content: `${code} :: ${message}`,
            okText: 'Aceptar'
          })
        }
      } finally {
        this.loadButton = false
        this.showInfoCode = false
      }
    },
    chooseActionToDo (i) {
      this.typesActionToDo.forEach(x => { x.select = false })
      this.typesActionToDo[i].select = true
      if ((i === 1) && (this.typesActionToDo[1].select === true)) {
        this.$router.push('/fast')
      }
    },
    finishLetter () {
      this.desactive = false
      this.showLetter = false
      this.form.certificateAuthorization = true
    },
    openLetter () {
      this.form.contract.letter = ''
      if (!this.form.certificateAuthorization) {
        this.desactive = true
        this.showLetter = true
      }
    },
    closeLetter () {
      this.showLetter = false
      this.desactive = false
      this.form.contract.letter = ''
      this.form.certificateAuthorization = false
    },
    undo () {
      this.$refs.signaturePad.clearSignature()
      this.form.contract.letter = ''
      this.alertSave = true
    },
    saveLetter () {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      if (isEmpty) {
        this.form.contract.letter = ''
        this.alertSave = true
      } else {
        this.form.certificateAuthorization = true
        this.form.contract.letter = data.replace('data:', '').replace(/^.+,/, '')
        this.alertSave = false
      }
    },
    openDrawer (type) {
      this.showDrawer = !this.showDrawer
      this.typeDrawer = type
    },
    changeTabPhoto (val, i) {
      this.tabPhoto = val
      this.typesValidationPhoto.forEach(x => { x.select = false })
      this.typesValidationPhoto[i].select = true
      this.form.files.photo = null
    },
    async goNextCurrent () {
      if (this.form.coupon.code.length > 0 && !this.form.coupon.flagPay) {
        this.$error({
          title: 'Ha ocurrido un error',
          content: 'Es necesario validar el código de cupón si desea utilizarlo',
          okText: 'Aceptar'
        })
        return
      }
      this.fedotaxi || this.convenio ? await this.nextCurrentFedoTaxi() : await this.nextCurrentNormal()
    },
    async nextCurrentFedoTaxi () {
      if (this.currentProm === 2) {
        if (await this.$refs.formPhoto.validate()) {
          await this.onSubmitFinish()
        } else {
          this.$error({
            title: 'Ocurrio un problema',
            content: 'Es necesario completar el método de validación de forma correcta',
            okText: 'Aceptar'
          })
        }
      } else {
        await this.handleSubmitNewForm()
      }
    },
    async nextCurrentNormal () {
      this.currentProm === 4 && this.payment.type === 'card'
        ? this.handlePay()
        : this.currentProm === 4 && this.payment.type !== 'card' && this.payment.type !== ''
          ? await this.finish()
          : await this.handleSubmitNewForm()
    },
    async goToForm () {
      if (await this.$refs.formDelivery.validate()) {
        if (this.product.container._id && this.product.delivery._id) {
          this.form.products = [
            { id: this.product.container._id, price: this.product.container.price._id },
            { id: this.product.delivery._id, price: this.product.delivery.price._id, description: this.product.delivery.address }
          ]
        }
        this.showSelection = 1
        this.viewAlert = true
        setTimeout(() => { window.scrollTo(0, 0) }, 300)
      } else {
        this.$error({
          title: 'Ha ocurrido un error',
          content: 'Ingrese la dirección para la entrega de su token',
          okText: 'Aceptar'
        })
      }
    },
    chooseDuration (value) {
      this.form.duration = value.duration
      this.form.total = value
      setTimeout(() => { window.scrollTo(0, document.body.scrollHeight) }, 300)
    },
    chooseVirtual () {
      this.product.container = { _id: '' }
      this.product.delivery = { _id: '' }
      this.form.products = []
      this.virtual = true
    },
    chooseProduct (product, type) {
      this.virtual = false
      this.form.products = []
      this.product[type] = this.product[type]._id !== product._id ? product : { _id: '' }
      if (type === 'container') {
        this.product.delivery = {
          _id: ''
        }
      }
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight)
      }, 200)
    },
    async getPrices (duration = false) {
      this.prices = []
      try {
        this.loadPrices = true
        if (this.form.type && this.form.certType) {
          const url = `/api/anf-requests/user/valid-price?typeCert=${this.form.type}&typeSubject=${this.form.certType}${duration ? `&duration=${duration}` : ''}`
          this.prices = await this.$axios.$get(url)
        }
        this.form.duration = ''
        this.selectedProduct = []
        this.products = []
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      } finally {
        this.loadPrices = false
      }
    },
    certTypeObject (value) {
      const message = 'Usuario que requiere una firma electrónica'
      return value === 2
        ? { description: `${message} personal con RUC válida para facturar`, icon: '/business.svg' }
        : value === 1
          ? { description: `${message} personal`, icon: '/person.svg' }
          : { description: `${message} para su empresa`, icon: '/judge.svg' }
    },
    certFastObject (value) {
      const message = 'Usuario que requiere una firma electrónica'
      return value === 1
        ? { description: `${message} natural con vigencia de 24 horas`, icon: '/24-hours.svg' }
        : { description: `${message} natural con RUC con vigencia de 2 años`, icon: '/2year.svg' }
    },
    async chooseTypeCert (value) {
      this.form.total = {}
      this.form.duration = ''
      this.product.delivery = { _id: '' }
      this.product.container = { _id: '' }
      if (value !== this.form.certType) {
        this.form.certType = value
        await this.getPrices(this.fast ? (value === 2 ? '2' : '0.1') : false)
        if (this.fast) {
          this.chooseDuration(this.prices)
        }
      } else {
        this.form.certType = 0
      }
    },
    async onSubmitFinish () {
      const loadingVs = this.$vs.loading({
        text: 'Guardando solicitud...'
      })
      try {
        this.isLoading = true
        const data = { ...this.form }
        if (data.coupon && !data.coupon.flagPay) {
          delete data.coupon
        }
        data.files = []
        for (const x in this.form.files) {
          if (this.form.files[x]) {
            data.files.push({ document: this.form.files[x].document, id: this.form.files[x].id })
          }
        }
        const payment = { ...this.payment }
        data.verification = {}
        if (this.payment.type !== 'distributor') {
          payment.document = payment.document.document
        } else {
          delete payment.document
          delete payment.holder
          delete payment.account
          delete payment.bank
        }
        data.verification.payment = payment
        data.paymentMethod = payment.type
        if (data.subject.businessName && data.subject.businessName === 'OTRA') {
          data.subject.businessName = data.subject.businessNameOther
        }
        if (this.fast) {
          data.typeRequest = 'fast'
        }
        await this.$axios.$post(`/api/anf-requests/user?version=2&dist=${this.typeDistributor}`, data)
        this.currentProm++
      } catch (err) {
        this.isLoading = false
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      } finally {
        loadingVs.close()
        this.isLoading = false
      }
    },
    async aplyDiscount (value) {
      if (value === 'CODIGOUPCONTA2022') {
        if (this.form.duration === '1' && this.form.certType === 2) {
          value = 'PROMOFIRMARUC1'
        } else if (this.form.duration === '2' && this.form.certType === 2) {
          value = 'PROMOFIRMARUC2'
        } else if (this.form.duration === '3' && this.form.certType === 2) {
          value = 'PROMOFIRMARUC3'
        } else {
          this.$error({
            title: 'No se puede el código ingresado',
            content: 'La promoción es solo para personas natural con Ruc y personas jurídicas, para firmas de 1, 2 y 3 años de duración',
            okText: 'Aceptar'
          })
        }
      }
      const codes = ['PROMOFIRMARUC1', 'PROMOFIRMARUC2', 'PROMOFIRMARUC3']
      if (codes.includes(value)) {
        const valid = ((this.form.duration === '1' && value === 'PROMOFIRMARUC1') ||
          (this.form.duration === '2' && value === 'PROMOFIRMARUC2') ||
          (this.form.duration === '3' && value === 'PROMOFIRMARUC3')) && (this.form.certType === 2)
        if (!valid) {
          this.$error({
            title: 'Ha ocurrido un error',
            content: 'No cumple con los requisitos necesarios para activar el código de descuento ingresado',
            okText: 'Aceptar'
          })
          return
        }
      }
      if (value === 'PROMOTRANSPORTE') {
        const valid = (this.form.certType === 2 || this.form.duration === '2')
        if (!valid) {
          this.$error({
            title: 'Ha ocurrido un error',
            content: 'No cumple con los requisitos necesarios para activar el código de descuento ingresado',
            okText: 'Aceptar'
          })
          return
        }
      }
      try {
        this.search = true
        const discount = await this.$axios.$get(`/api/anf-requests/user/validate-coupon/${value}`)
        // this.total = this.total - this.discount.value
        this.form.coupon.flagPay = true
        this.form.coupon.code = discount.code
        this.form.coupon.value = discount.value
        this.$success({
          title: 'Cupón de descuento registrado',
          content: (
            <div>
              <p>Cupón de descuento agregado correctamente</p>
            </div>
          )
        })
        if (['PROMOFIRMARUC2', 'PROMOFIRMARUC3', 'PROMOFIRMARUC1'].includes(value)) {
          this.showUpconta = true
        }
        this.flagPagomedios = false
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      } finally {
        this.search = false
      }
    },
    handleChange () {
      this.form.files = []
    },
    async finish () {
      if (await this.$refs.form4.validate()) {
        await this.onSubmitFinish()
      }
    },
    handlePay () {
      this.viewPayment = true
    },
    async handleSubmitNewForm () {
      if ((this.currentProm === 3 && !this.billingOther) || await this.$refs[this.currentProm === 0 ? 'form' : this.currentProm === 1 ? 'form2' : this.currentProm === 2 ? 'formPhoto' : 'form3'].validate()) {
        this.currentProm++
        setTimeout(() => { window.scrollTo(0, 0) }, 100)
      } else {
        this.$error({
          title: 'Ocurrio un problema',
          content: 'Es necesario completar el formulario de forma correcta',
          okText: 'Aceptar'
        })
      }
    },
    changePaymentMethod (value) {
      this.paymentMethod = value
    },
    showNext () {
      this.$refs.carousel.next()
    },
    showPrev () {
      this.$refs.carousel.prev()
    },
    openNotificationWithIcon () {
      this.$warning({
        title: 'Importante',
        content: (
          <div>
            <ul>
              <li><p>Los documentos que ingrese deben ser vigentes, a color y legibles, caso contrario ocasionara demora en su solicitud, el proceso solo continuara hasta que se entregue los documentos de acuerdo a los parámetros establecidos.</p></li>
              <li>
                <p>El correo electrónico que proporcione debe estar activo y accesible,
                  es el medio donde le llegará notificaciones del proceso y factura del pago.
                </p>
              </li>
            </ul>
          </div>
        )
      })
    },
    goNext () {
      this.$store.commit('navigation/next')
    },
    goPrev () {
      this.$store.commit('navigation/prev')
    },
    async sendData (data) {
      try {
        this.isLoading = true
        this.id = await this.$axios.$post('/api/anf-requests/user', data)
        this.dataPayment.typesPaymentMethod = this.typesPaymentMethod
        this.dataPayment.id = this.id
        this.$message.success('Se agrego correctamente')
        this.current++
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      } finally {
        this.isLoading = false
      }
    },
    async getOptions () {
      try {
        this.loadOptions = true
        this.option = await this.$axios.$get(this.endpoint)
        this.categories = await this.$axios.$get('/api/anf-requests/user/categories-with-products')
        // this.$store.commit('userSendData/addOptions', this.option)
        // this.$store.commit('userSendData/addCategories', this.categories)
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      } finally {
        this.loadOptions = false
      }
    },
    async checkUserId (value) {
      try {
        this.disabledPassword = await this.$axios.$get('/api/anf-requests/user/check-user', { params: { dni: value } })
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Ha ocurrido un error',
          content: message,
          okText: 'Aceptar'
        })
      }
    },
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400&display=swap');
/*@import url('https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css');*/
.vs-dialog-content {
  -webkit-backdrop-filter: saturate(180%) blur(15px);
  backdrop-filter: saturate(180%) blur(15px);
}
.app-background-v2 {
  padding: 15px;
  font-size: 14px;
  min-height: 120vh;
}
.ant-checkbox-checked::after {
  border:1px solid var(--link-color);
}
.ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner {
  border-color: var(--link-color);
}
.ant-checkbox-checked .ant-checkbox-inner {
  background-color: var(--link-color);
  border-color: var(--link-color);
  border: 1 var(--link-color);
}

.pdf-vue >>> .annotationLayer .linkAnnotation > a {
  display: none;
}

.content{
  margin-bottom:15px;
  margin-right:10px;
  margin-left:8px;
  min-height: 150px;
}
.ant-steps-item-process .ant-steps-item-icon {
  background: var(--link-color);
  border-color: var(--link-color);

}

.app-background {
  background: url('https://virtual-solidario.com/bancaweb3.0/bg-login-body.72c32218b0e19c24aea5.svg') bottom/100% no-repeat var(--link-color3);
  padding: 15px;
  font-size: 16px;
  min-height: 100vh;
}
.parpadea {

  animation-name: parpadeo;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name:parpadeo;
  -webkit-animation-duration: 2s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

@-moz-keyframes parpadeo{
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
  100% { opacity: 1.0; }
}

@-webkit-keyframes parpadeo {
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
  100% { opacity: 1.0; }
}

@keyframes parpadeo {
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
  100% { opacity: 1.0; }
}
.flotante {
  display:scroll;
  position:fixed;
  right:0px;
  margin-top: 80px;
  margin-right: 10px;
  z-index: 1000
}
.flotante2 {
  display: scroll;
  position:fixed;
  right:0px;
  margin-right: 10px;
  margin-top: 125px;
  z-index: 1000
}

</style>

<style lang="scss" scoped>
.web-camera-container {
  padding-bottom: 10px;
  .camera-button {
    margin-bottom: 2rem;
  }

  .camera-box {
    .camera-shutter {
      opacity: 0;
      width: 450px;
      height: 337.5px;
      background-color: #fff;
      position: absolute;

      &.flash {
        opacity: 1;
      }
    }
  }

  .camera-shoot {
    margin: 1rem 0;

    button {
      height: 60px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;

      img {
        height: 35px;
        object-fit: cover;
      }
    }
  }

  .camera-loading {
    overflow: hidden;
    height: 100%;
    position: absolute;
    width: 100%;
    min-height: 150px;
    margin: 3rem 0 0 -1.2rem;

    ul {
      height: 100%;
      position: absolute;
      width: 100%;
      z-index: 999999;
      margin: 0;
    }

    .loader-circle {
      display: block;
      height: 14px;
      margin: 0 auto;
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
      transform: translateX(-50%);
      position: absolute;
      width: 100%;
      padding: 0;

      li {
        display: block;
        float: left;
        width: 10px;
        height: 10px;
        line-height: 10px;
        padding: 0;
        position: relative;
        margin: 0 0 0 4px;
        background: #999;
        animation: preload 1s infinite;
        top: -50%;
        border-radius: 100%;

        &:nth-child(2) {
          animation-delay: .2s;
        }

        &:nth-child(3) {
          animation-delay: .4s;
        }
      }
    }
  }

  @keyframes preload {
    0% {
      opacity: 1
    }
    50% {
      opacity: .4
    }
    100% {
      opacity: 1
    }
  }
}
</style>

