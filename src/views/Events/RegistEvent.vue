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
                class="form-control"
                id="title"
                v-model="title"
                placeholder="Nome do evento"
                required
              />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="event-class">Localização</label>
              <select required id="location" class="form-control" v-model="location_id">
                <option
                  v-for="location in locations"
                  :value="location.id"
                  :key="location.id"
                >{{ location.description }}</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="form-group">
                <label for="event-class">Classificação</label>
                <select required v-model="classification" class="form-control">
                  <option selected id="classification">A</option>
                  <option id="classification">E</option>
                  <option id="classification">T</option>
                </select>
              </div>
              <div class="form-group ml-3 col-md-3">
                <label for="event-class">Data do Evento</label>
                <input required type="date" class="form-control" id="startsAt" v-model="starts_at" />
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
                  class="form-control"
                  id="description"
                  v-model="description"
                  rows="4"
                  placeholder="Descrição do evento"
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            Poster
            <UploadPhoto :OnChange="SelectPoster" v-model="poster" width="140px" height="185px" />
          </div>
          <div class="col-md-2">
            Backdrop
            <UploadPhoto
              :OnChange="SelectBackdrop"
              v-model="backdrop"
              width="140px"
              height="185px"
            />
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
                required
              />
            </div>
          </div>
        </div>
        <button @click.prevent="postPartyEvent(1)" class="btn btn-primary">Próximo</button>
      </div>
    </section>
    <!-- Step one -->

    <section v-if="step === 2">
      <h2>
        Serviços Adicionais no Evento
        <span class="badge badge-pill badge-info">2</span>
      </h2>

      <div class="row">
        <div class="col-md-9">
          <table class="table table-striped">
            <thead>
              <tr>Sessão 1</tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Casal VIP</th>
                <td>Quantidade</td>
                <td>
                  <input
                    type="number"
                    class="form-control col-md-5"
                    id="localization"
                    placeholder="Ex.: 10"
                  />
                </td>
                <td>Preço</td>
                <td>
                  <input
                    type="number"
                    class="form-control col-md-5"
                    id="price"
                    placeholder="Ex.: 1000"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Solteiro VIP</th>
                <td>Quantidade</td>
                <td>
                  <input
                    type="number"
                    class="form-control col-md-5"
                    id="localization"
                    placeholder="Ex.: 10"
                  />
                </td>
                <td>Preço</td>
                <td>
                  <input
                    type="number"
                    class="form-control col-md-5"
                    id="price"
                    placeholder="Ex.: 1000"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Casal Normal</th>
                <td>Quantidade</td>
                <td>
                  <input
                    type="number"
                    class="form-control col-md-5"
                    id="quatity"
                    placeholder="Ex.: 10"
                  />
                </td>
                <td>Preço</td>
                <td>
                  <input
                    type="number"
                    class="form-control col-md-5"
                    id="price"
                    placeholder="Ex.: 1000"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button @click.prevent="prev()" class="btn btn-primary">Anterior</button>
      <button @click.prevent="next()" class="btn btn-primary ml-2">Próximo</button>
    </section>
    <!-- Step two -->

    <section v-if="step === 3">
      <h2>
        Patrocinadores
        <span class="badge badge-pill badge-info">3</span>
      </h2>

      <div class="row">
        <input type="text" class="form-control col-md-5" placeholder="Ex.: Nextbss" />
      </div>

      <h3>Disponibilidade dos ingressos</h3>
      <div class="row">
        <div class="col-md-3">
          <input type="date" class="form-control" id="event-date" />
          <small class="form-text text-muted">Início de vendas</small>
        </div>
        <div class="col-md-3">
          <input type="date" class="form-control" id="event-date" />
          <small class="form-text text-muted">Fim de vendas</small>
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

export default {
  components: {
    UploadPhoto
  },
  data: function() {
    return {
      step: 1,
      stepCount: 3,
      sessionsCount: 0,
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
      endsAt: "",
      locationId: "",
      party_event_id: "",
      startsAt: "",
      ticketType: "",
      amount: "",
      company_product_id: ""
    };
  },
  methods: {
    /**
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
    formatDate(date) {
      return moment(date).toISOString();
    },
    async postPartyEvent(step) {
      // /api/party_events/company/8cdf8e59-356e-4e09-9a96-bda0db2b12f3/step_1
      if (step === 1) {
        try {
          this.starts_at = this.formatDate(this.starts_at);
          // const result = await this.axios.post('/party_events/company/8cdf8e59-356e-4e09-9a96-bda0db2b12f3/step_1', this.form)
          // if (result) {
          // Create a new form data object
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
            url: `/party_events/company/8cdf8e59-356e-4e09-9a96-bda0db2b12f3/step_1`,
            method: "post",
            headers: { "Content-Type": "multipart/form-data" },
            data: fData
          });
          this.party_event_id = res.data;
          console.log(this.party_event_id);

          // Redirect to the ListEvent views
          //this.$router.push({ name: "ListEvent" });
          this.step++;
        } catch (e) {
          this.hadError =
            "Não foi possível realizar esta operação. Tente novamente";
          console.log(e);
        }
      } else if (step === 2) {
        // try {
        //   this.startsAt = this.formatDate(this.startsAt);
        //   const fData = new FormData();
        //   fData.append("amount", this.amount);
        //   fData.append(
        //     "company_product_id",
        //     "8cdf8e59-356e-4e09-9a96-bda0db2b12f3"
        //   );
        //   fData.append("endsAt", this.endsAt);
        //   fData.append("locationId", this.location_id);
        //   fData.append("party_event_id", this.party_event_id);
        //   fData.append("startsAt", this.startsAt);
        //   fData.append("ticketType", this.ticketType);
        //   // Fire the PUT request
        //   const res = await this.axios({
        //     url: `/party_events/step_2`,
        //     method: "post",
        //     headers: { "Content-Type": "multipart/form-data" },
        //     data: fData
        //   });
        //   console.log(res);
        //   // Redirect to the ListEvent views
        //   this.$router.push({ name: "ListEvent" });
        //   // }
        // } catch (e) {
        //   this.hadError =
        //     "Não foi possível realizar esta operação. Tente novamente";
        //   console.log(e);
        // }
        alert("Step 2!!!");
      } else {
      }
    },
    SelectPoster(file) {
      this.poster = file;
    },
    SelectBackdrop(file) {
      this.backdrop = file;
    },
    next: function() {
      this.step++;
    },
    prev: function() {
      this.step--;
    },
    submit: function() {}
  },
  created() {
    this.getLocations();
  }
};
</script>

<style>
</style>
