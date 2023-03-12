<template>
  <a-row style="margin-bottom: 0.7em;">
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <h1 class="mb-4 text-3xl leading-tight font-bold tracking-tighter">
        {{ title }}
      </h1>
      <h1>Total: {{ pagination ? pagination : '' }}</h1>
    </a-col>
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <div class="flex md:space-between">
        <div class="flex md:w-1/3 justify-end mr-2">
          <div>
            <a-button
              v-if="!hideDefaultInsert && hideButton"
              type="primary"
            >
              <nuxt-link to="insert" append>
                Insertar
              </nuxt-link>
            </a-button>
            <slot v-if="hasCustomOptions" name="custom-options" />
          </div>
        </div>
        <div class="md:w-2/3">
          <a-input
            v-model="filter"
            placeholder="Ingrese el patrón de búsqueda"
            enter-button
            @change="$emit('search', filter)"
          >
            <a-icon slot="prefix" type="search" />
          </a-input>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script>

export default {
  props: {
    title: { type: String, default: '' },
    pagination: { type: Number, default: 0 },
    hasCustomOptions: { type: Boolean, default: false },
    hideDefaultInsert: { type: Boolean, default: false },
  },
  data: () => ({
    filter: '',
  }),
  computed: {
    hideButton () {
      return this.$store.getters['session/getPermissions'](this.$route.name.split('-')[1],
        this.$route.name.split('-')[2], 'insert')
    }
  }
}
</script>
