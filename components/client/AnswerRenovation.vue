<template>
  <div>
    <vs-alert v-model="active">
      <template #title>
        Vuesax Framework
      </template>
      <div>
        <div class="grid gap-3 grid-cols-6">
          <p class="col-span-5">
            Vuesax (pronounced / vjusacksː /, as view sacks) is a <b>UI components framework</b>
            created with <a href="https://vuejs.org/">Vuejs</a> to make projects easily and with a
            Unique and pleasant style, Vuesax is created from scratch and designed for all types of
            developed from the frontend lover to the backend that wants to easily create
            your visual approach to the end user
          </p>
          <div class="col-span-1">
            <a-checkbox ></a-checkbox>
          </div>
        </div>
      </div>
    </vs-alert>
  </div>
</template>

<script>
export default {
  name: 'AnswerRenovation',
  data: () => ({
    active: true
  })
}
</script>

<style scoped>

</style>
