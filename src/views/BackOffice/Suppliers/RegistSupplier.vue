<template>
  <div class="panel">
    <div class="panel-header">
      <h3>Registar Operador</h3>
      <div class="alert alert-danger col-md-10" v-if="hadError" role="alert">
        {{hadError}}
      </div>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Organizadores</label>
            <select class="custom-select" v-model="organizer_id">
              <option disabled value="">Escolhe...</option>
              <option
                :value="organizer.id"
                v-for="(organizer, index) of organizers"
                :key="index"
              >{{organizer.name}}</option>
            </select>
          </div>
        </div>
        <div class="col-md-3" >
          <div class="form-group">
            <label for="supplier-name">Nome do Operador</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.name')}"
             name="form.name"
             v-model="form.name"
             id="Supplier-name"
             placeholder="Ex: Winderson Santos"
             v-validate="'required'"
             data-vv-as="Nome do Produto" />
             <span v-show="errors.has('form.name')" class="help is-danger">{{ errors.first('form.name') }}</span>
          </div>
        </div>
        <div class="col-md-3" >
          <div class="form-group">
            <label for="supplier-username">Nome de Usuario</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.username')}"
             name="form.username"
             v-model="form.username"
             id="Supplier-username"
             placeholder="Ex: 000001"
             v-validate="'required'"
             data-vv-as="Nome de Usuario" />
             <span v-show="errors.has('form.username')" class="help is-danger">{{ errors.first('form.username') }}</span>
          </div>
        </div>
        <div class="col-md-3" >
          <div class="form-group">
            <label for="supplier-password">Senha</label>
            <input type="password"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.password')}"
             name="form.password"
             v-model="form.password"
             id="Supplier-password"
             placeholder="*************"
             v-validate="'required'"
             data-vv-as="Senha" />
             <span v-show="errors.has('form.password')" class="help is-danger">{{ errors.first('form.password') }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-1" >
          <div class="form-group">
            <b-button variant="primary"
            size="sm"
            class="float-left mt-6"
            :disabled="isRequesting ? true : false"
            @click="processForm">
            <span v-if="!isRequesting"> Registar</span>
              <div class="loading-dots" v-if="isRequesting">
                <div class="loading-dots--dot"></div>
                <div class="loading-dots--dot"></div>
                <div class="loading-dots--dot"></div>
              </div>
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      form: {},
      hadError: '',
      isRequesting: false,
      organizer_id: '',
      organizers: []
    }
  },
  methods: {
    /*
     *  processForm: This method will validate the form using vee-validate
     *  component and then call the action method defined for this view
     *  if everything passes the validation.
     */
    async processForm () {
      this.hadError = ''
      const result = await this.$validator.validateAll()
      return result ? this.registSupplier() : result
    },
    /*
     *  RegistOrganizer: This method will create a post request to regist a
     *  new organizer and then redirect to the ListOrganizer component.
     */
    async registSupplier () {
      this.isRequesting = true
      this.form.role = 'ORGANIZER_AGENT'
      try {
        // eslint-disable-next-line no-const-assign
        const result = await this.axios.post(`organizers/${this.organizer_id}/suppliers`, this.form)

        if (result) {
          // Redirect to the Organizer views
          this.$router.push({ name: 'ListSupplier' })
        }
      } catch (e) {
        this.hadError =
          'Não foi possível realizar esta operação. Tente novamente'
      }
      this.isRequesting = false
    },
    async getOrganizers () {
      try {
        const result = await this.axios.get(`/organizers`)
        const res = result.data
        this.organizers = res.data
      } catch (e) {
        this.hadError =
            'Não foi possível carregar as encomendas. Actualize a página.'
      }
    }
  },
  created () {
    this.getOrganizers()
  }
}
</script>
<style scoped>

.form-address {
    display: flex;
    flex-direction: column;
}

.mt-6{
  margin-top: 2.2rem !important;
}

</style>
