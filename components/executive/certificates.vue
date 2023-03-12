<template>
  <div>
    <HeaderExecutive title="Certificados" :pagination="pagination.total" hide-default-insert has-custom-options @search="searching">
      <template #custom-options>
        <a-button
          type="primary"
          @click="showModalReport = true"
        >
          Reporte
        </a-button>
      </template>
    </HeaderExecutive>
    <div v-if="activeSelectedRows" class="my-3">
      {{ `Solicitudes seleccionadas: ${selectedRowKeys.length}` }}
    </div>
    <div v-if="hideButtonEdit" style="margin-bottom: 16px">
      <a-tooltip placement="top">
        <template slot="title">
          <span>Reporte de asignaciones</span>
        </template>
        <a-button v-if="isReasigned" class="mr-1" type="primary" icon="file-text" @click="showReportAsignation = true" />
      </a-tooltip>
      <a-tooltip placement="top">
        <template slot="title">
          <span>Reporte de emisiones</span>
        </template>
        <a-button v-if="isEmited" class="mr-1" type="primary" icon="file" @click="showReportEmited = true" />
      </a-tooltip>
      <a-button
        v-show="!emissions && !multipleStatus"
        :loading="loadingEmited"
        @click=" () => {
          activeSelectedRows = !activeSelectedRows
          selectedRowKeys = []
          assignments = !assignments
          emissions = false
          multipleStatus = false
        }"
      >
        {{ !assignments ? 'Activar asignaciones' : 'Desactivar asignaciones' }}
      </a-button>
      <a-button
        v-show="!multipleStatus && !assignments"
        v-if="!typeAnf"
        :loading="loadingEmited"
        @click=" () => {
          activeSelectedRows = !activeSelectedRows
          selectedRowKeys = []
          emissions = !emissions
          multipleStatus = false
          assignments = false
        }"
      >
        {{ !emissions ? 'Activar emisión multiple' : 'Desactivar emisión multiple' }}
      </a-button>
      <a-button
        v-if="$route.name === 'executive'"
        v-show="!emissions && !assignments"
        :loading="loadingEmited"
        @click=" () => {
          activeSelectedRows = !activeSelectedRows
          selectedRowKeys = []
          multipleStatus = !multipleStatus
          emissions = false
          assignments = false
        }"
      >
        {{ !multipleStatus ? 'Activar actualización multiple' : 'Desactivar actualización multiple' }}
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="selectedRowKeys.length > 0 && emissions === false && multipleStatus === false">
          <a-button type="primary" :loading="loadingEmited" @click="modalEntities = true">
            Asignar a operador
          </a-button>
        </template>
        <template v-if="selectedRowKeys.length > 0 && assignments === false">
          <a-button v-if="!typeAnf" type="primary" :loading="loadingEmited" @click="emitCertificates">
            Emitir certificados seleccionados
          </a-button>
        </template>
        <template v-if="selectedRowKeys.length > 0 && emissions === false && multipleStatus === true">
          <a-button v-if="typeAnf" type="primary" :loading="loadingEmited" @click="actualizateCertificates">
            Actualizar certificados
          </a-button>
        </template>
      </span>
    </div>
    <div class="overflow-x-auto">
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="pagination"
        :loading="isLoadingTable"
        :locale="localeTable"
        :row-key="record => record._id"
        bordered
        :row-selection="assignments || emissions || multipleStatus? { selectedRowKeys: selectedRowKeys, onSelect: onSelectChange } : null"
        column-title="Asignaciones"
        :hide-default-selections="true"
        @expand="viewAction"
        @change="changeTable"
      >
        <template slot="distributor" slot-scope="record">
          <div>
            <a-tag :color="record === 'anf-default' || !record ? 'yellow' : 'green'">
              <span>{{ record === 'anf-default' || !record ? 'Firmaselectrónicas.ec' : record.charAt(0).toUpperCase() + record.slice(1) }}</span>
            </a-tag>
          </div>
        </template>
        <template slot="action" slot-scope="record">
          <div>
            <a-tooltip placement="top">
              <template slot="title">
                <span>{{
                  !validate(record) ? "Verificaciones" : "Ver certificado"
                }}</span>
              </template>
              <nuxt-link :to="`showDoc/${record._id}`" append>
                <a-button
                  :type="!validate(record) ? '' : 'danger'"
                  size="small"
                  :icon="!validate(record) ? 'audit' : 'check'"
                />
              </nuxt-link>
            </a-tooltip>

            <template v-if="hideButtonEdit">
              <a-popconfirm
                v-if="record.operatorEc.assigned"
                title="¿Está seguro de reasignar el operador?"
                ok-text="Aceptar"
                cancel-text="Cancelar"
                @confirm="loadEntitie(record._id)"
              >
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>Asignar operador</span>
                  </template>
                  <a-button
                    v-if="record.status <= 2"
                    type="warning"
                    size="small"
                    :loading="isLoading"
                  >
                    <a-icon class="btn" type="user" />
                  </a-button>
                </a-tooltip>
              </a-popconfirm>
              <a-tooltip v-else placement="top">
                <template slot="title">
                  <span>Asignar operador</span>
                </template>
                <a-button
                  type="warning"
                  class="buttons"
                  size="small"
                  :loading="isLoading"
                  @click="loadEntitie(record._id)"
                >
                  <a-icon class="btn" type="user" />
                </a-button>
              </a-tooltip>
              <a-popconfirm
                title="¿Está seguro de emitir este certificado?"
                ok-text="Aceptar"
                cancel-text="Cancelar"
                @confirm="emitCertificate(record._id, false, record.typeRequest)"
              >
                <a-tooltip placement="top">
                  <template slot="title">
                    <span> {{ $route.name === 'executive-fedotaxis' || isFast(record.typeRequest) ? 'Emitir certificado directo' : 'Emitir certificado' }}</span>
                  </template>
                  <a-button
                    v-if="validate(record) && record.status <= 1 && !record.isToken"
                    type="warning"
                    size="small"
                    :loading="isLoading"
                  >
                    <a-icon class="btn" :type="$route.name === 'executive-fedotaxis' || isFast(record.typeRequest)? 'export' : 'to-top'" />
                  </a-button>
                </a-tooltip>
              </a-popconfirm>
              <a-tooltip placement="top">
                <template slot="title">
                  <span>Registrar empresa o firma nuevamente</span>
                </template>
                <a-button
                  v-if="(record.typeRequest !== 'anf' && record.typeRequest !== 'fast') && record.status === 12 && (record.client && !record.client.signature)"
                  :loading="isLoadingUpconta"
                  type="primary"
                  icon="link"
                  size="small"
                  @click="registerBusiness(record._id)"
                />
              </a-tooltip>
              <a-tooltip placement="top">
                <template slot="title">
                  <span>Actualizar estado</span>
                </template>
                <a-button
                  v-if="record.status > 1 && record.status < 8"
                  :loading="isLoadingUpdate"
                  type="primary"
                  icon="sync"
                  size="small"
                  @click="update(record._id)"
                />
              </a-tooltip>
              <a-tooltip placement="top">
                <template slot="title">
                  <span>Editar localizador</span>
                </template>
                <a-button
                  v-if="record.status > 1 && record.status < 8"
                  :loading="isLoadingUpconta"
                  icon="form"
                  size="small"
                  @click="openLocator(record._id)"
                />
              </a-tooltip>
              <a-tooltip placement="top">
                <template slot="title">
                  <span>Refrescar estado de factura</span>
                </template>
                <a-button
                  v-if="record.infoBilling && record.infoBilling.billing && record.infoBilling.billing.number && record.infoBilling.billing.status !== 'issued'"
                  :loading="isLoadingUpconta"
                  type="primary"
                  icon="transaction"
                  size="small"
                  @click="updateUpconta(record._id)"
                />
              </a-tooltip>
              <a-popconfirm
                title="¿Está seguro de reenviar el correo al operador?"
                ok-text="Aceptar"
                cancel-text="Cancelar"
                @confirm="forward(record._id)"
              >
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>Reenviar correo</span>
                  </template>
                  <a-button
                    v-if="record.status === 11"
                    size="small"
                    :loading="isLoading"
                  >
                    <a-icon class="btn" type="mail" />
                  </a-button>
                </a-tooltip>
              </a-popconfirm>
              <a-popconfirm
                title="¿Está seguro que los datos se registraron en AR Manager?"
                ok-text="Aceptar"
                cancel-text="Cancelar"
                @confirm="emitCertificate(record._id, true)"
              >
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>Gestionado en AR Manager</span>
                  </template>
                  <a-button
                    v-if="record.isToken && record.status === 1"
                    size="small"
                    :loading="isLoading"
                  >
                    <a-icon class="btn" type="apartment" />
                  </a-button>
                </a-tooltip>
              </a-popconfirm>
              <a-popconfirm
                v-if="typeAnf && !isFast(record.typeRequest)"
                title="¿Está seguro de regresar el estado de este certificado?"
                ok-text="Aceptar"
                cancel-text="Cancelar"
                @confirm="returStatus(record._id)"
              >
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>Regresar estado</span>
                  </template>
                  <a-button
                    v-if="record.status === 2"
                    size="small"
                  >
                    <a-icon class="btn" type="rollback" />
                  </a-button>
                </a-tooltip>
              </a-popconfirm>
              <a-popconfirm
                v-if="typeAnf && $route.name !== 'executive-fedotaxis' && !isFast(record.typeRequest)"
                title="¿Está seguro de duplicar este certificado?"
                ok-text="Aceptar"
                cancel-text="Cancelar"
                @confirm="openDuplicate(record._id)"
              >
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>Duplicar certificado</span>
                  </template>
                  <a-button
                    v-if="![2,3,4,5].includes(record.status)"
                    size="small"
                    :loading="loadingCopy"
                  >
                    <a-icon type="copy" />
                  </a-button>
                </a-tooltip>
              </a-popconfirm>
              <a-popconfirm
                v-if="record.subject.distributorInfo !== 'APP PROGRESSSERVICES' && (typeAnf || record.typeRequest === 'fast')"
                title="¿Está seguro de volver a facturar este certificado?"
                ok-text="Aceptar"
                cancel-text="Cancelar"
                @confirm="sendBilling(record._id)"
              >
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>Facturar</span>
                  </template>
                  <a-button
                    v-if="record.infoBilling && record.infoBilling.errs && record.infoBilling.errs.length > 0
                      && record.paymentMethod !== 'distributor' && !record.infoBilling.billing && record.duration !== '1'"
                    size="small"
                    :loading="isLoadingBilling"
                  >
                    <a-icon class="btn" type="dollar" />
                  </a-button>
                </a-tooltip>
              </a-popconfirm>
              <a-popconfirm
                v-if="record.subject.distributorInfo !== 'APP PROGRESSSERVICES' && (typeAnf || record.typeRequest === 'fast')"
                title="¿Está seguro de volver a facturar este certificado?"
                ok-text="Aceptar"
                cancel-text="Cancelar"
                @confirm="sendBilling(record._id)"
              >
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>Refacturar</span>
                  </template>
                  <a-button
                    v-if="record.infoBilling && record.infoBilling.errs && record.infoBilling.errs.length > 0
                      && record.paymentMethod !== 'distributor' && !record.infoBilling.billing && record.duration === '1' && record.status === 8"
                    size="small"
                    :loading="isLoadingBilling"
                  >
                    <a-icon class="btn" type="dollar" />
                  </a-button>
                </a-tooltip>
              </a-popconfirm>
              <a-dropdown v-if="record.status === 2 || record.status === 8" :trigger="['click']">
                <a-menu slot="overlay">
                  <a-menu-item v-if="record.status >= 2" key="1">
                    <a-popconfirm
                      title="¿Esta seguro de enviar el correo de insumos?"
                      ok-text="Aceptar"
                      cancel-text="Cancelar"
                      @confirm="sendEmails('insumos', record._id)"
                    >
                      <a-icon type="mail" />Enviar correo de insumos
                    </a-popconfirm>
                  </a-menu-item>
                  <a-menu-item v-if="record.status === 8" key="2">
                    <a-popconfirm
                      title="¿Esta seguro de enviar el correo de calificación?"
                      ok-text="Aceptar"
                      cancel-text="Cancelar"
                      @confirm="sendEmails('calificacion', record._id)"
                    >
                      <a-icon type="mail" />Enviar correo de calificación
                    </a-popconfirm>
                  </a-menu-item>
                </a-menu>
                <a-button :loading="loadMails" size="small">
                  <a-icon type="more" />
                </a-button>
              </a-dropdown>
              <a-button
                v-if="record.errores && record.errores.length > 0"
                style="color: red"
                size="small"
                @click="openErrores(record.errores)"
              >
                <a-icon class="btn" type="warning" />
              </a-button>
            </template>

            <a-tooltip placement="top">
              <template slot="title">
                <span>Eliminar certificado</span>
              </template>
              <a-button
                v-if="record.status < 2 && hideButtonDelete"
                size="small"
                @click="openRemove(record._id)"
              >
                <a-icon class="btn" type="delete" />
              </a-button>
            </a-tooltip>
          </div>
        </template>
        <template slot="expandedRowRender" slot-scope="record">
          <div style="font-size: 12px;">
            <a-row>
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <a-divider orientation="left">
                  Acciones
                </a-divider>
                <a-tooltip>
                  <template slot="title">
                    <span>Ver seguimiento</span>
                  </template>
                  <a-button
                    size="small"
                    :loading="isLoadingRecord"
                    @click="openRecord(record._id)"
                  >
                    Seguimiento
                  </a-button>
                </a-tooltip>
              </a-col>
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <a-divider orientation="left">
                  Validación de correos
                </a-divider>
                <a-row>
                  <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <p>
                      <b>Correo de insumos:</b>
                      <a-icon
                        v-if="record.checkEmails && record.checkEmails.insumos"
                        type="check-circle"
                        theme="twoTone"
                        two-tone-color="#52c41a"
                      />
                      <a-icon
                        v-else
                        type="close-circle"
                        theme="twoTone"
                        two-tone-color="#DC143C"
                      />
                    </p>
                  </a-col>
                  <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <p>
                      <b>Correo de calificación:</b>
                      <a-icon
                        v-if="record.checkEmails && record.checkEmails.calificacion"
                        type="check-circle"
                        theme="twoTone"
                        two-tone-color="#52c41a"
                      />
                      <a-icon
                        v-else
                        type="close-circle"
                        theme="twoTone"
                        two-tone-color="#DC143C"
                      />
                    </p>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>

            <a-divider orientation="left">
              Verificaciones
            </a-divider>
            <a-row>
              <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                <p v-if="record.verification.payment">
                  <b>Pago:</b>
                  <a-icon
                    v-if="record.verification.payment.value === true"
                    type="check-circle"
                    theme="twoTone"
                    two-tone-color="#52c41a"
                  />
                  <a-icon
                    v-else
                    type="close-circle"
                    theme="twoTone"
                    two-tone-color="#ff9933"
                  />
                </p>
              </a-col>
              <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                <p v-if="record.verification.dataProvided">
                  <b>Datos:</b>
                  <a-icon
                    v-if="record.verification.dataProvided.value === true"
                    type="check-circle"
                    theme="twoTone"
                    two-tone-color="#52c41a"
                  />
                  <a-icon
                    v-else
                    type="close-circle"
                    theme="twoTone"
                    two-tone-color="#ff9933"
                  />
                </p>
              </a-col>
              <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                <p v-if="record.verification.videoCall">
                  <b>Llamada:</b>
                  <a-icon
                    v-if="record.verification.videoCall.value === true"
                    type="check-circle"
                    theme="twoTone"
                    two-tone-color="#52c41a"
                  />
                  <a-icon
                    v-else
                    type="close-circle"
                    theme="twoTone"
                    two-tone-color="#ff9933"
                  />
                </p>
              </a-col>
              <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                <p v-if="record.verification.civilRegistration">
                  <b>Registro civil:</b>
                  <a-icon
                    v-if="record.verification.civilRegistration.value === true"
                    type="check-circle"
                    theme="twoTone"
                    two-tone-color="#52c41a"
                  />
                  <a-icon
                    v-else
                    type="close-circle"
                    theme="twoTone"
                    two-tone-color="#ff9933"
                  />
                </p>
              </a-col>
              <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                <p v-if="record.verification.ruc">
                  <b>Ruc:</b>
                  <a-icon
                    v-if="record.verification.ruc.value === true"
                    type="check-circle"
                    theme="twoTone"
                    two-tone-color="#52c41a"
                  />
                  <a-icon
                    v-else
                    type="close-circle"
                    theme="twoTone"
                    two-tone-color="#ff9933"
                  />
                </p>
              </a-col>
              <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
                <p v-if="record.verification.superintendenceCompanies">
                  <b>Super de compañias:</b>
                  <a-icon
                    v-if="
                      record.verification.superintendenceCompanies.value === true
                    "
                    type="check-circle"
                    theme="twoTone"
                    two-tone-color="#52c41a"
                  />
                  <a-icon
                    v-else
                    type="close-circle"
                    theme="twoTone"
                    two-tone-color="#ff9933"
                  />
                </p>
              </a-col>
            </a-row>
            <a-row>
              <a-col v-if="record.status > 1 && record.certificate" :span="24">
                <a-divider orientation="left">
                  Certificado
                </a-divider>
                <div style="text-align: left;">
                  <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <p><b>Localizador: </b>{{ record.certificate.user }}</p>
                  </a-col>
                </div>
              </a-col>
              <a-col v-if="record.subject.distributorInfo !== 'APP PROGRESSSERVICES'" :span="24">
                <a-divider orientation="left">
                  Facturación
                </a-divider>
                <div style="text-align: left;">
                  <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <p>
                      <b>Facturación automatica:</b>
                      <a-icon
                        v-if="record.paymentMethod !== 'distributor'"
                        type="check-circle"
                        theme="twoTone"
                        two-tone-color="#52c41a"
                      />
                      <a-icon
                        v-else
                        type="close-circle"
                        theme="twoTone"
                        two-tone-color="#ff9933"
                      />
                    </p>
                  </a-col>
                  <a-col
                    v-if="record.paymentMethod === 'distributor'"
                    :xs="24"
                    :sm="24"
                    :md="5"
                    :lg="5"
                    :xl="5"
                  >
                    <p>
                      <b>Info. distribuidor:</b> {{ record.verification ? record.verification.payment.observation : '' }}
                    </p>
                  </a-col>
                  <div v-if="record.infoBilling">
                    <div v-if="record.infoBilling.billing">
                      <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                        <p><b>Id: </b>{{ record.infoBilling.billing ? record.infoBilling.billing.id : '' }}</p>
                      </a-col>
                      <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                        <p><b>Número: </b>{{ record.infoBilling.billing ? record.infoBilling.billing.number : '' }}</p>
                      </a-col>
                      <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                        <p><b>Estado: </b>{{ getDescription(record.infoBilling.billing.status, 'TypeStatusUpconta') }}</p>
                      </a-col>
                    </div>
                    <a-col
                      v-if="record.paymentMethod !== 'distributor' || record.subject.distributorInfo === 'APP PROGRESSSERVICES'"
                      :xs="24"
                      :sm="24"
                      :md="6"
                      :lg="6"
                      :xl="6"
                    >
                      <p>
                        <b>Información: </b>
                        <a-tag color="blue" @click="showErrors(record, 'edit')">
                          Ver / Editar
                        </a-tag>
                      </p>
                    </a-col>
                    <div v-if="record.infoBilling.errs">
                      <div v-if="record.infoBilling.errs.length > 0">
                        <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                          <p>
                            <b>Errores: </b>
                            <a-tag color="red" @click="showErrors(record, 'errors')">
                              Existen errores
                            </a-tag>
                          </p>
                        </a-col>
                      </div>
                    </div>
                  </div>
                </div>
              </a-col>
              <a-col v-if="!typeAnf || isFast(record.typeRequest)" :span="24">
                <a-divider orientation="left">
                  Linea de tiempo
                </a-divider>
                <div style="text-align: left;">
                  <a-col :xs="24">
                    <div id="tailtimeline" ref="timelines" style="width: 1200px; overflow-x: auto">
                      <tail-timeline :options="options" :horizontal="true" :movements="record.movements" />
                    </div>
                  </a-col>
                </div>
              </a-col>
            </a-row>
            <a-row v-if="record.webAnf">
              <a-col v-if="record.webAnf.value && record.webAnf.alias" :span="24">
                <a-divider orientation="left">
                  Web Anf
                </a-divider>
                <div style="text-align: left;">
                  <a-col
                    v-if="record.webAnf.alias"
                    :xs="24"
                    :sm="24"
                    :md="6"
                    :lg="6"
                    :xl="6"
                  >
                    <p>
                      <b>Alias:</b>
                      {{ record.webAnf.alias }}
                    </p>
                  </a-col>
                  <a-col
                    v-if="record.webAnf.status"
                    :xs="24"
                    :sm="24"
                    :md="6"
                    :lg="6"
                    :xl="6"
                  >
                    <p>
                      <b>Estado:</b>
                      {{ record.webAnf.status }}
                    </p>
                  </a-col>
                  <a-col
                    v-if="record.webAnf.mailSent"
                    :xs="24"
                    :sm="24"
                    :md="6"
                    :lg="6"
                    :xl="6"
                  >
                    <p>
                      <b>Email enviado:</b>
                      <a-icon
                        v-if="record.webAnf.mailSent"
                        type="check-circle"
                        theme="twoTone"
                        two-tone-color="#52c41a"
                      />
                      <a-icon
                        v-else
                        type="close-circle"
                        theme="twoTone"
                        two-tone-color="#ff9933"
                      />
                    </p>
                  </a-col>
                  <a-col
                    v-if="record.webAnf.centralizedUser"
                    :xs="24"
                    :sm="24"
                    :md="6"
                    :lg="6"
                    :xl="6"
                  >
                    <p>
                      <b>Usuario centralizado:</b>
                      {{ record.webAnf.centralizedUser }}
                    </p>
                  </a-col>
                </div>
              </a-col>
            </a-row>
          </div>
        </template>
        <template slot="ci" slot-scope="record">
          <span :style="record.isToken ? 'color: #32CD32': ''">{{ record.subject.id }}
            <a-icon v-if="record.typeRequest === 'fast'" type="thunderbolt" :style="{ fontSize: '26px', color: '#08c' }" />
          </span>
        </template>
        <template slot="names" slot-scope="record">
          <span :style="record.subject.distributorInfo === 'APP PROGRESSSERVICES' ? 'color: #1890ff': ''">{{ record.subject.name1 + " " + record.subject.surName1 }}</span>
          <a-icon v-if="record.renovated" class="pb-2" type="copy" style="color: green" />
        </template>
        <!-- <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{record.verification}}</p> -->
        <template slot="estado" slot-scope="subject">
          <span>{{ getDescription(subject, 'TypesStatus') }}</span>
        </template>
        <template slot="date" slot-scope="subject">
          <a-tag color="blue">
            {{ getDate(subject) }}
          </a-tag>
        </template>
        <template slot="persons" slot-scope="subject">
          <span>{{ getDescription(subject, 'TypesCertificates') }}</span>
        </template>
        <template slot="duration" slot-scope="subject">
          <strong v-if="subject === '1'"> {{ getDescription(subject, 'DurationAll') }} </strong>
          <span v-else>{{ getDescription(subject, 'DurationAll') }}</span>
        </template>
        <template slot="typeRequest" slot-scope="record">
          <a-tag :color="record === 'fedo' ? 'orange' : 'cyan'">
            {{ record === 'fedo' ? 'FEDOTAXI' : 'CONVENIO' }}
          </a-tag>
        </template>
      </a-table>
    </div>
    <a-modal v-model="showReportAsignation" title="Reporte de asignaciones" :footer="null" width="900px">
      <div class="my-5">
        <table v-if="failed.length > 0" class="simple-table">
          <thead>
            <tr class="table-element text-center">
              <th class="table-element">
                id
              </th>
              <th class="table-element">
                Nombre
              </th>
              <th class="table-element">
                Razón
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in failed" :key="i.id" class="table-element">
              <td class="table-element text-center">
                {{ i.id }}
              </td>
              <td class="table-element text-center">
                {{ i.name }}
              </td>
              <td class="table-element text-center">
                {{ i.reason }}
              </td>
            </tr>
          </tbody>
        </table>
        <a-alert
          v-else
          class="m-5"
          message="No se encontraron errores"
          description="Todas las solicitudes seleccionadas se asignaron sin inconvenientes"
          type="info"
          show-icon
        />
      </div>
    </a-modal>
    <a-modal v-model="showReportEmited" :title="!multipleStatus ? 'Reporte de emisión de solicitudes' : 'Reporte de multiple actualizacion de estado'" :footer="null" width="1300px">
      <div class="my-5">
        <a-button v-if="emitedReport.length > 0" class="my-5" type="primary" @click="exportFile">
          Descargar reporte
        </a-button>
        <table v-if="emitedReport.length > 0" class="simple-table">
          <thead>
            <tr class="table-element text-center">
              <th class="table-element">
                id
              </th>
              <th class="table-element">
                Nombre
              </th>
              <th class="table-element">
                Mensaje
              </th>
              <th class="table-element">
                Estado
              </th>
              <th v-if="typeRequest !== '{$in}anf, fast'" class="table-element">
                RUC
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in emitedReport" :key="i.id" class="table-element">
              <td class="table-element text-center">
                {{ i.id }}
              </td>
              <td class="table-element text-center">
                {{ i.name }}
              </td>
              <td class="table-element text-center">
                {{ i.message }}
              </td>
              <td class="table-element text-center">
                {{ i.status }}
              </td>
              <td v-if="i.ruc" class="table-element text-center">
                {{ i.ruc }}
              </td>
            </tr>
          </tbody>
        </table>
        <a-alert
          v-else
          class="m-5"
          message="No se encontraron errores"
          description="Todas las solicitudes seleccionadas se emitieron correctamente"
          type="info"
          show-icon
        />
      </div>
    </a-modal>
    <a-modal v-model="showModalRecord" title="Seguimiento de solicitud" :footer="null" width="900px">
      <div class="my-5">
        <div id="record" ref="record" style="max-height: 550px;overflow-y: auto; padding-top: 10px">
          <div>
            <a-timeline v-if="recordData && recordData.length > 0" mode="alternate">
              <a-timeline-item v-for="(i, index) in recordData" :key="index">
                <p>{{ `${getformatDate(i._date)} - ${i.id.name}` }}</p>
                <p>{{ i.description }}</p>
              </a-timeline-item>
            </a-timeline>
            <a-alert
              v-else
              class="mb-17"
              message="Información"
              description="Esta solicitud no cuenta con registros de seguimiento."
              type="info"
              show-icon
            />
          </div>
        </div>
        <div class="mt-10">
          <h1>Comentario:</h1>
          <a-textarea v-model="tracing" class="mt-3" placeholder="Ingrese su seguimiento" :rows="3" />
          <div class="mt-3 flex justify-end">
            <a-button type="primary" :disabled="!tracing" :loading="loadingTracing" @click="insertTracing">
              Guardar seguimiento
            </a-button>
          </div>
        </div>
      </div>
    </a-modal>
    <remove-modal
      v-if="showModal"
      :options="optionsModal"
      :type="typeDelete"
      :data="id"
      @close="showModal = false"
      @closes="closeModalsInit('delete')"
    />
    <return-modal v-if="showReturn" :data="id" @closes="closeModalsInit('return')" />
    <entitie-modal
      v-if="modalEntities"
      :requests="selectedRowKeys"
      :data="id"
      @loadFailed="(e) => { failed = e }"
      @closeReport=" () => {
        closeModalsInit('entitie')
        isReasigned = true
      }"
    />
    <report-modal v-if="showModalReport" :data="report" @closeReport="showModalReport = false" />
    <billing-modal v-if="showModalError" :data="errorData" @closeBilling="showModalError = false" @reload="init()" />
    <Locator v-if="showLocator" :id="id" @closes="closeModalsInit('locator')" @close="showLocator = false" />
    <a-modal v-model="showSignErrors" :centered="true">
      <a-list item-layout="horizontal" :data-source="errores">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta>
            <h4 slot="title" style="color: red;">
              {{ item.tipo }}
            </h4>
            <template slot="description">
              <p><strong>Descripción:</strong> {{ item.descripcion }}</p>
              <p><strong>Fecha:</strong> {{ getDate(item.fecha) }}</p>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
      <template slot="footer">
        <a-button key="back" type="primary" @click="showSignErrors = false">
          Cerrar
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import { utils, writeFileXLSX } from 'xlsx'
import Main from '~/assets/mixin-tables'
import RemoveModal from '~/components/executive/delete'
import ReportModal from '~/components/executive/reports'
import EntitieModal from '~/components/executive/entities'
import BillingModal from '~/components/executive/billing'
import Locator from '~/components/executive/locator'
import ReturnModal from '~/components/executive/return-status'
import HeaderExecutive from '@/components/executive/header-executive'

export default {
  components: { Locator, RemoveModal, ReportModal, EntitieModal, BillingModal, ReturnModal, HeaderExecutive },
  mixins: [Main],
  props: {
    typeRequest: {
      type: String,
      default: '{$in}anf, fast'
    }
  },
  data () {
    return {
      multipleReport: false,
      multipleStatus: false,
      loadingEmited: false,
      isEmited: false,
      emitedReport: [],
      showReportEmited: false,
      assignments: false,
      emissions: false,
      errores: [],
      showSignErrors: false,
      loadingTracing: false,
      tracing: '',
      isLoadingRecord: false,
      recordData: [],
      showModalRecord: false,
      isReasigned: false,
      failed: [],
      showReportAsignation: false,
      activeSelectedRows: false,
      endpoint: '/api/executives/anf',
      showCoupon: false,
      params: {
        $fields: 'verification movements subject operatorEc { assigned { name id _id } record } _date certType duration status certificate { user } ' +
          'paymentMethod infoBilling webAnf duration isToken products renovated checkEmails client { signature lote } typeRequest errores distributor',
        status: '{$gte}0',
        typeRequest: this.typeRequest
      },
      report: {
        title: 'Reporte de certificados',
        type: 'all',
        states: []
      },
      showLocator: false,
      showModalReport: false,
      types: {},
      optionsModal: [],
      isLoading: false,
      isLoadingReturn: false,
      selectedRowKeys: [],
      typeDelete: 'delete',
      isLoadingUpdate: false,
      isLoadingUpconta: false,
      isLoadingEmail: false,
      isLoadingBilling: false,
      loadingCopy: false,
      data: [],
      id: '',
      filters: [],
      showModal: false,
      showModalError: false,
      showReturn: false,
      errorData: {},
      modalEntities: false,
      administrator: false,
      entities: [],
      loadMails: false,
    }
  },
  head () {
    return {
      title: 'Inicio'
    }
  },
  computed: {
    columns () {
      const columns = [
        {
          title: 'Identificacion',
          key: 'ci',
          scopedSlots: { customRender: 'ci' }
        },
        {
          title: 'Nombres',
          dataIndex: '',
          key: 'names',
          scopedSlots: { customRender: 'names' }
        },
        {
          title: 'Tipo persona',
          dataIndex: 'certType',
          key: 'persons',
          width: 140,
          scopedSlots: { customRender: 'persons' }
        },
        {
          title: 'Duración',
          dataIndex: 'duration',
          key: 'duration',
          scopedSlots: { customRender: 'duration' }
        },
        {
          title: 'Empresa',
          dataIndex: 'subject.businessName',
          key: 'businessName',
          width: 150,
          scopedSlots: { customRender: 'businessName' }
        },
        {
          title: 'Fecha',
          dataIndex: '_date',
          key: 'date',
          width: 80,
          scopedSlots: { customRender: 'date' }
        },
        {
          title: 'Estado',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'estado' },
          filterMultiple: false,
          width: 160,
          filters: this.states
        },
        {
          title: 'Operador',
          dataIndex: 'operatorEc.assigned.name',
          key: 'operatorEc.assigned.id',
          scopedSlots: { customRender: 'operatorEc.assigned' },
          filterMultiple: false,
          filters: this.entities
        },
        {
          title: 'Origen',
          dataIndex: 'distributor',
          key: 'distributor',
          scopedSlots: { customRender: 'distributor' },
        },
        {
          title: 'Opciones',
          dataIndex: '',
          key: 'x',
          scopedSlots: { customRender: 'action' },
          align: 'center'

        }
      ]
      if (!this.typeAnf) {
        columns.splice(3, 1)
        columns.splice(3, 1, {
          title: 'Lote',
          dataIndex: 'client.lote',
          key: 'lote',
          width: 150,
          scopedSlots: { customRender: 'lote' }
        })
        columns.splice(4, 0, {
          title: 'Tipo',
          dataIndex: 'typeRequest',
          key: 'typeRequest',
          width: 80,
          scopedSlots: { customRender: 'typeRequest' },
        })
      }
      return columns
    },
    typeAnf () {
      return (this.typeRequest.includes('anf')) || ''
    },
    hideButtonDelete () {
      return this.$store.getters['session/getPermissions'](this.$route.name.split('-')[1],
        this.$route.name.split('-')[2], 'delete')
    },
    hideButtonEdit () {
      return this.$store.getters['session/getPermissions'](this.$route.name.split('-')[1],
        this.$route.name.split('-')[2], 'edit')
    },
  },
  watch: {
    states (val) {
      this.report.states = val
    }
  },
  mounted () {
    // this.report.states = this.states
    this.administrator = this.$store.state.session.ExecutiveData.administrator
    this.getEntities()
    // setTimeout(() => { this.report.states = this.states }, 300)
  },
  methods: {
    async actualizateCertificates () {
      this.loadingEmited = true
      try {
        this.emitedReport = await this.$axios.$post('/api/executives/anf/multiple-update', { certificates: this.selectedRowKeys })
        this.isEmited = true
        this.selectedRowKeys = []
        this.multipleStatus = true
        this.init()
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Ha ocurrido un error',
          content: message,
          okText: 'Aceptar'
        })
      } finally {
        this.loadingEmited = false
      }
    },
    isFast (type) {
      return type === 'fast'
    },
    exportFile () {
      const ws = utils.json_to_sheet(this.emitedReport)
      const wb = utils.book_new()
      utils.book_append_sheet(wb, ws, 'Data')
      writeFileXLSX(wb, this.multipleStatus ? 'reporte de multiple actualización de estado.xlsx' : 'reporte de emisiones fallidas.xlsx')
    },
    async emitCertificates () {
      this.loadingEmited = true
      try {
        this.emitedReport = await this.$axios.$post('/api/clients/multiple-emit', { certificates: this.selectedRowKeys })
        this.isEmited = true
        this.selectedRowKeys = []
        this.multipleStatus = false
        this.init()
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Ha ocurrido un error',
          content: message,
          okText: 'Aceptar'
        })
      } finally {
        this.loadingEmited = false
      }
    },
    viewAction (e) {
      if (e && !this.typeAnf) {
        setTimeout(() => {
          const refline = this.$refs.timelines
          refline.scrollLeft = '9999'
        }, 500)
      }
    },
    openErrores (errores) {
      this.errores = errores
      this.showSignErrors = true
    },
    async registerBusiness (id) {
      try {
        this.isLoadingUpconta = true
        await this.$axios.$post(`/api/anf-requests/register-complete-business-upconta/${id}`)
        this.$message.success(`Se envió correctamente la notificación por correo`)
        this.init()
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Ha ocurrido un error',
          content: message,
          okText: 'Aceptar'
        })
      } finally {
        this.isLoadingUpconta = false
      }
    },
    async sendEmails (type, id) {
      try {
        this.loadMails = true
        await this.$axios.$post(`/api/executives/anf/send-emails/${id}?type=${type}`)
        this.$message.success(`Se envió correctamente la notificación por correo`)
        this.init()
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Ha ocurrido un error',
          content: message,
          okText: 'Aceptar'
        })
      } finally {
        this.loadMails = false
      }
    },
    async insertTracing () {
      try {
        this.loadingTracing = true
        this.recordData = await this.$axios.$post(`/api/executives/anf/insert-operator-record/${this.id}`, {
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
    getformatDate (date) {
      return moment(date).format('DD-MM-YYYY HH:mm')
    },
    async openRecord (id) {
      try {
        this.id = id
        this.isLoadingRecord = true
        this.recordData = await this.$axios.$get(`/api/executives/anf/get-operator-record/${id}`) || []
        this.showModalRecord = true
        this.isLoadingRecord = false
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        this.$error({
          title: 'Ha ocurrido un error',
          content: message,
          okText: 'Aceptar'
        })
      } finally {
        this.isLoadingRecord = false
      }
    },
    onSelectChange (record) {
      if (this.assignments) {
        if (this.selectedRowKeys.includes(record._id)) {
          this.selectedRowKeys.splice(this.selectedRowKeys.indexOf(record._id), 1)
        } else if (record.status <= 2) {
          if (record.operatorEc && record.operatorEc.assigned) {
            this.$message.info('El certificado ya tiene un operador asignado, si continua el operador sera reasignado')
          }
          this.selectedRowKeys.push(record._id)
        } else {
          this.$message.error('No se puede seleccionar un certificado en ese estado')
        }
      }

      if (this.emissions) {
        if (record.status !== 12) {
          if (this.selectedRowKeys.includes(record._id)) {
            this.selectedRowKeys.splice(this.selectedRowKeys.indexOf(record._id), 1)
          } else if (record.operatorEc && !record.operatorEc.assigned) {
            this.$message.error('El certificado no tiene un operador asignado')
          } else {
            this.selectedRowKeys.push(record._id)
          }
        } else {
          this.$message.error('No se puede seleccionar el certificado en ese estado')
        }
      }

      if (this.multipleStatus) {
        // if (record.status > 1 && record.status < 8) {
        if (true) {
          if (this.selectedRowKeys.includes(record._id)) {
            this.selectedRowKeys.splice(this.selectedRowKeys.indexOf(record._id), 1)
          } else {
            this.selectedRowKeys.push(record._id)
            this.$message.success('Seleccionado correctamente')
          }
        } else {
          this.$message.error('No se puede seleccionar el certificado en ese estado')
        }
      }
    },
    openDuplicate (id) {
      this.id = id
      this.showModal = true
      this.optionsModal = this.options.Duration
      this.typeDelete = 'duplicate'
    },
    openLocator (id) {
      this.showLocator = true
      this.id = id
    },
    returStatus (id) {
      this.id = id
      this.showReturn = true
    },
    showErrors (record, type) {
      this.showModalError = true
      this.errorData.billing = record.infoBilling
      this.errorData.subject = record.subject
      this.errorData.options = this.options.TypeIdUpconta
      this.errorData._id = record._id
      this.errorData.type = type
    },
    closeModalsInit (modal) {
      switch (modal) {
      case 'coupon':
        this.showCoupon = false
        break
      case 'delete':
        this.showModal = false
        break
      case 'entitie':
        this.modalEntities = false
        this.selectedRowKeys = []
        break
      case 'locator':
        this.showLocator = false
        break
      default:
        this.showReturn = false
        break
      }
      this.init()
    },
    async sendBilling (id) {
      this.isLoadingBilling = true
      try {
        await this.$axios.$post(`/api/executives/anf/retry-billing/${id}`)
        this.init()
        this.$message.success('Se envio solicitud de facturación correctamente')
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      } finally {
        this.isLoadingBilling = false
        this.init()
      }
    },
    async getEntities () {
      try {
        const { data } = await this.$axios.$get('/api/executives/operators', {
          params: {
            $fields: 'name id',
            $limit: 50
          }
        })
        for (const x of data) {
          const data = {
            value: x.id,
            text: x.name
          }
          this.entities.push(data)
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
    },
    loadEntitie (id) {
      if (id) {
        this.selectedRowKeys.push(id)
      } else {
        this.selectedRowKeys = []
      }
      this.activeSelectedRows = false
      this.modalEntities = true
    },
    openRemove (id) {
      this.typeDelete = 'delete'
      this.id = id
      this.showModal = true
    },
    ediCoupon (id) {
      this.id = id
      this.showCoupon = true
    },
    async update (id) {
      this.isLoadingUpdate = true
      try {
        await this.$axios.$get(`/api/executives/anf/check-status/${id}`)
        this.init()
        this.$message.success('Se actualizo el estado correctamente')
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      } finally {
        this.isLoadingUpdate = false
      }
    },
    async updateUpconta  (id) {
      this.isLoadingUpconta = true
      try {
        await this.$axios.$get(`/api/executives/anf/check-status-upconta/${id}`)
        this.init()
        this.$message.success('Se actualizo el estado correctamente')
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      } finally {
        this.isLoadingUpconta = false
      }
    },
    async forward (id) {
      this.isLoadingEmail = true
      try {
        await this.$axios.$get(`/api/executives/anf/forward-mail/${id}`)
        this.$message.success('Se envió el correo correctamente')
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      } finally {
        this.isLoadingEmail = false
      }
    },
    async deleteCert (id) {
      this.isLoading = true
      try {
        await this.$axios.$delete(`/api/executives/anf/remove-certificate/${id}`)
        this.init()
        this.$message.success('Se eliminó correctamente')
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
    async emitCertificate (id, spain = false, type) {
      this.isLoading = true
      try {
        if (this.$route.name === 'executive-convenios' || type === 'fast') {
          const resp = await this.$axios.$post(`/api/executives/anf/signatures/emit-signature/${id}`)
          if (resp && resp.errores && resp.errores.length > 0) {
            this.$error({
              title: 'Ha ocurrido un error',
              content: `${resp.errores[resp.errores.length - 1].tipo} :: ${resp.errores[resp.errores.length - 1].descripcion}`,
              okText: 'Aceptar'
            })
            this.init()
          } else {
            await this.init()
            if (spain) {
              this.$message.success('Se cambió correctamente el estado')
            } else {
              this.$message.success('Se emitió correctamente')
            }
          }
        } else {
          await this.$axios.$post(`/api/executives/anf/${id}`)
        }
      } catch (err) {
        const message = err.response ? err.response.data.message : err.message
        const code = err.response ? err.response.data.typeCode : ' '
        this.$error({
          title: 'Ha ocurrido un error',
          content: `${code} :: ${message}`,
          okText: 'Aceptar'
        })
      } finally {
        this.init()
        this.isLoading = false
      }
    },
    validate (record) {
      if (record.certType === 1 || record.certType === 3) {
        if (record.verification.civilRegistration.value && record.verification.dataProvided.value && record.verification.videoCall.value && record.verification.payment.value) {
          return true
        }
      } else if (record.certType === 2) {
        return record.verification.civilRegistration.value && record.verification.dataProvided.value && record.verification.videoCall.value && record.verification.ruc.value
      } else if (record.certType === 4) {
        return record.verification.civilRegistration.value && record.verification.dataProvided.value && record.verification.videoCall.value && record.verification.ruc.value && record.verification.superintendenceCompanies.value
      }
    },
    toFile (value) {
      const type = this.detectMimeType(value)
      const file = this.dataURLtoFile(`data:${type};base64,${value},'im'`)
      return file
    },
    searching (value) {
      this.filter = value
      this.doFilter()
    },
  }
}
</script>

<style scoped>
.line {
  display: inline-block;
  width: 100%;
}
.element {
  display: inline-block;
  width: 24%;
}
.element-input {
  width: 75%;
  display: inline-block;
}

.table-element {
  border:1px solid black;
}
.simple-table {
  border-collapse:collapse;
  width:100%;
}

</style>
