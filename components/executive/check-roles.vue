<template>
  <div class="mt-6">
    <vs-table striped>
      <template #thead>
        <vs-tr>
          <vs-th />
          <vs-th>
            Módulo
          </vs-th>
          <vs-th>
            Insertar
          </vs-th>
          <vs-th>
            Editar
          </vs-th>
          <vs-th>
            Eliminar
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          v-for="(mod, index) in modules.filter(x => !x.children)"
          :key="index"
        >
          <vs-td>
            <a-checkbox v-model="mod.check" @change="ev => changeSwitch(ev, mod)"/>
          </vs-td>
          <vs-td>
            {{ mod.title }}
          </vs-td>
          <vs-td>
            <vs-switch v-model="mod.permissions" class="w-1/3" :disabled="!mod.check" val="insert" />
          </vs-td>
          <vs-td>
            <vs-switch v-model="mod.permissions" class="w-1/3" :disabled="!mod.check" val="edit" />
          </vs-td>
          <vs-td>
            <vs-switch v-model="mod.permissions" class="w-1/3" :disabled="!mod.check" val="delete" />
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <div v-for="(mod, index) in modules.filter(x => x.children && x.children.length > 0)" :key="index">
      <h3 class="mb-4 mt-6 text-xl font-medium text-gray-900">
        {{ mod.title }}
      </h3>
      <vs-table striped>
        <template #thead>
          <vs-tr>
            <vs-th>
              <a-checkbox v-model="mod.check" :indeterminate="isIndeterminated(mod)" @change="e=>checkAll(e.target.checked, mod)" />
            </vs-th>
            <vs-th>
              Módulo
            </vs-th>
            <vs-th>
              Insertar
            </vs-th>
            <vs-th>
              Editar
            </vs-th>
            <vs-th>
              Eliminar
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            v-for="(sub, indexSub) in mod.children"
            :key="indexSub"
          >
            <vs-td>
              <a-checkbox v-model="sub.check" @change="ev => changeSubCheck(ev.target.checked, mod, sub)" />
            </vs-td>
            <vs-td>
              {{ sub.title }}
            </vs-td>
           <template v-if="reset">
             <vs-td>
               <vs-switch val="insert" class="w-1/3" v-model="sub.permissions" :disabled="!sub.check" />
             </vs-td>
             <vs-td>
               <vs-switch val="edit" class="w-1/3" v-model="sub.permissions" :disabled="!sub.check" />
             </vs-td>
             <vs-td>
               <vs-switch val="delete" class="w-1/3" v-model="sub.permissions" :disabled="!sub.check" />
             </vs-td>
           </template>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import SwitchRoles from "~/components/executive/Roles/switch-roles";
export default {
  components: {SwitchRoles},
  props: {
    value: {
      type: undefined,
      default: undefined
    },
    dataModule: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    modules: [],
    isCreated: false,
    reset: true
  }),
  watch: {
    modules: {
      handler (value) {
        if (this.isCreated && this.modules && this.modules.length > 0) {
          this.$emit('update:data-module', value)
        }
      },
      deep: true
    },
  },
  mounted () {
      if (this.dataModule && this.dataModule.length > 0 && this.modules && this.modules.length > 0) {
        for (const mod of this.modules) {
          const moduleFindinDB = this.dataModule.find(modDB => modDB.key === mod.key)
          if (moduleFindinDB) {
            mod.check = true
            mod.permissions = moduleFindinDB.permissions
          }
          if (mod.check && mod.children && mod.children.length > 0) {
            for (const submod of mod.children) {
              const subModuleFindinDB = moduleFindinDB.children.find(submodDB => submodDB.key === submod.key)
              if (subModuleFindinDB) {
                submod.check = true
                submod.permissions = subModuleFindinDB.permissions
              }
            }
          }
        }
      }
  },
  created () {
    this.modules = JSON.parse(JSON.stringify(this.$store.state.session.ExecutiveData.modules))
    for (const mod of this.modules) {
      mod.check = false
      mod.permissions = []
      if (mod.children && mod.children.length > 0) {
        for (const sub of mod.children) {
          sub.check = false
          sub.permissions = []
        }
      }
    }
    this.isCreated = true
  },
  methods: {
    checkAll (value, module) {
      for (const sub of module.children) {
        sub.check = value
        if (!sub.check) {
          this.reset = false
          sub.permissions = []
          setTimeout(() => {
            this.reset = true
          }, 0.0000001)
        }
      }
    },
    changeSwitch(value, module) {
      if (value) {
        module.permissions = []
      }
    },
    changeSubCheck (value, module, sub) {
      if (value) {
        module.check = true
      }
      if (!sub.check) {
        this.reset = false
        sub.permissions = []
        setTimeout(() => {
          this.reset = true
        }, 0.0000001)
      }
    },
    isIndeterminated (module) {
      if (module.children && module.children.some(x => x.check) && module.children.find(x => !x.check)) {
        return true
      }
      return false
    },
  }
}
</script>

<style scoped>
</style>
