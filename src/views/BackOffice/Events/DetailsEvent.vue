<template>
  <div>
    <div class="panel">
      <div class="panel-header">
        <h3>Detalhes do Evento</h3>
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
      </div>
      <div class="panel-body mt-5 pt-3">

        <Table
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
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment'
import Table from '@/components/Layouts/Table'
// import UploadPhoto from '@/components/Form/Photo'

export default {
  components: {
    Table
    // UploadPhoto
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
        organizer: '',
        location: '',
        status: '',
        video_id: '',
        poster_path: '',
        backdrop_path: ''
      },
      cols: [
        { name: 'type', label: 'Tipo' },
        { name: 'price', label: 'Preço' },
        { name: 'location_name', label: 'Localização' },
        { name: 'status', label: 'Status' },
        { name: 'starts_at', label: 'Data de Inicio' },
        { name: 'ends_at', label: 'Data de Termino' }
      ],
      isRequesting: false,
      decks: [],
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
      locations: ''
    }
  },
  methods: {
    /*
     * getEventStep: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async getEvent () {
      try {
        const result = await this.axios.get(
          `/events/${this.id}`
        )
        this.title = result.data.title
        this.description = result.data.description
        // this.location_id = result.data.location.id
        // this.organizer = result.data.organizer.id
        this.starts_at = result.data.starts_at
        this.status = result.data.status
        this.classification = result.data.classification
        this.video_id = result.data.video_id === 'null' ? '' : result.data.video_id
        this.poster_path = result.data.poster_path
        this.backdrop_path = result.data.backdrop_path
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
    formatDate: function (date) {
      return moment(date).format('DD-MM-YYYY h:mm:ss')
    },
    showSessionID: function (ID) {
      this.getSessionProducts(ID)
      this.getSessionTickets(ID)
    },
    updatePartyEvent: function () {

    }
  },
  created () {
    this.getEvent()
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
</style>
