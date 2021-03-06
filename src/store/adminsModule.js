import axios from 'axios'

const Login = async ({ commit }, form) => {
  try {
    const result = await axios.post('/login', form)
    const token = result.data.access_token
    // Save data to the localstorage
    localStorage.setItem('app_admin', JSON.stringify(result.data))
    localStorage.setItem('user_token', token)
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + token
    return Promise.resolve(result.data)
  } catch (e) {
    return Promise.reject(e)
  }
}

const SetAdmin = ({ commit }, admin) => {
  commit('SET_ADMIN', admin)
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + admin.access_token
}

/*
 *  Logout: This method will erase all the user information from:
 *  localstorare, current state and the token in the axios headers
 */
const Logout = ({ commit }) => {
  try {
    // Clean the state
    commit('SET_ADMIN', {})
    // Clear the localstorage
    localStorage.removeItem('app_admin')
    localStorage.removeItem('user_token')
    // Clear the auth headers
    axios.defaults.headers.common['Authorization'] = ''
    Promise.resolve(true)
  } catch (e) {
    Promise.reject(e)
  }
}

export default {
  namespaced: true,
  state: {
    user: { roles: [] }
  },
  getters: {
    nameInitials: state => {
      if (state.user.hasOwnProperty('name')) {
        const name = state.user.name.split(' ')
        if (name.length > 1) {
          return name[0][0].toUpperCase() + name[1][0].toUpperCase()
        } else {
          return name[0][0].toUpperCase()
        }
      } else {
        return ''
      }
    },
    isLoggedIn: state => {
      return !!state.user.hasOwnProperty('token')
    }
  },
  mutations: {},
  actions: {
    Login,
    Logout,
    SetAdmin
  }
}
