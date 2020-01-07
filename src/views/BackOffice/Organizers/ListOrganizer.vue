<template>
  <div class="panel">
    <div class="panel-header">
      <h4>Organizadores</h4>
    </div>
    <div class="panel-body">
      <div>
        <Table
          :cols="cols"
          :data="organizers"
          title="Organizador"
          :searchMethod="getOrganizers"
          :pagination="pagination"
          :paginationMethod="getOrganizers"
          :sortMethod="getOrganizers"
          :needGrid="true"
          :changePage="changePage"
          resource="organizer"
          editRoute="EditOrganizer"
          :pageCount="pageCount"
          :removeResource="removeMostOrganizers"
          registRoute="RegistOrganizer"
          buttonRegistName = "Novo Organizador"
          :totalElements = "totalElements"
        />
      </div>
      <div class="panel-footer"></div>
    </div>
  </div>
</template>
<script>
import { removeOrganizer } from './helpers/functions.js'

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
        { name: 'email', label: 'Email' },
        { name: 'facebook', label: 'Facebook' },
        { name: 'instagram', label: 'Instagram' },
        { name: 'twitter', label: 'Twitter' },
        { name: 'phone_number', label: 'Telefone' }
      ],
      isRequesting: false,
      organizers: [],
      pagination: {
        perPage: 15,
        pageable: { pageNumber: 1 }
      },
      ids: [],
      hadError: '',
      hadSuccess: '',
      editID: '',
      pageCount: 0,
      totalElements: 0
    }
  },
  methods: {
    /*
     *  GetCompanies: This method will fire a GET request
     *  to fetch the companies and the will store the result
     *  into the orders local state property
     */
    async getOrganizers (type, sort = '', search = '', size) {
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
      query += size ? `&pageSize=${size}` : `&pageSize=${this.pagination.perPage}`
      // query += sort ? `&sortBy=${sort}` : ''
      query += search ? `&search=${search}` : ''

      try {
        const result = await this.axios.get(`/organizers?${query}`)
        const res = result.data
        this.totalElements = res.items_count
        this.organizers = res.data

        this.pageCount = res.pages_count
        // Set Pagination
        // delete res.data.content
      } catch (e) {
        this.hadError =
          'Não foi possível carregar as encomendas. Actualize a página.'
      }
      this.isRequesting = false
    },
    changePage (page) {
      this.pagination.pageable.pageNumber = page
    },
    removeMostOrganizers (ids) {
      this.removeOrganizer(ids)
    },
    removeOrganizer
  },
  created () {
    // Get customer orders
    this.getOrganizers()
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
