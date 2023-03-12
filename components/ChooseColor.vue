<template>
  <vs-dialog v-model="active" not-padding width="900px" @close="$emit('close')">
    <div class="mx-5 mt-5">
      <h1 class="text-2xl font-bold mb-4">
        Elija su color
      </h1>
      <client-only class="pb-10">
        <div class="mb-10 wallpaper mt-10" :style="`background: ${colors.hex}`" />
        <a-row class="wallpaper-container pt-10">
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <Swatches
              v-model="colors"
              style="height: 550px"
              class="mt-5"
              :preset-colors="[
                '#f00', '#00ff00', '#00ff0055', 'rgb(201, 76, 76)', 'rgba(0,0,255,1)', 'hsl(89, 43%, 51%)', 'hsla(89, 43%, 51%, 0.6)'
              ]"
            />
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <Sketch
              v-model="colors"
              :preset-colors="[
                '#f00', '#00ff00', '#00ff0055', 'rgb(201, 76, 76)', 'rgba(0,0,255,1)', 'hsl(89, 43%, 51%)', 'hsla(89, 43%, 51%, 0.6)'
              ]"
            />
            <Slider
              v-model="colors"
              class="mt-10"
              style="width: 100%"
              :preset-colors="[
                '#f00', '#00ff00', '#00ff0055', 'rgb(201, 76, 76)', 'rgba(0,0,255,1)', 'hsl(89, 43%, 51%)', 'hsla(89, 43%, 51%, 0.6)'
              ]"
            />
            <Twitter
              v-model="colors"
              class="mt-5"
              :preset-colors="[
                '#f00', '#00ff00', '#00ff0055', 'rgb(201, 76, 76)', 'rgba(0,0,255,1)', 'hsl(89, 43%, 51%)', 'hsla(89, 43%, 51%, 0.6)'
              ]"
            />
            <div class="flex justify-end mt-14">
              <a-button
                style="width: 200px;"
                class="mt-5"
                type="primary"
                @click="saveColor()"
              >
                Guardar
              </a-button>
            </div>
          </a-col>
        </a-row>
      </client-only>
    </div>
  </vs-dialog>
</template>

<script>
import {
  Sketch,
  Twitter,
  Slider,
  Swatches,
} from 'vue-color'

export default {
  components: {
    Sketch,
    Twitter,
    Slider,
    Swatches,
  },
  props: {
    idColor: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      active: true,
      colors: {}
    }
  },
  mounted () {
    if (this.idColor) {
      this.colors = {
        hex: this.idColor
      }
    }
  },
  methods: {
    saveColor () {
      this.$store.commit(`theme/set${this.type}`, this.colors.hex)
      this.$emit('saveTheme', { color: this.colors.hex, type: this.type })
      this.$emit('closeChooseColorModal')
    }

  }
}
</script>

<style>
.wallpaper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: 200px;
  background-color: #333;
  z-index: 0;
}
.wallpaper-container {
  max-width: 780px;
  min-height: 650px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}
</style>
