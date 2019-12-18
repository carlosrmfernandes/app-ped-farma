<template>
  <div class="panel">
    <div class="panel-header">
      <h3>Novo Contrato</h3>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Organizador</label>
            <select class="custom-select" v-model="form.organizer_id" @change="onChange()">
              <option selected>Choose...</option>
              <option
                :value="organizer.id"
                v-for="(organizer, index) of organizers"
                :key="index"
              >{{organizer.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <h5>Subcontrato do Evento</h5>
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
             v-validate="'required'"
             data-vv-as="Percentagem do Pagamneto Getawey" />
             <span v-show="errors.has('form.event_sub_contract.payment_gateway_percentage')" class="help is-danger">{{ errors.first('form.event_sub_contract.payment_gateway_percentage') }}</span>
          </div>
        </div>
      </div>
      <h5>Subcontrato do Pagamento</h5>
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
             v-validate="'required'"
             data-vv-as="Percentagem do Pagamneto Getawey" />
             <span v-show="errors.has('form.payment_sub_contract.payment_gateway_percentage')" class="help is-danger">{{ errors.first('form.payment_sub_contract.payment_gateway_percentage') }}</span>
          </div>
        </div>
      </div>
      <h5>Subcontrato do Produto</h5>
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
             v-validate="'required'"
             data-vv-as="Percentagem do Pagamneto Getawey" />
             <span v-show="errors.has('form.product_sub_contract.payment_gateway_percentage')" class="help is-danger">{{ errors.first('form.product_sub_contract.payment_gateway_percentage') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-footer">
        <b-button
        variant="primary"
        size="sm"
        class="float-left"
        :disabled="isRequesting ? true : false"
        @click="ProcessForm">
         <span v-if="!isRequesting"> Registar</span>
          <div class="loading-dots" v-if="isRequesting">
            <div class="loading-dots--dot"></div>
            <div class="loading-dots--dot"></div>
            <div class="loading-dots--dot"></div>
          </div>
        </b-button>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        event_sub_contract: {},
        payment_sub_contract: {},
        product_sub_contract: {}
      },
      organizer_id: Number,
      organizers: [],
      isRequesting: false,
      hadSuccess: ''
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
      return result ? this.RegistContract() : result
    },
    async RegistContract () {
      this.isRequesting = true
      try {
        const result = await this.axios.post(`/v1/organizers/${this.organizer_id}/contracts`, this.form)

        if (result) {
          // Redirect to the Organizer views
          this.$router.push({ name: 'ListContract' })
        }

        this.hadSuccess = true
      } catch (e) {
        this.hadError =
          'Não foi possível realizar esta operação. Tente novamente'
      }
      this.isRequesting = false
    },
    async allOrganizers () {
      try {
        const result = await this.axios.get(`/organizers`)
        const res = result.data
        this.organizers = res.data
      } catch (e) {
        this.hadError =
            'Não foi possível carregar os Organizadores. Actualize a página.'
      }
    },
    onChange () {
      this.organizer_id = this.form.organizer_id
    }
  },
  created () {
    this.allOrganizers()
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
