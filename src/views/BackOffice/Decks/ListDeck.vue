<template>
  <div class="panel">
    <div class="panel-header">
      <h3>Decks</h3>
    </div>
    <div class="panel-body">
      <div>
        <Table
          :cols="cols"
          :data="decks"
          title="Decks"
          :searchMethod="getDecks"
          :pagination="pagination"
          :paginationMethod="getDecks"
          :sortMethod="getDecks"
          :needGrid="false"
          :changePage="changePage"
          resource="decks"
          editRoute="EditDeck"
          :pageCount="pageCount"
          :removeResource="removeMostDecks"
          registRoute="RegistDeck"
          buttonRegistName = "Novo Deck"
        />
      </div>
      <div class="panel-footer"></div>
    </div>
  </div>
</template>
<script>
import { removeDeck } from './helpers/functions.js'

import Table from '@/components/Layouts/Table'
export default {
  components: {
    Table
  },
  data () {
    return {
      form: {},
      cols: [
        { name: 'name', label: 'Nome' },
        { name: 'number', label: 'Numero' },
        { name: 'orientation', label: 'Orientação' },
        { name: 'status', label: 'Status' },
        { name: 'starts_at', label: 'Data de Inicio' },
        { name: 'ends_at', label: 'Data de Termino' }
      ],
      isRequesting: false,
      decks: [],
      pagination: {
        perPage: 12,
        pageable: { pageNumber: 1 }
      },
      ids: [],
      hadError: '',
      hadSuccess: '',
      editID: '',
      pageCount: 0
    }
  },
  methods: {
    /*
     *  getCompanies: This method will fire a GET request
     *  to fetch the companies and the will store the result
     *  into the orders local state property
     */
    async getDecks (type, sort = '', search = '') {
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
      query += `&currentOnly=false`
      query += search ? `&search=${search}` : ''

      try {
        const result = await this.axios.get(`/decks?${query}`)
        const res = result.data
        this.decks = res.data

        this.pageCount = res.pages_count
        // Set Pagination
      } catch (e) {
        this.hadError =
          'Não foi possível carregar as encomendas. Actualize a página.'
      }
      this.isRequesting = false
    },
    changePage (page) {
      this.pagination.pageable.pageNumber = page
    },
    removeMostDecks (ids) {
      this.removeDeck(ids)
    },
    removeDeck
  },
  created () {
    // get customer orders
    this.getDecks()
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
