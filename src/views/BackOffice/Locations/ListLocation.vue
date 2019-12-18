<template>
  <div class="panel">
    <div class="panel-header">
      <h3>Localizações</h3>
    </div>
    <div class="panel-body">
      <div>
        <Table
          :cols="cols"
          :data="locations"
          title="Localização"
          :searchMethod="GetLocations"
          :pagination="pagination"
          :paginationMethod="GetLocations"
          :sortMethod="GetLocations"
          :needGrid="true"
          :changePage="changePage"
          resource="location"
          editRoute="EditLocation"
          :pageCount="pageCount"
          :removeResource="removeMostLocations"
          registRoute="RegistLocation"
          buttonRegistName = "Nova Localização"
        />
      </div>
      <div class="panel-footer"></div>
    </div>
  </div>
</template>
<script>
import { RemoveLocation } from './helpers/functions.js'

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
        { name: 'address', label: 'Endereço' },
        { name: 'latitude', label: 'Latitude' },
        { name: 'longitude', label: 'Longitude' },
        { name: 'type', label: 'Tipo' }
      ],
      isRequesting: false,
      locations: [],
      pagination: {
        perPage: 10,
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
    async GetPosts () {
      // eslint-disable-next-line no-unused-expressions
      this.locations
    },
    /*
     *  GetCompanies: This method will fire a GET request
     *  to fetch the companies and the will store the result
     *  into the orders local state property
     */
    async GetLocations (type, sort = '', search = '') {
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
        const result = await this.axios.get(`/locations/pages?${query}`)
        const res = result.data
        this.locations = res.data
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
    removeMostLocations (ids) {
      this.RemoveLocation(ids)
    },
    RemoveLocation
  },
  created () {
    // Get customer orders
    this.GetLocations()
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
