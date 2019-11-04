<template>
  <div class="panel">
    <div class="panel-header">
      <h1>Editar Empresa</h1>
      <b-button
        variant="outline-primary"
        size="sm"
        class="float-right"
        @click="editCompany"
        v-show="isEditable"
      >Editar</b-button>
      <b-button
        variant="success"
        size="sm"
        class="float-right"
        @click="UpdateCompany"
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
      <div class="alert alert-success" v-if="hadSuccess" role="alert">
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
            <label for="event-name">Nome</label>
            <input type="text" class="form-control" v-model="form.name" id="organizer-name"
              :disabled="isEditable" placeholder="Nome do organizador" />
          </div>
        </div>
      </div>
      <div class="row">
        <UploadPhoto
          :defaultImage="form.logo"
          :OnChange="SelectImage"
          width="140px"
          height="185px"
          title="Logo"
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
          <b-button variant="primary" size="sm" class="float-right" @click="RemoveCompany">
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
import UploadPhoto from '@/components/Form/Photo'

export default {
  components: {
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
      isRequesting: false,
      hadSuccess: '',
      isOrderSaved: false,
      hadError: '',
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
      return result ? this.UpdateCompany() : result
    },
    editCompany () {
      this.isEditable = false
    },
    /**
     * GetCompany: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async GetCompany () {
      this.isRequesting = true
      try {
        const result = await this.axios.get(`/companies/${this.id}`)
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
    async RemoveCompany () {
      this.isRequesting = true

      try {
        // Redirect to the Organizer views
        await this.axios.delete(`/companies/${this.id}`)
        location.reload()
      } catch (e) {
        this.hadError = 'Não foi possível efetuar esta operação.'
      }
      this.isRequesting = false
    },
    /**
     * UpdateCompany: This method will send form to serve, for update
     */
    async UpdateCompany () {
      this.isRequesting = true
      try {
        await this.axios.put(`/companies/${this.id}`, this.form)
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
    },
    SelectImage (file) {
      this.file = file
    }
  },
  created () {
    this.GetCompany()
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
