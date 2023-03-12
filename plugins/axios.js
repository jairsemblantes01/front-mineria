export default ({ store: { state }, app: { $axios }, route: { path } }) => {
  const token = (path => {
    if (path.startsWith('/executive')) {
      return state.session.ExecutiveToken
    } else if (path.startsWith('/banks')) {
      return state.session.BanksToken
    } else if (path.includes('/help') || path.includes('/manager')) {
      return state.session.ClientToken
    } else if (path.startsWith('/administrator')) {
      return state.session.AdministratorToken
    }
  })(path)
  $axios.setToken(token)
}
