<template>
  <div class="panel">
    <div class="panel-header">
      <h1>Editar Contrato</h1>
       <b-button
        variant="outline-primary"
        size="sm"
        class="float-right"
        @click="editContract"
        v-show="isEditable"
      >Editar</b-button>
      <b-button
        variant="success"
        size="sm"
        class="float-right"
        @click="UpdateContract"
        v-show="!isEditable"
      >
        <span v-if="!isRequesting">salvar</span>
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
      <h4>Subcontrato do Evento</h4>
      <div class="row grid-divider">
         <div class="col-md-3">
          <div class="form-group">
            <label for="contract-percentage">Percentagem do Box</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.event_sub_contract.box_payments_percentage')}"
             name="form.event_sub_contract.box_payments_percentage"
             v-model="form.event_sub_contract.box_payments_percentage"
             id="Organizer-Twitter"
             placeholder="0%"
             :disabled="isEditable"
             v-validate="'required'"
             data-vv-as="Percentagem de Pagamento do Box" />
             <span v-show="errors.has('form.event_sub_contract.box_payments_percentage')" class="help is-danger">{{ errors.first('form.event_sub_contract.box_payments_percentage') }}</span>
          </div>
        </div> <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Percentagem de Pagamento do Getawey</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.event_sub_contract.payment_gateway_percentage')}"
             name="form.event_sub_contract.payment_gateway_percentage"
             v-model="form.event_sub_contract.payment_gateway_percentage"
             id="Organizer-Twitter"
             placeholder="0%"
             :disabled="isEditable"
             v-validate="'required'"
             data-vv-as="Percentagem do Pagamneto Getawey" />
             <span v-show="errors.has('form.event_sub_contract.payment_gateway_percentage')" class="help is-danger">{{ errors.first('form.event_sub_contract.payment_gateway_percentage') }}</span>
          </div>
        </div>
      </div>
      <h4>Subcontrato do Pagamento</h4>
      <div class="row grid-divider">
         <div class="col-md-3">
          <div class="form-group">
            <label for="contract-percentage">Percentagem do Box</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.payment_sub_contract.box_payments_percentage')}"
             name="form.payment_sub_contract.box_payments_percentage"
             v-model="form.payment_sub_contract.box_payments_percentage"
             id="Organizer-Twitter"
             placeholder="0%"
             :disabled="isEditable"
             v-validate="'required'"
             data-vv-as="Percentagem de Pagamento do Box" />
             <span v-show="errors.has('form.payment_sub_contract.box_payments_percentage')" class="help is-danger">{{ errors.first('form.payment_sub_contract.box_payments_percentage') }}</span>
          </div>
        </div> <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Percentagem de Pagamento do Getawey</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.payment_sub_contract.payment_gateway_percentage')}"
             name="form.payment_sub_contract.payment_gateway_percentage"
             v-model="form.payment_sub_contract.payment_gateway_percentage"
             id="Organizer-Twitter"
             placeholder="0%"
             :disabled="isEditable"
             v-validate="'required'"
             data-vv-as="Percentagem do Pagamneto Getawey" />
             <span v-show="errors.has('form.payment_sub_contract.payment_gateway_percentage')" class="help is-danger">{{ errors.first('form.payment_sub_contract.payment_gateway_percentage') }}</span>
          </div>
        </div>
      </div>
      <h4>Subcontrato do Produto</h4>
      <div class="row grid-divider">
        <div class="col-md-3">
          <div class="form-group">
            <label for="contract-percentage">Percentagem do Box</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.product_sub_contract.box_payments_percentage')}"
             name="form.product_sub_contract.box_payments_percentage"
             v-model="form.product_sub_contract.box_payments_percentage"
             id="Organizer-Twitter"
             placeholder="0%"
             :disabled="isEditable"
             v-validate="'required'"
             data-vv-as="Percentagem de Pagamento do Box" />
             <span v-show="errors.has('form.product_sub_contract.box_payments_percentage')" class="help is-danger">{{ errors.first('form.product_sub_contract.box_payments_percentage') }}</span>
          </div>
        </div> <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Percentagem de Pagamento do Getawey</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.product_sub_contract.payment_gateway_percentage')}"
             name="form.product_sub_contract.payment_gateway_percentage"
             v-model="form.product_sub_contract.payment_gateway_percentage"
             id="Organizer-Twitter"
             placeholder="0%"
             :disabled="isEditable"
             v-validate="'required'"
             data-vv-as="Percentagem do Pagamneto Getawey" />
             <span v-show="errors.has('form.product_sub_contract.payment_gateway_percentage')" class="help is-danger">{{ errors.first('form.product_sub_contract.payment_gateway_percentage') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-footer">
      </div>
  </div>
</template>
<script>
export default {
  props: {
    id: String,
    isEditable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: {},
      isRequesting: false,
      hadSuccess: '',
      hadError: ''
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
      return result ? this.UpdateContract() : result
    },
    /**
     * GetContract: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async GetContract () {
      this.isRequesting = true

      const token = localStorage.getItem('user_token')
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }

      try {
        const result = await this.axios.get(`/v1/contracts/${this.id}`, { headers: headers })
        this.form = result.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
      this.isRequesting = false
    },
    /**
     * UpdateCompany: This method will send form to serve, for update
     */
    async UpdateContract () {
      this.isRequesting = true

      try {
        await this.axios.patch(`/v1/organizers/${this.form.organizer_id}/contracts/${this.id}`, this.form)
        // this.$router.push({ name: "ListAddresses" });
        this.hadSuccess = 'Informações actualizadas com sucesso.'
      } catch (e) {
        this.hadError = 'Não foi possível realizar esta operação.'
      }
      this.isRequesting = false
      setTimeout(() => {
        this.hadSuccess = ''
      }, 1500)
    },
    SelectImage (file) {
      this.file = file
    },
    showRemoveModal () {
      // Show modal for deatils
      this.$bvModal.show('modal-remove')
    },
    hideRemoveModal () {
      // Show modal for deatils
      this.$bvModal.hide('modal-remove')
    },
    editContract () {
      this.isEditable = false
    }
  },
  created () {
    this.GetContract()
  }
}
</script>
<style>
  .grid-divider {
      content: "";
      border-top: 1px solid #DDD;
      /* position: absolute; */
      top: 0;
      bottom: 0;
      padding-top: 20px;
      margin-bottom: 30px;
  }
</style>
