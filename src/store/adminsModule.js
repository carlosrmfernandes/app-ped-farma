import axios from 'axios'

const Login = async ({ commit }, form) => {
  try {
    const result = await axios.post('/v1/admins/login', form)
    const token = result.data.token
    // Commit data
    commit('SET_ADMIN', result.data)
    // Save data to the localstorage
    localStorage.setItem('box_admin', JSON.stringify(result.data))
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
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + admin.token
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
    localStorage.removeItem('box_admin')
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
     * isSystemAdmin: This getter will check if the user is a system admin.
     *
     * @param {object} state
     * @returns {boolean}
     */
    isSystemAdmin: state => {
      const role = state.user.roles.find(role => role === 'SYSTEM_ADMIN')
      return !!role
    },
    /**
     * isAdmin: This getter will check if the user is an admin.
     *
     * @param {object} state
     * @returns {boolean}
     */
    isAdmin: state => {
      const role = state.user.roles.find(role => role === 'ADMIN')
      return !!role
    }
  },
  mutations: {
    SET_ADMIN (state, user) {
      state.user = user
    }
  },
  actions: {
    Login,
    Logout,
    SetAdmin
  }
}
