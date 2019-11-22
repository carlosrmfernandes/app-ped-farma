<template>
  <div class="container-login">
    <div class="left-side">
      <div class="box-login">
        <div class="box-login-header">
          <img src="../../../assets/box- logo.svg" alt="">
        </div>
        <div class="row errors">
            <div class="alert alert-danger col-md-11" v-if="hadError" role="alert">
              {{hadError}}
            </div>
        </div>
        <div class="box-login-body">
          <div class="row">
            <div class="col-md-12">
              <label for="">Nome de usuario</label>
              <div class="form-group" >
                  <div class="col-md-12">
                    <input type="text"
                    :class="{'form-control': true, 'is-input-danger': errors.has('form.login')}"
                    id="User-login"
                    name="form.login"
                    placeholder="login"
                    v-model="form.login"
                    v-validate="'required'"
                    data-vv-as="Login" />
                  </div>
                    <span v-show="errors.has('form.login')" class="help is-danger">{{ errors.first('form.login') }}</span>
                </div>
            </div>
            <div class="col-md-12" >
                <label for="">Senha</label>
                <div class="form-group" >
                  <div class="col-md-12">
                    <input type="password"
                    :class="{'form-control': true, 'is-input-danger': errors.has('form.password')}"
                    id="User-Password"
                    name="form.password"
                    placeholder="Senha"
                    v-model="form.password"
                    v-validate="'required'"
                    data-vv-as="Senha" />
                  </div>
                    <span v-show="errors.has('form.password')" class="help is-danger">{{ errors.first('form.password') }}</span>
                </div>
            </div>
              <div class="side-login">
                <button class="btn-login" @click="ProcessForm">
                  <span v-if="!isRequesting"> Login</span>
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
        login: '', // "admin",
        password: '' // "WeConnectToOlhaSo2018"
      },
      hadError: ''
    }
  },
  computed: {
    ...mapGetters('Admins', ['isLoggedIn'])
  },
  methods: {
    /*
     * Map all the actions from the Admin module
     */
    ...mapActions('Admins', ['Login']),
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
<style>

.container-login{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* border: 1px solid red; */
  background-color: #1F1F2C;
}

.left-side{
  height: 100vh;
  width: 100%;
  /* border: 1px solid green; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-login{
  width: 500px;
  height: 600px;
  /* border: 1px solid red; */
  background-color: #2E2E40;
  display: flex;
  flex-direction: column;
}
.box-login-header{
  height: 100px;
  border-bottom: 2px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-login-body{
  height: 100px;
  /* border: 1px solid white; */
  flex-grow: 1;
  padding-top: 50px;
}

label{
  color: #fff;
  margin-left: 14px;
}

.side-login{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  padding-right: 30px;
}

.btn-login{
  width:121px;
  height: 37px;
  border-radius: 4px;
  font-size: 16px;
  background-color: #30C9B1;
  color: #212132;
  border: none;
}

.errors{
  margin-right: 0px;
  margin-left: 0px;
  justify-content: center;
  margin-top: 15px;
}
</style>
