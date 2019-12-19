<template>
  <div class="panel">
    <div class="panel-header mt-4">
      <p>Event ID: {{ id }}</p>
      <p>Title: {{ title }}</p>
      <p>Description: {{ description }}</p>
      <p>Classificação: {{ classification }}</p>
      <p>Data: {{ starts_at }}</p>
      <p>Organizador: {{ organizer }}</p>
      <p>Localização: {{ location }}</p>
      <p>Estado: {{ status }}</p>
      <p>Vídeo: {{ video_id }}</p>
      <p>Poster: {{ poster_path }}</p>
      <p>Backdrop: {{ backdrop_path }}</p>
      <hr>
    </div>
    <div class="panel-body">
      <p>Sessões:</p>
      <div class="row session-body">
        <div v-for="session in sessions" class="col-md-3 mb-3">
          <div class="card session-card">
            <h5 class="card-header">Inicío: {{ formatDate(session.starts_at) }}<br /> Fim: {{ formatDate(session.ends_at) }}</h5>
            <div class="card-body">
              <div class="card-text">
                <p>Localização: {{ session.location_name }}</p>
                <p>Estado: {{ session.status }}</p>
              </div>
            </div>
          </div>
        </div>
      </div> <!-- end sessions section -->
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              Produtos
            </div>
            <div class="card-body">
              Listagem de produtos:
              <pre>
                {{ session_products }}
              </pre>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              Bilhetes
            </div>
            <div class="card-body">
              <ul class="list-group">
                <li v-for="ticket in session_tickets" class="list-group-item">
                  <span class="col-md-4">Tipo: {{ ticket.ticket_type }}</span>
                  <span class="col-md-4">Preço: {{ ticket.price }}</span>
                  <span class="col-md-4">Quantidade: {{ ticket.quantity }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as moment from 'moment'

export default {
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
      title: '',
      description: '',
      classification: '',
      starts_at: '',
      organizer: '',
      location: '',
      status: '',
      video_id: '',
      poster_path: '',
      backdrop_path: '',
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
        return result.data.sessions[0].products
        // for (let i = 0; i < itemsCount; i++) {
        //   this.sessions.push({
        //     id: res.data[i].id,
        //     starts_at: res.data[i].starts_at,
        //     ends_at: res.data[i].ends_at,
        //     status: res.data[i].status,
        //     location_id: res.data[i].location.id,
        //     location_name: res.data[i].location.name })
        // }
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
        console.log(res.length)
        // const itemsCount = result.data.items_count
        //
        for (let i = 0; i < res.length; i++) {
          this.session_tickets.push({ ticket_type: res[i].ticket_type, price: res[i].price, quantity: res[i].quantity })
        }
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    formatDate: function (date) {
      return moment(date).format('DD-MM-YYYY h:mm:ss')
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
