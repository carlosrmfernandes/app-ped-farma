<template>
  <div class="panel">
    <div class="panel-header">
      <h3>Adicionar Sessão</h3>
    </div>
    <div class="panel-body">
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
              >{{ location.name }}</option
              >
            </select>
            <span
              v-show="errors.has('event_session.location_id')"
              class="help is-danger"
            >{{ errors.first("event_session.location_id") }}</span
            >
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
            >{{ errors.first("event_session.price") }}</span
            >
          </div>
        </div>
      </div>
      <div class="jumbotron">
        <h2>Tickets</h2>
        <div class="row" :key="tickets.id"  v-for="(tickets, index) in collection_tickets">
          <div class="col-md-3">
            <div class="form-group">
              <label for="ticket_amount">Quantidade</label>
              <input
                type="number"
                :class="{
                    'form-control': true,
                    'is-input-danger': errors.has('tickets.amount')
                  }"
                placeholder="Ex.: 1100"
                v-validate="'required'"
                data-vv-as="Quantidade"
                v-model="tickets.amount"
                name="tickets.amount"
                id="ticket_amount"
              />
              <span
                v-show="errors.has('tickets.amount')"
                class="help is-danger"
              >{{ errors.first("tickets.amount") }}</span
              >
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="ticket_price">Preço</label>
              <input
                type="number"
                :class="{
                    'form-control': true,
                    'is-input-danger': errors.has('tickets.price')
                  }"
                placeholder="Ex.: 5500"
                v-validate="'required'"
                data-vv-as="Preço"
                name="tickets.price"
                v-model="tickets.price"
                id="ticket_price"
              />
              <span
                v-show="errors.has('tickets.price')"
                class="help is-danger"
              >{{ errors.first("tickets.price") }}</span
              >
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="ticket_type">Tipo</label>
              <select
                required
                v-model="tickets.ticket_type"
                :class="{
                    'form-control': true,
                    'is-input-danger': errors.has('tickets.ticket_type')
                  }"
                name="tickets.ticket_type"
                v-validate="'required'"
                data-vv-as="Tipo"
              >
                <option selected
                        :key="ticket.id"
                        v-for="ticket in ticket_types"
                        :value="ticket.name"
                        id="ticket_type">{{ ticket.name }}</option>
              </select>
              <span
                v-show="errors.has('tickets.ticket_type')"
                class="help is-danger"
              >{{ errors.first("tickets.ticket_type") }}</span
              >
            </div>
          </div>
          <div v-show="index !== 0" class="col-md-3 mt-4 pt-2">
            <button v-on:click="removeTicket(index)" class="btn btn-danger btn-sm">Remover</button>
          </div>
        </div>
        <!-- End tickets section -->
        <button class="btn btn-primary btn-sm" v-on:click="addTicket">Adicionar Ticket</button>
      </div>
      <div class="jumbotron">
        <h2>Produtos</h2>
        <div class="row" :key="products.id" v-for="(products, index) in collection_products">
          <div class="col-md-3">
            <div class="form-group">
              <label for="products.company_product_id">Produto</label>
              <select
                required
                id="products.company_product_id"
                :class="{
                    'form-control': true
                  }"
                v-model="products.company_product_id"
                name="products.company_product_id"
              >
                <option
                  v-for="product in company_products"
                  :value="product.id"
                  :key="product.id"
                >{{ product.name }}</option
                >
              </select>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="amount">Quantidade</label>
              <input
                type="number"
                :class="{
                    'form-control': true
                  }"
                placeholder="Ex.: 3500"
                v-model="products.amount"
                name="products.amount"
                id="amount"
              />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="price">Preço</label>
              <input
                type="number"
                :class="{
                    'form-control': true
                  }"
                placeholder="Ex.: 5000"
                name="products.price"
                v-model="products.price"
                id="price"
              />
            </div>
          </div>
          <div v-show="index !== 0" class="col-md-3 mt-4 pt-2">
            <button v-on:click="removeProduct(index)" class="btn btn-danger btn-sm">Remover</button>
          </div>
        </div>
        <button v-on:click="addProduct" class="btn btn-primary btn-sm">Adicionar Produto</button>
      </div>
      <b-button
        variant="primary"
        size="md ml-2 mb-4"
        class="float-left"
        :disabled="isRequesting ? true : false"
        @click="addPartyEventSession"
      >
        <span v-if="!isRequesting">Adicionar Sessão</span>
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
  name: 'SessionEvent',
  props: {
    id: {
      type: String
    }
  },
  data: function () {
    return {
      party_event_id: this.id,
      locations: '',
      organizers: '',
      organizer_id: '',
      classifications: '',
      poster: '',
      backdrop: '',
      classification: '',
      title: '',
      tags: '',
      decks: [],
      collection_decks: [],
      description: '',
      starts_at: '',
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
      sponsors: {},
      sponsors_id: [],
      event_ticket_types: [],
      ticket_types: [],
      isRequesting: false,
      hadSuccess: false,
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
        this.hadError = 'Não foi possível carregar as informações.'
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
        this.hadError = 'Não foi possível carregar as informações.'
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

        this.products.amount = parseInt(
          this.products.amount,
          10
        )
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
          await this.$router.push({ name: 'DetailsEvent', id: this.party_event_id })
        }
      } catch (e) {
        this.hadError =
          'Não foi possível realizar esta operação. Tente novamente'
        console.log(e)
      }
      this.isRequesting = false
    },
    async getTicketTypes () {
      try {
        const result = await this.axios.get(`/events/${this.party_event_id}/ticket_types`)
        const res = result.data
        this.ticket_types = res.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    addTicket: function () {
      this.collection_tickets.push({ amount: '', price: '', ticket_type: '' })
    },
    removeTicket: function (index) {
      if (index !== 0) { this.collection_tickets.splice(index, 1) }
    },
    addProduct: function () {
      this.collection_products.push({ amount: '', price: '', company_product_id: '' })
    },
    removeProduct: function (index) {
      if (index !== 0) { this.collection_products.splice(index, 1) }
    }
  },
  created () {
    this.getLocations()
    this.getTicketTypes()
    this.getProducts()
  },
  mounted () {
    this.collection_tickets.push({ amount: '', price: '', ticket_type: '' })
  }
}
</script>

<style scoped>

</style>
