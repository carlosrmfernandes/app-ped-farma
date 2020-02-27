<template>
  <div class="panel">
    <div class="panel-header">
      <h4>Editar Deck</h4>
      <b-button
        variant="outline-primary"
        size="sm"
        class="float-right"
        @click="editOrganizer"
        v-show="isEditable"
      >Editar</b-button>
      <b-button
        variant="success"
        size="sm"
        class="float-right"
        @click="processForm"
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
            <label for="event-name">Nome do Deck</label>
            <input type="text"
             :class="{'form-control': true, 'is-input-danger': errors.has('form.name')}"
             name="form.name"
             v-model="form.name"
             id="Deck-name"
             placeholder="Ex: Filmes, Refriango"
             :disabled="isEditable"
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
            :disabled="isEditable"
             v-validate="'required|numeric'"
             data-vv-as="Numero do Deck" />
             <span v-show="errors.has('form.number')" class="help is-danger">{{ errors.first('form.number') }}</span>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Orientações</label>
            <select class="custom-select" :disabled="isEditable" v-model="form.orientation">
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
                :disabled="isEditable"
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
                :disabled="isEditable"
                v-validate="'required'"
                data-vv-as="Data de Termino"
              />
              <span v-show="errors.has('form.ends_at')" class="help is-danger">{{
                errors.first("form.ends_at")
              }}</span>
            </div>
          </div>
          <!-- <div class="col-md-3">
            <div class="form-group">
              <label for="event-name">Status</label>
              <select class="custom-select" :disabled="isEditable" v-model="form.status">
                <option disabled value="">Choose...</option>
                <option
                  :value="stat.id"
                  v-for="(stat, index) of status"
                  :key="index"
                >{{stat.name}}</option>
              </select>
            </div>
          </div> -->
          <div class="col-md-3">
            <div class="form-group">
              <label for="available_event_statuses">Status de Eventos Disponíveis</label>
              <select
                :disabled="isEditable"
                multiple
                required
                id="available_event_statuses"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('form.available_event_statuses')
                }"
                v-model="form.available_event_statuses"
                v-validate="'required'"
                data-vv-as="Status de Eventos Disponíveis"
              >
                <option
                  :value="stat.id"
                  v-for="(stat, index) of status"
                  :key="index"
                >{{stat.name}}</option>
              </select>
              <span v-show="errors.has('decks')" class="help is-danger">{{
                errors.first("decks")
              }}</span>
            </div>
          </div>
          <div class="col-md-3 button-status">
              <label for="startsAt">Alterar Status</label>
              <button type="button" class="btn btn-success btn-sm btn-status"  v-if="alterStatus === 'INACTIVE'"  @click="alterStatusMethods('ACTIVE')">
                <span v-if="!isRequesting">Activar</span>
                <div class="loading-dots" v-if="isRequesting">
                  <div class="loading-dots--dot"></div>
                  <div class="loading-dots--dot"></div>
                  <div class="loading-dots--dot"></div>
                </div>
              </button>
              <button type="button" class="btn btn-danger btn-sm btn-status"  v-if="alterStatus === 'ACTIVE'" @click="alterStatusMethods('INACTIVE')">
                <span v-if="!isRequesting">Desativar</span>
                <div class="loading-dots" v-if="isRequesting">
                  <div class="loading-dots--dot"></div>
                  <div class="loading-dots--dot"></div>
                  <div class="loading-dots--dot"></div>
                </div>
              </button>
          </div>
      </div>
      <div class="row events-panel">
        <div class="events-head">
          <div class="events-head-left">
            <span>Eventos do Deck</span>
          </div>
          <div class="events-head-right">
          <span @click="showDeckEventsModal">Add</span>
          </div>
        </div>
        <div class="events-body">
          <MiniTable
            :cols="colsEvents"
            :data="decksEvents"
            :pagination="pagination"
            :paginationMethod="getDecksEvents"
            :sortMethod="getDecksEvents"
            :changePage="changePage"
            resource="supplier"
            editRoute="DetailsEvent"
            title="Eventos"
            :canRemove="false"
          />
        </div>
      </div>
    </div>
    <!-- Remove Modal-->
    <b-modal id="modal-remove" title="Deck">
      <p class="my-4">Tem certeza que deseja remover?</p>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="primary" size="sm" class="float-right" @click="removeDeck">
            <span v-if="!isRequesting">Sim</span>
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
            @click="hideRemoveModal"
          >Não</b-button>
        </div>
      </template>
    </b-modal>
    <!-- Deck Events Modal-->
    <b-modal id="modal-deck" title="Deck">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="event-name">Eventos</label>
            <select class="custom-select" v-model="eventId" @change="changeValue">
              <option disabled value="">Choose...</option>
              <option
                :value="event.id"
                v-for="(event, index) of allEvents"
                :key="index"
              >{{event.title}}</option>
            </select>
          </div>
        </div>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="primary" size="sm" class="float-right" @click="addDeckEvents">
            <span v-if="!isRequesting">Adicionar</span>
            <div class="loading-dots" v-if="isRequesting">
              <div class="loading-dots--dot"></div>
              <div class="loading-dots--dot"></div>
              <div class="loading-dots--dot"></div>
            </div>
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { removeDeck, removeSettings, addNewSettings, getAllDecks } from './helpers/functions.js'
import { getDecksEvents, changePage, getAllEvents } from './helpers/events.js'
import MiniTable from '@/components/Layouts/MiniTable'

export default {
  components: {
    MiniTable
  },
  props: {
    id: {
      type: String
    }
  },
  data () {
    return {
      form: {
        status: ''
      },
      hadSuccess: '',
      hadError: '',
      isRequesting: false,
      orientations: [
        { id: 'PORTRAIT', name: 'Portrait' },
        { id: 'LANDSCAPE', name: 'Landscape' }
      ],
      status: [
        { id: 'UPCOMING', name: 'Brevemente' },
        { id: 'CURRENT', name: 'Activo' }
      ],
      decksStatus: [
        { id: 'CURRENT', name: 'Activo' },
        { id: 'UPCOMING', name: 'Brevemente' }
      ],
      colsEvents: [
        { name: 'title', label: 'Titulo' },
        { name: 'status', label: 'Status' },
        { name: 'type', label: 'Tipo' },
        { name: 'starts_at', label: 'Data' },
        { name: 'created_at', label: 'Criado Em' }
      ],
      statues: [],
      settings: [{
        status: '',
        deck_ids: {}
      }],
      pagination: {
        perPage: 10,
        pageable: { pageNumber: 1 }
      },
      decks: [2],
      isEditable: true,
      alterStatus: '',
      eventId: '',
      decksEvents: [],
      allEvents: [],
      eventsIds: {}
    }
  },
  methods: {
    viewvalue () {
      console.log(this.statues)
    },
    /*
     *  processForm: This method will validate the form using vee-validate
     *  component and then call the action method defined for this view
     *  if everything passes the validation.
     */
    async processForm () {
      this.hadError = ''
      const result = await this.$validator.validateAll()
      return result ? this.updateDeck() : result
    },
    /**
     * GetDecks: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async getDeck () {
      this.isRequesting = true
      try {
        const result = await this.axios.get(`/decks/${this.id}`)
        this.form = result.data
        this.alterStatus = this.form.status
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
      this.isRequesting = false
    },
    /*
     *  updateDeck: This method will create a post request to regist a
     *  new organizer and then redirect to the ListOrganizer component.
     */
    async updateDeck () {
      this.isRequesting = true

      try {
        // eslint-disable-next-line no-const-assign
        const result = await this.axios.patch(`/decks/${this.id}`, this.form)

        if (result) {
          // Redirect to the Organizer views
          this.$router.push({ name: 'ListDeck' })
        }
        this.hadSuccess = true
      } catch (e) {
        this.hadError =
          'Não foi possível realizar esta operação. Tente novamente'
      }
      this.isRequesting = false
    },
    async alterStatusMethods (value) {
      this.isRequesting = true
      try {
        if (value === 'ACTIVE') {
          // eslint-disable-next-line no-const-assign
          await this.axios.put(`/decks/${this.id}/status/${value}`)
          // Redirect to the Organizer views
          this.getDeck()
        } else if (value === 'INACTIVE') {
          // eslint-disable-next-line no-const-assign
          await this.axios.put(`/decks/${this.id}/status/${value}`)
          // Redirect to the Organizer views
          this.getDeck()
        }
        this.hadSuccess = 'Operação realizada com sucesso!'
        setTimeout(() => {
          this.hadSuccess = ''
        }, 5000)
      } catch (e) {
        this.hadError =
          'Não foi possível realizar esta operação. Tente novamente'
      }
      this.isRequesting = false
    },
    async addDeckEvents () {
      this.isRequesting = true
      try {
        await this.axios.post(`/deck_events`, this.eventsIds)
        // Redirect to the Organizer views
        this.getDecksEvents()
        this.hideDeckEventsModal()
      } catch (e) {
        this.hadError =
          'Não foi possível realizar esta operação. Tente novamente'
      }
      this.isRequesting = false
    },
    addConfig (selecteds) {
      console.log(selecteds)
    },
    changeValue () {
      this.eventsIds = { deck_id: this.id, event_id: this.eventId }
    },
    editOrganizer () {
      this.isEditable = false
    },
    showRemoveModal () {
      // Show modal for deatils
      this.$bvModal.show('modal-remove')
    },
    hideRemoveModal () {
      // Show modal for deatils
      this.$bvModal.hide('modal-remove')
    },
    showDeckEventsModal () {
      // Show modal for deatils
      this.$bvModal.show('modal-deck')
      this.getAllEvents()
    },
    hideDeckEventsModal () {
      // Show modal for deatils
      this.$bvModal.hide('modal-deck')
    },
    changePage,
    removeDeck,
    getAllDecks,
    getAllEvents,
    getDecksEvents,
    removeSettings,
    addNewSettings
  },
  created () {
    this.getDeck()
    this.getAllDecks()
    this.getDecksEvents()
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

.mb-6{
  margin-bottom: 0.7rem !important;
}

.btn-status{
  width: 80px;
}

.button-status{
  display: flex;
  flex-direction: column;
}

.addOrRemove{
  padding: 5px;
  padding-top: 8px;
  padding-right: 0;
}

.table-decks{
  /* padding-left: 15px; */
  margin: 5px;
  overflow: auto;
}

.events-panel{
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.events-body {
  /* background-color: #fff; */
}

.events-head{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.events-head-left{
  width: 50%;
  display: flex;
  align-items: center;
  /* padding-left: 10px; */
}

.events-head-right{
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.events-head-right span{
  font-weight: 500;
  cursor: pointer;
}

.settings{
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.settings-head{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.settings-head-left{
  width: 50%;
  display: flex;
  align-items: center;
}

.settings-head-right{
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.settings-head-right span{
  font-weight: 500;
  cursor: pointer;
}
.settings-body{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.settings-body-config{
  width: 100%;
  height: 250px;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  /* overflow: auto; */
  padding: 10px;
}

.settings-body-config-row{
  justify-content: space-between;
}

.config-row-right {
  display: flex;
  width: 100px;
  justify-content: flex-end;
  align-items: center;
  margin-right: 5px;
}
/*select {*/
/*  color: #ffffff;*/
/*}*/
</style>
