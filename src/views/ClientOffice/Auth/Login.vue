<template>
  <div class="container-login">
    <div class="container-lg">
      <div class="box-login">
        <div class="box-login-header">
          <span>Login do Cliente</span>
        </div>
        <div class="row errors">
          <div class="alert alert-danger col-md-11" v-if="hadError" role="alert">{{hadError}}</div>
        </div>
        <div class="box-login-body">
          <div>
            <div class="col">
              <label for>Email</label>
              <div class="form-group">
                <div class="col-md-12">
                  <input
                    type="text"
                    :class="{'is-input-danger': errors.has('form.email')}"
                    id="User-Email"
                    name="form.email"
                    placeholder="email"
                    v-model="form.email"
                    v-validate="'required|email'"
                    data-vv-as="Email"
                  />
                </div>
                <span
                  v-show="errors.has('form.email')"
                  class="help is-danger"
                >{{ errors.first('form.email') }}</span>
              </div>
            </div>
            <div class="col">
              <label for>Senha</label>
              <div class="form-group">
                <div class="col-md-12">
                  <input
                    type="password"
                    :class="{'is-input-danger': errors.has('form.password')}"
                    id="User-Password"
                    name="form.password"
                    placeholder="Senha"
                    v-model="form.password"
                    v-validate="'required'"
                    data-vv-as="Senha"
                  />
                </div>
                <span
                  v-show="errors.has('form.password')"
                  class="help is-danger"
                >{{ errors.first('form.password') }}</span>
              </div>
            </div>
            <div class="col side-login">
              <button class="btn-login success" @click="ProcessForm">
                <span v-if="!isRequesting">Login</span>
                <div class="loading-dots" v-if="isRequesting">
                  <div class="loading-dots--dot"></div>
                  <div class="loading-dots--dot"></div>
                  <div class="loading-dots--dot"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      isRequesting: false,
      form: {
        email: '', // "admin",
        password: '' // "WeConnectToOlhaSo2018"
      },
      hadError: ''
    }
  },
  computed: {
    ...mapGetters('Clients', ['isLoggedIn'])
  },
  methods: {
    /*
     * Map all the actions from the Admin module
     */
    ...mapActions('Clients', ['Login']),
    /*
     * ProcessForm: This method will validate the DoLogin() method
     */
    async ProcessForm () {
      const result = await this.$validator.validateAll()
      return result ? this.DoLogin() : result
    },
    /*
     * DoLogin: This method will execute the Login function from the
     * Admin module in vuex store.
     */
    async DoLogin () {
      this.isRequesting = true
      try {
        await this.Login(this.form)
        this.$router.push({ name: 'Dashboard' })
      } catch (err) {
        this.HangleLoginErrors(err)
      }
      this.isRequesting = false
    },
    /**
     * HangleLoginErrors: It is a helper method that will
     * handle all the errors regarding the Login method.
     */
    HangleLoginErrors (error) {
      // Error messages
      const defaultErrorMessage = `Não foi possível realizar esta operação.`
      const notFoundError = `Conta não encontrada.`
      const wrongPasswordError = `Verifique os seus dados de autenticação.`

      // Check for the error response if there's any
      if (error.response) {
        switch (error.response.status) {
          case 404:
            this.hadError = notFoundError
            break
          case 401:
            this.hadError = wrongPasswordError
            break
          default:
            this.hadError = defaultErrorMessage
        }
      } else {
        this.hadError = defaultErrorMessage
      }
    }
  },
  created () {
    // Check if the user is logged in, if so, redirect to the
    // admin area: Dashboard.
    if (this.isLoggedIn) {
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>
<style scoped></style>
