<template>
  <div class="h-screen">
    <a-result
      :status="`${ error.statusCode }`"
      :title="`${ error.statusCode }`"
      :sub-title="`${ error.statusCode === 404 ? 'Disculpe, la página solicitada no existe.'
        : 'Ha ocurrido un error, por favor inténtelo de nuevo más tarde' }`"
    >
      <template #extra>
        <a-button type="primary" @click="$router.push('/')">
          Regresar al inicio
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
export default {
  name: 'Error',
  layout: 'error',
  props: ['error']
}
</script>

<style scoped>

</style>
