<template>
<div>
  <h1 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900">
    Selección de módulos
  </h1>
  <p class="text-lg font-normal text-gray-500 lg:text-xl">
    En esta sección usted puede seleccionar los módulos para la distribuidora, si existen submódulos se pueden seleccionar
    de manera parcial.
  </p>
  <div class="grid grid-cols-2">
    <div v-for="(module, index) in modules" :key="index" :class="module.children && module.children.length > 0 ? 'col-span-2': ''">
      <a-divider v-if="module.children && module.children.length > 0" />
      <h1 class="mt-5 text-xl font-extrabold leading-none tracking-tight text-gray-900">
        <div class="flex" >
          <vs-switch :success="!isIndeterminated(module)" :indeterminate="isIndeterminated(module)" class="mr-5" v-model="module.check" @change="e=>changeSwitch(e.target.checked, module)">
            <template v-if="!isIndeterminated(module)" #off>
              <a-icon slot="unCheckedChildren" type="close" />
            </template>
            <template v-if="!isIndeterminated(module)" #on>
              <a-icon slot="checkedChildren" type="check" />
            </template>
          </vs-switch>
          {{ module.title }}
        </div>
      </h1>
      <div v-if="module.children && module.children.length > 0">
        <div class="ml-10 mt-10 grid grid-cols-4">
          <div v-for="(sub, indexsub) in module.children" :key="indexsub">
            <h1 class="text-md tracking-tight text-gray-900">
              <div class="flex">
                {{ sub.title }}
                <vs-switch success class="ml-5" v-model="sub.check" @change="ev => changeSubCheck(ev.target.checked, module)">
                  <template #off>
                    <a-icon slot="unCheckedChildren" type="close" />
                  </template>
                  <template #on>
                    <a-icon slot="checkedChildren" type="check" />
                  </template>
                </vs-switch>
              </div>
            </h1>
          </div>
        </div>
      </div>
      <a-divider v-if="module.children && module.children.length > 0" />
    </div>
  </div>
</div>
</template>

<script>
import ModulesAdmin from '@/assets/jsons/ModulesAdmin.json'
export default {
  props: {
    value: {
      type: undefined,
      default: undefined
    }
  },
  data: () => ({
    modules: JSON.parse(JSON.stringify(ModulesAdmin))
  }),
  watch: {
    modules: {
      handler(value) {
        this.$emit('input', value)
      },
      deep: true
    },
    value (val) {
      if (val && val.length > 0 && this.modules && this.modules.length > 0) {
          for (const mod of this.modules) {
            const moduleFindinDB = val.find(modDB => modDB.key === mod.key)
            if (moduleFindinDB) {
              mod.check = moduleFindinDB.check
            }
            if (mod.check && mod.children && mod.children.length > 0) {
              for (const submod of mod.children) {
                const subModuleFindinDB = moduleFindinDB.children.find(submodDB => submodDB.key === submod.key)
                if(subModuleFindinDB) {
                  submod.check = subModuleFindinDB.check
                }
              }
            }
          }
        }
    }
  },
  methods: {
    changeSwitch (value, module) {
      if (module.children) {
        module.children.forEach(x => x.check = value)
      }
    },
    changeSubCheck (value, module) {
      if (value) {
        module.check = true
      }
      if(!module.children.some(x => x.check)) {
        module.check = false
      }
    },
    isIndeterminated (module) {
      if (module.children && module.children.some(x => x.check) && module.children.find(x => !x.check)) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>
