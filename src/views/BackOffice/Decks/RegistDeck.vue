<template>
  <div class="panel">
    <div class="panel-header">
      <h3>Registar Deck</h3>
      <div class="alert alert-danger col-md-10" v-if="hadError" role="alert">
        {{hadError}}
      </div>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-3" >
          <div class="form-group">
            <label for="event-name">Nome do Deck</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.name')}"
             name="form.name"
             v-model="form.name"
             id="Deck-name"
             placeholder="Ex: Filmes, Refriango"
             v-validate="'required'"
             data-vv-as="Nome do Deck" />
             <span v-show="errors.has('form.name')" class="help is-danger">{{ errors.first('form.name') }}</span>
          </div>
        </div>
        <div class="col-md-3" >
          <div class="form-group">
            <label for="deck-number">Numero do Deck</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.number')}"
             name="form.name"
             v-model="form.number"
             id="Deck-number"
             placeholder="Ex: 1, 2, 3"
             v-validate="'required|numeric'"
             data-vv-as="Numero do Deck" />
             <span v-show="errors.has('form.number')" class="help is-danger">{{ errors.first('form.number') }}</span>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Orientações</label>
            <select class="custom-select" v-model="form.orientation">
              <option disabled value="">Choose...</option>
              <option
                :value="orientation.id"
                v-for="(orientation, index) of orientations"
                :key="index"
              >{{orientation.name}}</option>
            </select>
          </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
              <label for="startsAt">Data de Inicio</label>
              <input
                required
                type="date"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('form.starts_at')
                }"
                id="startsAt"
                v-model="form.starts_at"
                name="form.starts_at"
                v-validate="'required'"
                data-vv-as="Data de Inicio"
              />
              <span v-show="errors.has('form.starts_at')" class="help is-danger">{{
                errors.first("form.starts_at")
              }}</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="startsAt">Data de Termino</label>
              <input
                required
                type="date"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('form.ends_at')
                }"
                id="startsEnd"
                v-model="form.ends_at"
                name="form.ends_at"
                v-validate="'required'"
                data-vv-as="Data de Termino"
              />
              <span v-show="errors.has('form.ends_at')" class="help is-danger">{{
                errors.first("form.ends_at")
              }}</span>
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
  props: {
    id: {
      type: String
    }
  },
  data () {
    return {
      form: {},
      orientations: [
        { id: 'PORTRAIT', name: 'Portrait' },
        { id: 'LANDSCAPE', name: 'Landscape' }
      ],
      hadError: '',
      isRequesting: false,
      file: '',
      companies: [],
      company_id: ''
    }
  },
  methods: {
    /*
     *  ProcessForm: This method will validate the form using vee-validate
     *  component and then call the action method defined for this view
     *  if everything passes the validation.
     */
    async processForm () {
      this.hadError = ''
      const result = await this.$validator.validateAll()
      return result ? this.registDeck() : result
    },
    /*
     *  RegistOrganizer: This method will create a post request to regist a
     *  new organizer and then redirect to the ListOrganizer component.
     */
    async registDeck () {
      this.isRequesting = true

      try {
        const result = await this.axios.post(`/decks`, this.form)

        if (result) {
          // Redirect to the Organizer views
          this.$router.push({ name: 'ListDeck' })
        }
      } catch (e) {
        this.hadError =
          'Não foi possível realizar esta operação. Tente novamente'
      }
      this.isRequesting = false
    }
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
