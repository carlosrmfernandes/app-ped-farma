<template>
  <div>
    <div class="panel">
      <div class="panel-header">
        <h3>Detalhes do Evento</h3>
        <div class="btn-group float-right btn-group-sm ml-2" role="group">
          <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ event.status }}
          </button>
          <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <a class="dropdown-item" @click="setEventStatus('DRAFT')">Rascunho</a>
            <a class="dropdown-item" @click="setEventStatus('CURRENT')">Activo</a>
            <a class="dropdown-item" @click="setEventStatus('UPCOMING')">Brevemente</a>
            <a class="dropdown-item" @click="setEventStatus('COMPLETED')">Passado</a>
          </div>
        </div>
        <b-button
          variant="success"
          size="sm"
          class="float-right"
          @click="updatePartyEvent"
          v-show="!isEditable"
        >
          <span v-if="!isRequesting">Atualizar Evento</span>
          <div class="loading-dots" v-if="isRequesting">
            <div class="loading-dots--dot"></div>
            <div class="loading-dots--dot"></div>
            <div class="loading-dots--dot"></div>
          </div>
        </b-button>
        <div class="row mt-5 pt-3">
          <div class="col-md-2">
            <div class="form-group">
              <label for="title">Nome</label>
              <input
                type="text"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('event.title')
                }"
                id="title"
                v-model="event.title"
                name="title"
                placeholder="Nome do evento"
                v-validate="'required'"
                data-vv-as="Nome"
              />
              <span v-show="errors.has('event.title')" class="help is-danger">{{
                errors.first("event.title")
              }}</span>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="location">Localização</label>
              <select
                required
                id="event.location"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('event.location_id')
                }"
                v-model="event.location_id"
                name="location_id"
                v-validate="'required'"
                data-vv-as="Localização"
              >
                <option
                  v-for="location in locations"
                  :value="location.id"
                  :key="location.id"
                >{{ location.name }}</option
                >
              </select>
              <span v-show="errors.has('event.location_id')" class="help is-danger">{{
                errors.first("event.location_id")
              }}</span>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="event.classification">Classificação</label>
              <select
                required
                v-model="event.classification"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('event.classification')
                }"
                name="event.classification"
                v-validate="'required'"
                data-vv-as="Classificação"
              >
                <option selected="selected" id="event.classification">A</option>
                <option>E</option>
                <option>T</option>
                <option>G</option>
                <option>PG</option>
                <option>PG13</option>
                <option>R</option>
                <option>NC17</option>
              </select>
              <span
                v-show="errors.has('event.classification')"
                class="help is-danger"
              >{{ errors.first("event.classification") }}</span
              >
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="startsAt">Data do Evento</label>
              <input
                required
                type="date"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('event.starts_at')
                }"
                id="startsAt"
                v-model="event.starts_at"
                name="starts_at"
                v-validate="'required'"
                data-vv-as="Data do Evento"
              />
              <span v-show="errors.has('event.starts_at')" class="help is-danger">{{
                errors.first("event.starts_at")
              }}</span>
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="videoId">ID do Vídeo Promocional</label>
              <input
                type="text"
                class="form-control"
                id="videoId"
                v-model="event.video_id"
                placeholder="Ex.: A_YQzKo5Ows"
                name="video_id"
              />
              <small class="form-text text-muted"
              >Exemplo: https://www.youtube.com/watch?v=<b
              >A_YQzKo5Ows</b
              ></small
              >
            </div>
          </div>
          <div class="col-md-2">
            <div class="form-group">
              <label for="organizer">Organizador</label>
              <input
                disabled
                id="organizer"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('event.organizer_id')
                }"
                v-model="event.organizer_id"
                name="organizer_id"
              >
              <span
                v-show="errors.has('event.organizer_id')"
                class="help is-danger"
              >{{ errors.first("event.organizer_id") }}</span
              >
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for>Detalhes</label>
              <div class="form-group">
                <textarea
                  :class="{
                    'form-control': true,
                    'is-input-danger': errors.has('event.description')
                  }"
                  id="description"
                  v-model="event.description"
                  rows="4"
                  placeholder="Descrição do evento"
                  name="description"
                  v-validate="'required'"
                  data-vv-as="Detalhes do evento"
                ></textarea>
                <span
                  v-show="errors.has('event.description')"
                  class="help is-danger"
                >{{ errors.first("event.description") }}</span
                >
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-4 mb-4">
                Backdrop
                <UploadPhoto
                  :OnChange="SelectBackdrop"
                  v-model="backdrop"
                  width="140px"
                  height="185px"
                  name="backdrop"
                />
              </div>
              <div class="col-md-4">
                Poster
                <UploadPhoto
                  :OnChange="SelectPoster"
                  v-model="poster"
                  width="140px"
                  height="185px"
                  name="poster"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-body mt-3">
        <p>Sessões
          <router-link v-bind:to="'/events/' + party_event_id + '/sessions/new'">
            <button class="btn btn-sm btn-success float-right">Nova Sessão</button>
          </router-link>
        </p>
        <MiniTable
          :cols="cols"
          :data="sessions"
          title="Sessions"
          :searchMethod="getEventSessions"
          :pagination="pagination"
          :paginationMethod="getEventSessions"
          :sortMethod="getEventSessions"
          :needGrid="false"
          :changePage="changePage"
          resource="sessions"
          editRoute="EditSession"
          :pageCount="pageCount"
          :removeResource="removeSession"
          registRoute="RegistSession"
          buttonRegistName = "Adicionar Sessão"
          :canRemove = false
        />
        <div class="row">
          <div class="col-md-6">
            <p>
              Patrocinadores
              <button class="btn btn-sm btn-success float-right" @click="toggleModal('addSponsorsToEvent')" data-target="#addSponsorsToEvent">Adicionar Patrocinador(es)</button>
            </p>
            <!-- Modal -->
            <b-modal ref="addSponsorsToEvent" id="addSponsorsToEvent" title="Adicionar Patrocinador(es)">
              <div class="d-block text-center">
                <div class="form-group">
                  <label for="title">Nome do Evento</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="event.title"
                    name="title"
                    placeholder="Nome do evento"
                    disabled
                  />
                </div><!-- Nome do evento -->

                <div class="form-group">
                  <label for="decks">Patrocinadores</label>
                  <select
                    multiple
                    required
                    id="sponsors"
                    :class="{
                              'form-control': true,
                              'is-input-danger': errors.has('sponsors')
                            }"
                    v-model="sponsorIds"
                    name="sponsorIds"
                    v-validate="'required'"
                    data-vv-as="Patrocinador(es)"
                  >
                    <option
                      v-for="sponsor in sponsors"
                      :value="sponsor.id"
                      :key="sponsor.name"
                    >{{ sponsor.name }}</option
                    >
                  </select>
                  <span v-show="errors.has('sponsorIds')" class="help is-danger">
                    {{ errors.first("sponsorIds") }}
                  </span>
                </div>
              </div>
              <template v-slot:modal-footer>
                <div class="w-100">
                  <b-button @click="hideModal('addSponsorsToEvent')"
                            class="btn-sm mr-2"
                  >Cancelar</b-button>
                  <b-button
                    variant="primary"
                    size="lg"
                    class="btn btn-primary btn-sm"
                    :disabled="isRequesting ? true : false"
                    @click="addSponsorsToEvent"
                  >
                    <span v-if="!isRequesting">Adicionar</span>
                    <div class="loading-dots" v-if="isRequesting">
                      <div class="loading-dots--dot"></div>
                      <div class="loading-dots--dot"></div>
                      <div class="loading-dots--dot"></div>
                    </div>
                  </b-button>
                </div>
              </template>
            </b-modal> <!-- Modal add deck to event -->
            <MiniTable
              :cols="sponsor_cols"
              :data="event_sponsors"
              title="Patrocinadores"
              :searchMethod="getEventSponsors"
              :pagination="pagination"
              :paginationMethod="getEventSponsors"
              :sortMethod="getEventSponsors"
              :needGrid="false"
              :changePage="changePage"
              resource="supliers"
              editRoute="EditSponsor"
              :pageCount="pageCount"
              :removeResource="removeSession"
              registRoute="RegistSuplier"
              buttonRegistName = "Lista de Patrocinadores"
              :canRemove = false
            />
          </div>
          <div class="col-md-6">
            <p>
                Decks
                <!-- Button trigger modal -->
                <button class="btn btn-sm btn-success float-right" @click="toggleModal('addDecksToEvent')" data-target="#addDecksToEvent">Adicionar Deck(s)</button>
            </p>
            <!-- Modal -->
            <b-modal ref="addDecksToEvent" id="addDecksToEvent" title="Adicionar Deck(s)">
              <div class="d-block text-center">
                <div class="form-group">
                  <label for="title">Nome do Evento</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="event.title"
                    name="title"
                    placeholder="Nome do evento"
                    disabled
                  />
                </div><!-- Nome do evento -->

                <div class="form-group">
                  <label for="decks">Decks</label>
                  <select
                    multiple
                    required
                    id="decks"
                    :class="{
                              'form-control': true,
                              'is-input-danger': errors.has('decks')
                            }"
                    v-model="deckIds"
                    name="deckIds"
                    v-validate="'required'"
                    data-vv-as="Deck(s)"
                  >
                    <option
                      v-for="deck in collection_decks"
                      :value="deck.id"
                      :key="deck.id"
                    >{{ deck.name }}</option
                    >
                  </select>
                  <span v-show="errors.has('decks')" class="help is-danger">
                    {{ errors.first("decks") }}
                  </span>
                </div>
              </div>
              <template v-slot:modal-footer>
                <div class="w-100">
                  <b-button @click="hideModal('addDecksToEvent')"
                    class="btn-sm mr-2"
                  >Cancelar</b-button>
                  <b-button
                    variant="primary"
                    size="lg"
                    class="btn btn-primary btn-sm"
                    :disabled="isRequesting ? true : false"
                    @click="addDecksToEvent"
                  >
                    <span v-if="!isRequesting">Adicionar</span>
                    <div class="loading-dots" v-if="isRequesting">
                      <div class="loading-dots--dot"></div>
                      <div class="loading-dots--dot"></div>
                      <div class="loading-dots--dot"></div>
                    </div>
                  </b-button>
                </div>
              </template>
            </b-modal> <!-- Modal add deck to event -->
            <MiniTable
              :cols="deck_cols"
              :data="decks"
              title="Decks"
              :searchMethod="getEventDecks"
              :pagination="pagination"
              :paginationMethod="getEventDecks"
              :sortMethod="getEventDecks"
              :needGrid="false"
              :changePage="changePage"
              resource="decks"
              editRoute="EditDeck"
              :pageCount="pageCount"
              :removeResource="removeSession"
              registRoute="RegistSession"
              buttonRegistName = "Lista de Decks"
              :canRemove = false
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <p>
              Tipos de Ticket
              <button class="btn btn-sm btn-success float-right" @click="toggleModal" data-target="#addTicketsToEvent">Adicionar Ticket(s)</button>
            </p>
            <MiniTable
              :cols="ticketTypes_cols"
              :data="ticketTypes"
              title="Tickets"
              :searchMethod="getEventTicketsType"
              :pagination="pagination"
              :paginationMethod="getEventTicketsType"
              :sortMethod="getEventTicketsType"
              :needGrid="false"
              :changePage="changePage"
              resource="tickets"
              editRoute="EditTicketType"
              :pageCount="pageCount"
              :removeResource="removeTicketType"
              registRoute="addTicketType"
              buttonRegistName = "Lista de Tickets"
              :canRemove = false
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MiniTable from '@/components/Layouts/MiniTable'
import UploadPhoto from '@/components/Form/Photo'

export default {
  components: {
    MiniTable,
    UploadPhoto
  },
  name: 'DetailEvent',
  props: {
    id: {
      type: String
    }
  },
  data: function () {
    return {
      party_event_id: this.id,
      partyEventSessionID: '',
      event: {
        title: '',
        description: '',
        classification: '',
        starts_at: '',
        organizer_id: '',
        location_id: '',
        status: '',
        video_id: '',
        poster_path: '',
        backdrop_path: ''
      },
      deck_cols: [
        { name: 'name', label: 'Nome' },
        { name: 'number', label: 'Número' },
        { name: 'orientation', label: 'Orientação' },
        { name: 'status', label: 'Estado' },
        { name: 'starts_at', label: 'Data de Inicio' },
        { name: 'ends_at', label: 'Data de Termino' }
      ],
      decks: [],
      deckIds: [],
      sponsor_cols: [
        { name: 'name', label: 'Nome' },
        { name: 'email', label: 'Email' },
        { name: 'phone_number', label: 'Telefone' }
      ],
      event_sponsors: [],
      sponsorIds: [],
      sponsors: [],
      cols: [
        { name: 'type', label: 'Tipo' },
        { name: 'price', label: 'Preço' },
        { name: 'location_name', label: 'Localização' },
        { name: 'status', label: 'Status' },
        { name: 'starts_at', label: 'Data de Inicio' },
        { name: 'ends_at', label: 'Data de Termino' }
      ],
      isRequesting: false,
      pagination: {
        perPage: 12,
        pageable: { pageNumber: 1 }
      },
      hadError: '',
      hadSuccess: '',
      editID: '',
      pageCount: 0,
      sessions: [],
      session_products: [],
      session_tickets: [],
      locations: '',
      organizers: '',
      ticketTypes_cols: [
        { name: 'name', label: 'Nome' }
      ],
      ticketTypes: [],
      collection_decks: [],
      notDeckIds: []
    }
  },
  methods: {
    hideModal: function (modal) {
      // this.$refs[`${modal}`].hide()
      this.$root.$emit('bv::hide::modal', `${modal}`, '#btnShow')
    },
    toggleModal: function (modal) {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs[`${modal}`].toggle('#toggle-btn')
    },
    /*
     * getEventStep: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async getEvent () {
      try {
        const result = await this.axios.get(
          `/party_events/${this.id}`
        )
        this.event.title = result.data.title
        this.event.description = result.data.description
        this.event.status = result.data.status
        this.event.location_id = result.data.location.id
        this.event.organizer_id = result.data.organizer.name
        this.event.starts_at = result.data.starts_at
        this.event.classification = result.data.classification
        this.event.video_id = result.data.video_id === 'null' ? '' : result.data.video_id
        // this.poster_path = result.data.poster_path
        // this.backdrop_path = result.data.backdrop_path
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    async getEventSessions () {
      try {
        const result = await this.axios.get(
          `/event_sessions?eventIds=${this.party_event_id}&types=PARTY`
        )

        const res = result.data
        const itemsCount = result.data.items_count
        let sessionID

        for (let i = 0; i < itemsCount; i++) {
          sessionID = res.data[i].id
          this.sessions.push({
            id: res.data[i].id,
            starts_at: res.data[i].starts_at,
            ends_at: res.data[i].ends_at,
            status: res.data[i].status,
            price: res.data[i].price,
            type: res.data[i].type,
            location_id: res.data[i].location.id,
            location_name: res.data[i].location.name })
        }

        this.getSessionProducts(sessionID)
        this.getSessionTickets(sessionID)
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    async getSessionProducts (sessionID) {
      try {
        const result = await this.axios.get(
          `/party_event_sessions/${sessionID}/session_products`
        )

        // Session product data
        const res = result.data
        // Session products collection
        let products = []

        for (let i = 0; i < res.data.length; i++) {
          products.push({ id: res.data[i].id, company_product_id: res.data[i].company_product_id, amount: res.data[i].amount, price: res.data[i].price, name: res.data[i].name })
        }
        this.session_products = products
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    async getSessionTickets (sessionID) {
      try {
        const result = await this.axios.get(
          `/party_event_sessions/${sessionID}/party_tickets/grouped`
        )
        // partyEventSessionID
        const res = result.data
        // Session tickets collection
        let tickets = []

        for (let i = 0; i < res.length; i++) {
          tickets.push({ ticket_type: res[i].ticket_type, price: res[i].price, quantity: res[i].quantity })
        }
        this.session_tickets = tickets
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    /*
     * getLocations: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async getLocations () {
      try {
        const result = await this.axios.get(`/locations?bringAll=true`)
        this.locations = result.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    /*
     * getOrganizers: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async getOrganizers () {
      try {
        const result = await this.axios.get(`/organizers?sorters=CREATED_AT`)
        const res = result.data
        this.organizers = res.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    async getSponsors () {
      try {
        const result = await this.axios.get(`/sponsors`)
        const res = result.data
        this.sponsors = res.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    /*
     * setEventStatus: This method will fire a PUT request and then
     * redirect to list events page
     */
    async setEventStatus (status) {
      try {
        const result = await this.axios.put(`/events/${this.party_event_id}/status/${status}`)
        const res = result.data

        if (res) {
          // redirect to event details page
          await this.$router.push({ name: 'DetailsEvent', id: this.party_event_id })
        }
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    async getEventDecks () {
      try {
        const result = await this.axios.get(`/decks?eventIds=${this.party_event_id}&currentOnly=false`)
        const res = result.data
        const itemsCount = result.data.items_count

        for (let i = 0; i < itemsCount; i++) {
          this.notDeckIds[i] = res.data[i].id

          this.decks.push({
            id: res.data[i].id,
            name: res.data[i].name,
            number: res.data[i].number,
            orientation: res.data[i].orientation,
            status: res.data[i].status,
            starts_at: res.data[i].starts_at,
            ends_at: res.data[i].ends_at
          })
        }
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    async getEventSponsors () {
      try {
        const result = await this.axios.get(`/sponsors?eventIds=${this.party_event_id}`)
        const res = result.data
        const itemsCount = result.data.items_count

        for (let i = 0; i < itemsCount; i++) {
          this.event_sponsors.push({
            id: res.data[i].id,
            name: res.data[i].name,
            email: res.data[i].email,
            phone_number: res.data[i].phone_number
          })
        }
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    async updatePartyEvent () {
      this.isRequesting = true
      try {
        const fData = new FormData()

        fData.append('poster', this.event.poster)
        fData.append('backdrop', this.event.backdrop)
        fData.append('classification', this.event.classification)
        fData.append('location_id', this.event.location_id)
        fData.append('video_id', this.event.video_id)
        fData.append('description', this.event.description)
        fData.append('starts_at', this.event.starts_at)
        fData.append('title', this.event.title)

        // Fire the PUT request
        const res = await this.axios({
          url: `/party_events/${this.party_event_id}`,
          method: 'patch',
          headers: { 'Content-Type': 'multipart/form-data' },
          data: fData
        })

        if (res) {
          // Redirect to the Event views
          await this.$router.push({ name: 'ListEvent' })
        }
      } catch (e) {
        this.hadError =
          'Não foi possível realizar esta operação. Tente novamente'
        console.log(e)
      }
      this.isRequesting = false
    },
    async getEventTicketsType () {
      try {
        const result = await this.axios.get(`/events/${this.party_event_id}/ticket_types`)
        const res = result.data
        const itemsCount = result.data.items_count

        for (let i = 0; i < itemsCount; i++) {
          this.ticketTypes.push({
            id: res.data[i].id,
            name: res.data[i].name
          })
        }
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    async getDecks () {
      try {
        const result = await this.axios.get(`/decks?notIds=${this.notDeckIds}`)
        const res = result.data
        this.collection_decks = res.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    async addDecksToEvent () {
      this.hadError = ''
      const result = await this.$validator.validateAll()

      if (result) {
        this.isRequesting = true

        try {
          // Fire the POST request
          const res = await this.axios({
            url: `/events/${this.party_event_id}/decks`,
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: {
              deckIds: this.deckIds
            }
          })

          if (res) {
            this.hideModal('addTicketsToEvent')
          }
        } catch (e) {
          this.hadError =
            'Não foi possível realizar esta operação. Tente novamente'
          console.log(e)
        }
        this.isRequesting = false
      } else {
        return result
      }
    },
    async addSponsorsToEvent () {
      this.hadError = ''
      const result = await this.$validator.validateAll()

      if (result) {
        this.isRequesting = true

        try {
          // Fire the POST request
          const res = await this.axios({
            url: `/sponsor_events`,
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: {
              eventId: this.party_event_id,
              sponsorsIds: this.sponsorIds
            }
          })
          if (res) {
            this.hideModal('addSponsorsToEvent')
          }
        } catch (e) {
          this.hadError =
            'Não foi possível realizar esta operação. Tente novamente'
          console.log(e)
        }
        this.isRequesting = false
      } else {
        return result
      }
    }
  },
  created () {
    this.getOrganizers()
    this.getLocations()
    this.getEvent()
    this.getEventDecks()
    this.getDecks()
    this.getEventSponsors()
    this.getSponsors()
    this.getEventTicketsType()
    this.getEventSessions()
  }
}
</script>

<style scoped>
.session-body {
  height: 416px;
  overflow-y: auto;
}

.session-card:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.2);
  cursor: pointer;
}

.dropdown-item {
  cursor: pointer;
}
</style>
