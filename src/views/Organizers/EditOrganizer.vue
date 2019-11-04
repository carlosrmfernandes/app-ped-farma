<template>
  <div class="panel">
    <div class="panel-header">
      <h1>Editar Organizador</h1>
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
        @click="UpdateOrganizer"
        v-show="!isEditable"
      >
        <span v-if="!isRequesting">salvar</span>
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
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Empresa</label>
            <select class="custom-select" v-model="form.company_id" :disabled="isEditable">
              <option selected>Choose...</option>
              <option
                :value="company.id"
                v-for="(company, index) of companies"
                :key="index"
              >{{company.name}}</option>
            </select>
            <!-- <input type="text" class="form-control" v-model="form.email" id="Sponsor-name" placeholder="Nome do organizador" /> -->
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Email</label>
            <input
              type="text"
              class="form-control"
              v-model="form.email"
              id="Sponsor-name"
              placeholder="Email"
              :disabled="isEditable"
            />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Facebook</label>
            <input
              type="text"
              class="form-control"
              v-model="form.facebook_url"
              id="Sponsor-name"
              placeholder="URL do Facebook"
              :disabled="isEditable"
            />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Instagram</label>
            <input
              type="text"
              class="form-control"
              v-model="form.instagram_url"
              id="Sponsor-name"
              placeholder="URL do Instagram"
              :disabled="isEditable"
            />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Twitter</label>
            <input
              type="text"
              class="form-control"
              v-model="form.twitter_url"
              id="Sponsor-name"
              placeholder="URL do Twitter"
              :disabled="isEditable"
            />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for="event-name">Telefone</label>
            <input
              type="text"
              class="form-control"
              v-model="form.phone_number"
              id="Sponsor-name"
              placeholder="999 999 999"
              :disabled="isEditable"
            />
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <label for>Detalhes</label>
            <div class="form-group">
              <textarea class="form-control" rows="4" placeholder="Descrição do evento" :disabled="isEditable"></textarea>
            </div>
          </div>
        </div>
        <!-- <NextInput placeholder="Telefone, Email, Facebook, Instagram" /> -->
      </div>
      <div class="row flex">
        <Address></Address>
      </div>
      <div class="row">
        <UploadPhoto
          :defaultImage="form.logo"
          :OnChange="SelectImage"
          width="140px"
          height="185px"
        />
      </div>
      <div class="panel-footer">
      </div>
    </div>
    <!-- Remove Modal-->
    <b-modal id="modal-remove" title="Organizador">
      <p class="my-4">Tem certeza que deseja remover?</p>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button variant="primary" size="sm" class="float-right" @click="RemoveOrganizer">
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
  </div>
</template>
<script>
// import NextInput from '@/components/Form/NextInput'
import Address from '@/components/Form/Address'
import UploadPhoto from '@/components/Form/Photo'

export default {
  components: {
    // NextInput,
    Address,
    UploadPhoto
  },
  props: {
    id: {
      type: String
    },
    isEditable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: {},
      companies: [],
      isRequesting: false,
      isOrderSaved: false,
      hadError: '',
      hadSuccess: '',
      file: ''
    }
  },
  methods: {
    /*
     *  ProcessForm: This method will validate the form using vee-validate
     *  component and then call the action method defined for this view
     *  if everything passes the validation.
     */
    async ProcessForm () {
      this.hadError = ''
      const result = await this.$validator.validateAll()
      return result ? this.UpdateOrganizer() : result
    },
    editOrganizer () {
      this.isEditable = false
    },
    async allCompanies () {
      try {
        const result = await this.axios.get(`/companies/pages`)
        const res = result.data
        this.companies = res.data
      } catch (e) {
        this.hadError =
          'Não foi possível carregar as encomendas. Actualize a página.'
      }
    },
    SelectImage (file) {
      this.file = file
    },
    /**
     * GetCompany: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async GetOrganizer () {
      this.isRequesting = true
      try {
        const result = await this.axios.get(`/organizer/${this.id}`)
        this.form = result.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
      this.isRequesting = false
    },
    /**
     * GetCompany: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async RemoveOrganizer () {
      this.isRequesting = true

      try {
        // Redirect to the Organizer views
        await this.axios.delete(`/organizer/${this.id}`)
        location.reload()
      } catch (e) {
        this.hadError = 'Não foi possível efetuar esta operação.'
      }
      this.isRequesting = false
    },
    /**
     * UpdateCompany: This method will send form to serve, for update
     */
    async UpdateOrganizer () {
      this.isRequesting = true
      try {
        await this.axios.put(`/organizer/${this.id}`, this.form)
        // this.$router.push({ name: "ListAddresses" });
        this.hadSuccess = 'Informações actualizadas com sucesso.'
      } catch (e) {
        this.hadError = 'Não foi possível realizar esta operação.'
      }
      this.isRequesting = false
    },
    showRemoveModal () {
      // Show modal for deatils
      this.$bvModal.show('modal-remove')
    },
    hideRemoveModal () {
      // Show modal for deatils
      this.$bvModal.hide('modal-remove')
    }
  },
  created () {
    this.allCompanies()
    this.GetOrganizer()
  }
}
</script>
<style lang="scss" scoped>
.panel {
  /* border: 1px solid red; */
  padding: 20px;
}
.panel-header {
  /* border: 1px solid red; */
  top: 0px;
  width: 100%;
  height: 15%;
}
.panel-body {
  /* border: 1px solid red; */
  margin-top: 40px;
}
.panel-footer {
  /* border: 1px solid red; */
  margin-top: 40px;
  height: 40px;
}
</style>
