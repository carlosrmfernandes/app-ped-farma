<template>
 <div class="panel">
    <div class="panel-header">
      <h1>Organizadores</h1>
    </div>
    <div class="panel-body">
      <div>
        <Table
        :cols="cols"
        :data="companies"
        title="Organizador"
        :searchMethod="GetPosts"
        :detailMethod="GetCompany"
        :needGrid="true"
        resource="company"
        />
      </div>
      <div class="panel-footer">
      </div>
    </div>
    <!-- Modal -->
    <b-modal id="bv-modal-example" class="mt-4" size="lg">
      <template v-slot:modal-title >
         <div class="w-100">
            <p class="float-left">Detalhe Organizador</p>
             <b-button
              variant="outline-primary"
              size="sm"
              class="float-right"
              @click="editOrganizer"
              :disabled="isEditable"
              v-show="!isEditable"
            >
              Editar
            </b-button>
             <b-button
              variant="outline-success"
              size="sm"
              class="float-right"
              @click="UpdateCompany"
              v-show="isEditable"
            >
              Salvar
            </b-button>
            <b-button
              variant="outline-danger"
              size="sm"
              class="float-right mr-2"
              @click="showRemoveModal"
            >
              Remover
            </b-button>
        </div>
      </template>
      <div class="d-block text-center">
        <div class=" col-md-12">
          <div class="alert alert-success" v-if="hadSuccess" role="alert">
            {{hadSuccess}}
          </div>
          <div class="alert alert-danger" v-if="hadError" role="alert">
            {{hadError}}
          </div>
        </div>
        <div class="row flex">
          <div class="form-group m-2">
            <label for="event-name" >Nome</label>
            <input type="text" class="form-control" v-model="form.name" id="event-name" placeholder="Nome do Organizador de Evento" :disabled="!isEditable" />
          </div>
        </div>
      </div>
       <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="outline-secondary"
            size="sm"
            class="float-right"
            @click="hideModal"
          >
            Fechar
          </b-button>
        </div>
      </template>
    </b-modal>
    <!-- Remove Modal-->
    <b-modal id="modal-remove" title="Organizador">
      <p class="my-4">Tem certeza que deseja remover?</p>
       <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="outline-primary"
            size="lg"
            class="float-right"
            @click="RemoveCompany"
          >
            Sim
          </b-button>
          <b-button
            variant="outline-danger"
            size="lg"
            class="float-right mr-2"
            @click="hideRemoveModal"
          >
            Nao
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import Table from '@/components/Layouts/Table'
export default {
  components: {
    Table
  },
  props: {
    isEditable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {},
      cols: [
        { name: 'name', label: 'Nome' }
      ],
      isRequesting: false,
      companies: [],
      hadError: '',
      hadSuccess: '',
      editID: ''
    }
  },
  methods: {
    editOrganizer () {
      this.isEditable = true
    },
    async GetPosts () {
      // eslint-disable-next-line no-unused-expressions
      this.companies
    },
    /*
     *  GetCompanies: This method will fire a GET request
     *  to fetch the companies and the will store the result
     *  into the orders local state property
     */
    async GetCompanies () {
      this.isRequesting = true
      try {
        const result = await this.axios.get(`/companies/pages`)
        const res = result.data
        this.companies = res.data
      } catch (e) {
        this.hadError =
          'Não foi possível carregar as encomendas. Actualize a página.'
      }
      this.isRequesting = false
    },
    /**
     * GetCompany: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async GetCompany () {
      this.isRequesting = true
      // Get the table rwo's details ID in store
      this.editID = this.$store.state.tableDetailID
      try {
        const result = await this.axios.get(
          `/companies/${this.editID}`
        )
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
      // Get the table rwo's details ID in store
      this.editID = this.$store.state.tableDetailID
      try {
        // Redirect to the Organizer views
        await this.axios.delete(`/companies/${this.editID}`)
        location.reload()
      } catch (e) {
        this.hadError = 'Não foi possível efetuar esta operação.'
      }
      this.isRequesting = false
      this.$store.state.tableDetailID = ''
    },
    /**
     * UpdateCompany: This method will send form to serve, for update
     */
    async UpdateCompany () {
      this.isRequesting = true
      // Get the table rwo's details ID in store
      this.editID = this.$store.state.tableDetailID
      try {
        await this.axios.put(`/companies/${this.editID}`, this.form)
        // this.$router.push({ name: "ListAddresses" });
        this.hadSuccess = 'Informações actualizadas com sucesso.'
      } catch (e) {
        this.hadError = 'Não foi possível realizar esta operação.'
      }
      this.isRequesting = false
    },
    hideModal () {
      this.$bvModal.hide('bv-modal-example')
      // Set the value to empty
      this.$store.state.tableDetailID = ''
    },
    showRemoveModal () {
      // Show modal for deatils
      this.$bvModal.show('modal-remove')
    },
    hideRemoveModal () {
      // Set the ID value on store Global variable for using with modal
      this.$store.state.tableDetailID = ''
      // Show modal for deatils
      this.$bvModal.hide('modal-remove')
    }
  },
  created () {
    // Get customer orders
    this.GetCompanies()
  }
}
</script>
<style>
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
label{
    float: left !important;
}
.modal-content{
    margin-top: 15% !important;
}
</style>
