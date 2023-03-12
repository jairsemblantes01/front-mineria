<template>
  <div>
    <div v-if="data._id" align="right">
      <a-button type="primary">
        <nuxt-link :to="$route.name === 'executive-convenios-showDoc-id' ? '/executive/convenios' : '/executive'">
          <a-icon type="arrow-left" />
        </nuxt-link>
      </a-button>
      <a-button :type=" showDocs ? 'primary' : 'secundary'" @click="showDocs = !showDocs">
        <a-icon v-if="showDocs" type="eye" />
        <a-icon v-else type="eye-invisible" />
      </a-button>
    </div>
    <h1 v-if="data._id" align="center">
      <b>{{ names }}</b>
    </h1>
    <a-card v-if="data._id" style="width: 100%;">
      <a-col :span="12">
        <h2>
          <b>Subtotal:</b>
          {{ data.price.value + " USD" }}
        </h2>
        <h2>
          <b>Descuento:</b>
          {{ data.coupon && data.coupon.id ? '-' + data.coupon.id.value+ " USD" : '0 USD' }}
        </h2>
        <h2 v-if="data.coupon">
          <b>Código:</b>
          {{ data.coupon.id.code }}
        </h2>
        <div v-for="d in data.products" :key="d">
          <h2>
            <b>{{ d && d.category.name }}:</b>
            {{ d && d.description }}
            <br>
            <b>Precio:</b>
            {{ d && d.price.value+ ' USD' }}
          </h2>
          <span v-if="d && d.category.id === 'delivery'"> <h2><b>Dirección: </b>{{ d.observation }}</h2></span>
        </div>
        <a-divider />
        <h2>
          <b>Total:</b>
          {{ data.coupon && data.coupon.id.value ? (calcTotal - data.coupon.id.value).toFixed(2) + " USD" : calcTotal + "USD" }}
        </h2>
      </a-col>
      <a-col :span="12">
        <h2>
          <b>Tipo de persona:</b>
          {{ type }}
        </h2>
        <!-- <h2>
          <b>Tipo de certificado:</b>
          {{ getEnumerate(data.type, options.Types) }}
        </h2> -->
        <h2>
          <b>Duración:</b>
          {{ getEnumerate(data.duration, options.DurationAll) }}
        </h2>
        <h2>
          <b>Tipo de pago:</b>
          {{
            getEnumerate(
              data.paymentMethod,
              options.TypesPaymentMethod
            )
          }}
        </h2>
      </a-col>
    </a-card>
    <br>
    <div v-if="data._id">
      <p class="iner">
        Aplicar descuento
      </p>
      <a-checkbox @change="onChangeCoupon" />
      <div v-if="showCoupon">
        <a-input v-model="coupon" style="width: 55%" placeholder="Ingrese el cupón de descuento" />
        <a-button :loading="isLoadingCoupon" style="width: 10%" type="primary" @click="sendCoupon">
          Aplicar
        </a-button>
      </div>
    </div>
    <br>
    <a-col
      v-show="showDocs"
      :xs="data._id ? 24 : 24"
      :sm="data._id ? 24 : 24"
      :md="data._id ? 24 : 24"
      :lg="data._id ? 12 : 24"
      :xl="data._id ? 12 : 24"
    >
      <div :class="data._id ? 'cuado' : 'pads'">
        <a-form :form="form">
          <a-row :gutter="12">
            <div v-if="data.certType === 2">
              <a-divider orientation="left">
                <h2 align="left">
                  Datos empresariales
                </h2>
              </a-divider>
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <a-form-item label="RUC" has-feedback>
                  <a-input
                    v-decorator="validations.ruc"
                    placeholder="Ingrese el RUC"
                    type="number"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <a-form-item label="Nombre empresa" has-feedback>
                  <a-input
                    v-decorator="[
                      'businessName',
                      {
                        rules: [{ required: true, message: 'Ingrese el nombre de su empresa' }],
                        normalized: v => upperCase(v)
                      }
                    ]"
                    placeholder="Ingrese el nombre de la empresa"
                  />
                </a-form-item>
              </a-col>
            </div>
          </a-row>
          <a-row>
            <div v-if="data.certType === 4">
              <a-divider orientation="left">
                <h2 align="left">
                  Datos empresariales
                </h2>
              </a-divider>
              <a-row>
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <a-form-item label="Nombre empresa" has-feedback>
                    <a-input
                      v-decorator="[
                        'businessName',
                        {
                          rules: [{ required: true, message: 'Ingrese el nombre de su empresa' }],
                          normalized: v => upperCase(v)
                        }
                      ]"
                      placeholder="Ingrese el nombre de la empresa"
                    />
                  </a-form-item>
                </a-col>
                <a-col
                  v-if="show"
                  :xs="24"
                  :sm="24"
                  :md="12"
                  :lg="12"
                  :xl="12"
                >
                  <a-form-item label="RUC" has-feedback>
                    <a-input
                      v-decorator="validations.ruc"
                      placeholder="Ingrese su RUC"
                      type="number"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <a-form-item label="País" has-feedback>
                    <a-input
                      v-decorator="[
                        'businessCountry',
                        {
                          rules: [{ required: true, message: 'Ingrese el país de su empresa' }],
                          normalize: v => upperCase(v)
                        }
                      ]"
                      placeholder="Ingrese el país su empresa"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <a-form-item label="Provincia" has-feedback>
                    <a-input
                      v-decorator="[
                        'businessState',
                        {
                          rules: [{ required: true, message: 'Ingrese la provincia de su empresa' }],
                          normalize: v => upperCase(v)
                        }
                      ]"
                      placeholder="Ingrese la provincia de su empresa"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <a-form-item label="Ciudad" has-feedback>
                    <a-input
                      v-decorator=" [
                        'businessCity',
                        {
                          rules: [{ required: true, message: 'Ingrese la ciudad de su empresa' }],
                          normalize: v => upperCase(v)
                        }
                      ]"
                      type="text"
                      placeholder="Ingrese la ciudad de su empresa"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <a-form-item label="Teléfono " has-feedback>
                    <a-input
                      v-decorator="validations.businessTelphone"
                      placeholder="Ingrese el teléfono de su empresa"
                      :disabled="validarDatos"
                      type="number"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <a-form-item label="Dirección" has-feedback>
                    <a-input
                      v-decorator="[
                        'businessAddress',
                        {
                          rules: [{ required: true, message: 'Ingrese la dirección de su empresa' }],
                          normalized: v => upperCase(v)
                        }
                      ]"
                      placeholder="Ingrese la dirección de su empresa"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-col v-if="data._id" :span="22">
                <a-form-item label="Especificacion" v-bind="formItemLayout">
                  <a-textarea
                    v-decorator="validations.registryData"
                    placeholder="Indique en que pagina se encuentra estipulado su constitución y nombramiento ejemplo:
Constitucion pag. 4 parrafo 5 y Nombramiento pag.9 parrafo 35"
                    :rows="7"
                    :disabled="validarDatos"
                  />
                </a-form-item>
              </a-col>
            </div>
          </a-row>
          <a-row>
            <a-divider orientation="left">
              <h2 align="left">
                {{
                  data.certType === 4
                    ? "Datos de representante legal"
                    : "Datos personales"
                }}
              </h2>
            </a-divider>
            <a-row>
              <div align="center">
                <h3>Información personal</h3>
              </div>
              <a-row>
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <a-form-item label="Primer nombre" has-feedback>
                    <a-input
                      v-decorator="[
                        'name1',
                        { rules: [{ required: true, message: 'Ingrese su primer nombre' }], normalize: v => upperCase(v) }
                      ]"
                      placeholder="Ingrese su primer nombre"
                    />
                  </a-form-item>
                </a-col>
                <a-col
                  v-if="data.typeRequest === 'anf' || data.typeRequest === 'fast' || $route.name === 'index'"
                  :xs="24"
                  :sm="24"
                  :md="12"
                  :lg="12"
                  :xl="12"
                >
                  <a-form-item label="Segundo nombre" has-feedback>
                    <a-input
                      v-decorator="[
                        'name2',
                        { rules: [{ required: false }], normalize: v => upperCase(v) }
                      ]"
                      placeholder="Ingrese su segundo nombre"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <a-form-item label="Primer apellido" has-feedback>
                    <a-input
                      v-decorator="[
                        'surName1',
                        { rules: [{ required: true, message: 'Ingrese su apellido paterno' }], normalize: v => upperCase(v) }
                      ]"
                      placeholder="Ingrese su primer apellido"
                      :disabled="validarDatos"
                    />
                  </a-form-item>
                </a-col>
                <a-col
                  v-if="data.typeRequest === 'anf' || data.typeRequest === 'fast' || $route.name === 'index'"
                  :xs="24"
                  :sm="24"
                  :md="12"
                  :lg="12"
                  :xl="12"
                >
                  <a-form-item label="Segundo apellido" has-feedback>
                    <a-input
                      v-decorator="[
                        'surName2',
                        { rules: [{ required: true, message: 'Ingrese sus apellido materno' }], normalize: v => upperCase(v) }
                      ]"
                      placeholder="Ingrese su segundo apellido"
                      :disabled="validarDatos"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <a-form-item label="Tipo de identificación">
                    <a-select
                      v-decorator="validations.type"
                      class="select"
                      placeholder="Seleccione su tipo de identificación"
                      @change="reset"
                    >
                      <a-select-option
                        v-for="d in options.TypesId"
                        :key="d.id"
                      >
                        {{ d.description }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <a-form-item has-feedback>
                    <span slot="label">
                      {{ 'Número de ' + tipoIdentDes.toLowerCase() }}
                      <a-tooltip
                        v-if="!data._id"
                        title="Si su tipo de identificación es diferente seleccione el correcto en el
                        apartado de tipo de identificación"
                      >
                        <a-icon type="question-circle-o" />
                      </a-tooltip>
                    </span>
                    <a-input
                      v-decorator="[
                        'id',
                        {
                          rules: [
                            {
                              required: true,
                              message: 'Ingrese su identificación'
                            },
                          ]
                        }
                      ]"
                      class="id"
                      :disabled="validarDatos"
                      :placeholder="tipoIdent === 'ci' ? 'Ingrese su número de cédula' : tipoIdent ==='passport' ? 'Ingrese su número de pasaporte' : 'Ingrese su número de identificación'"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row v-if="data.certType === 4">
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <a-form-item label="Cargo empresarial" has-feedback>
                    <a-input
                      v-decorator="[
                        'businessPosition',
                        { rules: [{ required: true, message: 'Ingrese su cargo empresarial' }], normalize: v => upperCase(v) }
                      ]"
                      placeholder="Ingrese el cargo que desempeña"
                      :disabled="validarDatos"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <a-form-item label="Departamento" has-feedback>
                    <a-input
                      v-decorator="[
                        'departamentBusiness',
                        {
                          rules: [
                            {
                              required: true,
                              message: 'Ingrese el nombre de departamento al que pertenece'
                            }
                          ],
                          normalize: v => upperCase(v)
                        }
                      ]"
                      placeholder="Ingrese su departamento ejm: recursos humanos"
                      :disabled="validarDatos"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div align="left">
                  <a-form-item label="Fecha de nacimiento" has-feedback>
                    <a-date-picker
                      v-decorator="validations.fechaNacimiento"
                      class="fecha"
                      placeholder="Seleccione la fecha de nacimiento"
                    />
                  </a-form-item>
                </div>
              </a-col>
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <div style="margin-top: 10px; margin-botom: 10px">
                  <a-form-item label="Información de nacimiento">
                    <a-checkbox :value="foreing" @change="changeForeing">
                      Mi lugar de nacimiento es diferente a Ecuador
                    </a-checkbox>
                  </a-form-item>
                </div>
              </a-col>
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <a-form-item label="Dirección de correo electrónico" has-feedback>
                  <a-input
                    v-decorator="[
                      'mail',
                      {
                        rules: [
                          { required: true, message: 'Ingrese su correo electrónico' },
                          {
                            pattern: /\S+@\S+\.\S+/,
                            message: 'Ingrese un correo electrónico válido'
                          }
                        ],
                        normalize: v => lowerCase(v)
                      }
                    ]"
                    placeholder="Ingrese su dirección de correo electrónico principal"
                    :disabled="validarDatos"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-if="!data._id"
                :xs="24"
                :sm="24"
                :md="12"
                :lg="12"
                :xl="12"
              >
                <a-form-item label="Confirmación de dirección de correo electrónico" has-feedback>
                  <a-input
                    v-decorator="[
                      'confirm',
                      {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor confirme su correo electrónico',
                          },
                          {
                            validator: compareToEmail,
                          },
                        ],
                        normalize: v => lowerCase(v)
                      },
                    ]"
                    placeholder="Ingrese nuevamente su dirección de correo electrónico principal"
                    @paste.prevent
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-if="data.certType === 3"
                :xs="24"
                :sm="24"
                :md="12"
                :lg="12"
                :xl="12"
              >
                <a-form-item label="Nombre empresa" has-feedback>
                  <a-input
                    v-decorator="[
                      'businessName',
                      {
                        rules: [{ required: true, message: 'Ingrese el nombre de su empresa' }],
                        normalize: v => upperCase(v)
                      }
                    ]"
                    placeholder="Ingrese el nombre de la empresa"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <a-form-item label="Número telefónico celular" has-feedback>
                  <a-input
                    v-decorator="[
                      'cellphone',
                      {
                        rules: [
                          {
                            required: true, message: 'Ingrese su número telefónico celular'
                          },
                        ],
                      }
                    ]"
                    placeholder="Ingrese su número telefónico celular"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <a-form-item has-feedback>
                  <span slot="label">
                    Información de distribuidor
                    <a-tooltip
                      title="Este apartado debe ser llenado únicamente por distribuidores autorizados."
                    >
                      <a-icon type="question-circle-o" />
                    </a-tooltip>
                  </span>
                  <a-input
                    v-decorator="[
                      'distributorInfo',
                      {
                        rules: [
                          {
                            required: false,
                          },
                        ],
                      },
                    ]"
                    :disabled="isProgress"
                    placeholder="Ingrese esta información unicamente si usted es distribuidor"
                    @paste.prevent
                  />
                </a-form-item>
              </a-col>
              <div>
                <a-col
                  v-if="data.certType === 1"
                  :xs="24"
                  :sm="24"
                  :md="flagBussines ? 12 : 6"
                  :lg="flagBussines ? 12 :6"
                  :xl="flagBussines ? 12 :6"
                >
                  <a-form-item>
                    <span slot="label">
                      Empresa pública
                      <a-tooltip
                        title="Importante: Este dato es solo informativo, no se registrará en su firma electrónica"
                      >
                        <a-icon type="question-circle-o" />
                      </a-tooltip>
                    </span>
                    <a-select
                      v-decorator="[
                        'businessName',
                        {
                          rules: [
                            {
                              required: false,
                            },
                          ],
                        },
                      ]"
                      class="select"
                      placeholder="Seleccione su empresa"
                      @change="changeToInput"
                    >
                      <a-select-option

                        v-for="d in business"
                        :key="d.id"
                        :value="d"
                      >
                        {{ d }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col
                  v-if="data.certType === 1 && !flagBussines"
                  :xs="24"
                  :sm="24"
                  :md="6"
                  :lg="6"
                  :xl="6"
                >
                  <a-form-item label="Ingrese el nombre de la empresa" has-feedback>
                    <a-input
                      v-decorator="[
                        'businessNameInput',
                        {
                          rules: [
                            {
                              required: form.getFieldValue('businessName') === 'OTRA', message: 'Ingrese el nombre de la empresa',
                            },
                          ],
                        },
                      ]"
                      :disabled="isProgress"
                      placeholder="Ingrese el nombre de su empresa"
                      @paste.prevent
                    />
                  </a-form-item>
                </a-col>
              </div>
              <!--              <div v-else>
                <a-col
                  v-if="data.certType === 1"
                  :xs="24"
                  :sm="24"
                  :md="12"
                  :lg="12"
                  :xl="12"
                >
                  <a-form-item has-feedback>
                    <span slot="label">
                      Ingrese el nombre de la empresa
                    </span>
                    <a-input
                      v-decorator="[
                        'businessName',
                        {
                          rules: [
                            {
                              required: false,
                            },
                          ],
                        },
                      ]"
                      :disabled="isProgress"
                      placeholder="Ingrese el nombre de su empresa"
                      @paste.prevent
                    />
                  </a-form-item>
                </a-col>
              </div>-->
            </a-row>
            <a-divider>Información de residencia</a-divider>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <a-form-item label="Provincia" has-feedback>
                <a-input
                  v-decorator=" [
                    'state',
                    {
                      rules: [{ required: true, message: 'Ingrese su provincia de residencia' }],
                      normalize: v => upperCase(v)
                    }
                  ]"
                  placeholder="Ingrese la provincia de residencia actual"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <a-form-item label="Ciudad" has-feedback>
                <a-input
                  v-decorator=" [
                    'city',
                    {
                      rules: [
                        { required: true, message: 'Ingrese su ciudad' },
                        { pattern: '[a-zA-Z]', message: 'Unicamente ingrese letras' },
                      ],
                      normalize: v => upperCase(v)
                    }
                  ]"
                  type="text"
                  placeholder="Ingrese la ciudad de residencia actual"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <a-form-item label="Dirección de domicilio" has-feedback>
                <a-input
                  v-decorator="[
                    'address',
                    {
                      rules: [{ required: true, message: 'Ingrese su dirección de domicilio' }],
                      normalize: v => upperCase(v)
                    }
                  ]"
                  placeholder="Ingrese su dirección de domicilio"
                />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <a-form-item label="Número telefónico convencional" has-feedback>
                <a-input
                  v-decorator="validations.telphone"
                  placeholder="Ingrese su número telefónico convencional"
                  :disabled="validarDatos"
                  type="number"
                />
              </a-form-item>
            </a-col>
            <div v-if="data._id">
              <a-divider>Información certificado</a-divider>
              <a-textarea v-model="data.observation" :disabled="true" />
            </div>
          </a-row>
          <div>
            <a-row>
              <a-divider orientation="left">
                <h2 align="left">
                  Datos de facturación
                </h2>
              </a-divider>
              <p>La facturación de este servicio es electrónica, se realiza por defecto con la información personal antes ingresada. Si requiere que se emita la factura con datos diferentes a los antes ingresados marque la siguiente opción:</p>
              <div v-if="data._id">
                <div style="margin: 10px 10px 10px 0px;">
                  <a-checkbox v-model="invoice" @change="noShow">
                    Deseo que se emita la factura con otros datos.
                  </a-checkbox>
                </div>
                <div v-show="data._id && invoice">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <a-form-item label="Tipo de identificación">
                      <a-select
                        v-decorator="[
                          'invoiceTypeId',
                          {
                            rules: [{ required: true, message: 'Seleccione la identificación ' }],
                            normalize: v => upperCase(v)
                          }
                        ]"
                        class="select"
                        placeholder="Seleccione su tipo de identificación"
                      >
                        <a-select-option
                          v-for="d in options.TypeIdUpconta"
                          :key="d.id"
                          :value="d.id"
                        >
                          {{ d.description }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <a-form-item label="Identificación" has-feedback>
                      <a-input
                        v-decorator="validations.invoiceId"
                        placeholder="Ingrese su número de identificacion"
                        :disabled="validarDatos"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <a-form-item label="Nombre y apellido" has-feedback>
                      <a-input
                        v-decorator="[
                          'invoiceName',
                          {
                            rules: [{ required: true, message: 'Ingrese el nombre y apellido' }],
                            normalize: v => upperCase(v)
                          }
                        ]"
                        type="text"
                        placeholder="Ingrese el nombre y apellido"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <a-form-item label="Ciudad" has-feedback>
                      <a-input
                        v-decorator="[
                          'invoiceCity',
                          {
                            rules: [{ required: true, message: 'Ingrese la ciudad' }],
                            normalize: v => upperCase(v)
                          }
                        ]"
                        placeholder="Ingrese la ciudad"
                        :disabled="validarDatos"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <a-form-item label="Dirección" has-feedback>
                      <a-input
                        v-decorator="[
                          'invoiceAddress',
                          {
                            rules: [{ required: true, message: 'Ingrese la dirección' }],
                            normalize: v => upperCase(v)
                          }
                        ]"
                        placeholder="Ingrese la direccion"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <a-form-item label="Correo electrónico" has-feedback>
                      <a-input
                        v-decorator=" [
                          'invoiceEmail',
                          {
                            rules: [
                              {
                                required: true, message: 'Ingrese el correo electrónico'
                              },
                            ],
                            normalize: v => lowerCase(v)
                          }
                        ]"
                        placeholder="Ingrese el correo electrónico"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <a-form-item label="Correo electrónico opcional" has-feedback>
                      <a-input
                        v-decorator="[
                          'invoiceOptEmail',
                          {
                            rules: [
                              {
                                required: false, message: 'Ingrese el correo electrónico opcional'
                              },
                            ],
                            normalize: v => lowerCase(v)
                          }
                        ]"
                        placeholder="Ingrese un correo electrónico opcional"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <a-form-item label="Teléfono" has-feedback>
                      <a-input
                        v-decorator="validations.invoicePhone"
                        placeholder="Ingrese el teléfono convencional"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <a-form-item label="Celular" has-feedback>
                      <a-input
                        v-decorator="validations.invoiceCellphone"
                        placeholder="Ingrese el numero de celular"
                        :disabled="validarDatos"
                      />
                    </a-form-item>
                  </a-col>
                </div>
              </div>
              <div v-else>
                <div style="margin: 10px 10px 10px 0px;">
                  <a-checkbox v-model="invoice" @change="noShow">
                    Deseo que se emita la factura con otros datos.
                  </a-checkbox>
                </div>
                <div v-if="invoice">
                  <a-row>
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <a-form-item label="Tipo de identificación">
                        <a-select
                          v-decorator="validations.invoiceTypeId"
                          class="select"
                          placeholder="Seleccione su tipo de identificación"
                          @change="resetFac"
                        >
                          <a-select-option
                            v-for="d in options.TypeIdUpconta"
                            :key="d.id"
                            :value="d.id"
                          >
                            {{ d.description }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <a-form-item :label="!tipoFac ? 'Identificación' : 'Número de '+tipoFac.toLowerCase()" has-feedback>
                        <a-input
                          v-decorator="validations.invoiceId"
                          :placeholder="!tipoFac ? 'Ingrese su número de identificacion' : 'Ingrese su número de '+tipoFac.toLowerCase()"
                          :disabled="validarDatos"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <a-form-item :label="tipoFac === 'RUC' ? 'Razon social' : 'Nombre y apellido'" has-feedback>
                        <a-input
                          v-decorator="[
                            'invoiceName',
                            {
                              rules: [{ required: true, message: 'Ingrese el nombre y apellido' }],
                              normalize: v => upperCase(v)
                            }
                          ]"
                          type="text"
                          :placeholder="tipoFac === 'RUC' ? 'Ingrese la razon social' : 'Ingrese su nombre y apellido'"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <a-form-item label="Ciudad" has-feedback>
                        <a-input
                          v-decorator="[
                            'invoiceCity',
                            {
                              rules: [{ required: true, message: 'Ingrese la ciudad' }],
                              normalize: v => upperCase(v)
                            }
                          ]"
                          placeholder="Ingrese la ciudad"
                          :disabled="validarDatos"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <a-form-item label="Dirección de domicilio" has-feedback>
                      <a-input
                        v-decorator="[
                          'invoiceAddress',
                          {
                            rules: [{ required: true, message: 'Ingrese la dirección de domicilio' }],
                            normalize: v => upperCase(v)
                          }
                        ]"
                        placeholder="Ingrese la dirección de domicilio"
                        :disabled="validarDatos"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <a-form-item label="Dirección de correo electrónico para facturación" has-feedback>
                      <a-input
                        v-decorator="[
                          'invoiceEmail',
                          {
                            rules: [
                              {
                                required: true, message: 'Ingrese su dirección de correo electrónico para facturación'
                              },
                            ],
                            normalize: v => lowerCase(v)
                          }
                        ]"
                        placeholder="Ingrese su dirección de correo electrónico para facturación"
                        :disabled="validarDatos"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <a-form-item label="Dirección de correo electrónico opcional" has-feedback>
                      <a-input
                        v-decorator="[
                          'invoiceOptEmail',
                          {
                            rules: [
                              {
                                required: false, message: 'Ingrese su dirección de correo electrónico opcional'
                              },
                            ],
                            normalize: v => lowerCase(v)
                          }
                        ]"
                        placeholder="Ingrese su dirección de correo electrónico opcional"
                        :disabled="validarDatos"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <a-form-item label="Número de teléfono convencional" has-feedback>
                      <a-input
                        v-decorator="validations.invoicePhone"
                        placeholder="Ingrese el teléfono convencional"
                        :disabled="validarDatos"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <a-form-item label="Número de celular" has-feedback>
                      <a-input
                        v-decorator="validations.invoiceCellphone"
                        placeholder="Ingrese el numero de celular"
                        :disabled="validarDatos"
                      />
                    </a-form-item>
                  </a-col>
                </div>
              </div>
            </a-row>
          </div>
          <div v-if="!data._id" class="drags">
            <a-row>
              <a-divider orientation="left">
                <h2 align="left">
                  Documentos
                </h2>
              </a-divider>
              <a-col :span="12">
                <a-form-item :label="tipoIdentDes">
                  <div>
                    <a-upload-dragger
                      v-decorator="validations.docCedula"
                      class="dragger"
                      name="docCedula"
                      :before-upload="
                        file => beforeUploads(file, 'fileListCed', 2)
                      "
                      :remove="file => handleRemove(file, 'fileListCed', 2)"
                      accept=".jpg, .png, .pdf, .jfif"
                      :file-list="fileListCed"
                    >
                      <p class="ant-upload-drag-icon">
                        <a-icon type="inbox" />
                      </p>
                      <p class="ant-upload-text">
                        {{ "Cargar aquí el documento de su " + tipoIdentDes.toLowerCase() }}
                      </p>
                      <p class="ant-upload-hint">
                        Formatos permitidos PNG, JPG y PDF
                      </p>
                    </a-upload-dragger>
                  </div>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <div v-if="shows">
                  <a-form-item label="RUC">
                    <div class="dropbox">
                      <a-upload-dragger
                        v-decorator="validations.docRuc"
                        name="docRuc"
                        :file-list="fileListRuc"
                        :before-upload="
                          file => beforeUploads(file, 'fileListRuc', 7)
                        "
                        :remove="file => handleRemove(file, 'fileListRuc', 7)"
                        accept=".jpg, .png, .pdf, .jfif"
                        múltiple
                      >
                        <p class="ant-upload-drag-icon">
                          <a-icon type="inbox" />
                        </p>
                        <p class="ant-upload-text">
                          Cargar aquí el documento de su RUC
                        </p>
                        <p class="ant-upload-hint">
                          Formatos permitidos PNG, JPG, PDF
                        </p>
                      </a-upload-dragger>
                    </div>
                  </a-form-item>
                </div>
              </a-col>
            </a-row>
            <div v-if="data.certType === 4">
              <a-row>
                <a-col :span="12">
                  <a-form-item label="Nombramiento">
                    <div class="dropbox">
                      <a-upload-dragger
                        v-decorator="validations.docNombramiento"
                        name="files"
                        :before-upload="
                          file => beforeUploads(file, 'fileListNom', 5)
                        "
                        :remove="file => handleRemove(file, 'fileListNom', 5)"
                        :file-list="fileListNom"
                        accept=".jpg, .png, .pdf, .jfif"
                        múltiple
                      >
                        <p class="ant-upload-drag-icon">
                          <a-icon type="inbox" />
                        </p>
                        <p class="ant-upload-text">
                          Cargar aquí el documento de su nombramiento
                        </p>
                        <p class="ant-upload-hint">
                          Formatos permitidos PNG, JPG y PDF
                        </p>
                      </a-upload-dragger>
                    </div>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="Constitución">
                    <div class="dropbox">
                      <a-upload-dragger
                        v-decorator="validations.docConstitucion"
                        name="files"
                        :before-upload="
                          file => beforeUploads(file, 'fileListCon', 3)
                        "
                        :remove="file => handleRemove(file, 'fileListCon', 3)"
                        :file-list="fileListCon"
                        accept=".pdf"
                        múltiple
                      >
                        <p class="ant-upload-drag-icon">
                          <a-icon type="inbox" />
                        </p>
                        <p class="ant-upload-text">
                          Cargar aquí el documento de su constitución
                        </p>
                        <p class="ant-upload-hint">
                          Formatos permitidos PDF
                        </p>
                      </a-upload-dragger>
                    </div>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-col v-show="false" :span="12">
                <a-form-item label="Especificación">
                  <a-textarea
                    v-decorator="validations.registryData"
                    placeholder="Indique en que pagina se encuentra estipulado su constitución y nombramiento ejemplo:
Constitucion pag. 4 parrafo 5 y Nombramiento pag.9 parrafo 35"
                    :rows="7"
                  />
                </a-form-item>
              </a-col>
            </div>
            <div>
              <div style="margin: 40px auto;">
                <a-checkbox v-model="accepted">
                  Confirmo que he leído los <strong><a href="/legal-information" target="_blank"> términos y condiciones</a></strong> del servicio de gestión para la emisión de firmas electrónicas.
                </a-checkbox>
              </div>
              <div style="text-align: center;">
                <a-popconfirm
                  title="¿Esta seguro que desea retroceder?"
                  cancel-text="Cancelar"
                  @confirm="$store.commit('navigation/prev')"
                >
                  <a-button>
                    Regresar
                  </a-button>
                </a-popconfirm>
                <a-popconfirm
                  :title="
                    '¿Está seguro que el correo ' +
                      (form.getFieldValue('mail')
                        ? form.getFieldValue('mail')
                        : '') +
                      ' ' +
                      ' y número celular ' +
                      (form.getFieldValue('cellphone')
                        ? form.getFieldValue('cellphone')
                        : '') +
                      ' ingresados son correctos?'
                  "
                  ok-text="Aceptar"
                  cancel-text="Cancelar"
                  :disabled="!accepted"
                  @confirm="handleSubmit"
                >
                  <a-button :disabled="!accepted" type="primary">
                    Aceptar
                  </a-button>
                </a-popconfirm>
              </div>
            </div>
          </div>
        </a-form>
      </div>
    </a-col>
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <div v-if="data._id" v-show="showDocs" class="docs">
        <a-divider orientation="left">
          <h2 align="left">
            Documentos
          </h2>
        </a-divider>
        <div>
          <a-tabs>
            <a-tab-pane v-for="i in files" :key="i.name" :tab="i.name" force-render>
              <a-upload
                :before-upload="
                  file => insertInFiles(file, i.name, i.type)
                "
                accept=".jpg, .png, .pdf, .jfif"
                :show-upload-list="false"
              >
                <a-button v-show="files.length > 0" style="margin:30px 0 30px 0">
                  <a-icon type="upload" />Reemplazar
                </a-button>
              </a-upload>
              <div v-if="flag.documents">
                <object v-if="i.mime === 'application/pdf'" style="width:100%;height:700px" :data="i.blob" />
                <video v-else-if="i.mime.startsWith('video')" :src="i.blob" controls>
                  <p>Tu navegador no soporta HTML5 video.</p>
                </video>
                <div v-else class="flex justify-center items-centers">
                  <img width="70%" :src="i.blob">
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
        <br>
        <div>
          <a-divider orientation="left">
            <h2 align="left">
              Seguimiento
            </h2>
          </a-divider>
          <div style="height: 350px;overflow-y: auto; padding-top: 10px">
            <a-timeline mode="alternate">
              <a-timeline-item v-for="(i, index) in data && data.operatorEc && data.operatorEc.record" :key="index">
                <p>{{ `${getformatDate(i._date)} - ${i.id.name}` }}</p>
                <p>{{ i.description }}</p>
              </a-timeline-item>
            </a-timeline>
          </div>
          <div>
            <a-textarea v-model="tracing" class="mt-3" placeholder="Ingrese su seguimiento" :rows="3" />
            <div class="mt-3 flex justify-end">
              <a-button type="primary" :disabled="!tracing" :loading="loadingTracing" @click="insertTracing">
                Guardar seguimiento
              </a-button>
            </div>
          </div>
        </div>

        <insert-modal v-if="showModal" @closes="closeModal" />
      </div>
    </a-col>
    <a-col span="24">
      <div v-if="data._id">
        <a-divider orientation="left">
          <h2 align="left">
            Verificaciones
          </h2>
        </a-divider>
        <div class="inser">
          <a-tabs
            default-active-key="1"
            size="large"
          >
            <a-tab-pane
              key="1"
              force-render
            >
              <span slot="tab">
                Pago
                <a-icon v-if="data.verification.payment.value" type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
                <a-icon v-else type="close-circle" />
              </span>
              <p class="iner">
                Verificación de pago
              </p>
              <a-switch v-model="data.verification.payment.value" disabled>
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
              <a-select
                v-model="data.paymentMethod"
                :disabled="data.paymentMethod === 'card'"
                style="width: 250px; margin: 5px"
                label="Metodo de pago"
                class="select"
                placeholder="Seleccione el tipo de pago"
                @change="selectPayment"
              >
                <a-select-option
                  v-for="d in options.TypesPaymentMethod"
                  :key="d.id"
                  :value="d.id"
                >
                  {{ d.description }}
                </a-select-option>
              </a-select>
              <div style="width: 100%; min-height: 150px;">
                <a-col :md="12" :xl="12" :xs="24">
                  <a-textarea
                    v-model="data.verification.payment.observation"
                    :rows="5"
                    :disabled="data.paymentMethod === 'card'"
                    placeholder="Ingrese su comentario"
                    style="width: 95%; height: 150px"
                  />
                </a-col>
                <a-col style="margin-top: 5px" :md="12" :xl="12" :xs="24">
                  <h2 v-if="data.verification.payment.holder" style="text-align: center">
                    <b>Información de pago</b>
                  </h2>
                  <h2 v-if="data.verification.payment.holder">
                    <b>{{ data.paymentMethod ==='transfer' ? 'Titular: ' : data.paymentMethod ==='card' ? 'Titular de tarjeta: ' : 'Depositante: ' }}</b>
                    {{ data.verification.payment.holder }}
                  </h2>
                  <h2 v-if="data.verification.payment.bank">
                    <b>{{ data.paymentMethod ==='card' ? 'Número de Tarjeta: ' : 'Banco:' }}</b>
                    {{ data.verification.payment.bank }}
                  </h2>
                  <h2 v-if="data.verification.payment.bank">
                    <b>{{ data.paymentMethod ==='card' ? 'Código de autorización: ' : 'Cuenta bancaria:' }}</b>
                    {{ data.verification.payment.account }}
                  </h2>
                </a-col>
                <!-- <div v-if="paymentData.document && certData.value !== 'distributor'" class="info-payment">
                  <h1 style="text-align: center">
                    Detalles del pago
                  </h1>
                  <p>
                    La información que se solicita a continuacion es para contrastar con la información entregada por nuestro banco y así agilizar la verificación del pago realizado.
                  </p>
                  <label class="info-content"><b style="color: red">*</b> {{ }}</label>
                  <a-input v-model="paymentData.holder" required class="info-content" :placeholder="certData.value ==='transfer' ? 'Ingrese el nombre del titular de la cuenta bancaria desde donde se realizó la transferencia' : 'Ingrese el nombre del depositante'" />
                  <label v-if="certData.value === 'transfer'" class="info-content"><b style="color: red">*</b> Nombre del banco desde donde se realizó la transferencia:</label>
                  <a-input v-if="certData.value === 'transfer'" v-model="paymentData.bank" class="info-content" placeholder="Ingrese el nombre del banco desde donde se realizó la transferencia" />
                  <label v-if="certData.value === 'transfer'" class="info-content"><b style="color: red">*</b> Número de cuenta desde donde se realizó la transferencia:  </label>
                  <a-input v-if="certData.value === 'transfer'" v-model="paymentData.account" class="info-content" placeholder="Ingrese el número de cuenta desde donde se realizó la transferencia" />
                </div> -->
              </div>
              <div v-if="!data.verification.payment.value" align="right">
                <a-popconfirm
                  v-if="data.paymentMethod === 'distributor'"
                  title="¿Está seguro validar el pago?"
                  ok-text="Aceptar"
                  cancel-text="Cancelar"
                  @confirm="sendPayment"
                >
                  <a-button
                    type="primary"
                    :loading="isLoading"
                  >
                    Validar pago
                  </a-button>
                </a-popconfirm>
                <a-popconfirm
                  v-else
                  title="¿Está seguro validar el pago?"
                  ok-text="Aceptar"
                  cancel-text="Cancelar"
                  @confirm="sendPayment"
                >
                  <a-button
                    type="primary"
                    :disabled="!data.verification.payment.document"
                    :loading="isLoading"
                  >
                    Validar pago
                  </a-button>
                </a-popconfirm>
              </div>
              <div align="left" style="margin: 10px">
                <a-button
                  v-if="data.verification.payment.document"
                  :type="showPayDoc ? 'primary' : 'secundary'"
                  @click="showPayDoc = !showPayDoc"
                >
                  <a-icon v-if="showPayDoc" type="eye" />
                  <a-icon v-else type="eye-invisible" />
                </a-button>
                <a-upload
                  name="files"
                  múltiple
                  :before-upload="
                    file => insertValidations(file,'payment')
                  "
                  :show-upload-list="false"
                  accept=".jpg, .png, .pdf, .jfif"
                >
                  <a-button>
                    <a-icon type="upload" /><span>{{ data.verification.payment.document ? 'Reemplazar' : 'Suba el comprobante' }}</span>
                  </a-button>
                </a-upload>
              </div>
              <div v-if="flag.payment">
                <object v-show="showPayDoc" v-if="data.verification.payment.mime ==='application/pdf'" style="width: 100%; height: 700px" :data="blobData.payment" />
                <img v-show="showPayDoc" v-else style="width:100%;max-width:660px; height: 100%; max-height: 800px" :src="blobData.payment">
              </div>
            </a-tab-pane>
            <a-tab-pane
              key="2"
              :disabled="!data.verification.payment.value"
              force-render
            >
              <span slot="tab">
                Datos
                <a-icon v-if="data.verification.dataProvided.value" type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
                <a-icon v-else type="close-circle" />

              </span>
              <p class="iner">
                Verificación de datos
              </p>
              <a-switch v-model="data.verification.dataProvided.value">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
              <div style="width: 75%; min-height: 150px;">
                <a-textarea
                  v-model="data.verification.dataProvided.observation"
                  :rows="5"
                  placeholder="Ingrese su comentario"
                />
              </div>
            </a-tab-pane>
            <a-tab-pane
              key="3"
              :disabled="!data.verification.payment.value"
              force-render
            >
              <span slot="tab">
                Llamada
                <a-icon v-if="data.verification.videoCall.value" type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
                <a-icon v-else type="close-circle" />
              </span>
              <p class="iner">
                Verificación de llamada
              </p>
              <a-switch v-model="data.verification.videoCall.value">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
              <div style="width: 75%; min-height: 150px;">
                <a-textarea
                  v-model="data.verification.videoCall.observation"
                  :rows="5"
                  placeholder="Ingrese su comentario"
                />
              </div>
              <div align="left" style="margin: 10px">
                <a-button v-if="data.verification.videoCall.document" :type="showVdDoc ? 'primary' : 'secundary'" @click="showVdDoc = !showVdDoc">
                  <a-icon v-if="showVdDoc" type="eye" />
                  <a-icon v-else type="eye-invisible" />
                </a-button>
                <a-upload
                  name="video"
                  múltiple
                  :before-upload="
                    file => insertValidations(file,'videoCall')
                  "
                  :show-upload-list="false"
                  accept=".jpg, .png, .pdf, .jfif"
                >
                  <a-button>
                    <a-icon type="upload" /><span>{{ data.verification.videoCall.document ? 'Reemplazar' : 'Suba el comprobante' }}</span>
                  </a-button>
                </a-upload>
              </div>
              <div v-if="flag.videoCall">
                <object v-show="showVdDoc" v-if="data.verification.videoCall.mime ==='application/pdf'" style="width: 100%; height: 700px" :data="blobData.videoCall" />
                <img v-show="showVdDoc" v-else style="width:100%;max-width:560px; height: 100%" :src="blobData.videoCall">
              </div>
              <div class="flex justify-end mt-5">
                <a-button v-if="data.status === 2 || data.status === 3" type="primary" :loading="lodingReplaceVideoCall" :disabled="!data.verification.videoCall.document || !flagReplace" @click="changueVideoCallFile">
                  Guardar documento
                </a-button>
              </div>
            </a-tab-pane>
            <a-tab-pane
              key="4"
              :disabled="!data.verification.payment.value"
            >
              <span slot="tab">
                Registro civil
                <a-icon v-if="data.verification.civilRegistration.value" type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
                <a-icon v-else type="close-circle" />

              </span>
              <p class="iner">
                Verificación con registro civil
              </p>
              <a-switch v-model="data.verification.civilRegistration.value">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
              <div style="width: 75%; min-height: 150px;">
                <a-textarea
                  v-model="data.verification.civilRegistration.observation"
                  :rows="5"
                  placeholder="Ingrese su comentario"
                />
              </div>
            </a-tab-pane>
            <a-tab-pane
              v-if="shows"
              key="5"
              :disabled="!data.verification.payment.value"
            >
              <span slot="tab">
                RUC
                <a-icon v-if="data.verification.ruc.value" type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
                <a-icon v-else type="close-circle" />

              </span>
              <p class="iner">
                Verificación de RUC
              </p>
              <a-switch v-model="data.verification.ruc.value">
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
              <div style="width: 75%; min-height: 150px;">
                <a-textarea
                  v-model="data.verification.ruc.observation"
                  :rows="5"
                  placeholder="Ingrese su comentario"
                />
              </div>
            </a-tab-pane>
            <a-tab-pane
              v-if="data.certType === 4"
              key="6"
              :disabled="!data.verification.payment.value"
            >
              <span slot="tab">
                Super compañías
                <a-icon v-if="data.verification.superintendenceCompanies.value" type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
              </span>
              <p class="iner">
                Verificación de Super compañias
              </p>
              <a-switch
                v-model="data.verification.superintendenceCompanies.value"
              >
                <a-icon slot="checkedChildren" type="check" />
                <a-icon slot="unCheckedChildren" type="close" />
              </a-switch>
              <div style="width: 75%; min-height: 150px;">
                <a-textarea
                  v-model="
                    data.verification.superintendenceCompanies.observation
                  "
                  :rows="5"
                  placeholder="Ingrese su comentario"
                />
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </a-col>
    <a-col v-if="data._id" :span="24">
      <div v-if="data.verification.payment.value" align="right">
        <a-button
          v-if="data.status < 2"
          style="margin: 30px 0 30px 0"
          type="primary"
          :loading="loading"
          @click="handleEdit"
        >
          Guardar
        </a-button>
        <!--<a-button type="primary" :disabled="!verifications">Emitir certificado</a-button>-->
      </div>
    </a-col>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  layout: 'user',
  props: {
    data: { type: Object, required: true },
    typeComp: { type: String, required: false }
  },
  data: () => ({
    tracing: '',
    loadingTracing: false,
    business: [
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
    flagBussines: false,
    isLoadingCoupon: false,
    showCoupon: false,
    coupon: null,
    loading: false,
    overlay: true,
    invoice: false,
    showVdDoc: true,
    showPayDoc: true,
    lodingReplaceVideoCall: false,
    flagReplace: false,
    blobData: {
      payment: null,
      videoCall: null,
      ci: null,
      ruc: null,
      con: null,
      nomb: null
    },
    flag: {
      payment: false,
      videoCall: false,
      documents: true
    },
    validarDatos: false,
    showDocs: false,
    show: true,
    options: {},
    showModal: false,
    infoBirth: {},
    datas: {},
    tipoIdentDes: 'Identificación',
    tipoFac: null,
    pais: undefined,
    tipoIdent: undefined,
    accepted: false,
    fileListCed: [],
    fileListRuc: [],
    fileListCon: [],
    fileListNom: [],
    fileListVideo: [],
    fileListPay: [],
    type: undefined,
    archivos: [],
    files: [],
    fil: [],
    validations: {
      ruc: ['ruc', {
        rules: [
          { required: true, message: 'Ingrese su RUC' },
          { len: 13, message: 'Su RUC debe contener 13 dígitos' }
        ]
      }],
      type: [
        'type',
        {
          rules: [
            { required: true, message: 'Seleccione su tipo de identificación' }
          ]
        }
      ],
      docCedula: [
        'docCedula',
        {
          rules: [{ required: true, message: 'Ingrese su el archivo de su cedula' }]
        }
      ],

      docRuc: [
        'docRuc',
        { rules: [{ required: true, message: 'Ingrese su el archivo de su RUC' }] }
      ],
      docConstitucion: [
        'docConstitucion',
        {
          rules: [
            { required: true, message: 'Ingrese su el archivo de su constitución' }
          ]
        }
      ],
      docNombramiento: [
        'docNombramiento',
        {
          rules: [
            { required: true, message: 'Ingrese su el archivo de su no,bramiento' }
          ]
        }
      ],
      telphone: [
        'telphone',
        {
          rules: [
            {
              required: false,
              message: 'Ingrese su número de teléfono convencional'
            }
          ]
        }
      ],
      fechaNacimiento: [
        'fechaNacimiento',
        { rules: [{ required: true, message: 'Ingrese su fecha de nacimiento' }] }
      ],
      registryData: [
        'registryData',
        {
          rules: [
            {
              required: false,
              message: 'Ingrese la especificacion de su constitución y nombramiento'
            }
          ]
        }
      ],
      businessTelphone: [
        'businessTelphone',
        {
          rules: [{ required: true, message: 'Ingrese el teléfono de su empresa' }]
        }
      ],
      businessPosition: [
        'businessPosition',
        { rules: [{ required: true, message: 'Ingrese su cargo empresarial' }] }
      ],
      departamentBusiness: [
        'departamentBusiness',
        {
          rules: [
            {
              required: true,
              message: 'Ingrese el nombre de departamento al que pertenece'
            }
          ]
        }
      ],
      invoiceTypeId: [
        'invoiceTypeId',
        {
          rules: [{ required: true, message: 'Seleccione la identificación ' }]
        }
      ],
      invoiceId: [
        'invoiceId',
        {
          rules: [{ required: true, message: 'Ingrese el id ' }]
        }
      ],
      invoicePhone: [
        'invoicePhone',
        {
          rules: [{ required: true, message: 'Ingrese el teléfono' }]
        }
      ],
      invoiceCellphone: [
        'invoiceCellphone',
        {
          rules: [{ required: true, message: 'Ingrese el teléfono de su empresa' }]
        }
      ]
    },
    foreing: false,
    isProgress: false,
    isLoading: false,
    formItemLayout: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
  }),
  head () {
    return {
      title: 'Firmaselectronicas.ec'
    }
  },
  computed: {
    calcTotal () {
      if (this.data.products.length > 0) {
        let sum = 0
        for (const i of this.data.products) {
          sum = sum + i.price.value
        }
        return (sum + this.data.price.value).toFixed(2)
      } else {
        return this.data.price.value
      }
    },
    shows () {
      return this.data.certType === 4 || this.data.certType === 2
    },
    names () {
      const names = this.data.subject.name2
        ? `${this.data.subject.name1} ${this.data.subject.name2}`
        : this.data.subject.name1
      return names + ' ' + this.data.subject.surName1 + ' ' + this.data.subject.surName2
    },
    verifications () {
      if (this.data.certType === 1) {
        return this.data.verification.civilRegistration && this.data.verification.dataProvided && this.data.verification.videoCall
      } else if (this.data.certType === 2) {
        return this.data.verification.civilRegistration && this.data.verification.dataProvided && this.data.verification.videoCall && this.data.verification.ruc
      } else {
        return this.data.verification.civilRegistration && this.data.verification.dataProvided && this.data.verification.videoCall && this.data.verification.ruc && this.data.verification.superintendenceCompanies
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'validate_other' })
  },
  mounted () {
    this.flagBussines = true
    this.foreing = this.$store.state.userSendData.foreing
    if (this.data._id) {
      if (this.data.operatorEc && !this.data.operatorEc.record) {
        this.data.operatorEc.record = []
      }
      this.files = JSON.parse(JSON.stringify(this.data.files))
      if (this.data.verification && this.data.verification.payment.document) {
        this.flag.payment = true
        this.blobData.payment = this.returnBlob(this.data.verification.payment.document, this.data.verification.payment.mime)
      }
      if (this.data.verification && this.data.verification.videoCall.document) {
        this.flag.videoCall = true
        this.blobData.videoCall = this.returnBlob(this.data.verification.videoCall.document, this.data.verification.videoCall.mime)
      }
      for (const x of this.files) {
        x.blob = (this.returnBlob(x.content, x.mime))
      }
      try {
        this.invoice = !this.data.infoBilling.withSubject
        this.getOptions('edit')
        for (const x of this.data.files) {
          const datos = {
            id: x.type,
            document: x.content
          }
          this.fil.push(datos)
        }
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Ha ocurrido un error',
          content: message,
          okText: 'Aceptar'
        })
      }
      this.tipoIdent = this.data.subject.type
      this.isProgress = this.data.subject.distributorInfo === 'APP PROGRESSSERVICES'
      this.form.setFieldsValue({
        invoiceTypeId: this.data.infoBilling.idType,
        invoiceId: this.data.infoBilling.id,
        invoiceName: this.data.infoBilling.name ? this.data.infoBilling.name.toUpperCase() : this.data.infoBilling.name,
        invoicePhone: this.data.infoBilling.phone,
        invoiceEmail: this.data.infoBilling.email,
        invoiceAddress: this.data.infoBilling.address,
        invoiceCellphone: this.data.infoBilling.cellphone,
        invoiceOptEmail: this.data.infoBilling.optionalEmail,
        invoiceCity: this.data.infoBilling.city,
        name1: this.data.subject.name1 ? this.data.subject.name1.toUpperCase() : this.data.subject.name1,
        name2: this.data.subject.name2 ? this.data.subject.name2.toUpperCase() : this.data.subject.name2,
        surName1: this.data.subject.surName1 ? this.data.subject.surName1.toUpperCase() : this.data.subject.surName1,
        surName2: this.data.subject.surName2 ? this.data.subject.surName2.toUpperCase() : this.data.subject.surName2,
        fechaNacimiento: moment(this.data.subject.infoBirth ? this.data.subject.infoBirth.date : this.data.subject.dateBirth),
        businessTelphone: this.data.subject.businessTelphone,
        businessName: this.data.subject.businessName ? this.data.subject.businessName.toUpperCase() : this.data.subject.businessName,
        distributorInfo: this.data.subject.distributorInfo,
        // businessMail: this.data.subject.businessMail,
        businessAddress: this.data.subject.businessAddress ? this.data.subject.businessAddress.toUpperCase() : this.data.subject.businessAddress,
        businessCountry: this.data.subject.businessCountry ? this.data.subject.businessCountry.toUpperCase() : this.data.subject.businessCountry,
        businessState: this.data.subject.businessState ? this.data.subject.businessState.toUpperCase() : this.data.subject.businessState,
        businessCity: this.data.subject.businessCity ? this.data.subject.businessCity.toUpperCase() : this.data.subject.businessCity,
        businessPosition: this.data.subject.businessPosition ? this.data.subject.businessPosition.toUpperCase() : this.data.subject.businessPosition,
        // countryNacimiento: this.data.subject.infoBirth.country ? this.data.subject.infoBirth.country.toUpperCase() : this.data.subject.infoBirth.country,
        // stateNacimiento: this.data.subject.infoBirth.state ? this.data.subject.infoBirth.state.toUpperCase() : this.data.subject.infoBirth.state,
        departamentBusiness: this.data.subject.departamentBusiness ? this.data.subject.departamentBusiness.toUpperCase() : this.data.subject.departamentBusiness,
        // cityNacimiento: this.data.subject.infoBirth.city ? this.data.subject.infoBirth.city.toUpperCase() : this.data.subject.infoBirth.city,
        address: this.data.subject.address ? this.data.subject.address.toUpperCase() : this.data.subject.address,
        telphone: this.data.subject.telphone,
        cellphone: this.data.subject.cellphone,
        registryData: this.data.subject.registryData ? this.data.subject.registryData.toUpperCase() : this.data.subject.registryData,
        ruc: this.data.subject.ruc,
        city: this.data.subject.city ? this.data.subject.city.toUpperCase() : this.data.subject.city,
        state: this.data.subject.state ? this.data.subject.state.toUpperCase() : this.data.subject.state,
        mail: this.data.subject.mail,
        id: this.data.subject.id,
        type: this.data.subject.type
      })
      if (this.data.certType === 1 && this.data.subject.businessName) {
        if (!this.business.includes(this.data.subject.businessName)) {
          this.form.setFieldsValue({
            businessName: 'OTRA',
            businessNameInput: this.data.subject.businessName
          })
          this.flagBussines = false
        }
      }
      this.showDocs = this.data.verification.payment.value
      if (this.data.infoBilling.withSubject === true) {
        this.noShow()
      }
      this.overlay = false
    } else {
      this.showDocs = true
      this.getOptions('init')
    }
  },
  methods: {
    getformatDate (date) {
      return moment(date).format('DD-MM-YYYY HH:mm')
    },
    async insertTracing () {
      try {
        this.loadingTracing = true
        this.data.operatorEc.record = await this.$axios.$post(`/api/executives/anf/insert-operator-record/${this.$route.params.id}`, {
          description: this.tracing
        })
        this.tracing = ''
        this.$message.success('Se registro correctamente el seguimiento')
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Ha ocurrido un error',
          content: message,
          okText: 'Aceptar'
        })
      } finally {
        this.loadingTracing = false
      }
    },
    async changueVideoCallFile () {
      try {
        this.lodingReplaceVideoCall = true
        await this.$axios.post(`/api/executives/anf/replace-videocall-file/${this.$route.params.id}`, {
          document: this.data.verification.videoCall.document
        })
        this.$message.success('Se subió correctamente el archivo de video llamada')
        this.flagReplace = false
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Ha ocurrido un error',
          content: message,
          okText: 'Aceptar'
        })
      } finally {
        this.lodingReplaceVideoCall = false
      }
    },
    changeToInput (select) {
      if (select === 'OTRA') {
        this.flagBussines = false
        this.form.setFieldsValue({
          businessName: 'sdssdsdds'
        })
      } else {
        this.flagBussines = true
      }
    },
    changeForeing (value) {
      this.$store.commit('userSendData/isForeing')
      this.foreing = this.$store.state.userSendData.foreing
    },
    async sendCoupon () {
      try {
        this.isLoadingCoupon = true
        const endpoint = `/api/executives/anf/change-coupon/${this.data._id}`
        await this.$axios.$post(endpoint, { coupon: this.coupon })
        this.$emit('init')
        this.$message.success('Se agregó el cupón correctamente')
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Ha ocurrido un error',
          content: message,
          okText: 'Aceptar'
        })
      } finally {
        this.isLoadingCoupon = false
      }
    },
    onChangeCoupon () {
      this.showCoupon = !this.showCoupon
    },
    async insertValidations (file, doc) {
      if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'application/pdf') {
        const document = await this.toBase64(file)
        if (doc === 'payment') {
          this.flag.payment = false
          this.data.verification.payment.document = document
          this.data.verification.payment.mime = file.type
          this.flag.payment = true
          this.blobData.payment = this.returnBlob(document, file.type)
        } else if (doc === 'videoCall') {
          this.flag.videoCall = false
          this.flagReplace = true
          this.data.verification.videoCall.document = document
          this.data.verification.videoCall.mime = file.type
          this.flag.videoCall = true
          this.blobData.videoCall = this.returnBlob(document, file.type)
        }
      } else {
        this.$error({
          title: 'Error en el formato de archivo',
          content: 'El archivo que desea agregar no esta en el formato aceptado. Formatos aceptados JPG PNG PDF',
          okText: 'Aceptar'
        })
      }
    },
    async insertInFiles (file, name, id) {
      if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'application/pdf') {
        this.flag.documents = false
        const b64 = await this.toBase64(file)
        const pos = this.data.files.findIndex(x => x.name === name)
        this.data.files[pos].content = b64
        this.data.files[pos].mime = file.type
        this.files[pos].blob = this.returnBlob(b64, file.type)
        this.files[pos].mime = file.type
        const posFil = this.fil.findIndex(x => x.id === id)
        this.fil[posFil].document = b64
        this.flag.documents = true
      } else {
        this.$error({
          title: 'Error en el formato de archivo',
          content: 'El archivo que desea agregar no esta en el formato aceptado. Formatos aceptados JPG PNG PDF',
          okText: 'Aceptar'
        })
      }
    },
    returnBlob (b64, mime) {
      try {
        const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
          const byteCharacters = atob(b64Data)
          const byteArrays = []
          for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize)

            const byteNumbers = new Array(slice.length)
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i)
            }
            const byteArray = new Uint8Array(byteNumbers)
            byteArrays.push(byteArray)
          }
          const blob = new Blob(byteArrays, { type: contentType })
          return blob
        }
        const blob = b64toBlob(b64, mime)
        return URL.createObjectURL(blob)
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Ha ocurrido un error',
          content: message,
          okText: 'Aceptar'
        })
      }
    },
    upperCase (value) {
      return value ? value.toUpperCase() : value
    },
    lowerCase (value) {
      return value ? value.toLowerCase() : value
    },
    selectPayment (value) {
      this.data.paymentMethod = value
    },
    compareToEmail (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('mail')) {
        callback('El correo electrónico de confirmación no coincide') // eslint-disable-line
      } else {
        callback()
      }
    },
    compareToEmailEmp (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('businessMail')) {
        callback('El correo electrónico alterno de confirmación no coincide') // eslint-disable-line
      } else {
        callback()
      }
    },
    getEnumerate (id, array) {
      if (array) {
        for (const x of Array.from(array)) {
          const stado = x.id
          if (stado === id) {
            return x.description
          }
        }
      }
      return ''
    },
    reset (value) {
      this.tipoIdent = value
      const type = this.options.TypesId.find(x => x.id === this.tipoIdent)
      this.tipoIdentDes = type.description
      this.form.setFieldsValue({
        id: ''
      })
    },
    resetFac (value) {
      const type = this.options.TypeIdUpconta.find(x => x.id === value)
      this.tipoFac = type.description
    },
    async sendPayment () {
      this.isLoading = true
      try {
        const data = {
          observation: this.data.verification.payment.observation,
          document: this.data.verification.payment.document,
          paymentMethod: this.data.paymentMethod
        }
        const id = this.$route.params.id
        await this.$axios.$post(`/api/executives/anf/correct-payment/${id}`, data)
        this.$message.success('Enviado correctamente')
        this.$emit('init')
        this.showDocs = true
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
    closeModal () {
      this.showModal = false
    },
    handleSelectChange (value) {
      this.form.setFieldsValue({
        ruc: value + '001'
      })
    },
    async beforeUploads (file, variable, id) {
      if (file.size < 15360000) {
        if (!this[variable][0]) {
          if (id === 2 || id === 5 || id === 7) {
            if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'application/pdf') {
              const doc = await this.toBase64(file)
              const data = {
                id,
                document: doc
              }
              this.fil.push(data)
              this[variable] = [...this[variable], file]
              return false
            } else {
              this.$error({
                title: 'Error en el formato de archivo',
                content: 'El archivo que desea agregar no esta en el formato aceptado. Formatos aceptados JPG PNG PDF',
                okText: 'Aceptar'
              })
            }
          } else if (id === 3) {
            if (file.type === 'application/pdf') {
              const doc = await this.toBase64(file)
              const data = {
                id,
                document: doc
              }
              this.fil.push(data)
              this[variable] = [...this[variable], file]
              return false
            } else {
              this.$error({
                title: 'Error en el formato de archivo',
                content: 'El archivo que desea agregar no esta en el formato aceptado que es PDF',
                okText: 'Aceptar'
              })
            }
          }
        } else {
          this.$error({
            title: 'Ya existe un documento cargado',
            content: 'Si desea agregar otro documento primero elimine el actual',
            okText: 'Aceptar'
          })
        }
      } else {
        this.$error({
          title: 'Error en el tamaño de archivo',
          content: 'El archivo que desea agregar tiene un peso superior a 15 megas',
          okText: 'Aceptar'
        })
      }
    },
    handleRemove (file, variable, id, edit) {
      const pos = this.fil.findIndex(x => x.id === id)
      if (!edit) {
        this.fil.splice(pos, 1)
      }
      const index = this[variable].indexOf(file)
      const newFileList = this[variable].slice()
      newFileList.splice(index, 1)
      this[variable] = newFileList
    },
    send (data) {
      this.$emit('post', data)
    },
    noShow () {
      if (!this.invoice) {
        this.form.setFieldsValue({
          invoiceId: ' ',
          invoiceTypeId: ' ',
          invoiceName: ' ',
          invoicePhone: ' ',
          invoiceEmail: ' ',
          invoiceAddress: ' ',
          invoiceCellphone: ' ',
          invoiceOptEmail: ' ',
          invoiceCity: ' '
        })
      } else {
        this.form.setFieldsValue({
          invoiceId: this.data.infoBilling ? this.data.infoBilling.id : '',
          invoiceTypeId: this.data.infoBilling ? this.data.infoBilling.idType : '',
          invoiceName: this.data.infoBilling ? this.data.infoBilling.name : '',
          invoicePhone: this.data.infoBilling ? this.data.infoBilling.phone : '',
          invoiceEmail: this.data.infoBilling ? this.data.infoBilling.email : '',
          invoiceAddress: this.data.infoBilling ? this.data.infoBilling.address : '',
          invoiceCellphone: this.data.infoBilling ? this.data.infoBilling.cellphone : '',
          invoiceOptEmail: this.data.infoBilling ? this.data.infoBilling.optionalEmail : '',
          invoiceCity: this.data.infoBilling ? this.data.infoBilling.city : ''
        })
      }
    },
    async handleEdit (e) {
      let values
      let infoBilling
      try {
        values = await this.form.validateFields(this)
        /* this.infoBirth = {
          city: values.cityNacimiento,
          state: values.stateNacimiento,
          country: values.countryNacimiento,
          date: values.fechaNacimiento
        } */
        delete values.cityNacimiento
        delete values.stateNacimiento
        delete values.countryNacimiento
      } catch (err) {
        this.$message.error('Corrija los datos del formulario para continuar')
        return
      }
      if (values.businessName === 'OTRA') {
        if (!values.businessNameInput) {
          this.$message.error('Ingrese el nombre de la empresa')
          return
        }
        values.businessName = values.businessNameInput
        delete values.businessNameInput
      }
      infoBilling = {
        withSubject: !this.invoice,
        id: values.invoiceId,
        idType: values.invoiceTypeId,
        name: values.invoiceName,
        phone: values.invoicePhone,
        email: values.invoiceEmail,
        address: values.invoiceAddress,
        cellphone: values.invoiceCellphone,
        optionalEmail: values.invoiceOptEmail,
        city: values.invoiceCity
      }
      if (!this.invoice) {
        infoBilling = {}
      }
      this.datas = {
        _date: this.data._date,
        subject: values,
        files: this.fil,
        certType: this.data.certType,
        type: this.data.type,
        duration: this.data.duration,
        paymentMethod: this.data.paymentMethod,
        infoBilling
      }
      this.datas.subject.dateBirth = values.fechaNacimiento
      this.datas.verification = this.data.verification
      this.loading = true
      const id = this.$route.params.id
      try {
        await this.$axios.$put(`/api/executives/anf/${id}`, this.datas)
        this.$emit('send', this.datas)
        this.$message.success('Se guardó correctamente')
        this.$route.name === 'executive-convenios-showDoc-id' ? this.$router.push('/executive/convenios') : this.$router.push('/executive')
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      } finally {
        this.loading = false
      }
      // this.$emit('send', this.datas)
      /* const id = this.$route.params.id
      await this.$axios.$put(`/api/anf-requests/${id}`, this.datas)
      this.$message.success('Se guardó correctamente')
      this.$router.push('/administrator/facturas') */
    },
    async handleSubmit (e) {
      e.preventDefault()
      let values
      let dateBirth = null
      try {
        values = await this.form.validateFields(this)
        if (this.data.certType === 1) {
          if (this.fil.length < 1) {
            this.$message.error('Agregue los archivos necesarios para continuar ')
            return
          }
        } else if (this.data.certType === 2) {
          if (this.fil.length < 2) {
            this.$message.error('Agregue los archivos necesarios para continuar')
            return
          }
        } else if (this.data.certType === 4) {
          if (this.fil.length < 4) {
            this.$message.error('Agregue los archivos necesarios para continuar')
            return
          }
        }
        if (!values.registryData) {
          values.registryData = 'Sin información'
        }
        values.type = this.tipoIdent
        /* this.infoBirth = {
          city: values.cityNacimiento,
          state: values.stateNacimiento,
          country: values.countryNacimiento,
          date: values.fechaNacimiento
        } */
        dateBirth = values.fechaNacimiento
        delete values.cityNacimiento
        delete values.stateNacimiento
        delete values.countryNacimiento
        delete values.fechaNacimiento
        delete values.docCedula
        delete values.docRuc
        delete values.docNombramiento
        delete values.docConstitucion
        delete values.confirm
        delete values.confirmEmpresarial
      } catch (err) {
        this.$message.error('Corrija los datos del formulario para continuar')
        return
      }
      if (values.businessName === 'OTRA') {
        values.businessName = values.businessNameInput
        delete values.businessNameInput
      }

      this.datas = {
        subject: values,
        files: this.fil,
        certificateAuthorization: this.accepted,
        certType: this.data.certType,
        type: this.$store.state.userSendData.certData.type,
        price: this.$store.state.userSendData.certData.total._id,
        duration: this.$store.state.userSendData.certData.duration,
        infoBilling: {
          withSubject: undefined,
          id: undefined,
          idType: undefined,
          name: undefined,
          phone: undefined,
          email: undefined,
          address: undefined,
          cellphone: undefined,
          optionalEmail: undefined,
          city: undefined
        }
      }
      this.datas.subject.dateBirth = dateBirth
      this.datas.infoBilling.withSubject = !this.invoice
      this.datas.infoBilling.id = values.invoiceId
      this.datas.infoBilling.idType = values.invoiceTypeId
      this.datas.infoBilling.name = values.invoiceName
      this.datas.infoBilling.phone = values.invoicePhone
      this.datas.infoBilling.email = values.invoiceEmail
      this.datas.infoBilling.address = values.invoiceAddress
      this.datas.infoBilling.cellphone = values.invoiceCellphone
      this.datas.infoBilling.optionalEmail = values.invoiceOptEmail
      this.datas.infoBilling.city = values.invoiceCity
      this.isLoading = true
      if (!values.invoiceOptEmail) {
        delete this.datas.infoBilling.optionalEmail
      }
      // this.$emit('send', this.datas)
      this.$store.commit('userSendData/addUserInfo', this.datas)
      this.$store.commit('navigation/next')
      this.$message.success('Se agrego correctamente')
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
    showConfirm () {
      this.$confirm({
        title: '¿Está seguro de emitir esta firma electrónica?',
        content: 'Acepto que los datos ingresados son verídicos y fueron revisados a detalle',
        cancelText: 'Cancelar',
        onOk () {
        },
        onCancel () {
        }
      })
    },
    async validatePayment () {
      try {
        const id = this.$route.params.id
        await this.$axios.$post(`/api/executives/anf/correct-payment/${id}`)
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      }
    },
    async getOptions (opt) {
      try {
        if (opt === 'edit') {
          this.options = await this.$axios.$get('/api/anf-requests/get-options')
          const find = this.options.TypesCertificates.find(x => x.id === this.data.certType)
          this.type = find.description
        } else {
          this.options = await this.$axios.$get('/api/anf-requests/user/get-options')
          this.options.TypesCertificates.find(x => x.id === this.data.certType)
        }
      } catch (err) {
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

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
mo-validate-other .dropbox {
  height: 300px;
  width: 300px;
  line-height: 1.5;
}
.juridica {
  overflow-x: hidden;
  max-height: 100vh;
  border-right: 1px solid #e8e8e8;
}
.pads input {
  width: 90%;
  padding: 12px 20px;
  margin: 8px 0;
}

.pads .fecha {
  width: 90%;
}

.pads .fecha input{
  width: 100%;
}
.pads .select {
  width: 90%
}

.drags .ant-upload  {
  width: 95%;
}

.cuado {
  overflow-x: hidden;
  max-height: 200vh;
  border-right: 1px solid #e8e8e8;
}

.docs {
  margin-left:20px;
}
.iner {
  display: inline-block;
  font-size: large;
}
.ant-upload .ant-upload-drag{
  background: springgreen;
}
.ant-advanced-search-form {
  padding: 1px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 1px;
}
@media screen and (max-width: 768px){
  .cuado {
    overflow-x: visible;
    max-height: 100%;
    border-right: 1px solid #ffffff;
  }
}
</style>
