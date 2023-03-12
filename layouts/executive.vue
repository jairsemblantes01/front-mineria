<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible collapsed-width="0" style="width: 500px">
      <div class="logo" />
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="1">
          <nuxt-link to="/executive">
            <a-icon type="desktop" />
            <span>Usuarios</span>
          </nuxt-link>
        </a-menu-item>

        <a-menu-item key="30">
          <nuxt-link to="/executive/deletes">
            <a-icon type="delete" />
            <span>
              Otros
            </span>
          </nuxt-link>
        </a-menu-item>
        <!--<a-sub-menu key="sub2">
          <span slot="title"><a-icon type="undo" /><span>Renovaciones</span></span>
          <a-menu-item key="7">
            <nuxt-link to="/executive/renovations/load-information">
              <span>Cargar de información</span>
            </nuxt-link>
          </a-menu-item>
          <a-menu-item key="8">
            <nuxt-link to="/executive/renovations/clients">
              <span>Clientes ingresados</span>
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>-->
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <div :class="['global-header-right']">
          <div class="avatar">
            <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial" placement="bottomCenter">
              <span style="cursor: pointer">
                <a-icon type="user" />
                <span>Administrador</span>
              </span>
              <a-menu slot="overlay" style="width: 150px">
                <a-menu-item>
                  <nuxt-link to="/executive/config">
                    <a-icon type="setting" />
                    <span>Configuracion</span>
                  </nuxt-link>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item @click="logout">
                  <a-icon type="poweroff" />
                  <span>Cerrar sesion</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content class="app-content">
        <main>
          <div class="content-nuxt">
            <nuxt />
          </div>
        </main>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Universidad central del Ecuador Grupo 11 - Mineria de datos ©2023
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>

export default {
  data () {
    return {
      collapsed: true
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('session/executiveLogout')
      await this.$router.push({ path: '/executive/login' })
    }
  }
}
</script>

<style>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.content-nuxt{
  padding: 0px;
  background: #fff;
  min-height: 360px;
}
#components-layout-demo-side .logo {
  height: 5px;
  background: #001529;
  margin: 16px;
}
.app-content {
  margin: 30px;
  padding: 30px;
  background: #fff;
  border-radius: 5px;
}
.global-header-right {
  float: right;
}
.avatar {
  margin: 1px 20px 14px 10px;
  color: coral;
  background: hsla(0, 0%, 100%, 0.85);
  vertical-align: middle;
}
@media screen and (max-width: 768px){
  .app-content {
    margin: 10px;
    padding: 30px;
    background: #fff;
    border-radius: 5px;
  }
}
</style>
