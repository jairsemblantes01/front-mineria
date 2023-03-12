export default async function ({ store, route, redirect }) {
  const { path } = route
  if (path.startsWith('/executive')) {
    if (await store.dispatch('session/checkExecutiveToken')) {
      if (path.includes('/login')) {
        redirect('/executive')
      }
    } else if (!path.includes('/login')) {
      redirect('/executive/login')
    }
  } else if (path.startsWith('/administrator')) {
    if (await store.dispatch('session/checkAdministratorToken')) {
      if (path.includes('/login')) {
        redirect('/administrator')
      }
    } else if (!path.includes('/login')) {
      redirect('/administrator/login')
    }
  }
  else if (path.startsWith('/banks')) {
    if (await store.dispatch('session/checkBanksToken')) {
      if (path.includes('/login')) {
        redirect('/banks')
      }
    } else if (!path.includes('/login')) {
      redirect('/banks/login')
    }
  } else if (path.startsWith('/help') || path.startsWith('/manager')) {
    const redirectPage = '/' + path.split('/')[1]
    if (await store.dispatch('session/checkClientToken', path)) {
      if (path.includes('/login')) {
        redirect(redirectPage)
      }
    } else if (!path.includes('/login')) {
      if (path !== '/') {
        store.commit('session/setPath', route.fullPath.includes('object') ? '/' : route.fullPath)
      }
      redirect(redirectPage + '/login')
    }
  }
}
