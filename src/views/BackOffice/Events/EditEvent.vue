<template>
  <div>
    <div class="panel">
      <div class="panel-header">
        <h1>Editar Evento</h1>
        <section v-if="step === 2">
          <h2>
            Serviços Adicionais no Evento
            <span class="badge badge-pill badge-info">2</span>
          </h2>
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
            <div class="row"  v-for="(tickets, index) in collection_tickets">
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
                    <option selected id="ticket_type">COUPLE</option>
                    <option id="ticket_type">WOMAN</option>
                    <option id="ticket_type">KID</option>
                    <option id="ticket_type">MAN</option>
                    <option id="ticket_type">REGULAR</option>
                    <option id="ticket_type">VIP</option>
                    <option id="ticket_type">VIP_COUPLE</option>
                    <option id="ticket_type">VIP_KID</option>
                    <option id="ticket_type">VIP ADULTO</option>
                    <option id="ticket_type">VIP KID 2 - 11</option>
                    <option id="ticket_type">VIP KID 12 - 16</option>
                  </select>
                  <span
                    v-show="errors.has('tickets.ticket_type')"
                    class="help is-danger"
                  >{{ errors.first("tickets.ticket_type") }}</span
                  >
                </div>
              </div>
              <div v-show="index !== 0" class="col-md-3 mt-4 pt-2">
                <button v-on:click="removeTicket(index)" class="btn btn-danger">Remover</button>
              </div>
            </div>
            <!-- End tickets section -->
            <button class="btn btn-primary" v-on:click="addTicket">Adicionar Ticket</button>
          </div>
          <div class="jumbotron">
            <h2>Produtos</h2>
            <div class="row" v-for="(products, index) in collection_products">
              <div class="col-md-3">
                <div class="form-group">
                  <label for="company_product_id">Produto</label>
                  <select
                    required
                    id="company_product_id"
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
                <button v-on:click="removeProduct(index)" class="btn btn-danger">Remover</button>
              </div>
            </div>
            <button v-on:click="addProduct" class="btn btn-primary">Adicionar Produto</button>
          </div>
          <b-button
            variant="primary"
            size="lg"
            class="float-left mb-5 col-md-2"
            :disabled="isRequesting ? true : false"
            @click="ProcessForm(2)"
          >
            <span v-if="!isRequesting">Próximo</span>
            <div class="loading-dots" v-if="isRequesting">
              <div class="loading-dots--dot"></div>
              <div class="loading-dots--dot"></div>
              <div class="loading-dots--dot"></div>
            </div>
          </b-button>
          <button class="btn btn-dark btn-lg mb-5 col-md-2 ml-3">
            <span>Adicionar Sessão</span>
          </button>
        </section>
        <!-- ends step two section -->
        <section v-if="step === 3">
          <h2>
            Patrocinadores
            <span class="badge badge-pill badge-info">3</span>
          </h2>

          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label for="sponsors_id">Patrocinador</label>
                <select
                  multiple
                  required
                  id="sponsors_id"
                  :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('sponsors_id')
                }"
                  v-model="sponsors_id"
                  name="sponsors_id"
                  v-validate="'required'"
                  data-vv-as="Patrocinador"
                >
                  <option
                    v-for="sponsor in sponsors"
                    :value="sponsor.id"
                    :key="sponsor.id"
                  >{{ sponsor.description }}</option
                  >
                </select>
                <span v-show="errors.has('sponsors_id')" class="help is-danger">{{
                errors.first("sponsors_id")
              }}</span>
              </div>
            </div>
            <div class="col-md-4">
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
                  v-model="decks"
                  name="decks"
                  v-validate="'required'"
                  data-vv-as="Patrocinador"
                >
                  <option
                    v-for="deck in collection_decks"
                    :value="deck.id"
                    :key="deck.id"
                  >{{ deck.name }}</option
                  >
                </select>
                <span v-show="errors.has('decks')" class="help is-danger">{{
                errors.first("decks")
              }}</span>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="tags">Tags</label>
                <input
                  type="text"
                  :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('tags')
                }"
                  v-validate="'required'"
                  data-vv-as="Tags"
                  v-model="tags"
                  name="tags"
                  id="tags"
                />
                <small class="form-text text-muted">Ex.: festa, evento</small>
                <span v-show="errors.has('tags')" class="help is-danger">{{
                errors.first("tags")
              }}</span>
              </div>
            </div>
          </div>
          <button @click.prevent="prev()" class="btn btn-primary ml-2">
            Anterior
          </button>
          <b-button
            variant="primary"
            size="md ml-2"
            class="float-left"
            :disabled="isRequesting ? true : false"
            @click="ProcessForm(3)"
          >
            <span v-if="!isRequesting">Finalizar</span>
            <div class="loading-dots" v-if="isRequesting">
              <div class="loading-dots--dot"></div>
              <div class="loading-dots--dot"></div>
              <div class="loading-dots--dot"></div>
            </div>
          </b-button>
        </section>
        <!-- Step three -->
      </div>
      <div class="panel-body"></div>
    </div>
  </div>
</template>

<script>
import UploadPhoto from '@/components/Form/Photo'

export default {
  props: {
    id: {
      type: String
    }
  },
  data: function () {
    return {
      party_event_id: this.id,
      party_event_data: '',
      step: 0,
      locations: '',
      organizers: '',
      organizer_id: '',
      classifications: '',
      poster: '',
      backdrop: '',
      classification: '',
      title: '',
      tags: '',
      description: '',
      starts_at: '',
      video_id: '',
      location_id: '',
      products: {},
      startsAt: '',
      company_product_id: '',
      company_products: '',
      event_session: {},
      collection_tickets: [],
      collection_products: [],
      tickets: {},
      sponsors: {},
      decks: [],
      collection_decks: [],
      sponsors_id: [],
      isRequesting: false,
      hadSuccess: false,
      hadError: ''
    }
  },
  components: {
    UploadPhoto
  },
  methods: {
    /*
     * updatePartyEvent: This method will fire a PATCH request and then
     * assign the response data into the state property: form
     */
    async updatePartyEvent (step) {
      try {
        if (step == 2) {
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
          // Fire the PUT request
          const res = await this.axios({
            url: `/party_events/${this.party_event_id}/step_2`,
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            data: {
              sessions: [
                {
                  ends_at: this.event_session.ends_at,
                  location_id: this.event_session.location_id,
                  price: this.event_session.price,
                  starts_at: this.event_session.starts_at,
                  products: this.collection_products,
                  tickets: this.collection_tickets
                }
              ]
            }
          })

          if (res) {
            // Next step
            this.step++
          }
        } else if (step == 3) {
          this.isRequesting = true
          this.tags = this.tags.split(', ')
          try {
            // Fire the PUT request
            const res = await this.axios({
              url: `/party_events/${this.party_event_id}/step_3`,
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              data: {
                decks: this.decks,
                sponsors: this.sponsors_id,
                tags: this.tags
              }
            })

            if (res) {
              // Next step
              this.step++
              // Redirect to the Event views
              this.$router.push({ name: 'ListEvent' })
            }
          } catch (e) {
            this.hadError =
              'Não foi possível realizar esta operação. Tente novamente'
            console.log(e)
          }
          this.isRequesting = false
        }
      } catch (e) {
        this.hadError =
          'Não foi possível realizar esta operação. Tente novamente'
        console.log(e)
      }
      this.isRequesting = false
    },
    async getDecks () {
      try {
        const result = await this.axios.get(`/decks?currentOnly=false&sorters=CREATED_AT`)
        const res = result.data
        this.collection_decks = res.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    /*
     * getEventStep: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async getEventStep () {
      try {
        const result = await this.axios.get(
          `/party_events/${this.party_event_id}`
        )
        this.step =
          result.data.step != 3
            ? (result.data.step += 1)
            : this.$router.push({ name: 'ShowEvent', id: this.party_event_id })
        if (this.step == 2) {
          const step_two_result = await this.axios.get(
            `/party_events/${this.party_event_id}/step_2`
          )
          this.party_event_data = step_two_result.data
        } else if (this.step == 3) {
          const step_three_result = await this.axios.get(
            `/party_events/${this.party_event_id}/step_3`
          )
          this.party_event_data = step_three_result.data
        }
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
    async getClassifications () {
      try {
        // this.axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.TOKEN}`;
        const result = await this.axios.get(`/party_events/classifications`)
        this.classifications = result
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    /*
     *  getSponsors: This method will fire a GET request and then
     * assign the response data into the state property: form.
     */
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
     *  ProcessForm: This method will validate the form using vee-validate
     *  component and then call the action method defined for this view
     *  if everything passes the validation.
     */
    async ProcessForm (step) {
      this.hadError = ''
      const result = await this.$validator.validateAll()
      return result ? this.updatePartyEvent(step) : result
    },
    SelectPoster (file) {
      this.poster = file
    },
    SelectBackdrop (file) {
      this.backdrop = file
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
    this.getSponsors()
    this.getOrganizers()
    this.getProducts()
    this.getEventStep()
    this.getDecks()
  },
  mounted () {
    this.collection_tickets.push({ amount: '', price: '', ticket_type: '' })
  }
}
</script>

<style></style>
