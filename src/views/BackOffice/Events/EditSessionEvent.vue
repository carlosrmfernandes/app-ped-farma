<template>
  <div class="panel">
    <div class="panel-header">
      <h3>Editar Sessão</h3>
      <div class="btn-group float-right btn-group-sm ml-2" role="group">
        <button
          id="btnGroupDrop1"
          type="button"
          class="btn btn-secondary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >Estado: {{ session_status }}</button>
        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a class="dropdown-item" @click="updateSessionStatus('DRAFT')">Rascunho</a>
          <a class="dropdown-item" @click="updateSessionStatus('ACTIVE')">Activo</a>
          <a class="dropdown-item" @click="updateSessionStatus('INACTIVE')">Inactivo</a>
          <a class="dropdown-item" @click="updateSessionStatus('COMPLETED')">Passado</a>
        </div>
      </div>
    </div>
    <div class="panel-body">
      <div class="alert alert-success col-md-10" v-if="hadSuccess" role="alert">
        {{hadSuccess}}
      </div>
      <div class="alert alert-danger col-md-10" v-if="hadError" role="alert">
        {{hadError}}
      </div>
      <div class="row mt-5">
        <div class="col-md-3">
          <div class="form-group">
            <label for="event_session_starts_at">Inicío da Sessão</label>
            <input
              type="datetime-local"
              :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('event_session.starts_at')
                }"
              name="event_session.starts_at"
              v-model="event_session.starts_at"
              id="event_session_starts_at"
            />
            <small class="form-text text-muted">Data e Hora</small>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event_session_ends_at">Fim da Sessão</label>
            <input
              type="datetime-local"
              :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('event_session.ends_at')
                }"
              name="event_session.ends_at"
              v-model="event_session.ends_at"
              id="event_session_ends_at"
            />
            <small class="form-text text-muted">Data e Hora</small>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="location_id">Localização</label>
            <select
              required
              id="location_id"
              :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('event_session.location_id')
                }"
              v-model="event_session.location_id"
              name="event_session.location_id"
              v-validate="'required'"
              data-vv-as="Localização"
            >
              <option
                v-for="location in locations"
                :value="location.id"
                :key="location.id"
              >{{ location.name }}</option>
            </select>
            <span
              v-show="errors.has('event_session.location_id')"
              class="help is-danger"
            >{{ errors.first("event_session.location_id") }}</span>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="session_price">Preço</label>
            <input
              type="number"
              :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('event_session.price')
                }"
              placeholder="Ex.: 5000"
              v-validate="'required'"
              data-vv-as="Preço"
              name="event_session.price"
              v-model="event_session.price"
              id="session_price"
            />
            <span
              v-show="errors.has('event_session.price')"
              class="help is-danger"
            >{{ errors.first("event_session.price") }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <!--   Tickets table   -->
        <div class="col-md-6">
          <hr>
            <p>
              <b>Bilhetes</b>
              <button
                class="btn btn-sm btn-success float-right"
                data-target="#addTicketTypesToEvent"
              >+ Bilhete</button>
            </p>
          <MiniTable
            :cols="tickets_cols"
            :data="collection_tickets"
            title="Tickects"
            :searchMethod="getEventSessions"
            :pagination="pagination"
            :paginationMethod="getSessionTickets"
            :sortMethod="getSessionTickets"
            :needGrid="false"
            :changePage="changePage"
            resource="sessions"
            editRoute="EditSessionEvent"
            :pageCount="pageCount"
            :removeResource="removeSessionTicket"
            registRoute="AddSessionTicket"
            buttonRegistName="Adicionar Ticket"
            :canRemove="false"
          />
        </div>
        <div class="col-md-6">
          <hr>
          <p>
            <b>Produtos</b>
            <button
              class="btn btn-sm btn-success float-right"
              data-target="#addProductToSession"
            >+ Produto</button>
          </p>
          <MiniTable
            :cols="products_cols"
            :data="collection_products"
            title="Tickects"
            :searchMethod="getEventSessions"
            :pagination="pagination"
            :paginationMethod="getSessionProducts"
            :sortMethod="getSessionProducts"
            :needGrid="false"
            :changePage="changePage"
            resource="sessions"
            editRoute="EditSessionEvent"
            :pageCount="pageCount"
            :removeResource="removeSessionProduct"
            registRoute="AddSessionProduct"
            buttonRegistName="Adicionar Produto"
            :canRemove="false"
          />
        </div>
      </div>
      <b-button
        variant="primary"
        size="md ml-2 mb-4"
        class="float-left"
        :disabled="isRequesting ? true : false"
        @click="addPartyEventSession"
      >
        <span v-if="!isRequesting">Salvar Sessão</span>
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
import MiniTable from '@/components/Layouts/MiniTable'

export default {
  components: {
    MiniTable
  },
  name: 'EditSessionEvent',
  props: {
    id: {
      type: String
    }
  },
  data: function () {
    return {
      party_event_id: '',
      event_session_id: this.id,
      locations: '',
      classifications: '',
      classification: '',
      title: '',
      description: '',
      starts_at: '',
      session_status: '',
      video_id: '',
      location_id: '',
      collection_products: [],
      products: {},
      startsAt: '',
      company_product_id: '',
      event_session: {},
      company_products: '',
      tickets: {},
      collection_tickets: [],
      tickets_cols: [
        { name: 'ticket_type', label: 'Tipo' },
        { name: 'price', label: 'Preço' },
        { name: 'quantity', label: 'Quantidade' }
      ],
      products_cols: [
        { name: 'name', label: 'Nome' },
        { name: 'price', label: 'Preço' },
        { name: 'amount', label: 'Quantidade' }
      ],
      isRequesting: false,
      hadSuccess: '',
      hadError: ''
    }
  },
  methods: {
    /*
     * getLOcations: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async getLocations () {
      try {
        const result = await this.axios.get(`/locations?bringAll=true`)
        this.locations = result.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as localizações.'
      }
    },
    /*
     *  getProducts: This method will fire a GET request and then
     * assign the response data into the state property: form.
     */
    async getProducts () {
      try {
        const result = await this.axios.get(`/company_products?sorters=NAME`)
        const res = result.data
        this.company_products = res.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar os produtos.'
      }
    },
    /*
     *  postPartyEvent: This method will create a post request step by step to regist a
     *  new party event and then redirect to the ListEvent component.
     */
    async addPartyEventSession () {
      this.isRequesting = true
      try {
        this.event_session.price = parseInt(this.event_session.price, 10)

        this.products.amount = parseInt(this.products.amount, 10)
        this.products.price = parseInt(this.products.price, 10)

        this.tickets.amount = parseInt(this.tickets.amount, 10)
        this.tickets.price = parseInt(this.tickets.price, 10)

        if (typeof this.products === 'undefined') {
          this.products = ''
        }
        // Fire the POST request
        const res = await this.axios({
          url: `/party_events/${this.party_event_id}/sessions`,
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          data: {
            ends_at: this.event_session.ends_at,
            location_id: this.event_session.location_id,
            price: this.event_session.price,
            starts_at: this.event_session.starts_at,
            products: this.collection_products,
            tickets: this.collection_tickets
          }
        })

        if (res) {
          // redirect to event details page
          await this.$router.push({
            name: 'DetailsEvent',
            id: this.party_event_id
          })
        }
      } catch (e) {
        this.hadError =
          'Não foi possível realizar esta operação. Tente novamente'
        console.log(e)
      }
      this.isRequesting = false
    },
    async updateSessionStatus (status) {
      this.isRequesting = true
      try {
        // Fire the POST request
        await this.axios.put(
          `/event_sessions/${this.event_session_id}/status/${status}`
        )
        this.hadSuccess =
            'Estado da sessão atualizada com sucesso.'
      } catch (e) {
        this.hadError =
          `Não foi possível atualizar o estado da sessão.`
        console.log(e)
      }
      this.isRequesting = false
    },
    async getSessionData () {
      try {
        const result = await this.axios.get(
          `/event_sessions/${this.event_session_id}`
        )
        const res = result.data
        this.session_status = res.status
        this.party_event_id = res.event.id
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    async getSessionTickets () {
      try {
        const result = await this.axios.get(
          `/party_event_sessions/${this.event_session_id}/party_tickets/grouped`
        )
        this.collection_tickets = result.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    async getSessionProducts () {
      try {
        const result = await this.axios.get(
          `/party_event_sessions/${this.event_session_id}/session_products`
        )
        const res = result.data
        this.collection_products = res.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    addTicket: function () {
      this.collection_tickets.push({ amount: '', price: '', ticket_type: '' })
    },
    removeTicket: function (index) {
      if (index !== 0) {
        this.collection_tickets.splice(index, 1)
      }
    },
    addProduct: function () {
      this.collection_products.push({
        amount: '',
        price: '',
        company_product_id: ''
      })
    },
    removeProduct: function (index) {
      if (index !== 0) {
        this.collection_products.splice(index, 1)
      }
    }
  },
  created () {
    this.getSessionData()
    this.getLocations()
    this.getTicketTypes()
    this.getProducts()
  },
  mounted () {
    this.getSessionTickets()
    this.getSessionProducts()
  }
}
</script>

<style scoped>
</style>
