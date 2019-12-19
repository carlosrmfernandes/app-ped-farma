<template>
  <div class="panel">
    <div class="panel-header">
      <h1>Editar Evento</h1>
      <!-- step one section -->
      <section v-if="step === 1">
        <h2>
          Identificação do Evento
          <span class="badge badge-pill badge-info">1</span>
        </h2>
        <div class="row mt-5">
          <div class="col-md-3">
            <div class="form-group">
              <label for="title">Nome</label>
              <input
                type="text"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('step_one.title')
                }"
                id="title"
                v-model="step_one.title"
                name="step_one.title"
                placeholder="Nome do evento"
                v-validate="'required'"
                data-vv-as="Nome"
              />
              <span v-show="errors.has('step_one.title')" class="help is-danger">{{
                errors.first("step_one.title")
              }}</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="step_one.location_id">Localização</label>
              <select
                required
                id="step_one.location_id"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('step_one.location_id')
                }"
                v-model="step_one.location_id"
                name="step_one.location_id"
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
              <span v-show="errors.has('step_one.location_id')" class="help is-danger">{{
                errors.first("step_one.location_id")
              }}</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="classification">Classificação</label>
              <select
                required
                v-model="step_one.classification"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('step_one.classification')
                }"
                name="step_one.classification"
                v-validate="'required'"
                data-vv-as="Classificação"
              >
                <option selected="selected" id="classification">A</option>
                <option id="classification">E</option>
                <option id="classification">T</option>
                <option id="classification">G</option>
                <option id="classification">PG</option>
                <option id="classification">PG13</option>
                <option id="classification">R</option>
                <option id="classification">NC17</option>
              </select>
              <span
                v-show="errors.has('step_one.classification')"
                class="help is-danger"
              >{{ errors.first("step_one.classification") }}</span
              >
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="step_one.starts_at"">Data do Evento</label>
              <input
                required
                type="date"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('step_one.starts_at')
                }"
                id="step_one.starts_at"
                v-model="step_one.starts_at"
                name="step_one.starts_at"
                v-validate="'required'"
                data-vv-as="Data do Evento"
              />
              <span v-show="errors.has('step_one.starts_at')" class="help is-danger">{{
                errors.first("step_one.starts_at")
              }}</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="videoId">ID do Vídeo Promocional</label>
              <input
                type="text"
                class="form-control"
                id="videoId"
                v-model="step_one.video_id"
                placeholder="Ex.: A_YQzKo5Ows"
                name="step_one.video_id"
              />
              <small class="form-text text-muted"
              >Exemplo: https://www.youtube.com/watch?v=<b
              >A_YQzKo5Ows</b
              ></small
              >
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="organizer">Organizador</label>
              <select
                required
                id="organizer"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('organizer_id')
                }"
                v-model="step_one.organizer_id"
                name="organizer_id"
                v-validate="'required'"
                data-vv-as="Organizador"
              >
                <option
                  v-for="organizer in organizers"
                  :value="organizer.id"
                  :key="organizer.name"
                >{{ organizer.name }}</option
                >
              </select>
              <span
                v-show="errors.has('organizer_id')"
                class="help is-danger"
              >{{ errors.first("organizer_id") }}</span
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
                    'is-input-danger': errors.has('step_one.description')
                  }"
                  id="description"
                  v-model="step_one.description"
                  rows="4"
                  placeholder="Descrição do evento"
                  name="step_one.description"
                  v-validate="'required'"
                  data-vv-as="Detalhes do evento"
                ></textarea>
                <span
                  v-show="errors.has('step_one.description')"
                  class="help is-danger"
                >{{ errors.first("step_one.description") }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-4 mb-4">
              Backdrop
              <UploadPhoto
                :OnChange="SelectBackdrop"
                v-model="step_one.backdrop"
                width="140px"
                height="185px"
                name="step_one.backdrop"
                v-validate="'required'"
                data-vv-as="Backdrop"
              />
              <span v-show="errors.has('step_one.backdrop')" class="help is-danger">{{
                errors.first("step_one.backdrop")
              }}</span>
            </div>
            <div class="col-md-4">
              Poster
              <UploadPhoto
                :OnChange="SelectPoster"
                v-model="step_one.poster"
                width="140px"
                height="185px"
                name="step_one.poster"
                v-validate="'required'"
                data-vv-as="Poster"
              />
              <span v-show="errors.has('step_one.poster')" class="help is-danger">{{
                errors.first("step_one.poster")
              }}</span>
            </div>
          </div>
        </div>
        <b-button
          variant="primary"
          size="lg"
          class="float-left"
          :disabled="isRequesting ? true : false"
          @click="ProcessForm(1)"
        >
          <span v-if="!isRequesting">Próximo</span>
          <div class="loading-dots" v-if="isRequesting">
            <div class="loading-dots--dot"></div>
            <div class="loading-dots--dot"></div>
            <div class="loading-dots--dot"></div>
          </div>
        </b-button>
      </section>
      <!-- ends step one section -->
      <!-- step two section -->
      <section v-if="step === 2">
        <h2>
          Serviços Adicionais no Evento
          <span class="badge badge-pill badge-info">2</span>
        </h2>
        <div class="row mt-5">
          <div class="col-md-3">
            <div class="form-group">
              <label for="step_two.starts_at">Inicío da Sessão</label>
              <input
                type="datetime-local"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('step_two.starts_at')
                }"
                name="step_two.starts_at"
                v-model="step_two.starts_at"
                id="step_two.starts_at"
              />
              <small class="form-text text-muted">Data e Hora</small>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="step_two.ends_at">Fim da Sessão</label>
              <input
                type="datetime-local"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('step_two.ends_at')
                }"
                name="step_two.ends_at"
                v-model="step_two.ends_at"
                id="step_two.ends_at"
              />
              <small class="form-text text-muted">Data e Hora</small>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="step_two.location_id">Localização</label>
              <select
                required
                id="step_two.location_id"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('step_two.location_id')
                }"
                v-model="step_two.location_id"
                name="step_two.location_id"
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
                v-show="errors.has('step_two.location_id')"
                class="help is-danger"
              >{{ errors.first("step_two.location_id") }}</span
              >
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="step_two.price">Preço</label>
              <input
                type="number"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('step_two.price')
                }"
                placeholder="Ex.: 5000"
                v-validate="'required'"
                data-vv-as="Preço"
                name="step_two.price"
                v-model="step_two.price"
                id="step_two.price"
              />
              <span
                v-show="errors.has('step_two.price')"
                class="help is-danger"
              >{{ errors.first("step_two.price") }}</span
              >
            </div>
          </div>
        </div>
        <div class="jumbotron">
          <h2>Tickets</h2>
          <div class="row"  v-for="(tickets, index) in collection_tickets">
            <div class="col-md-3">
              <div class="form-group">
                <label for="tickets.amount">Quantidade</label>
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
                  id="tickets.amount"
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
                          v-for="ticket in ticket_types"
                          :value="ticket"
                          id="ticket_type">{{ ticket }}</option>
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
                    'form-control': true,
                    'is-input-danger': errors.has(
                      'products.company_product_id'
                    )
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
                    'form-control': true,
                    'is-input-danger': errors.has('products.amount')
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
                    'form-control': true,
                    'is-input-danger': errors.has('products.price')
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
              <label for="step_three.sponsors_id">Patrocinador</label>
              <select
                multiple
                required
                id="step_three.sponsors_id"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('step_three.sponsors_id')
                }"
                v-model="step_three.sponsors_id"
                name="step_three.sponsors_id"
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
              <span v-show="errors.has('step_three.sponsors_id')" class="help is-danger">{{
                errors.first("step_three.sponsors_id")
              }}</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label for="step_three.decks">Decks</label>
              <select
                multiple
                required
                id="step_three.decks"
                :class="{
                  'form-control': true,
                  'is-input-danger': errors.has('step_three.decks')
                }"
                v-model="step_three.decks"
                name="step_three.decks"
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
              <span v-show="errors.has('step_three.decks')" class="help is-danger">{{
                errors.first("step_three.decks")
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
                  'is-input-danger': errors.has('step_three.tags')
                }"
                v-validate="'required'"
                data-vv-as="Tags"
                v-model="step_three.tags"
                name="step_three.tags"
                id="tags"
              />
              <small class="form-text text-muted">Ex.: festa, evento</small>
              <span v-show="errors.has('step_three.ags')" class="help is-danger">{{
                errors.first("step_three.tags")
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
</template>
<script>

import UploadPhoto from '@/components/Form/Photo'

export default {
  props: {
    id: {
      type: String
    }
  },
  components: {
    UploadPhoto
  },
  data: function () {
    return {
      party_event_id: this.id,
      party_event_data: {},
      step: 0,
      organizers: '',
      locations: '',
      classifications: '',
      isRequesting: false,
      hadSuccess: false,
      hadError: '',
      step_one: {
        backdrop: '',
        poster: '',
        description: '',
        location_id: '',
        organizer_id: '',
        title: '',
        starts_at: '',
        event_ticket_types: [],
        classification: '',
        video_id: ''
      },
      step_two: {
        starts_at: '',
        ends_at: '',
        location_id: '',
        price: ''
      },
      step_three: {
        sponsors_id: [],
        tags: [],
        decks: []
      },
      party_event_status: '',
      collection_tickets: [],
      collection_products: [],
      collection_decks: [],
      ticket_types: [],
      tickets: {},
      products: {},
      sponsors: []
    }
  },
  methods: {
    async getDecks () {
      try {
        const result = await this.axios.get(`/decks?currentOnly=false&sorters=CREATED_AT`)
        const res = result.data
        this.collection_decks = res.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    async getTicketTypes () {
      try {
        const result = await this.axios.get(`/events/${this.party_event_id}/ticket_types`)
        const res = result.data

        for (let i = 0; i < res.data.length; i++) {
          this.ticket_types[i] = res.data[i].name
        }
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
      console.log(result)
      return result ? this.updateParty(step) : result
    },
    SelectPoster (file) {
      this.step_one.poster = file
    },
    SelectBackdrop (file) {
      this.step_one.backdrop = file
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
     * getEventStep: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async getEventData (step) {
      try {
        switch (step) {
          case 1:
            const result = await this.axios.get(
              `/party_events/${this.party_event_id}/step_1`
            )
            this.step_one.title = result.data.title
            this.step_one.description = result.data.description
            this.step_one.location_id = result.data.location.id
            this.step_one.organizer_id = result.data.organizer.id
            this.step_one.starts_at = result.data.starts_at
            this.step_one.ends_at = result.data.ends_at
            this.step_one.classification = result.data.classification
            this.step_one.event_ticket_types = result.data.event_ticket_types
            this.step_one.video_id = result.data.video_id === 'null' ? '' : result.data.video_id
            break
          case 2:
            const resultTwo = await this.axios.get(
              `/party_events/${this.party_event_id}/step_2`
            )
            this.step_two.starts_at = resultTwo.data.sessions[0].starts_at
            this.step_two.ends_at = resultTwo.data.sessions[0].ends_at
            this.step_two.location_id = resultTwo.data.sessions[0].location_id
            this.step_two.price = resultTwo.data.sessions[0].price
            this.collection_tickets = resultTwo.data.sessions[0].tickets
            this.collection_products = resultTwo.data.sessions[0].products
            console.log(resultTwo.data)
            break
          case 3:
            const resultThree = await this.axios.get(
              `/party_events/${this.party_event_id}/step_3`
            )

            this.step_three.tags = resultThree.data.tags

            for (let i = 0; i < resultThree.data.sponsors.length; i++) {
              this.step_three.sponsors_id[i] = resultThree.data.sponsors[i].id
            }

            for (let i = 0; i < resultThree.data.decks.length; i++) {
              this.step_three.decks[i] = resultThree.data.decks[i].id
            }
            break
          default:
            console.log('Sorry, we are out of ' + step + '.')
        }
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
    },
    async updateParty (step) {
      if (step === 1) {
        this.isRequesting = true
        try {
          const fData = new FormData()

          fData.append('poster', this.step_one.poster)
          fData.append('backdrop', this.step_one.backdrop)
          fData.append('event_ticket_types', this.event_ticket_types)
          fData.append('classification', this.step_one.classification)
          fData.append('location_id', this.step_one.location_id)
          fData.append('organizer_id', this.step_one.organizer_id)
          fData.append('video_id', this.step_one.video_id)
          fData.append('description', this.step_one.description)
          fData.append('starts_at', this.step_one.starts_at)
          fData.append('title', this.step_one.title)

          // Fire the PUT request
          const res = await this.axios({
            url: `/party_events/${this.party_event_id}/step_1`,
            method: 'put',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: fData
          })

          if (res) {
            // Next step
            this.step++
          }
        } catch (e) {
          this.hadError =
            'Não foi possível realizar esta operação. Tente novamente'
          console.log(e)
        }
        this.isRequesting = false
      } else if (step === 2) {
        this.isRequesting = true
        try {
          this.step_two.price = parseInt(this.step_two.price, 10)

          this.collection_products.amount = parseInt(
            this.collection_products.amount,
            10
          )
          this.collection_products.price = parseInt(this.collection_products.price, 10)

          this.collection_tickets.amount = parseInt(this.collection_tickets.amount, 10)
          this.collection_tickets.price = parseInt(this.collection_tickets.price, 10)

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
                  ends_at: this.step_two.ends_at,
                  location_id: this.step_two.location_id,
                  price: this.step_two.price,
                  starts_at: this.step_two.starts_at,
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
        } catch (e) {
          this.hadError =
            'Não foi possível realizar esta operação. Tente novamente'
          console.log(e)
        }
        this.isRequesting = false
      } else if (step === 3) {
        this.isRequesting = true
        this.step_three.tags = this.step_three.tags.split(', ')

        try {
          // Fire the PUT request
          const res = await this.axios({
            url: `/party_events/${this.party_event_id}/step_3`,
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            data: {
              decks: this.step_three.decks,
              sponsors: this.step_three.sponsors_id,
              tags: this.step_three.tags
            }
          })

          if (res) {
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
    this.step++
    this.getLocations()
    this.getTicketTypes()
    this.getOrganizers()
    this.getSponsors()
    this.getDecks()
  },
  mounted () {
    this.getEventData(this.step)
  }
}
</script>
<style>

</style>
