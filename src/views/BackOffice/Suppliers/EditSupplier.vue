<template>
  <div class="panel">
    <div class="panel-header">
      <h1>Editar Operador</h1>
      <b-button
        variant="outline-primary"
        size="sm"
        class="float-right"
        @click="editSupplier"
        v-show="isEditable"
      >Editar</b-button>
      <b-button
        variant="success"
        size="sm"
        class="float-right"
        @click="ProcessForm"
        v-show="!isEditable"
      >
        <span v-if="!isRequesting">Salvar</span>
        <div class="loading-dots" v-if="isRequesting">
          <div class="loading-dots--dot"></div>
          <div class="loading-dots--dot"></div>
          <div class="loading-dots--dot"></div>
        </div>
      </b-button>
      <b-button
        variant="outline-danger"
        size="sm"
        class="float-right mr-2"
        @click="showRemoveModal"
      >Remover</b-button>
      <div class="alert alert-success col-md-10" v-if="hadSuccess" role="alert">
        {{hadSuccess}}
      </div>
      <div class="alert alert-danger col-md-10" v-if="hadError" role="alert">
        {{hadError}}
      </div>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-3" >
          <div class="form-group">
            <label for="supplier-name">Nome do Operador</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.name')}"
             name="form.name"
             v-model="form.name"
             id="Supplier-name"
             placeholder="Ex: Winderson Santos"
             :disabled="isEditable"
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
             placeholder="Ex: winderson_santos"
             :disabled="isEditable"
             v-validate="'required'"
             data-vv-as="Nome de Usuario" />
             <span v-show="errors.has('form.username')" class="help is-danger">{{ errors.first('form.username') }}</span>
          </div>
        </div>
        <!-- <div class="col-md-3" >
          <div class="form-group">
            <label for="supplier-password">Senha</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.password')}"
             name="form.password"
             v-model="form.password"
             id="Supplier-password"
             :disabled="isEditable"
             placeholder="*************"
             v-validate="'required'"
             data-vv-as="Senha" />
             <span v-show="errors.has('form.password')" class="help is-danger">{{ errors.first('form.password') }}</span>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { RemoveSupplier } from './helpers/functions.js'

export default {
  props: {
    id: {
      type: String
    }
  },
  data () {
    return {
      form: {},
      hadSuccess: '',
      hadError: '',
      isRequesting: false,
      isEditable: true
    }
  },
  methods: {
    /*
     *  ProcessForm: This method will validate the form using vee-validate
     *  component and then call the action method defined for this view
     *  if everything passes the validation.
     */
    async ProcessForm () {
      this.hadError = ''
      const result = await this.$validator.validateAll()
      return result ? this.UpdateSupplier() : result
    },
    /**
     * GetSupplier: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async GetSupplier () {
      this.isRequesting = true
      try {
        const result = await this.axios.get(`/suppliers/${this.id}`)
        this.form = result.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
      this.isRequesting = false
    },
    /**
     * UpdateSupplier: This method will send form to serve, for update
     */
    async UpdateSupplier () {
      this.isRequesting = true

      try {
        // eslint-disable-next-line no-const-assign
        await this.axios.patch(`/suppliers/${this.id}`)

        this.hadSuccess = 'Informações actualizadas com sucesso.'
      } catch (e) {
        this.hadError =
          'Não foi possível realizar esta operação. Tente novamente'
      }
      this.isRequesting = false
    },
    editSupplier () {
      this.isEditable = false
    },
    RemoveSupplier
  },
  created () {
    this.GetSupplier()
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
