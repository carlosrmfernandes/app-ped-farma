<template>
  <div class="panel">
    <div class="panel-header">
      <h1>Eventos</h1>
    </div>
    <div class="panel-body">
      <div>
        <Table
          :cols="cols"
          :data="events"
          title="Eventos"
          :detailMethod="getEvents"
          editRoute="EditEvent"
          :searchMethod="getEvents"
          :pagination="pagination"
          :paginationMethod="getEvents"
          :sortMethod="getEvents"
          :needGrid="true"
          :changePage="changePage"
          resource="event"
          :pageCount="pageCount"
          :canRemove="false"
          registRoute="RegistEvent"
          buttonRegistName="Novo Evento"
        />
      </div>
      <div class="panel-footer"></div>
    </div>
    <!-- Modal -->
    <b-modal id="bv-modal-example" class="mt-4" size="lg">
      <template v-slot:modal-title>
        <div class="w-100">
          <p class="float-left">Detalhe Eventos</p>
          <b-button
            variant="outline-primary"
            size="lg"
            class="float-right"
            @click="editEvents"
            :disabled="isEditable"
            >Editar</b-button
          >
          <b-button
            variant="outline-danger"
            size="lg"
            class="float-right mr-2"
            @click="showRemoveModal"
            >Remover</b-button
          >
        </div>
      </template>
      <div class="d-block text-center">
        <div class="row flex">
          <div class="form-group m-2">
            <label for="event-name">Nome</label>
            <input
              type="text"
              class="form-control"
              v-model="form.title"
              id="event-name"
              placeholder="Nome do Evento"
              :disabled="!isEditable"
            />
          </div>
        </div>
      </div>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="outline-secondary"
            size="lg"
            class="float-right"
            @click="hideModal"
            >Fechar</b-button
          >
        </div>
      </template>
    </b-modal>
    <!-- Remove Modal-->
    <b-modal id="modal-remove" title="Eventos">
      <p class="my-4">Tem certeza que deseja remover?</p>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="outline-primary"
            size="lg"
            class="float-right"
            @click="RemoveEvent"
            >Sim</b-button
          >
          <b-button
            variant="outline-danger"
            size="lg"
            class="float-right mr-2"
            @click="hideRemoveModal"
            >Nao</b-button
          >
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
        { name: 'title', label: 'Titulo' },
        { name: 'organizer', label: 'Organizer' },
        { name: 'status', label: 'Status' },
        { name: 'classification', label: 'Classificação' },
        { name: 'type', label: 'Tipo' },
        { name: 'starts_at', label: 'Data' },
        { name: 'created_at', label: 'Criado Em' }
      ],
      isRequesting: false,
      events: [],
      hadError: '',
      editID: '',
      pagination: {
        perPage: 12,
        pageable: { pageNumber: 1 }
      },
      ids: [],
      hadSuccess: '',
      pageCount: 0
    }
  },
  methods: {
    editEvents () {
      this.isEditable = true
    },
    async GetPosts () {
      // eslint-disable-next-line no-unused-expressions
      this.events
    },
    /*
     *  Getevents: This method will fire a GET request
     *  to fetch the events and the will store the result
     *  into the orders local state property
     */
    async getEvents (type, sort = '', search = '') {
      this.isRequesting = true

      if (type === 'next') {
        this.pagination.pageable.pageNumber += 1
      }

      if (type === 'prev') {
        this.pagination.pageable.pageNumber -= 1
      }

      // API query options like: sorts and pagination
      let query = ''
      query += `pageNumber=${this.pagination.pageable.pageNumber}`
      query += `&pageSize=${this.pagination.perPage}`
      // query += sort ? `&sortBy=${sort}` : ''
      query += search ? `&search=${search}` : ''

      try {
        const result = await this.axios.get(`/events?${query}`)
        const res = result.data
        this.events = res.data

        this.pageCount = res.pages_count
      } catch (e) {
        this.hadError =
          'Não foi possível carregar o evento. Actualize a página.'
      }
      this.isRequesting = false
    },
    changePage (page) {
      this.pagination.pageable.pageNumber = page
    },
    removeMostOrganizers (ids) {},
    /**
     * GetEvent: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async GetEvent () {
      this.isRequesting = true
      // Get the table rwo's details ID in store
      this.editID = this.$store.state.tableDetailID
      try {
        const result = await this.axios.get(`/events/${this.editID}`)
        this.form = result.data
      } catch (e) {
        this.hadError = 'Não foi possível carregar as informações.'
      }
      this.isRequesting = false
    },
    /**
     * GetEvent: This method will fire a GET request and then
     * assign the response data into the state property: form
     */
    async RemoveEvent () {
      this.isRequesting = true
      // Get the table rwo's details ID in store
      this.editID = this.$store.state.tableDetailID
      try {
        const result = await this.axios.delete(`/events/${this.editID}`)
        this.form = result.data
      } catch (e) {
        this.hadError = 'Não foi possível efetuar esta operação.'
      }
      this.isRequesting = false
      this.$store.state.tableDetailID = ''
    },
    hideModal () {
      this.$bvModal.hide('bv-modal-example')
      // Set the value to empty
      this.$store.state.tableDetailID = ''
    },
    showRemoveModal () {
      // this.$store.state.tableDetailID = id
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
    this.getEvents()
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
label {
  float: left !important;
}
.modal-content {
  margin-top: 15% !important;
}
</style>
