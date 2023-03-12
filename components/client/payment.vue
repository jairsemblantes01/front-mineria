<template>
  <div v-if="$store.state.userSendData.certData.total" class="aviso">
    <a-row>
      <h1>Resumen de compra</h1>
      <a-col :xs="24" :md="12" style="font-size: 17px;margin: 15px 0 45px 0" class="resp">
        <div style="text-align: left">
          <h1>Firma electrónica</h1>
          <p>
            <b>Tipo de persona:</b>
            {{ certData.persona }}
          </p>
          <!-- <p>
            <b>Tipo de contenedor:</b>
            {{ certData.tipo }}
          </p> -->
          <p>
            <b>Duración:</b>
            {{ certData.duracion }}
          </p>
          <h1 style="margin-top: 50px">
            Productos Adicionales
          </h1>
          <div v-for="i in $store.state.userSendData.selectProducts" :key="i.name">
            <p>
              <b>{{ i.categorie }}:</b>
              {{ i.name }}
            </p>
          </div>
        </div>
      </a-col>
      <a-col :xs="24" :md="12" style="font-size: 17px;margin: 15px 0 45px 0">
        <label class="inline-label">
          Código de descuento:
        </label>
        <a-input-search
          v-model="couponData"
          :disabled="flagPay > 0 || flagPagomedios > 0"
          size="small"
          :loading="search"
          style="width: 65%;"
          placeholder="Si tiene un código de descuento ingréselo aquí"
          @search="aplyDiscount"
        >
          <a-button slot="enterButton" :disabled="flagPay > 0 || flagPagomedios > 0" type="secondary">
            Validar
          </a-button>
          <a-alert type="error" message="Error text" banner />
        </a-input-search>
        <a-alert v-if="showErrorCode && couponData" class="my-3" type="error" message="Valide el cupón ingresado" banner />
        <div>
          <label class="inline-label">
            Firma Electrónica:
          </label>
          <p style="text-align: right; margin-top:15px">
            {{ $store.state.userSendData.certData.total.value+' USD' }}
          </p>
        </div>
        <div v-for="i in $store.state.userSendData.selectProducts" :key="i.name">
          <label class="inline-label">
            {{ i.categorie }}:
          </label>
          <p style="text-align: right; margin-top:15px">
            {{ i.price.value+' USD' }}
          </p>
        </div>
        <label class="inline-label">
          Descuento:
        </label>
        <p style="text-align: right; margin-top:15px">
          {{ discount ? discount.value+' USD' :'   0 USD' }}
        </p>
        <a-divider />
        <label class="inline-label">
          Total a cancelar:
        </label>
        <p style="text-align: right; font-size: 20px">
          <b>
            {{ total.toFixed(2)+' USD (inc. I.V.A.)' }}
          </b>
        </p>
      </a-col>
    </a-row>
    <a-divider />
    <div>
      <a-col :span="24">
        <h1 style="text-align: center">
          Forma de pago
        </h1>
        <p style="margin: 0">
          Seleccionar su forma de pago:
        </p>
        <div class="select text-center">
          <a-select
            :disabled="flagPagomedios === 2"
            label="Método de pago"
            class="resp"
            placeholder="Seleccione su forma de pago"
            style="margin: 15px 0 15px 0"
            @change="selectPaymentMethod"
          >
            <a-select-option
              v-for="d in $store.state.userSendData.options.TypesPaymentMethod"
              :key="d.id"
              :value="d.id"
            >
              {{ d.description }}
            </a-select-option>
          </a-select>
        </div>
        <a-button
          v-if="certData.value === 'card'"
          type="primary"
          :loading="isLoadingPayment"
          @click="createPaymentFunction"
        >
          {{ flagPagomedios === 1 ? 'Regresar al proceso de pago' : 'Pagar' }}
        </a-button>
      </a-col>
      <a-col :span="24">
        <div v-if="certData.value === 'distributor'">
          <p><b style="color: red">*</b> Ingresar su código de distribuidor: </p>
          <div style="margin: 15px 0 15px 0">
            <a-input
              v-model="paymentData.observation"
              placeholder="Ingrese su código de distribuidor"
              style="margin: 0 0 30px 0"
              class="resp"
            />
          </div>
        </div>
      </a-col>
    </div>
    <a-modal
      v-model="showUpconta"
      :footer="null"
      @close="showUpconta = false"
    >
      <div class="relative w-full bg-white pt-10 pb-8 rounded">
        <div class="flex flex-col items-center px-4 md:px-12">
          <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="327.99206" viewBox="0 0 1027.99206 529.55555" xmlns:xlink="http://www.w3.org/1999/xlink"><title>online_transactions</title><rect x="305.99206" y="295.38557" width="343.71997" height="234.16998" fill="#083c7c" /><path d="M754.88605,453.21778h-338.24a4.11628,4.11628,0,0,0-4.11005,4.11v228.69a4.10986,4.10986,0,0,0,4.11005,4.11h338.24a4.10984,4.10984,0,0,0,4.11-4.11v-228.69A4.11626,4.11626,0,0,0,754.88605,453.21778Zm1.37,232.8a1.36568,1.36568,0,0,1-1.37,1.37h-338.24a1.36569,1.36569,0,0,1-1.37-1.37v-228.69a1.37207,1.37207,0,0,1,1.37-1.37h338.24a1.37206,1.37206,0,0,1,1.37,1.37Z" transform="translate(-86.00397 -185.22222)" fill="#3f3d56" /><rect
            x="344.33535"
            y="429.58731"
            width="154.74254"
            height="17.80224"
            rx="2"
            fill="#3f3d56"
          /><path d="M726.126,599.74775h-49.29a4.10991,4.10991,0,0,0-4.11005,4.11v38.34a4.10986,4.10986,0,0,0,4.11005,4.11h49.29a4.1098,4.1098,0,0,0,4.11-4.11v-38.34A4.10985,4.10985,0,0,0,726.126,599.74775Zm1.37,42.45a1.37206,1.37206,0,0,1-1.37,1.37h-49.29a1.37212,1.37212,0,0,1-1.37006-1.37v-38.34a1.36574,1.36574,0,0,1,1.37006-1.37h49.29a1.36568,1.36568,0,0,1,1.37,1.37Z" transform="translate(-86.00397 -185.22222)" fill="#3f3d56" /><rect
            x="598.67562"
            y="423.37233"
            width="33.60304"
            height="6.95235"
            rx="2"
            fill="#3f3d56"
          /><rect
            x="598.67562"
            y="434.32756"
            width="33.60304"
            height="6.95235"
            rx="2"
            fill="#3f3d56"
          /><rect
            x="598.67562"
            y="445.28278"
            width="33.60304"
            height="6.95235"
            rx="2"
            fill="#3f3d56"
          /><rect
            x="348.44356"
            y="284.4306"
            width="71.20896"
            height="30.12687"
            rx="2"
            fill="#3f3d56"
          /><path d="M475.52961,484.71625c0,5.29411-2.45241,9.58583-5.47761,9.58583s-5.47761-4.29172-5.47761-9.58583,5.47761-9.58582,5.47761-9.58582S475.52961,479.42215,475.52961,484.71625Z" transform="translate(-86.00397 -185.22222)" fill="#083c7c" /><polygon points="901.992 161.837 899.992 161.837 899.992 385.451 672.992 385.451 672.992 387.451 901.992 387.451 901.992 161.837" fill="#3f3d56" /><polygon points="305.992 387.451 76.992 387.451 76.992 161.837 78.992 161.837 78.992 385.451 305.992 385.451 305.992 387.451" fill="#3f3d56" /><path d="M1113.35519,223.03181h-1.28168v-2.24294h.96126a.64087.64087,0,0,0,.64084-.64084V208.6129a.64085.64085,0,0,0-.64084-.64084h-.96126v-6.551a13.95586,13.95586,0,0,0-13.956-13.95591h-1.42421v-1.60211a.64085.64085,0,0,0-.64084-.64084h-11.53513a.64085.64085,0,0,0-.64084.64084v1.60211H875.46088a13.95586,13.95586,0,0,0-13.956,13.95591v296.9942a13.9559,13.9559,0,0,0,13.956,13.956h222.65667a13.9559,13.9559,0,0,0,13.956-13.956V235.84861h1.28168a.64087.64087,0,0,0,.64084-.64084V223.67265A.64085.64085,0,0,0,1113.35519,223.03181Z" transform="translate(-86.00397 -185.22222)" fill="#3f3d56" /><rect
            x="787.03482"
            y="11.37165"
            width="229.42338"
            height="304.40573"
            rx="1.9048"
            fill="#d0cde1"
          /><rect
            x="875.401"
            y="160.55814"
            width="39.35653"
            height="11.66295"
            rx="2"
            fill="#3f3d56"
          /><rect
            x="827.82072"
            y="69.75378"
            width="134.51708"
            height="4.99841"
            rx="2"
            fill="#3f3d56"
          /><rect
            x="827.82072"
            y="85.58206"
            width="134.51708"
            height="4.99841"
            rx="2"
            fill="#3f3d56"
          /><rect
            x="827.82072"
            y="101.41034"
            width="134.51708"
            height="4.99841"
            rx="2"
            fill="#3f3d56"
          /><rect
            x="827.82072"
            y="117.23863"
            width="134.51708"
            height="4.99841"
            rx="2"
            fill="#3f3d56"
          /><rect
            x="827.82072"
            y="133.06691"
            width="134.51708"
            height="4.99841"
            rx="2"
            fill="#3f3d56"
          /><circle cx="890.31727" cy="261.97835" r="41.77968" fill="#083c7c" /><path d="M988.63566,479.42627a52.38194,52.38194,0,1,1,52.38193-52.38194A52.44121,52.44121,0,0,1,988.63566,479.42627Zm0-102.85908a50.47714,50.47714,0,1,0,50.47714,50.47714A50.53392,50.53392,0,0,0,988.63566,376.56719Z" transform="translate(-86.00397 -185.22222)" fill="#3f3d56" /><path d="M241.496,273.13387h-1.71341V226.19551a27.16665,27.16665,0,0,0-27.16673-27.16667H113.1707A27.16664,27.16664,0,0,0,86.004,226.19551V483.703a27.16664,27.16664,0,0,0,27.16673,27.16667h99.44519A27.16665,27.16665,0,0,0,239.78262,483.703V306.54539H241.496Z" transform="translate(-86.00397 -185.22222)" fill="#3f3d56" /><path d="M233.99737,227.79218V484.92413a20.28849,20.28849,0,0,1-20.28483,20.29192H113.78728a20.28842,20.28842,0,0,1-20.28475-20.29192V227.79218a20.28688,20.28688,0,0,1,20.28475-20.28471h12.12326a9.63757,9.63757,0,0,0,8.925,13.27583h56.97157a9.63747,9.63747,0,0,0,8.925-13.27583h12.98047A20.287,20.287,0,0,1,233.99737,227.79218Z" transform="translate(-86.00397 -185.22222)" fill="#d0cde1" /><rect
            x="64.36182"
            y="173.77302"
            width="26.76842"
            height="7.93258"
            rx="2"
            fill="#3f3d56"
          /><rect
            x="32"
            y="112.01225"
            width="91.49206"
            height="3.39968"
            rx="1.69984"
            fill="#3f3d56"
          /><rect
            x="32"
            y="122.77789"
            width="91.49206"
            height="3.39968"
            rx="1.69984"
            fill="#3f3d56"
          /><rect
            x="32"
            y="133.54352"
            width="91.49206"
            height="3.39968"
            rx="1.69984"
            fill="#3f3d56"
          /><rect
            x="32"
            y="144.30916"
            width="91.49206"
            height="3.39968"
            rx="1.69984"
            fill="#3f3d56"
          /><rect
            x="32"
            y="155.0748"
            width="91.49206"
            height="3.39968"
            rx="1.69984"
            fill="#3f3d56"
          /><circle cx="69.87495" cy="256.35481" r="28.81288" fill="#083c7c" /><path d="M164.37142,463.80112A36.12462,36.12462,0,1,1,200.496,427.67651,36.16549,36.16549,0,0,1,164.37142,463.80112Zm0-70.9356a34.811,34.811,0,1,0,34.811,34.811A34.85016,34.85016,0,0,0,164.37142,392.86552Z" transform="translate(-86.00397 -185.22222)" fill="#3f3d56" /><rect x="147.50456" y="375.18969" width="28" height="28" fill="#d0cde1" /><path d="M278.50853,572.41192h-34v-34h34Zm-32.52174-1.47826h31.04348V539.89018H245.98679Z" transform="translate(-86.00397 -185.22222)" fill="#3f3d56" /><rect x="774.50456" y="375.18969" width="28" height="28" fill="#d0cde1" /><path d="M905.50853,572.41192h-34v-34h34Zm-32.52174-1.47826h31.04348V539.89018H872.98679Z" transform="translate(-86.00397 -185.22222)" fill="#3f3d56" /></svg>
          <p class="text-base sm:text-lg md:text-2xl font-bold md:leading-6 mt-6 text-gray-800 text-center dark:text-gray-100 mt-10">
            Promoción de facturación electrónica activado
          </p>
          <p class="text-xs sm:text-sm leading-5 mt-2 sm:mt-4 text-center text-gray-600 dark:text-gray-300">
            Usted activó un un código de facturación electrónica con 70 comprobantes contables.
          </p>
        </div>
      </div>
    </a-modal>
    <div v-if="certData.value !== 'card'">
      <p
        v-if="certData.value && certData.value !== 'distributor'"
        style="text-align: left; margin: 150px 0 15px 0"
      >
        Debe cargar el comprobante del {{ certData.value === 'deposit' ? 'depósito realizado' : 'la transferencia realizada' }} a nombre de ANF
        AUTORIDAD DE CERTIFICACION ECUADOR C.A. RUC: 1792601215001 a la cuenta  corriente N°
        <b>0700626089</b> de
        <b>BANCO INTERNACIONAL</b>
        por un total de
        <b>{{ total.toFixed(2)+' USD ' }}</b>(precio incluye I.V.A.).
        Un operador revisará y verificará el registro de pago en la cuenta bancaria anteriormente mencionada.
      </p>
      <div v-if="certData.value && certData.value !== 'distributor'" style="margin:20px auto; width: 50% ">
        <a-upload-dragger
          accept=".jpg, .png, .pdf"
          múltiple
          :before-upload="file => beforeUploads(file,'fileList')"
          :file-list="fileList"
          :remove="file => handleRemove(file, 'fileList')"
          :disabled="fileList.length === 1"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">
            <b style="color: red">*</b> Cargar aquí su comprobante de pago
          </p>
          <p class="ant-upload-hint">
            Tipo de archivos permitidos png, jpg, pdf
          </p>
        </a-upload-dragger>
      </div>
      <a-col v-if="paymentData.document && certData.value !== 'distributor'" :span="24">
        <h1 style="text-align: center">
          Detalles del pago
        </h1>
        <p>
          La información que se solicita a continuación es para contrastar con la información entregada por nuestro banco y así agilizar la verificación del pago realizado.
        </p>
        <p>
          <b style="color: red">*</b>
          {{ certData.value ==='transfer' ? 'Nombre del titular de la cuenta bancaria desde donde se realizó la transferencia:' : 'Nombre del depositante:' }}
        </p>
        <a-input
          v-model="paymentData.holder"
          required
          class="info-content"
          :placeholder="certData.value ==='transfer' ? 'Ingrese el nombre del titular de la cuenta bancaria desde donde se realizó la transferencia' : 'Ingrese el nombre del depositante'"
        />
        <p v-if="certData.value === 'transfer'">
          <b style="color: red">*</b> Nombre del banco desde donde se realizó la transferencia:
        </p>
        <a-input
          v-if="certData.value === 'transfer'"
          v-model="paymentData.bank"
          class="info-content"
          placeholder="Ingrese el nombre del banco desde donde se realizó la transferencia"
        />
        <p v-if="certData.value === 'transfer'">
          <b style="color: red">*</b> Número de cuenta desde donde se realizó la transferencia:
        </p>
        <div v-if="certData.value !== 'distributor'">
          <p style="text-align: center">
            <strong>Nota:</strong> Se aceptan pagos de bancos, cooperativas, mutualistas u otras instituciones financieras reguladas por el sistema financiero del Ecuador
          </p>
        </div>
        <a-input
          v-if="certData.value === 'transfer'"
          v-model="paymentData.account"
          class="info-content"
          placeholder="Ingrese el número de cuenta desde donde se realizó la transferencia"
        />
      </a-col>
      <div style="margin: 20px 0 20px 0;text-align: center">
        <a-popconfirm
          title="¿Esta seguro que desea retroceder?"
          cancel-text="Cancelar"
          @confirm="$store.commit('navigation/prev')"
        >
          <a-button>
            Regresar
          </a-button>
        </a-popconfirm>
        <a-button
          v-if="certData.value === 'distributor'"
          :loading="isLoading"
          :disabled="!paymentData.observation"
          type="primary"
          @click="onSubmitFinish"
        >
          Guardar y Finalizar
        </a-button>
        <a-button
          v-else
          :loading="isLoading"
          :disabled="!validateFinish"
          type="primary"
          @click="onSubmitFinish"
        >
          Guardar y Finalizar
        </a-button>
      </div>
    </div>
    <a-modal v-model="showModalPayment" width="80%" :footer="null">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
        <div v-if="!isLoadingPayment">
          <h1 class="mb-4 text-3xl leading-tight font-bold tracking-tighter mt-4 text-center">
            Complete su pago con tarjeta de crédito
          </h1>
          <p class="text-lg">
            1) Ingrese la información de su tarjeta de crédito o debito.
          </p>
          <p class="text-lg">
            2) Complete su transacción.
          </p>
          <p class="text-lg">
            3) Su solicitud será registrada automáticamente.
          </p>
          <center v-if="flagError === 1" class="mb-5">
            <a-alert
              v-if="flagError === 1"
              style="width: 600px; margin-bottom: 25px"
              message="Error"
              description="El numero de cédula ingresado no es correcto por favor verifiquelo"
              type="error"
              show-icon
            />
          </center>
          <div style="text-align: center">
            <a-button v-if="flagError === 1" @click="$store.commit('navigation/correction')">
              Corregir datos
            </a-button>
          </div>
          <a-row v-if="paymentLink.url">
            <a-col>
              <iframe :src="paymentLink.url" style="width: 100%; height: 60vh" />
            </a-col>
          </a-row>
          <p style="margin-top: 15px">
            <strong>Nota:</strong> Para dudas y consultas envíenos un correo a atencionalcliente@firmaselectronicas.ec
          </p>
        </div>
        <div v-else>
          <a-spin tip="Iniciando pago...">
            <div class="spin-content">
              Pago con tarjeta de crédito o débito.
            </div>
          </a-spin>
        </div>
        <!--        <div v-if="current === 1">
          <div v-if="!dataPayment.cardNumber">
            <div>
              <p>2. Si ya realizó el pago de click en el botòn <strong>Guardar pago</strong> <span style="color: red">(si no realiza este proceso por completo no quedará registrada su solicitud)</span>.</p>
            </div>
            <center>
              <a-button
                v-if="flagPagomedios === 1"
                :loading="isLoadingValidate"
                :type="flagPagomedios === 1 ? 'primary' : 'secundary'"
                @click="validatePayment"
              >
                Guardar pago
              </a-button>
            </center>
            <p>
              <strong>Importante: </strong>Puede ir a su pestaña de pago dando click en el siguiente
              <a :href="`/payment/?url=${paymentLink.url}`" target="_blank">
                Link
              </a><br>
              <strong>Nota:</strong> Para dudas y consultas envienos un correo a atencionalcliente@firmaselectronicas.ec
            </p>
          </div>
          <center v-else>
            <a-result
              status="success"
              title="Su pago se registró correctamente"
            />
            <a-card style="width: 70%; text-align: left">
              <h2 slot="title" style="text-align: center">
                Información de pago
              </h2>
              <a-row>
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <p>
                    <b>Autorización:</b>
                    {{ dataPayment.authorizationCode }}
                  </p>
                  <p>
                    <b>Fecha de pago:</b>
                    {{ dataPayment.transactionDate }}
                  </p>
                  <p>
                    <b>Referencia Pagomedios:</b>
                    {{ dataPayment.clientId }}
                  </p>
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <p>
                    <b>Referencia Procesada:</b>
                    {{ dataPayment.reference }}
                  </p>
                  <p>
                    <b>Tarjeta:</b>
                    {{ dataPayment.cardNumber }}
                  </p>
                  <p>
                    <b>Propietario:</b>
                    {{ dataPayment.cardHolder }}
                  </p>
                </a-col>
              </a-row>
            </a-card>
            <a-button type="primary" style="margin: 10px" @click="finishPayment">
              Finalizar
            </a-button>
          </center>
        </div>-->
      </div>
    </a-modal>
    <a-modal v-model="showWarning" :footer="null">
      <h2><a-icon style="font-size: 25px; margin-right: 10px" type="warning" theme="twoTone" two-tone-color="#ffcc00" />Tome en cuenta esta información</h2>
      <p>
        Para un correcto registro de su pago complete todos los pasos
        que se indica a continuación.
        <strong style="color: red">Si no realiza todos los pasos no quedará registrada su solicitud.</strong>
      </p>
      <div style="text-align: right">
        <a-button type="primary" @click="closeWarning">
          Aceptar
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data: () => ({
    showErrorCode: false,
    showUpconta: false,
    showWarning: false,
    showModalPayment: false,
    current: 0,
    steps: [
      {
        title: 'Realiza tu pago'
      },
      {
        title: 'Finalización'
      }
    ],
    couponData: '',
    showPagomedios: false,
    isLoading: false,
    isLoadingPayment: false,
    isLoadingValidate: false,
    activateSave: true,
    document: null,
    fileList: [],
    paymentData: {},
    discount: {},
    total: 0,
    search: false,
    flagPay: 0,
    flagPagomedios: 0,
    flagFinish: 0,
    flagError: 0,
    dataPayment: {},
    products: [],
    paymentLink: '/executive',
    categories: [],
    certData: {
      persona: null,
      duracion: null,
      total: null,
      tipo: null,
      value: null
    }
  }),
  head () {
    return {
      title: 'Firmaselectronicas.ec'
    }
  },
  computed: {
    validateFinish () {
      if (this.certData.value === 'transfer') {
        if (this.paymentData.document && this.paymentData.holder && this.paymentData.bank && this.paymentData.account) {
          return true
        }
        return false
      } else {
        if (this.paymentData.document && this.paymentData.holder) {
          return true
        }
        return false
      }
    }
  },
  mounted () {
    if (this.$store.state.userSendData.certData.total) {
      let sum = 0
      for (const i of this.$store.state.userSendData.selectProducts) {
        sum = sum + i.price.value
      }
      this.total = JSON.parse(JSON.stringify(this.$store.state.userSendData.certData.total.value)) + sum
      if (this.$store.state.userSendData.certData && this.$store.state.userSendData.certData.total) {
        const find = this.$store.state.userSendData.options.TypesCertificates.find(x => x.id === this.$store.state.userSendData.certData.certType)
        this.certData.persona = find.description
        const find2 = this.$store.state.userSendData.options.Duration.find(x => x.id === this.$store.state.userSendData.certData.duration)
        this.certData.duracion = find2.description
        const find3 = this.$store.state.userSendData.options.Types.find(x => x.id === this.$store.state.userSendData.certData.type)
        this.certData.tipo = find3.description
      }
    }
  },
  methods: {
    createPaymentFunction () {
      if (!this.validateCoupon()) { return }
      this.showModalPayment = true
      this.createPaymentRequest()
    },
    findDigits (n) {
      const auxFun = num => Number(num)
      const arrayNum = Array.from(String(n), auxFun)
      let total = 0
      for (let i = 0; i < arrayNum.length; i++) {
        if ((n % arrayNum[i]) === 0) {
          total++
        }
      }
      return total
    },
    closeWarning () {
      this.showWarning = false
      this.showModalPayment = true
    },
    finishPayment () {
      this.$store.commit('navigation/next')
      this.showModalPayment = false
    },
    next () {
      this.current++
    },
    prev () {
      this.current--
    },
    async createPaymentRequest () {
      if (this.flagPagomedios === 1) {
        this.showModalPayment = true
      } else {
        try {
          this.isLoadingPayment = true
          const subject = JSON.parse(JSON.stringify(this.$store.state.userSendData))
          const data = {
            typeCert: subject.certData.type,
            duration: subject.certData.duration,
            typeSubject: subject.certData.certType,
            coupon: this.discount ? this.discount.code : null,
            products: this.$store.state.userSendData.certData.products,
            infoSubject: {
              name1: subject.userInfo.subject.name1,
              name2: subject.userInfo.subject.name2,
              surName1: subject.userInfo.subject.surName1,
              surName2: subject.userInfo.subject.surName2,
              id: subject.userInfo.subject.id,
              type: subject.userInfo.subject.type,
              mail: subject.userInfo.subject.mail,
              city: subject.userInfo.subject.city,
              state: subject.userInfo.subject.state,
              address: subject.userInfo.subject.address,
              cellphone: subject.userInfo.subject.cellphone,
              telphone: subject.userInfo.subject.telphone,
              foreing: this.$store.state.userSendData.foreing
            }
          }
          if (data.coupon === null) {
            delete data.coupon
          }
          const payment = JSON.parse(JSON.stringify(this.paymentData))
          this.$store.commit('userSendData/addPaymentInfo', payment)
          const requestData = JSON.parse(JSON.stringify(this.$store.state.userSendData.userInfo))
          requestData.files.push(this.$store.state.userSendData.photo)
          requestData.verification = {}
          requestData.verification.payment = JSON.parse(JSON.stringify(this.$store.state.userSendData.payment))
          requestData.paymentMethod = this.certData.value
          if (this.discount && this.discount.code) {
            requestData.coupon = {}
            requestData.coupon.code = this.discount ? this.discount.code : null
          }
          requestData.products = this.$store.state.userSendData.certData.products
          requestData.verification.payment.observation = 'Esperando confirmación de pago'
          requestData.verification.payment.holder = 'Esperando confirmación de pago'
          const request = await this.$axios.$post('/api/anf-requests/user', requestData)
          data.idRequest = request._id
          this.paymentLink = await this.$axios.$post('/api/anf-requests/user/medio-pagos/create-link', data)
          await this.$axios.$post(`/api/_path/payment-card/save-token/${data.idRequest}`, {
            token: this.paymentLink.token
          })
          this.flagPagomedios = 1
          this.isLoadingPayment = false
          //
          // const routeData = this.$router.resolve({ name: '/payment', path: '/payment', query: { url: this.paymentLink.url } })
          // window.open(routeData.href, '_blank')
          this.current++
        } catch (err) {
          const message = err.response ? err.response.data.message : err.message
          const code = err.response ? err.response.data.typeCode : ' '
          if (code === 'PagoMediosCreateLink') {
            this.flagError = 1
          }
          this.$error({
            title: 'Ha ocurrido un error',
            content: `${code} :: ${message}`,
            okText: 'Aceptar'
          })
        } finally {
          setTimeout(() => {
            this.isLoadingPayment = false
          }, 2000)
        }
      }
    },
    async validatePayment () {
      try {
        this.isLoadingValidate = true
        this.dataPayment = await this.$axios.$get(`/api/anf-requests/user/medio-pagos/status-link/${this.paymentLink.token}/false`)
        this.flagPagomedios = 2
        this.isLoadingValidate = false
        this.paymentData.observation = this.paymentLink.token
        const payment = JSON.parse(JSON.stringify(this.paymentData))
        this.$store.commit('userSendData/addPaymentInfo', payment)
        const datas = JSON.parse(JSON.stringify(this.$store.state.userSendData.userInfo))
        datas.files.push(this.$store.state.userSendData.photo)
        datas.verification = {}
        datas.verification.payment = JSON.parse(JSON.stringify(this.$store.state.userSendData.payment))
        datas.verification.payment.holder = this.dataPayment.cardHolder
        datas.verification.payment.bank = this.dataPayment.cardNumber
        datas.verification.payment.account = this.dataPayment.authorizationCode
        datas.paymentMethod = this.certData.value
        if (this.discount && this.discount.code) {
          datas.coupon = {}
          datas.coupon.code = this.discount ? this.discount.code : null
        }
        datas.products = this.$store.state.userSendData.certData.products
        await this.$axios.$post('/api/anf-requests/user', datas)
      } catch (err) {
        this.current--
        this.isLoadingValidate = false
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      }
    },
    async aplyDiscount (value) {
      if (value === 'CODIGOUPCONTA2022') {
        if (this.$store.state.userSendData.certData.duration === '1' && this.$store.state.userSendData.certData.certType === 2) {
          value = 'PROMOFIRMARUC1'
        } else if (this.$store.state.userSendData.certData.duration === '2' && this.$store.state.userSendData.certData.certType === 2) {
          value = 'PROMOFIRMARUC2'
        } else if (this.$store.state.userSendData.certData.duration === '3' && this.$store.state.userSendData.certData.certType === 2) {
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
        const valid = ((this.$store.state.userSendData.certData.duration === '1' && value === 'PROMOFIRMARUC1') ||
          (this.$store.state.userSendData.certData.duration === '2' && value === 'PROMOFIRMARUC2') ||
          (this.$store.state.userSendData.certData.duration === '3' && value === 'PROMOFIRMARUC3')) && (this.$store.state.userSendData.certData.certType === 2)
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
        const valid = (this.$store.state.userSendData.certData.certType === 2 || this.$store.state.userSendData.certData.duration === '2')
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
        this.discount = await this.$axios.$get(`/api/anf-requests/user/validate-coupon/${value}`)
        this.search = true
        this.total = this.total - this.discount.value
        this.showErrorCode = false
        this.flagPay = 1
        this.showErrorCode = false
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
        this.flagPagomedios = 0
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
    selectPaymentMethod (value) {
      this.certData.value = value
      this.fileList = []
      this.paymentData = {}
    },
    async toBase64 (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      const result = await new Promise((resolve, reject) => {
        reader.onload = function (event) {
          resolve(reader.result.replace('data:', '').replace(/^.+,/, ''))
        }
      })
      return result
    },
    async beforeUploads (doc, fileList) {
      if (doc) {
        if (doc.size <= 2048000) {
          if (doc.type === 'image/png' || doc.type === 'image/jpg' || doc.type === 'image/jpeg' || doc.type === 'application/pdf') {
            this.paymentData.document = await this.toBase64(doc)
            this[fileList] = [...this[fileList], doc]
          } else {
            this.$error({
              title: 'Error en el formato de archivo',
              content: 'El archivo que desea agregar no esta en el formato aceptado. Formatos aceptados JPG PNG y PDF',
              okText: 'Aceptar'
            })
          }
        } else {
          this.$error({
            title: 'Error en el tamaño de archivo',
            content: 'El archivo que desea agregar tiene un peso superior a 2 megas',
            okText: 'Aceptar'
          })
        }
      }
    },
    handleRemove (doc, fileList) {
      delete this.paymentData.document
      const index = this[fileList].indexOf(doc)
      const newFileList = this[fileList].slice()
      newFileList.splice(index, 1)
      this[fileList] = newFileList
    },
    validateCoupon () {
      if (this.couponData && !this.discount.value) {
        this.$warning({
          title: 'Cupón de descuento no registrado',
          content: 'Usted tiene un cupón de descuento ingresado que no ha sido validado',
        })
        this.showErrorCode = true
        return false
      }
      return true
    },
    async onSubmitFinish () {
      if (!this.validateCoupon()) { return }
      try {
        this.isLoading = true
        const payment = JSON.parse(JSON.stringify(this.paymentData))
        this.$store.commit('userSendData/addPaymentInfo', payment)
        const data = JSON.parse(JSON.stringify(this.$store.state.userSendData.userInfo))
        data.files.push(this.$store.state.userSendData.photo)
        data.verification = {}
        data.verification.payment = JSON.parse(JSON.stringify(this.$store.state.userSendData.payment))
        data.paymentMethod = this.certData.value
        if (this.discount && this.discount.code) {
          data.coupon = {}
          data.coupon.code = this.discount ? this.discount.code : null
        }
        data.products = this.$store.state.userSendData.certData.products
        await this.$axios.$post('/api/anf-requests/user', data)
        this.$store.commit('navigation/next')
      } catch (err) {
        this.isLoading = false
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      }
    }
  }
}
</script>

<style scoped>
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  min-height: 400px;
  padding: 30px;
}
.btm {
  float:left
}
.btm2 {
  float:right
}
.steps-content {
  margin: 15px
}
.ant-modal-confirm-body {
  width: 800px
}
.inline-label {
  float:left;
}
.aviso {
  margin-bottom: 15px;
  margin-right: 50px;
  margin-left: 50px;
}
.img {
  width: 10%;
}.resp {
  width: 50%
}
.info-payment {
  margin-top: 50px;
  text-align: left;
}
.info-content {
  margin: 15px 0 15px 0;
  width: 50%;
  text-align: center;
}
@media screen and (max-width: 768px) {
  .info-content {
  margin: 5px;
  width: 100%;
}
  .resp {
    width: 100%
  }
  .aviso {
    text-align: left;
    margin-right: 3px;
    margin-left: 3px;
  }
  .img {
    width: 40%;
  }
}
</style>
