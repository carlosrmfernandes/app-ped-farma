import axios from 'axios'

const Login = async ({ commit }, form) => {
  try {
    const result = await axios.post('/login', form)
    const token = result.data.access_token
    // Commit data
    commit('SET_CLIENT', result.data)
    // Save data to the localstorage
    localStorage.setItem('app_client', JSON.stringify(result.data))
    localStorage.setItem('user_token', token)
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + token
    return Promise.resolve(result.data)
  } catch (e) {
    return Promise.reject(e)
  }
}

const SetClient = ({ commit }, client) => {
  commit('SET_CLIENT', client)
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + client.access_token
}

/*
 *  Logout: This method will erase all the user information from:
 *  localstorare, current state and the token in the axios headers
 */
const Logout = ({ commit }) => {
  try {
    // Clean the state
    commit('SET_CLIENT', {})
    // Clear the localstorage
    localStorage.removeItem('app_client')
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
    },
    /**
     * isAdmin: This getter will check if the user is an admin.
     *
     * @param {object} state
     * @returns {boolean}
     */
    isAdmin: state => {
      let isAdmin = JSON.parse(JSON.stringify(state.user))
      return isAdmin.user.is_admin
    }
  },
  mutations: {
    SET_CLIENT (state, user) {
      state.user = user
    }
  },
  actions: {
    Login,
    Logout,
    SetClient
  }
}
