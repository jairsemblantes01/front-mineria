module.exports = {
  name: 'NuxtAppName',
  exec_mode: 'cluster',
  instances: '5', // Or a number of instances
  script: './node_modules/nuxt/bin/nuxt.js',
  args: 'start'
}
