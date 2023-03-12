<template>
  <div>
    <div>
      <h2 v-if="!isDeal">
        <b>Su solicitud se ha ingresado correctamente (paso 1), en el transcurso de los días se realizará el paso 2, para con ello usted realice el paso 3 y paso 4 .</b>
      </h2>
      <h2 v-else>
        Su solicitud se ha ingresado correctamente, la cual será validada por un operador, si los datos son correctos en
        el transcurso del día será emitida la firma electrónica para descarga y uso de la misma.
      </h2>
      <center class="p-5">
        <img :src="isDeal ? fedotaxi ? '/CentroAyuda_3Pasos.jpeg' : convenio ? '/CentroAyuda_convenio.png' : '/CentroAyuda_fast.png' : 'paso-final.png'" width="900px">
        <span class="my-3">Puede ingresar a nuestro <strong>centro de ayuda</strong> dando click
          <a :href="`https://app.firmaselectronicas.ec${fedotaxi ? '/fedotaxi' : convenio ? '/convenio' : fast ? '/fast' : '' }/help/login`" target="_blank"><b>aquí</b></a></span>
      </center>
      <p style="font-size: 18px; text-align: center">
        De acuerdo a su solicitud hemos enviado un correo de registro, revise su bandeja de entrada o en correos no deseados.
        <br>Si no lo recibió, envíenos un correo a soporte.ec@anf.ac.
      </p>
      <p style="font-size: 23px" class="text-center">
        <b>Gracias por utilizar la plataforma de FirmasElectrónicas.ec</b>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isDeal () {
      return this.$route.path.includes('fedotaxi') || this.$route.path.includes('convenio') || this.$route.path.includes('fast')
    },
    fedotaxi () {
      return this.$route.path.includes('fedotaxi')
    },
    convenio () {
      return this.$route.path.includes('convenio')
    },
    fast () {
      return this.$route.path.includes('fast')
    }
  },
  head () {
    return {
      title: 'Fin'
    }
  }
}
</script>

<style scoped>
.image {
  width: 10%;
  height: auto;
}
.text-p {
  text-align: left;
  text-justify: inter-word;
  font-size: 20px;
  margin-bottom: 15px;
  margin-right: 30px;
  margin-left: 30px;
  margin-top: 30px;
}

@media screen and (max-width:768px){
  .image {
    width: 40%;
    height: auto;
    padding: 0px 0px 10px 0px;
  }
}
</style>
