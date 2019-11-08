<template>
  <div id="steps-form">
    <h1>Novo Evento</h1>
    <section v-if="step === 1">
      <h2>
        Identificação do Evento
        <span class="badge badge-pill badge-info">1</span>
      </h2>
      <hr />
      <div>
        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label for="event-name">Nome</label>
              <input
                type="text"
                :class="{'form-control': true, 'is-input-danger': errors.has('title')}"
                id="title"
                v-model="title"
                name="title"
                placeholder="Nome do evento"
                v-validate="'required'"
                data-vv-as="Nome"
              />
              <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="event-class">Localização</label>
              <select
                required
                id="location"
                :class="{'form-control': true, 'is-input-danger': errors.has('location_id')}"
                v-model="location_id"
                name="location_id"
                v-validate="'required'"
                data-vv-as="Localização"
              >
                <option
                  v-for="location in locations"
                  :value="location.id"
                  :key="location.id"
                >{{ location.description }}</option>
              </select>
              <span
                v-show="errors.has('location_id')"
                class="help is-danger"
              >{{ errors.first('location_id') }}</span>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="form-group">
                <label for="event-class">Classificação</label>
                <select
                  required
                  v-model="classification"
                  :class="{'form-control': true, 'is-input-danger': errors.has('classification')}"
                  name="classification"
                  v-validate="'required'"
                  data-vv-as="Classificação"
                >
                  <option selected id="classification">A</option>
                  <option id="classification">E</option>
                  <option id="classification">T</option>
                </select>
                <span
                  v-show="errors.has('classification')"
                  class="help is-danger"
                >{{ errors.first('classification') }}</span>
              </div>
              <div class="form-group ml-3 col-md-3">
                <label for="event-class">Data do Evento</label>
                <input
                  required
                  type="date"
                  :class="{'form-control': true, 'is-input-danger': errors.has('starts_at')}"
                  id="startsAt"
                  v-model="starts_at"
                  name="starts_at"
                  v-validate="'required'"
                  data-vv-as="Data do Evento"
                />
                <span
                  v-show="errors.has('starts_at')"
                  class="help is-danger"
                >{{ errors.first('starts_at') }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label for>Detalhes</label>
              <div class="form-group">
                <textarea
                  :class="{'form-control': true, 'is-input-danger': errors.has('description')}"
                  id="description"
                  v-model="description"
                  rows="4"
                  placeholder="Descrição do evento"
                  name="description"
                  v-validate="'required'"
                  data-vv-as="Detalhes do evento"
                ></textarea>
                <span
                  v-show="errors.has('description')"
                  class="help is-danger"
                >{{ errors.first('description') }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            Poster
            <UploadPhoto
              :OnChange="SelectPoster"
              v-model="poster"
              width="140px"
              height="185px"
              name="poster"
              v-validate="'required'"
              data-vv-as="Poster"
            />
            <span v-show="errors.has('poster')" class="help is-danger">{{ errors.first('poster') }}</span>
          </div>
          <div class="col-md-2">
            Backdrop
            <UploadPhoto
              :OnChange="SelectBackdrop"
              v-model="backdrop"
              width="140px"
              height="185px"
              name="backdrop"
              v-validate="'required'"
              data-vv-as="Backdrop"
            />
            <span
              v-show="errors.has('backdrop')"
              class="help is-danger"
            >{{ errors.first('backdrop') }}</span>
          </div>
          <div class="col-md-3 form-group mt-4">
            <div class="form-group">
              <label for="evideoId">ID do Vídeo Promocional</label>
              <input
                type="text"
                class="form-control"
                id="videoId"
                v-model="video_id"
                placeholder="Ex.: "
                name="video_id"
                v-validate="'required'"
                data-vv-as="ID do Vídeo Promocional"
              />
              <span
                v-show="errors.has('video_id')"
                class="help is-danger"
              >{{ errors.first('video_id') }}</span>
            </div>
          </div>
        </div>
        <!-- <button @click.prevent="postPartyEvent(1)" class="btn btn-primary">Próximo</button> -->
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
      </div>
    </section>
    <!-- Step one -->

    <section v-if="step === 2">
      <h2>
        Serviços Adicionais no Evento
        <span class="badge badge-pill badge-info">2</span>
      </h2>

      <div class="row">
        <div class="col-md-6 mb-4">
          <h5>Sessões</h5>
          <div class="row">
            <div class="col-md-5">
              <input
                type="date"
                :class="{'form-control': true, 'is-input-danger': errors.has('event_session.starts_at')}"
                v-validate="'required'"
                data-vv-as="Início de Vendas"
                name="event_session.starts_at"
                v-model="event_session.starts_at"
                id="session_starts_at"
              />
              <span
                v-show="errors.has('event_session.starts_at')"
                class="help is-danger"
              >{{ errors.first('event_session.starts_at') }}</span>
              <small class="form-text text-muted">Início de vendas</small>
            </div>
            <div class="col-md-5">
              <input
                type="date"
                :class="{'form-control': true, 'is-input-danger': errors.has('event_session.ends_at')}"
                v-validate="'required'"
                data-vv-as="Fim de Vendas"
                name="event_session.ends_at"
                v-model="event_session.ends_at"
                id="event_session_ends_at"
              />
              <span
                v-show="errors.has('event_session.ends_at')"
                class="help is-danger"
              >{{ errors.first('event_session.ends_at') }}</span>
              <small class="form-text text-muted">Fim de vendas</small>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="event-class">Localização</label>
                <select
                  required
                  id="location_id"
                  :class="{'form-control': true, 'is-input-danger': errors.has('event_session.location_id')}"
                  v-model="event_session.location_id"
                  name="event_session.location_id"
                  v-validate="'required'"
                  data-vv-as="Localização"
                >
                  <option
                    v-for="location in locations"
                    :value="location.id"
                    :key="location.id"
                  >{{ location.description }}</option>
                </select>
                <span
                  v-show="errors.has('event_session.location_id')"
                  class="help is-danger"
                >{{ errors.first('event_session.location_id') }}</span>
              </div>
            </div>
            <div class="col-md-5">
              <input
                type="number"
                :class="{'form-control': true, 'is-input-danger': errors.has('event_session.price')}"
                v-validate="'required'"
                data-vv-as="Preço"
                name="event_session.price"
                v-model="event_session.price"
                id="price"
              />
              <span
                v-show="errors.has('event_session.price')"
                class="help is-danger"
              >{{ errors.first('event_session.price') }}</span>
              <small class="form-text text-muted">Preço</small>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-4">
          <h5>Produtos</h5>
          <div class="row">
            <div class="col-md-5">
              <input
                type="number"
                :class="{'form-control': true, 'is-input-danger': errors.has('session_product.amount')}"
                v-validate="'required'"
                data-vv-as="Quantidade"
                v-model="session_product.amount"
                name="session_product.amount"
                id="amount"
              />
              <span
                v-show="errors.has('session_product.amount')"
                class="help is-danger"
              >{{ errors.first('session_product.amount') }}</span>
              <small class="form-text text-muted">Quantidade</small>
            </div>
            <div class="col-md-5">
              <input
                type="number"
                :class="{'form-control': true, 'is-input-danger': errors.has('session_product.price')}"
                v-validate="'required'"
                data-vv-as="Preço"
                name="session_product.price"
                v-model="session_product.price"
                id="price"
              />
              <span
                v-show="errors.has('session_product.price')"
                class="help is-danger"
              >{{ errors.first('session_product.price') }}</span>
              <small class="form-text text-muted">Preço</small>
            </div>
          </div>
        </div>
        <div class="col-md-8 mb-4">
          <h5>Ingressos</h5>
          <div class="row">
            <div class="col-md-4">
              <input
                type="number"
                :class="{'form-control': true, 'is-input-danger': errors.has('tickets.amount')}"
                v-validate="'required'"
                data-vv-as="Quantidade"
                v-model="tickets.amount"
                name="tickets.amount"
                id="ticket_amount"
              />
              <span
                v-show="errors.has('tickets.amount')"
                class="help is-danger"
              >{{ errors.first('tickets.amount') }}</span>
              <small class="form-text text-muted">Quantidade</small>
            </div>
            <div class="col-md-4">
              <input
                type="number"
                :class="{'form-control': true, 'is-input-danger': errors.has('tickets.price')}"
                v-validate="'required'"
                data-vv-as="Preço"
                name="tickets.price"
                v-model="tickets.price"
                id="ticket_price"
              />
              <span
                v-show="errors.has('tickets.price')"
                class="help is-danger"
              >{{ errors.first('tickets.price') }}</span>
              <small class="form-text text-muted">Preço</small>
            </div>
            <div class="col-md-4">
              <select
                required
                v-model="tickets.ticket_type"
                :class="{'form-control': true, 'is-input-danger': errors.has('tickets.ticket_type')}"
                name="tickets.ticket_type"
                v-validate="'required'"
                data-vv-as="Tipo"
              >
                <option id="ticket_type">COUPLE</option>
                <option id="ticket_type">WOMAN</option>
                <option id="ticket_type">IMAX_3DX</option>
                <option id="ticket_type">IMAX_4DX</option>
                <option id="ticket_type">KID</option>
                <option id="ticket_type">VIP_3D</option>
                <option id="ticket_type">VIP_2D</option>
                <option id="ticket_type">ECONOMIC</option>
                <option id="ticket_type">$2D</option>
                <option id="ticket_type">MAN</option>
                <option id="ticket_type">IMAX</option>
                <option id="ticket_type">REGULAR</option>
                <option id="ticket_type">VIP</option>
                <option id="ticket_type">VIP_COUPLE</option>
                <option id="ticket_type">$4DX</option>
                <option id="ticket_type">$3D</option>
                <option id="ticket_type">VIP_KID</option>
              </select>
              <span
                v-show="errors.has('tickets.ticket_type')"
                class="help is-danger"
              >{{ errors.first('tickets.ticket_type') }}</span>
              <small class="form-text text-muted">Tipo de Ingresso</small>
            </div>
          </div>
        </div>
      </div>
      <button @click.prevent="prev()" class="btn btn-primary">Anterior</button>
      <b-button
        variant="primary"
        size="md mr-2"
        class="float-left"
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
    </section>
    <!-- Step two -->

    <section v-if="step === 3">
      <h2>
        Patrocinadores
        <span class="badge badge-pill badge-info">3</span>
      </h2>

      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="event-class">Patrocinador</label>
            <select
              required
              id="location_id"
              :class="{'form-control': true, 'is-input-danger': errors.has('sponsors_id')}"
              v-model="sponsors_id"
              name="sponsors_id"
              v-validate="'required'"
              data-vv-as="Patrocinador"
            >
              <option
                v-for="sponsor in sponsors"
                :value="sponsor.id"
                :key="sponsor.id"
              >{{ sponsor.description }}</option>
            </select>
            <span
              v-show="errors.has('sponsors_id')"
              class="help is-danger"
            >{{ errors.first('sponsors_id') }}</span>
          </div>
        </div>
      </div>
      <button @click.prevent="prev()" class="btn btn-primary">Anterior</button>
      <button @click.prevent="submit()" class="btn btn-primary ml-2">Finalizar</button>
    </section>
    <!-- Step three -->
  </div>
</template>

<script>
import moment from "moment";
import UploadPhoto from "@/components/Form/Photo";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    UploadPhoto
  },
  data: function() {
    return {
      step: 0,
      stepCount: 3,
      locations: "",
      classifications: "",
      poster: "",
      backdrop: "",
      classification: "",
      title: "",
      description: "",
      starts_at: "",
      video_id: "",
      location_id: "",
      party_event_id: "",
      startsAt: "",
      company_product_id: "",
      event_session: {},
      session_product: {},
      tickets: {},
      sponsors: {},
      sponsors_id: "",
      isRequesting: false,
      hadSuccess: false,
      hadError: ""
    };
  },
  methods: {
    /*
     * getLOcations: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async getLocations() {
      try {
        const result = await this.axios.get(`/locations`);
        this.locations = result.data;
      } catch (e) {
        this.hadError = "Não foi possível carregar as informações.";
      }
    },
    async getClassifications() {
      try {
        // this.axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.TOKEN}`;
        const result = await this.axios.get(`/party_events/classifications`);
        this.classifications = result;
      } catch (e) {
        this.hadError = "Não foi possível carregar as informações.";
      }
    },
    async getSponsors() {
      try {
        const result = await this.axios.get(`/sponsors/all`);
        this.sponsors = result.data;
      } catch (e) {
        this.hadError = "Não foi possível carregar as informações.";
      }
    },
    formatDate(date) {
      return moment(date).toISOString();
    },
    /*
     *  ProcessForm: This method will validate the form using vee-validate
     *  component and then call the action method defined for this view
     *  if everything passes the validation.
     */
    async ProcessForm(step) {
      this.hadError = "";
      const result = await this.$validator.validateAll();
      return result ? this.postPartyEvent(step) : result;
    },
    /*
     *  postPartyEvent: This method will create a post request step by step to regist a
     *  new party event and then redirect to the ListEvent component.
     */
    async postPartyEvent(step) {
      // /api/party_events/company/8cdf8e59-356e-4e09-9a96-bda0db2b12f3/step_1
      if (step === 1) {
        this.isRequesting = true;
        try {
          this.starts_at = this.formatDate(this.starts_at);

          const fData = new FormData();

          fData.append("poster", this.poster);
          fData.append("backdrop", this.backdrop);
          fData.append("classification", this.classification);
          fData.append("locationId", this.location_id);
          fData.append("videoId", this.video_id);
          fData.append("description", this.description);
          fData.append("startsAt", this.starts_at);
          fData.append("title", this.title);

          // Fire the PUT request
          const res = await this.axios({
            url: `/party_events/company/ec04cccf-aaf4-4166-a558-38a2e68f167a/step_1`,
            method: "post",
            headers: { "Content-Type": "multipart/form-data" },
            data: fData
          });

          if (res) {
            // Get this party_event_id
            this.party_event_id = res.data;
            console.log("Enviado! Passo 1.");
            // Next step
            this.step++;
          }
        } catch (e) {
          this.hadError =
            "Não foi possível realizar esta operação. Tente novamente";
          console.log(e);
        }
        this.isRequesting = false;
      } else if (step === 2) {
        this.isRequesting = true;
        try {
          this.event_session.starts_at = this.formatDate(
            this.event_session.starts_at
          );
          this.event_session.ends_at = this.formatDate(
            this.event_session.ends_at
          );
          this.event_session.price = parseInt(this.event_session.price, 10);

          this.session_product.amount = parseInt(
            this.session_product.amount,
            10
          );
          this.session_product.price = parseInt(this.session_product.price, 10);

          this.tickets.amount = parseInt(this.tickets.amount, 10);
          this.tickets.price = parseInt(this.tickets.price, 10);

          // Fire the PUT request
          const res = await this.axios({
            url: `/party_events/step_2`,
            method: "patch",
            headers: { "Content-Type": "application/json" },
            params: {
              party_event_id: this.party_event_id,
              company_product_id: "013593df-7376-4b0b-9a7a-1a7404e0c8b2"
            },
            data: {
              event_session: this.event_session,
              session_product: this.session_product,
              tickets: this.tickets
            }
          });

          if (res) {
            // Get this party_event_id
            // this.party_event_id = res.data;
            console.log("Enviado! Passo 2.");
            // Next step
            this.step++;
          }
        } catch (e) {
          this.hadError =
            "Não foi possível realizar esta operação. Tente novamente";
          console.log(e);
          console.log("Erro!");
        }
        this.isRequesting = false;
      } else {
      }
    },
    SelectPoster(file) {
      this.poster = file;
    },
    SelectBackdrop(file) {
      this.backdrop = file;
    },
    prev: function() {
      this.step--;
    },
    submit: function() {}
  },
  created() {
    this.step = 3;
    this.getLocations();
  }
};
</script>

<style>
</style>
